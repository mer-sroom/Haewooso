from django.shortcuts import render

import requests
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class RestroomSearchView(View):
    def get(self, request):
        query = request.GET.get('query', '공중화장실')
        latitude = request.GET.get('lat', '37.5665')
        longitude = request.GET.get('lng', '126.9780')
        radius = request.GET.get('radius', '1000')

        url = 'https://naveropenapi.apigw.ntruss.com/map-place/v1/search'
        headers = {
            'X-NCP-APIGW-API-KEY-ID': '2nbo1rxdpp',
            'X-NCP-APIGW-API-KEY': '428NvC7Tw4WL8ABOVByjD9SUQ8ArXzYWqOnwAvZd',
        }
        params = {
            'query': query,
            'coordinate': f'{longitude},{latitude}',
            'radius': radius,
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({'error': 'Failed to fetch data from Naver API'}, status=response.status_code)
