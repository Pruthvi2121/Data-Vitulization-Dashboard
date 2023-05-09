import React, { useEffect, useState } from "react";
import LineChart from "./Charts/LineChart";
import axios from "axios";

const Likelihood= ()=>{
    const [labels, setLabels] = useState([])
    const [Data, setData] = useState([])
    
   
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/likelihood_by_yearview/")
      .then((res) => {
        console.log(res.data);
        setLabels(res.data.labels)
        setData(res.data.data)
     
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

    return <div className=" border h-96 mt-4 rounded-lg border-[#454154]  w-full">
                <h1 className="text-white font-semibold text-2xl pt-4 px-4">Likelihood.</h1>
                <p className="px-4 text-[#fafafa83]">Line chart showing the sum of likelihood by year</p>
            <div className="px-4 h-72" >
                     <LineChart Data={Data} labels={labels}/>
            </div>
    </div>
}

export default Likelihood