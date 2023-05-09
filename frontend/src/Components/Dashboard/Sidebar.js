import React, { useEffect } from "react";
import { useState } from "react";
import {BsArrowRightSquareFill} from 'react-icons/bs'
import {AiOutlineLogout} from 'react-icons/ai'
import {RiSettings5Fill} from 'react-icons/ri'
import {FaCube} from 'react-icons/fa'

import { Sidebardata } from "./Sidebardata";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Auth";

const Sidebar =({children})=>{
    const navigate = useNavigate()
    const  auth = useAuth()
    const [open, Setopen] =useState(false)
    const [name, setName] =useState("")


    return(
        
        <>
        
        <div className="  bg-[#0E1525]  py-6 w-auto flex ">
        
        <h1 className={` w-full text-3xl font-bold text-[#519edd] absolute  pl-6 top-4 `}> BLACK<span className="text-white">COPPER.</span>    </h1>
        
        
          
            <div className="ml-auto">
                {
                localStorage.getItem("profile")? <h1 className="text-white text-right mr-4 uppercase flex-auto ">👋 hello {localStorage.getItem("profile")} </h1>
                : ""
                }
            </div>
        







          
        </div>
        
        <div className="flex ">

        
                <div  >
                    
                    <div className={`bg-[#0E1525] shadow-sm  ${open? "w-60":"w-20 "} py-20 mt-[-72px] h-screen duration-300 `}>
                        {/* <h1 className={` w-full text-3xl font-bold text-[#4cc69f] absolute pt-2 pl-6 ${open? " ":"hidden"}`}>FINANCE. </h1> */}
                        < BsArrowRightSquareFill onClick={()=>{Setopen(!open)}} size={"2rem"} className={`text-slate-500 rounded-full cursor-pointer hover:text-[#b04f85] float-right mt-3 mr-6 ${open? "rotate-180 ":""}`}/>  
                        
                        

                    
                        <ul className={`text-white   px-2 ${open?"pt-2 duration-300":"pt-16 duration-300"}`}>
                        
                        
                        {Sidebardata.map((data, index)=>
                        <li key={index} className={`mt-1 pl-6 py-1 px-2 flex hover:bg-[#3455] hover:text-[#4cc69f] rounded-lg cursor-pointer ${open?"":"pt-[8px]  hover:bg-[#0E1525]"}`} onClick={()=>{navigate(data.path)}} >
                            
                                <span className="mt-1 " >
                            {data.icon}
                                </span>
                                <span className={` pl-6 font-extralight text-[17px] ${open?"":"hidden "}`} >{data.title}</span>
                            </li>
                        )}
                        
                        
                        <li className={`bottom-[60px]  absolute pl-6 py-1 px-2 flex hover:bg-[#3455] rounded-lg cursor-pointer hover:text-[#4cc69f] ${open?"":"pt-[8px]  hover:bg-[#0E1525]"}`}>
                            
                                <span className="mt-1 " >
                                < RiSettings5Fill size={"20px"}  />
                                </span>
                                <span className={` pl-6 font-extralight  text-[18px] ${open?"":"hidden "}`}>Setting's</span>
                            </li>
                            
                        <li className={` bottom-3  absolute pl-6 py-1 px-2 flex hover:bg-[#3455] hover:text-[#4cc69f] rounded-lg cursor-pointer ${open?"":"pt-[8px]  hover:bg-[#0E1525]"}`}  onClick={()=>{auth.logout()}} >
                            
                                <span className="mt-1 " >
                                <AiOutlineLogout size={"20px"}  />
                                </span>
                                <span  title="Logout"className={` pl-6 font-extralight text-[18px] ${open?"":"hidden "}`} >Logout</span>
                            </li>
                        
                
                            
                        </ul>

                        
                    </div>
                    


                    
                </div>

            <div className="px-7 py-7 flex-auto sm:flex-1 overflow-auto h-[86vh] scrollbar-hide " >
                 
                    {children}
                    
            </div>

        </div>
        </>
        
    )
}

export default Sidebar