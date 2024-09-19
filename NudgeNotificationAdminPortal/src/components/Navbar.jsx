import React from "react";
import hdfc_logo from "/icons/hdfc_logo.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NAVIGATE_PATH } from "../constants/routeConstant";
import { userLogout } from "../services/templateService";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutBackend();
    }

    const logoutBackend = async () => {
        try {
            const response = await userLogout();
            if(response.status == 200){
                sessionStorage.clear();
                navigate(NAVIGATE_PATH.LOGIN)
            }else{
                alert("Some exception occured")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <div className="bg-blue-600 flex justify-between space-x-1">
            <div className="m-1 p-1 pb-1 mb-[0.4rem] flex items-center bg-blue-600 space-x-3">
                <img
                    src={hdfc_logo}
                    className="h-[1.85rem] w-7 pt-1 bg-blue-600"
                    alt=""
                />
            

            <p className="text-base font-bold text-[1.2rem] text-white">
                Notification Admin Portal
            </p>
            </div>

            {sessionStorage.getItem("user") !== null && <div className="flex items-center space-x-4 px-4">
            <p className="text-white font-medium">Welcome, {JSON.parse(sessionStorage.getItem("user")).name}</p>

            <button onClick={handleLogout} className="hover:cursor-pointer  hover:underline text-red-100 hover:text-red-300 font-medium ">Logout</button>
            </div>}
          
        </div>
        </>
    );
};

export default Navbar;
