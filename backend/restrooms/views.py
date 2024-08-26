from django.http import JsonResponse
from django.views import View
import requests
from restrooms.models import Restroom
import math

class RestroomSearchView(View):
    def get(self, request):
        # 네이버 검색 API 클라이언트 ID와 시크릿
        client_id = "U4Hj0HCQnTdb0xPDUAmP"
        client_secret = "TRhYJYrwEK"

        # 요청할 URL과 파라미터
        url = "https://openapi.naver.com/v1/search/local.json"
        params = {
            "query": "공중화장실",  # 검색어
            "display": 5,  # 표시할 검색 결과의 수
            "start": 1,  # 검색 시작 위치
            "coordinate": "126.9779692,37.566535", 
        }

        # 헤더 설정
        headers = {
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
        }

        # 네이버 API에 GET 요청 보내기
        response = requests.get(url, headers=headers, params=params)
        
        # API 응답 확인
        print("API Response:", response.json())

        # 응답 결과 반환
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({"error": "Failed to fetch data from Naver API"}, status=response.status_code)


class GeocodeView(View):
    def get(self, request):
        address = request.GET.get('address')

        if not address:
            return JsonResponse({"error": "Address parameter is required"}, status=400)

        # 여기서 제공된 API 키와 시크릿 키를 사용
        client_id = "2nbo1rxdpp"
        client_secret = "428NvC7Tw4WL8ABOVByjD9SUQ8ArXzYWqOnwAvZd"

        url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode"
        params = {
            "query": address,
        }
        headers = {
            "X-NCP-APIGW-API-KEY-ID": client_id,
            "X-NCP-APIGW-API-KEY": client_secret,
        }

        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({"error": "Failed to fetch data from Naver API"}, status=response.status_code)


class NearbyRestroomsView(View):
    def get(self, request):
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('lng'))
        radius = float(request.GET.get('radius', 1000))  # 반경 (미터 단위)

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371000  # 지구 반지름 (미터 단위)
            phi1 = math.radians(lat1)
            phi2 = math.radians(lat2)
            delta_phi = math.radians(lat2 - lat1)
            delta_lambda = math.radians(lon2 - lon1)

            a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

            return R * c  # 두 좌표 간의 거리 (미터 단위)

        restrooms = Restroom.objects.all()
        nearby_restrooms = []

        for restroom in restrooms:
            distance = haversine(lat, lng, restroom.latitude, restroom.longitude)
            if distance <= radius:
                nearby_restrooms.append({
                    "name": restroom.name,
                    "road_address": restroom.road_address,
                    "latitude": restroom.latitude,
                    "longitude": restroom.longitude,
                    "distance": distance  # 거리 정보를 추가
                })

        # 거리 기준으로 정렬하고 최대 10개까지 반환
        nearby_restrooms.sort(key=lambda x: x["distance"])
        nearby_restrooms = nearby_restrooms[:10]

        return JsonResponse({"items": nearby_restrooms})

class SearchRestroomsView(View):
    def get(self, request):
        query = request.GET.get('query', '').strip()
        lat = float(request.GET.get('lat'))
        lng = float(request.GET.get('lng'))

        if not query:
            return JsonResponse({"error": "Query parameter is required"}, status=400)

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371000  # 지구 반지름 (미터 단위)
            phi1 = math.radians(lat1)
            phi2 = math.radians(lat2)
            delta_phi = math.radians(lat2 - lat1)
            delta_lambda = math.radians(lon2 - lon1)

            a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

            return R * c  # 두 좌표 간의 거리 (미터 단위)

        # 검색어가 포함된 공중화장실을 필터링 (이름 또는 주소에 포함된 경우)
        restrooms = Restroom.objects.filter(
            name__icontains=query
        ) | Restroom.objects.filter(
            road_address__icontains=query
        ) | Restroom.objects.filter(
            jibun_address__icontains=query
        )

        search_results = []

        for restroom in restrooms:
            distance = haversine(lat, lng, restroom.latitude, restroom.longitude)
            search_results.append({
                "name": restroom.name,
                "latitude": restroom.latitude,
                "longitude": restroom.longitude,
                "distance": distance  # 거리를 결과에 포함
            })

        # 거리 순으로 정렬하고 상위 5개만 반환
        search_results.sort(key=lambda x: x['distance'])
        search_results = search_results[:5]

        return JsonResponse({"items": search_results})
