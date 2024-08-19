import React from "react";
import hdfc_logo from "/icons/hdfc_logo.png";

const Navbar = ({userDetails}) => {
    return (
        <div className="bg-blue-600 flex justify-between space-x-1">
            <div className="m-1 p-1 pb-1 mb-[0.4rem] flex items-center bg-blue-600 space-x-3">
                <img
                    src={hdfc_logo}
                    className="h-10 w-9 pt-1 bg-blue-600"
                    alt=""
                />
            

            <p className="text-base font-bold text-[1.2rem] text-white">
                Nudge Notification Admin Portal
            </p>
            </div>

            <div className="flex items-center space-x-4 px-4">
            <p className="text-white font-semibold">Welcome, {userDetails.name}</p>

            <button className="hover:cursor-pointer">Logout</button>
            </div>

            
        </div>
    );
};

export default Navbar;
