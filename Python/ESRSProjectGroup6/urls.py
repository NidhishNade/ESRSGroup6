import self
from django.contrib import admin
from django.urls import include, path

import ESRSProjectGroup6.views
from ESRSProjectGroup6 import views

# from  import views

urlpatterns = [

    # path('admin/', admin.site.urls),
    # path('api/account/', include('ESRSProjectGroup6.urls')),
    path('all_users/', views.all_users),
    path('login/',views.login),
    path('signup/', views.signup),
    path('getuserdata/',views.getusertasks),
    path('gettaskassignedbyuser/',views.getusertasksassignedbyuser)
]
