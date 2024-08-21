from django.http import JsonResponse
from django.views import View
import requests

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
            "sort": "random"  # 정렬 방식
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