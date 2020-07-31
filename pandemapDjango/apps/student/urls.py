from django.urls import path
from . import views

urlpatterns = [
    path('students_list', views.students_list, name='students_list'),
    path('student_detail/<int:pk>', views.student_detail, name='student_detail'),
]