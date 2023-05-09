import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";
export const RequireAuth=({children})=>{
    const auth = useAuth()
    const location = useLocation()
    if(!localStorage.getItem('profile')){
        return <Navigate to="/" state={{path: location.pathname}} />
    }

    return children
}
