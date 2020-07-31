from django.urls import path
from . import views

urlpatterns = [
    path('places_list', views.places_list, name='places_list'),
    path('place_detail/<int:pk>', views.place_detail, name='place_detail'),
    path('intervals_list', views.intervals_list, name='intervals_list'),
    path('interval_detail/<int:pk>', views.interval_detail, name='interval_detail'),
    path('payload/', views.crowd_counting, name='crowd_counting_api'),
    path('summary/', views.summary, name="summary"),
    path('single_place_information/', views.single_place_information, name="single_place_information"),
    path('location_times/', views.location_times, name="location_times"),
    path('preferences/', views.preferences, name="preferences"),
    path('cc/', views.cc_view, name="cc_view"),
]