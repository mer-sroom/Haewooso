"""
URL configuration for haewooso project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from restrooms.views import RestroomSearchView, GeocodeView, NearbyRestroomsView, SearchRestroomsView, SignupView, LoginView

urlpatterns = [
    path('api/signup/', SignupView.as_view(), name='signup'),  # api/ 추가
    path('api/login/', LoginView.as_view(), name='login'),  # api/ 추가
    path('admin/', admin.site.urls),
    path('api/restrooms/', RestroomSearchView.as_view(), name='restroom_search'),
    path('api/geocode/', GeocodeView.as_view(), name='geocode'),
    path('api/nearby-restrooms/', NearbyRestroomsView.as_view(), name='nearby_restrooms'),
    path('api/search-restrooms/', SearchRestroomsView.as_view(), name='search_restrooms'),  # 새 검색 뷰 추가
]
