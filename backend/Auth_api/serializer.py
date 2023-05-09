from rest_framework import serializers
from Auth_api.models import User

# from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from django.contrib.auth.hashers import make_password
class UserRegistrationSerializer(serializers.ModelSerializer):
    password2= serializers.CharField(style = {'input_type':'password'}, write_only =True, max_length =25 )
    class Meta:
     model = User
     fields =['email', 'name','password','password2']
     extra_kwargs ={
        'password':{'write_only':True}
     }

     # validating password and confirm password
    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        
        if password != password2:
            raise serializers.ValidationError("Sorry !! 'password and confirm password not match'")
        return data
    
    def create(self, validate_data):
        validate_data['password'] = make_password(
                validate_data.get('password')
            )
        validate_data.pop('password2', None)
        password = make_password(validate_data['password'])
        return User.objects.create(**validate_data) 

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length = 200)
    class Meta:
        model=User
        fields =['email', 'password']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'name','email']

