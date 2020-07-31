from datetime import datetime
from .models import Place, Interval
from ..accounts.models import User

def group_location(loc, u_id):
	place = get_region(loc)
	lastest_interval_for_place = Interval.objects.filter(place=place)[0]
	list_of_user_ids = [user.id for user in lastest_interval_for_place.user_info]
	if u_id in list_of_user_ids:
		user = User.objects.get(id=u_id)
		lastest_interval_for_place.user_info.append(user)
	
def get_region(loc):
	min_euclidean = 99999
	place = None
	for options in list(Place.objects.all()):
		euclidean = euclidean_distance(loc, (options.latitude, options.longitude))
		if euclidean < min_euclidean:
			min_euclidean = euclidean
			place = options
	return place


def euclidean_distance(loc1, loc2):
	latitude1, latitude2 = loc1[0], loc1[1]
	longitude1, longitude2 = loc2[0], loc2[1]
	return get_distance(latitude1, longitude1, latitude2, longitude2)

def to_bin(time_str):
	time_object = datetime.strptime(time_str, '%H::%M::%S').time()
	if time_object.minute < 30:
		return str(time_object.hour)
	else:
		return str(time_object.hour) + ":30"

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
