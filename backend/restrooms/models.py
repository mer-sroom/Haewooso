from django.db import models

class Restroom(models.Model):
    name = models.CharField(max_length=255)  # 화장실명
    road_address = models.CharField(max_length=255)  # 도로명 주소
    jibun_address = models.CharField(max_length=255)  # 지번 주소
    has_disabled_toilet = models.BooleanField(default=False)  # 장애인용 변기 존재 유무
    contact_number = models.CharField(max_length=50)  # 전화번호
    opening_hours = models.CharField(max_length=50)  # 개방시간
    latitude = models.FloatField()  # WGS84 위도
    longitude = models.FloatField()  # WGS84 경도
    waste_treatment = models.CharField(max_length=50)  # 오물처리 방식
    cctv = models.BooleanField(default=False)  # 화장실 입구 CCTV 설치 유무
    remodeling_date = models.CharField(max_length=50, null=True, blank=True)  # 리모델링 연월
    data_date = models.CharField(max_length=50)  # 데이터 기준 일자

    def __str__(self):
        return self.name
