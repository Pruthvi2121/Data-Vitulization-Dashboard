
from .views import SumLikelihoodByYearView, InsightsByCountryView,AverageIntensityByTopicView, InsightsByTopicSectorView,InsightsScatterPlotView, InsightsByRegionView
from django.urls import path, include
from rest_framework.routers import DefaultRouter




urlpatterns = [
    # path("", include(router.urls)),
    path("intensity/", AverageIntensityByTopicView.as_view(), name="intensity" ),
    path("countryview/", InsightsByCountryView.as_view(), name="country" ),
    path("likelihood_by_yearview/", SumLikelihoodByYearView.as_view(), name="likelihood" ),
    path("insights_by_region/", InsightsByRegionView.as_view(), name="region" ),
    path("insights_by_topic_sector/", InsightsByTopicSectorView.as_view(), name="topic" ),
    path("insights_by_scatter_plotview/", InsightsScatterPlotView.as_view(), name="scatter" ),
]

