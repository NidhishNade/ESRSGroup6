import json

import requests
from django.shortcuts import render

# Create your views here.
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render
import mysql.connector
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# from mysql.connector.authentication.MySQLAuthenticator import authenticate
from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response

from ESRSProjectGroup6.serialize import UserSerializer


def all_users(request):
    cnx = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="esrsgroup6"
    )
    print(cnx)
    # cnx = mysql.connector.connect(mydb)
    # mycursor = mydb.cursor()
    # mycursor.execute("SELECT * FROM your_table");
    results = []
    if cnx and cnx.is_connected():

        with cnx.cursor() as cursor:

            result = cursor.execute("SELECT * FROM users")

            rows = cursor.fetchall()
            results = json.dumps(rows)
            for row in rows:
                print(row)
        return HttpResponse(results)
        cnx.close()

    else:
        print("Could not connect")


@csrf_exempt
def signup(request):
    print("Post requet successfyul")
    if request.method == 'POST':

        data = request.body.decode('utf-8')
        user_data = json.loads(data)
        print(str(user_data) + "££")
        uname = user_data.get('username')
        print(str(uname) + "@@@@@@")
        firstname = user_data.get('firstName')
        lastname = user_data.get('lastName')
        email = user_data.get('email')
        # input_password.encode('utf-8')
        pass1 = user_data.get('password')
        userid = str(str(firstname)[0] + " " + str(lastname))
        # pass2=request.POST.get('password2')
        cnx = mysql.connector.connect(
            host="localhost",
            user="root",
            password="123456",
            database="esrsgroup6"
        )
        if cnx and cnx.is_connected():
            with cnx.cursor() as cursor:
                val = (uname, email, "Team Member", 0, userid, pass1)
                print(str(val) + "---")
                query = '''
                INSERT INTO users (user_name, user_email, user_roleName, isUserAdmin, user_id, user_pwd) 
                       VALUES (%s, %s, %s, %s, %s, %s)
                       '''

                result = cursor.execute(query, val)
                print("Value inserted in db")
                cnx.commit()
                # all_users()
                result = cursor.execute("SELECT * FROM users LIMIT 10")
                rows = cursor.fetchall()
                cnx.commit()
                for rows in rows:
                    print(rows)
                return HttpResponse("value inserted in db")
                cnx.close()
    return JsonResponse({'message': 'User created successfully.'})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        print("Entered in if")
        cnx = mysql.connector.connect(
            host="localhost",
            user="root",
            password="123456",
            database="esrsgroup6"
        )
        if cnx and cnx.is_connected():
            with cnx.cursor() as cursor:
                data = json.loads(request.body)
                username = data.get('username')
                password = data.get('password')
                print("before authenticate")
                sql = "SELECT user_pwd FROM users where user_name = %s"
                val = (username,)
                cursor.execute(sql, val)
                rows = cursor.fetchone()[0]
                # user = authenticate(username=username, password=password)
                print(str("after authenticate" + str(check_password(password, rows))))
                if check_password(password, rows):
                    print(str("after authenticate" + str(str(password) == str(rows))))
                    return JsonResponse({'message': 'User successfully logged in.'})
                else:
                    print("wrong")
                    return JsonResponse({'message': 'Invalid credentials.'})
        else:
            return Response({'error': 'error connecting to the server'})


def check_password(input_password, stored_password):
    print(str(str(input_password) == str(stored_password)) + str(input_password) + str(stored_password))
    return str(input_password) == str(stored_password)


class SignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_201_CREATED)


@csrf_exempt
def getusertasks(request):
    if request.method == 'POST':
        print("Entered in if")
        cnx = mysql.connector.connect(
            host="localhost",
            user="root",
            password="123456",
            database="esrsgroup6"
        )
        if cnx and cnx.is_connected():
            with cnx.cursor() as cursor:
                data = json.loads(request.body)
                userid = data.get('user_id')
                # roleName = data.get('roleName')
                print("before authenticate")
                sql = ("SELECT * FROM task t INNER JOIN users u ON t.task_assigned_to_iduser = u.user_id WHERE "
                       "u.user_id = %s")
                sqlvalue = (userid,)
                cursor.execute(sql, sqlvalue)
                rows = cursor.fetchall()
                cnx.close()
                return JsonResponse({'data': rows})
        else:
            return Response({'error': 'error connecting to the server'})


def getusertasksassignedbyuser(request):
    if request.method == 'POST':
        print("Entered in if")
        cnx = mysql.connector.connect(
            host="localhost",
            user="root",
            password="123456",
            database="esrsgroup6"
        )
        if cnx and cnx.is_connected():
            with cnx.cursor() as cursor:
                data = json.loads(request.body)
                userid = data.get('user_id')
                # roleName = data.get('roleName')
                print("before authenticate")
                sql = ("SELECT * FROM task t INNER JOIN users u ON t.task_assigned_by_iduser = u.user_id WHERE "
                       "u.user_id = %s")
                sqlvalue = (userid,)
                cursor.execute(sql, sqlvalue)
                rows = cursor.fetchall()
                cnx.close()
                return JsonResponse({'data': rows})
        else:
            return Response({'error': 'error connecting to the server'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all();
