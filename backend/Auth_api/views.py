from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import UserRegistrationSerializer, LoginSerializer, ProfileSerializer
from django.contrib.auth import authenticate
from Auth_api.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated




# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistration(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({"tokens":token,"msg": "Success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    renderer_classes=[UserRenderer]
    def post(self, request, format = None ):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                res = Response()
                res.set_cookie(key='jwt', value=token, httponly=True)
                # return Response({"tokens":token,"msg":"Login Success"}, status=status.HTTP_202_ACCEPTED)
                res.data ={"tokens":token,"msg":"Login Success"}

                return res
            else: 
                return Response({"error":{"non_field_errors":"email or password is not valid"}}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    def get(self, request, format = None):
        serializer = ProfileSerializer(request.user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


# class UserView(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')
#         if not token:
#             return Response("Unaunthenticated")
        
#         try:
#             payload = jwt.decode(token,'secret',algorithm='HS256')

#         return Response(token)
