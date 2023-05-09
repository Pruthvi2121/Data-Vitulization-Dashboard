import React, { useEffect, useState } from "react";
import IntensityBarChart from "./Charts/IntensityBarChart";
import axios from "axios";

const Intensity = () => {
    const [labels, setLabels] = useState([])
    const [avg_intensity, setAvg_intensity] = useState([])
    const [total_intensity, setTotal_intensity] = useState([])
   
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data/intensity/")
      .then((res) => {
        console.log(res.data);
        setLabels(res.data.topic)
        setAvg_intensity(res.data.avg_intensity)
        setTotal_intensity(res.data.total_intensity)
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  }, []);

  return (
    <>
    <div className="text-white border rounded-lg border-[#454154] ">
       <h1 className="font-semibold text-2xl pt-4 px-4">Intensity.</h1>
       <p className="px-4 text-[#fafafa83]">Bar chart showing the average intensity by topic</p>
    
     
      <div className=" text-white w-full overflow-x-auto scrollbar-hide ">
        <div className="px-4 py-4">
         
          <div className="  overflow-x-auto w-[2400px] h-64" >
            <IntensityBarChart
            
              labels={labels}
              chartdata={[avg_intensity, total_intensity]}
            />
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default Intensity;