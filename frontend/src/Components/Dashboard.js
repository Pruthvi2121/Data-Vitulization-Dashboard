import React from "react";
import Intensity from "./Intensity";
import Likelihood from "./Likelihood";
import CountryView from "./CountryView";

import InsightsByRegion from "./InsightsByRegion";
import InsightsByTopicSector from "./InsightByTopicSector";
import InsightsbyScatterPlot from "./InsightbyScatterPlot";

const Dashboard= ()=>{
    
    return <div>
        <Intensity/>
        <Likelihood/>
        <CountryView/>
        <InsightsByRegion/>
        <InsightsByTopicSector/>
        <InsightsbyScatterPlot/>
    
        
    </div>
}

export default Dashboard