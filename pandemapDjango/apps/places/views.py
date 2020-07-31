from django.http import HttpResponse
from django.shortcuts import render

from ..master.models import Place_Type
from .crowd_counting_api import *
from .locationtimes import *
from .models import Place, Interval
from rest_framework.decorators import api_view
from .serializers import PlaceSerializer, IntervalSerializer
from rest_framework.response import Response
from rest_framework import status
from .preference import Preference


@api_view(['GET', 'POST'])
def places_list(request, format=None):
    if request.method == 'GET':
        places = Place.objects.all()
        serializer = PlaceSerializer(places, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PlaceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def place_detail(request, pk, format=None):
    try:
        place = Place.objects.get(pk=pk)
    except Place.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlaceSerializer(place)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlaceSerializer(place, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        place.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def intervals_list(request, format=None):
    if request.method == 'GET':
        intervals = Interval.objects.all()
        serializer = IntervalSerializer(intervals, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = IntervalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def interval_detail(request, pk, format=None):
    try:
        interval = Interval.objects.get(pk=pk)
    except Interval.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = IntervalSerializer(interval)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = IntervalSerializer(interval, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        interval.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def crowd_counting(request):
    try:
        payload()
    except Exception as e:
        print(e)
        return HttpResponse("OK")
    return HttpResponse("Interval Posted")


@api_view(['GET'])
def summary(request):
    to_return = []
    for cat in list(Place_Type.objects.all()):
        cat_dict = { "id": cat.id, "category": cat.type, "data": [] }
        places_per_cat = Place.objects.filter(type_of_place=cat)
        for place in list(places_per_cat):
            lastest_interval_for_place = Interval.objects.filter(place=place)[0]
            distance = get_distance(place.latitude, place.longitude,
                                                    int(request.GET["latitude"]),
                                                    int(request.GET["longitude"]))
            if distance <= 1.5:
                if place.http_ref is None:
                    no_of_people = len(lastest_interval_for_place.user_info)
                else:
                    no_of_people = lastest_interval_for_place.people_count
                place_dict = { "id": place.id,
                               "name": place.name,
                               "crowding": no_of_people / place.max_people,
                               "distance": distance,
                               "coordinates": {
                                   "lat": place.latitude,
                                   "lon": place.latitude
                               }
                               }
                cat_dict["data"].append(place_dict)
        to_return.append(cat_dict)
    return Response(to_return)


@api_view(['GET'])
def single_place_information(request):
    place_id = int(request.GET["id"])
    place = Place.objects.get(pk=place_id)
    crowding_details = fill_intervals(place)
    return_dict = {
        "name": place.name,
        "img_url": "https://i0.wp.com/www.dailycal.org/assets/uploads/2019/11/study_maddie-fruman_staff.jpg?ssl=1",
        "category": place.type_of_place.type,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        "distance": get_distance(place.latitude, place.longitude,
                                                    int(request.GET["latitude"]),
                                                    int(request.GET["longitude"])),
        "crowding": Interval.objects.filter(place=place)[0].people_count / place.max_people,
        "crowdingDetails": crowding_details
    }
    return Response(return_dict)

@api_view(['POST'])
def location_times(request):
    try:
        group_location((request.GET['latitude'],
                        request.GET['longitude']),
                       request.GET['u_id'])
        return Response({"Status" : "OK"})
    except Exception as e:
        return Response({"Error" : str(e)}), status.HTTP_404_NOT_FOUND

@api_view(['POST'])
def preferences(request):
    query = request.GET['query']
    latitude, longitude = request.GET['latitude'], request.GET['longitude']
    top_3 = Preference(query, latitude, longitude)
    return Response(top_3)



def get_distance(latitude, longitude, param, param1):
    from math import sin, cos, sqrt, atan2, radians
    R = 6373.0
    lat1 = radians(latitude)
    lon1 = radians(longitude)
    lat2 = radians(param)
    lon2 = radians(param1)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

def fill_intervals(place):
    buckets = [0] * 24
    crowding_details = []
    for i in range(7):
        temp = list(buckets)
        crowding_details.append(temp)
    i, j = 0, 0
    for interval in list(Interval.objects.filter(place=place))[:168]:
        if j == 24:
            i, j = i + 1, 0
        if place.http_ref is None:
            no_of_people = len(interval.user_info)
        else:
            no_of_people = interval.people_count
        crowding_details[i][j] = no_of_people / place.max_people
        j += 1
    return crowding_details


def cc_view(request):
    if request.method == "POST":
        try:
            crowd_count =  get_prediction(request.POST.get('cctvlink'))
        except Exception as e:
            crowd_count = str(e)
        print(crowd_count)
    else:
        crowd_count = " "

    return render(request, 'tester.html',{
        'crowd_count': crowd_count,
    })
