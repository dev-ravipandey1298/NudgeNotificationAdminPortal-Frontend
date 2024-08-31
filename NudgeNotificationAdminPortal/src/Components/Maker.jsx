import React, { useState } from "react";
import pendingApproval from "/icons/pending_approval.png";
import showAll from "/icons/showAll.png";
import draft from "/icons/draft.png";
import template from "/icons/template.png";
import TemplateForm from "./TemplateForm";
import DraftTable from "./DraftTable";
import ShowAllMakerTable from "./ShowAllMakerTable";
import { useNavigate } from "react-router-dom";

const Maker = ({ userDetails }) => {
  const count = 3;
  const navigate = useNavigate();
 
  const [showTemplate, setShowTemplate] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [showAllRequest, setShowAllRequest] = useState(false);

  const handleCreateTemplate = () => {
    setShowDraft(false);
    setShowAllRequest(false);
    setShowTemplate(true);
  };

  const handleDraft = () => {
    setShowTemplate(false);
    setShowAllRequest(false);
    setShowDraft(true);
  };

  const handleShowAllRequest = () => {
    setShowDraft(false);
    setShowTemplate(false);
    setShowAllRequest(true);
  };

  return (
    <>
      {!(showTemplate || showDraft || showAllRequest) && (
        <div className="flex justify-center items-center h-[90vh] space-x-10">
          <div
            onClick={handleCreateTemplate}
            className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            <span className="text-xl font-bold text-cyan-700">
              Create Nudge Template
            </span>
            <img src={template} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </div>
          <div
            onClick={handleDraft}
            className="relative h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            {count > 0 && (
              <span className="absolute -top-5 -right-5 h-12 w-12 rounded-full bg-red-400 flex justify-center items-center items">
                <span className="text-white font-semibold text-lg">
                  {count}
                </span>
              </span>
            )}
            <span className="text-xl font-bold text-cyan-700">Draft</span>
            <img src={draft} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </div>
          <div
            onClick={handleShowAllRequest}
            className="h-60 w-72 rounded-lg p-4 flex flex-col items-center space-y-4 border shadow-lg transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:cursor-pointer"
          >
            <span className="text-xl font-bold text-cyan-700 hover:cursor-pointer">
              Search Requests
            </span>
            <img src={showAll} alt="" />
            <button className="text-blue-600 text-sm font-medium">
              Click Here!{" "}
            </button>
          </div>
        </div>
      )}

      {showTemplate && <TemplateForm userDetails={userDetails} setShowTemplate={setShowTemplate}/>}
      {showDraft && (
        <div className="py-5 pt-14 flex justify-center">
          <DraftTable setShowDraft={setShowDraft}/>
        </div>
      )}
      {showAllRequest &&
        <div className="py-5 pt-14 flex justify-center">
          <ShowAllMakerTable setShowAllRequest={setShowAllRequest}/>
        </div>
      }
    </>
  );
};

export default Maker;
