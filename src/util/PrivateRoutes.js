import { useContext } from "react";
import {Navigate, Outlet } from "react-router-dom";
import AuthContext from "../auth/authContext";


const PrivateRoutes = () => {
    
    let {authTokens} = useContext(AuthContext);
    console.log("private route user", authTokens)
    return (authTokens ? <Outlet/> : <Navigate to='/login/'/>)
}

export default PrivateRoutes