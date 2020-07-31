from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm
from django.shortcuts import render
from idna import unicode
from .models import User
from ..student.models import Student
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('password1',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        del self.fields['password2']

class StudentForm(ModelForm):
    class Meta:
        model = Student
        fields = ('first_name', 'last_name', 'email')

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def login_view(request, format=None):
    content = {
        'user': unicode(request.user),
        'auth': unicode(request.auth)
    }
    return Response(content)


@api_view(['POST'])
def signup_view(request, format=None):
    form = SignupForm(request.POST)
    student_form = StudentForm(request.POST)
    if form.is_valid() and student_form.is_valid():
        user = form.save(commit=False)
        student = student_form.save(commit=False)
        user.is_active = True
        user.username = student.email
        student.user = user
        user.save()
        student.save()
        return Response({"Status" : "OK"})
    else:
        return Response({"Status" : "Invalid"})