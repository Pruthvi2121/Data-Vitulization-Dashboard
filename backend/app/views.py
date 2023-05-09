from django.shortcuts import render
import pandas as pd
# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.views import APIView
from .models import Data
from .background import background
from .serializers import DataSerializer, AvgIntensitySerializer
from django.db.models import Count, Avg , Sum
from rest_framework.permissions import IsAuthenticated

# Bar chart showing the average intensity by topic
# Line chart showing the sum of likelihood by year
# Bubble chart showing the relevance of insights by region, with the size of the bubbles indicating the intensity and the color indicating the likelihood
# Pie chart showing the count of insights by country
# Stacked bar chart showing the count of insights by topic and sector, with the colors indicating the PESTLE factors
# Choropleth map showing the relevance of insights by city and country, with the color indicating the relevance and the size indicating the intensity
# Scatter plot showing the likelihood and relevance of insights, with the x-axis indicating the likelihood and the y-axis indicating the relevance
    



class AverageIntensityByTopicView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        insights = Data.objects.values('topic').annotate(avg_intensity=Avg('intensity'), total_intensity=Sum('intensity'))
        serialized_data = AvgIntensitySerializer(insights, many=True)
        print(serialized_data.data[0])
        topic = []
        avg_intensity = []
        total_intensity = []
        for i in serialized_data.data:
          
            topic.append( dict(i)['topic'] )
            avg_intensity.append( dict(i)['avg_intensity'] )
            total_intensity.append( dict(i)['total_intensity'] )
        return Response({"topic":topic, "avg_intensity":avg_intensity, "total_intensity":total_intensity})
    

class InsightsByCountryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        insights = Data.objects.values('country').annotate(count=Count('id'))
      
        response_data = {'labels': [], 'data': []}
        
        for insight in insights:
            if insight['country']=="":
              insight['country']="other"
            response_data['labels'].append(insight['country'])
            
            response_data['data'].append(insight['count'])
        
        return Response(response_data)
    

class SumLikelihoodByYearView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        insights = Data.objects.values('start_year').annotate(sum_likelihood=Sum('likelihood'))
        
        response_data = {'labels': [], 'data': []}
        
        for insight in insights:
            if insight['start_year'] == "":
              insight['start_year'] = "other"
            response_data['labels'].append(insight['start_year'])
            response_data['data'].append(insight['sum_likelihood'])
        
        return Response(response_data)
        
        return Response(response_data)

class InsightsBySectorView(APIView):
    
    def get(self, request, sector, format=None):
        insights = Data.objects.filter(sector=sector)
        serializer = DataSerializer(insights, many=True)
        return Response(serializer.data)
    
class InsightsByRegionView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        insights = Data.objects.values('region').annotate(sum_intensity=Sum('intensity'), sum_relevance=Sum('relevance'), sum_likelihood=Sum('likelihood'))
        response_data = {'datasets': []}
        
        for insight in insights:
            if insight['region']=="":
              insight['region'] ="other"
            dataset = {
                'label': insight['region'],
                'backgroundColor': self.get_color(insight['sum_likelihood']),
                'borderColor': '#000',
                'data': [{
                    'x': insight['sum_relevance'],
                    'y': insight['sum_intensity'],
                    'r': self.get_bubble_size(insight['sum_intensity'])
                }]
            }
            response_data['datasets'].append(dataset)
        
        return Response(response_data)
    
    def get_color(self, likelihood):
        if likelihood > 70:
            return 'rgba(255, 99, 132, 0.6)'
        elif likelihood > 50:
            return 'rgba(255, 159, 64, 0.6)'
        elif likelihood > 30:
            return 'rgba(255, 205, 86, 0.6)'
        elif likelihood > 10:
            return 'rgba(75, 192, 192, 0.6)'
        else:
            return 'rgba(54, 162, 235, 0.6)'
    
    def get_bubble_size(self, intensity):
        return intensity / 30
    


class InsightsByTopicSectorView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        insights = Data.objects.values('topic', 'sector', 'pestle').annotate(count=Count('id'))
        response_data = {'labels': [], 'datasets': []}

        topics = set([insight['topic'] for insight in insights])
        sectors = set([insight['sector'] for insight in insights])
        pestle_factors = set([insight['pestle'] for insight in insights])
        i=0
        for topic in topics:
            if topic =="":
                topic="other"
            response_data['labels'].append(topic)
            dataset = {'label': topic, 'data': [], "backgroundColor":background[i]}
            
            for sector in sectors:
                for pestle_factor in pestle_factors:
                    count = next((insight['count'] for insight in insights if insight['topic'] == topic and insight['sector'] == sector and insight['pestle'] == pestle_factor), 0)
                    dataset['data'].append(count)
            
            
            response_data['datasets'].append(dataset)
            
            i+=1
           
                
        
        return Response(response_data)
    
class InsightsScatterPlotView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        insights = Data.objects.values('likelihood', 'relevance')
        response_data = {
            'datasets': [{
                'label': 'Insights',
                'data': [{'x': insight['likelihood'], 'y': insight['relevance']} for insight in insights],
                'backgroundColor': 'rgba(54, 162, 235, 0.6)',
                'hoverBackgroundColor': 'rgba(54, 162, 235, 0.8)',
                'hoverRadius': 6
            }]
        }
        
        return Response(response_data)