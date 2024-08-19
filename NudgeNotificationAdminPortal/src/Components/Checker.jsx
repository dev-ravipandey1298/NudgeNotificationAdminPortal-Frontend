import React, { useState } from "react";
import pendingApproval from "/icons/pending_approval.png";
import showAll from "/icons/showAll.png";
import TemplateForm from "./TemplateForm";
import ShowAllCheckerTable from "./ShowAllCheckerTable";
import PendingRequestTable from "./PendingRequestTable";

const Checker = ({ userDetails }) => {
  const count = 1;
  const title = "CHECKER";
  const description = "This is a Checker";

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
        <div className="flex justify-center items-center h-[90vh] space-x-10">
          <div
            onClick={handlePendingRequests}
            className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl"
          >
            {count > 0 && (
              <span class="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
                <span className="text-white font-semibold text-lg">
                  {count}
                </span>
              </span>
            )}
            <span className="text-xl font-bold text-cyan-700">
              Pending requests
            </span>
            <img src={pendingApproval} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Show All{" "}
            </button>
          </div>
          <div
            onClick={handleShowAllRequests}
            className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl"
          >
            <span className="text-xl font-bold text-cyan-700">
              Show All Requests
            </span>
            <img src={showAll} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Show All{" "}
            </button>
          </div>
        </div>
      )}

      <div className="">
        {showPendingRequests && <PendingRequestTable userDetails={userDetails}/>}
      </div>
      {/* {showPendingRequests && <TemplateForm userDetails={userDetails}/>} */}
      {showAllRequests && (
        <div className="px-5 py-5 pt-14 flex justify-center">
          <ShowAllCheckerTable />
        </div>
      )}
    </>
  );
};

export default Checker;
