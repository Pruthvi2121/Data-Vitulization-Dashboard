import React, { useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import DonutChart from "./Charts/DonutChart";

const CountryView= ()=>{
   
    const [labels, setLabels] = useState([])
    const [Data, setData] = useState([])
    
   
    
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/countryview/")
      .then((res) => {
        console.log(res.data);
        console.log("labels", res.data.labels);
        console.log("datasets", res.data.data);
        setLabels(res.data.labels)
        setData(res.data.data)
     
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

    return <div className=" border h-full mt-4 rounded-lg border-[#454154]  w-full">
                <h1 className="text-white font-semibold text-2xl pt-4 px-4">Country.</h1>
                <p className="px-4 text-[#fafafa83]">Pie chart showing the count of insights by country</p>
            <div className=" h-80 w-full my-2 sm:overflow-y-auto pr-32" >
            <DonutChart labels={labels} chartdata={Data}/>
            </div>
            
    </div>
}

export default CountryView