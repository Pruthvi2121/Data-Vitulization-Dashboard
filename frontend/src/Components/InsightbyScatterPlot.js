import React, { useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import DonutChart from "./Charts/DonutChart";
import BubbleChart from "./Charts/BubbleChart";
import ScatterChart from "./Charts/ScatterChart";

const InsightsbyScatterPlot= ()=>{
   
   
    const [dataset, setDataset] = useState([])
    
   
    
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/insights_by_scatter_plotview/")
      .then((res) => {
        console.log("this is scatter",res.data);
        
        setDataset(res.data.datasets)
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

    return <div className=" border h-full mt-4 rounded-lg border-[#454154]  w-full">
                <h1 className="text-white font-semibold text-2xl pt-4 px-4">Relevance over Likelihood</h1>
                <p className="px-4 text-[#fafafa83]">Scatter plot showing the likelihood and relevance of insights, with the x-axis indicating the likelihood and the y-axis indicating the relevance</p>
            <div className=" px-4 w-full h-96 my-2 pr-32" >
            <ScatterChart dataset={dataset} />
            </div>
            
    </div>
}

export default InsightsbyScatterPlot