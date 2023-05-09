import React, { useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import DonutChart from "./Charts/DonutChart";
import BubbleChart from "./Charts/BubbleChart";

const InsightsByRegion= ()=>{
   
   
    const [dataset, setDataset] = useState([])
    
   
    
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/insights_by_region/")
      .then((res) => {
        console.log(res.data);
        console.log("labels", res.data);
        setDataset(res.data.datasets)
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

    return <div className=" border h-full mt-4 rounded-lg border-[#454154]  w-full">
                <h1 className="text-white font-semibold text-2xl pt-4 px-4">Region.</h1>
                <p className="px-4 text-[#fafafa83]">Region filter to filter the insights based on the region</p>
            <div className=" px-4 w-full h-full my-2 pr-32" >
            <BubbleChart data1={dataset} />
            </div>
            
    </div>
}

export default InsightsByRegion