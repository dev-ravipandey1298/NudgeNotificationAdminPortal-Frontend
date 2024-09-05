import React from "react";
import hdfc_logo from "/icons/hdfc_logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login")
    }
    
    return (
        <div className="bg-blue-600 flex justify-between space-x-1">
            <div className="m-1 p-1 pb-1 mb-[0.4rem] flex items-center bg-blue-600 space-x-3">
                <img
                    src={hdfc_logo}
                    className="h-[1.85rem] w-7 pt-1 bg-blue-600"
                    alt=""
                />
            

            <p className="text-base font-bold text-[1.2rem] text-white">
                Nudge Notification Admin Portal
            </p>
            </div>

            {sessionStorage.getItem("user") !== null && <div className="flex items-center space-x-4 px-4">
            <p className="text-white font-medium">Welcome, {JSON.parse(sessionStorage.getItem("user")).name}</p>

            <button onClick={handleLogout} className="hover:cursor-pointer  hover:underline text-red-100 hover:text-red-300 font-medium ">Logout</button>
            </div>}

            
        </div>
    );
};

export default Navbar;
