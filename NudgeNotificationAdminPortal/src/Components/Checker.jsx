import React, { useState } from "react";
import pendingApproval from "/icons/pending_approval.png";
import showAll from "/icons/showAll.png";
import TemplateForm from "./TemplateForm";
import ShowAllCheckerTable from "./ShowAllCheckerTable";
import PendingRequestTable from "./PendingRequestTable";
import { Link, useNavigate } from "react-router-dom";

const Checker = ({ userDetails }) => {
  const count = 1;

  const navigate = useNavigate();

  

  

  // const [showPendingRequests, setshowPendingRequests] = useState(false);
  // const [showAllRequests, setShowAllRequests] = useState(false);

  const handlePendingRequests = () => {
    navigate("/checker/pendingRequests")
    // setShowAllRequests(false);
    // setshowPendingRequests(true);
  };

  const handleShowAllRequests = () => {
    navigate("/checker/showAll")
    // setshowPendingRequests(false);
    // setShowAllRequests(true);
  };

  return (
    <>
      {/* {!(showPendingRequests || showAllRequests) && ( */}
        <div className="flex justify-center items-center h-[80vh] space-x-10">
          <button
            onClick={handlePendingRequests}
            className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            
              <span className="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
                <span className="text-white font-semibold text-lg">
                  {count}
                </span>
              </span>
            
            <span className="text-xl font-bold text-cyan-700">
              Pending requests
            </span>
            <img src={pendingApproval} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </button>
          <div
            onClick={handleShowAllRequests}
            className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            <span className="text-xl font-bold text-cyan-700">
              Show All Requests
            </span>
            <img src={showAll} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </div>
        </div>
      {/* )} */}

      {/* {showPendingRequests && <div className="px-5 py-5 pt-14 flex justify-center">
        <PendingRequestTable userDetails={userDetails} pendingRequestData={pendingRequestData} setshowPendingRequests={setshowPendingRequests} />
      </div>} */}
      {/* {showPendingRequests && <TemplateForm userDetails={userDetails}/>} */}
      {/* {showAllRequests && (
        <div className="px-5 py-5 pt-14 flex justify-center">
          <ShowAllCheckerTable showAllRequestData={showAllRequestData} setShowAllRequests={setShowAllRequests} />
        </div>
      )} */}
    </>
  );
};

export default Checker;
