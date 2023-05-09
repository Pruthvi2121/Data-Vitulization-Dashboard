import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

const Login =()=>{
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const auth = useAuth()
    const navigate = useNavigate()
    const [error, setError]=useState("")

    const submitHandler = async e=>{
        e.preventDefault()
        
        const data = {
            "email":email,
            "password":password
          }

        await axios.post("http://127.0.0.1:8000/auth/login/",data ,{withCredentials:true})
        .then(
            (res)=>{
                console.log(res)
                if(res.data.tokens){
                    localStorage.setItem("user",JSON.stringify(res.data.tokens))
                    const d =localStorage.getItem("user")
                    console.log("access ---",JSON.parse(d).access)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(d).access}`
                    // navigate("/dashboard")
                    auth.profile()
                   
                    
                }
                
                
    
            }
        )
        .catch(
            (error)=>{
                console.log("error",error)
                console.log(error.response.data.error)
                setError(error.response.data.error.email)
            }
        )


        
    }
    return(
        
        <div className="flex flex-col items-center h-screen mx-auto justify-center  ">
            <div className="bg-[#76477889] border bg-opacity-0 rounded-xl shadow-md px-24 py-20">
                
                <h1 className="text-4xl font-bold ">Login.</h1>
                <form onSubmit={submitHandler}>
                    <div className="mt-5">
                        <label className="font-bold mr-14 text-slate-50">Email</label>
                        <input className="rounded px-3 focus:outline-none" type="Email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email" />
                        
                    </div>
                    <div>{error}</div>
                    <div className="mt-5">
                        <label  className="font-bold mr-6 text-slate-50" >Password</label>
                        <input className="rounded px-3 focus:outline-none" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" />
                    </div>
                    
                    <div className="flex justify-center">
                    <button className="w-[300px] mt-5 text-white font-semibold bg-[#000300] py-3 rounded-md hover:bg-[#202020]">
                        Login
                        </button>
                        
                    
                    </div>
                </form>
   
                <div className="flex justify-between pt-2 ">
                    <p className="text-[#202020] font-semibold ">Don't have an account</p>
                    <p onClick={()=>{navigate('/register')}} className=" font-semibold cursor-pointer hover:text-[#202020]">register</p>
                 </div>


                 <div className="mt-4 text-[#3971c5dd] mb-[-20px] text-xl">
                    <h1>Email -  admin@super.com</h1>
                    <h1>Password -  admin</h1>

                 </div>
               
            </div>
        </div>
    )
}

export default Login