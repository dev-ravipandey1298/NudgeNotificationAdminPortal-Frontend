import React, { useState } from "react";
import pendingApproval from "/icons/pending_approval.png";
import showAll from "/icons/showAll.png";
import TemplateForm from "./TemplateForm";
import ShowAllCheckerTable from "./ShowAllCheckerTable";
import PendingRequestTable from "./PendingRequestTable";

const Checker = ({ userDetails }) => {
  const count = 1;
  
  const pendingRequestData = [
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234600",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_2",
      approvedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "pending_approval"
    },
    {
      templateId: "10234601",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234602",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_3",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    
  ];

  const showAllRequestData = [
    {
      templateId: "10234603",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "approved"
    },
    {
      templateId: "10234598",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_2",
      approvedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "approved"
    },
    {
      templateId: "10234604",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "approved"
    },
    {
      templateId: "10234596",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_3",
      approvedOn: "",
      approvedBy: "",
      status: "approved"
    },

  ];

  const [showPendingRequests, setshowPendingRequests] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);

  const handlePendingRequests = () => {
    setShowAllRequests(false);
    setshowPendingRequests(true);
  };

  const handleShowAllRequests = () => {
    setshowPendingRequests(false);
    setShowAllRequests(true);
  };

  return (
    <>
      {!(showPendingRequests || showAllRequests) && (
        <div className="flex justify-center items-center h-[80vh] space-x-10">
          <div
            onClick={handlePendingRequests}
            className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            {pendingRequestData.length > 0 && (
              <span className="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
                <span className="text-white font-semibold text-lg">
                  {pendingRequestData.length}
                </span>
              </span>
            )}
            <span className="text-xl font-bold text-cyan-700">
              Pending requests
            </span>
            <img src={pendingApproval} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </div>
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
      )}

      <div className="">
        {showPendingRequests && <PendingRequestTable userDetails={userDetails} pendingRequestData={pendingRequestData}/>}
      </div>
      {/* {showPendingRequests && <TemplateForm userDetails={userDetails}/>} */}
      {showAllRequests && (
        <div className="px-5 py-5 pt-14 flex justify-center">
          <ShowAllCheckerTable showAllRequestData={showAllRequestData} />
        </div>
      )}
    </>
  );
};

export default Checker;
