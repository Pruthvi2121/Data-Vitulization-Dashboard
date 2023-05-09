import React, { useEffect, useState } from "react";

import axios from "axios";

import StackedBarChart from "./Charts/StackedBarChart";

const InsightsByTopicSector= ()=>{
   
   
    const [datasets, setDataset] = useState([])
    const [labels, setLabels] = useState([])
    
   
    
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/insights_by_topic_sector/")
      .then((res) => {
        console.log(res.data);
        console.log("labels", res.data.datasets.length);
        setDataset(res.data.datasets)
        setLabels(res.data.labels)
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

    return <div className="text-white border rounded-lg mt-4 border-[#454154] ">
    <h1 className="font-semibold text-2xl pt-4 px-4">Topic, Sector, PESTLE factor.</h1>
    <p className="px-4 text-[#fafafa83]">Stacked bar chart showing the count of insights by topic and sector, with the colors indicating the PESTLE factors</p>
 
  
   <div className=" text-white w-full overflow-x-auto scrollbar-hide ">
     <div className="px-4 py-4">
      
       <div className="  overflow-x-auto w-[2400px] h-[35rem]" >
       <StackedBarChart labels={labels} datasets={datasets}/>
       </div>
     </div>
   </div>

   </div>
}

export default InsightsByTopicSector