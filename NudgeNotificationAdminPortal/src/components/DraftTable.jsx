import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import { deleteTemplate, getAllTemplates } from "../services/templateService";
import { NAVIGATE_PATH } from "../constants/routeConstant";

const DraftTable = ({ setShowDraft }) => {

  const [draftData, setDraftData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllDraftData()
  }, [])

  const getAllDraftData = async () => {
    try {
      const response = await getAllTemplates();
      if (response.status == 200) {
        setDraftData(response.data.payload)
      }
    } catch (error) {

    }
  }

  const deleteDraftData = async (templateId) => {
    try {
      const response = await deleteTemplate(templateId);
      if (response.status == 200) {
        getAllDraftData()
      }
    } catch (error) {

    }
  }

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.MAKER)
  }


  return (
    <div>
      <PageHeader handleClickBack={handleClickBack} heading={"Drafts"} />
      <table className="shadow-lg bg-white mx-auto mt-5">
        <tr>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">UpdatedOn</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
        </tr>
        {draftData.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-3 py-2">{val.templateId}</td>
              <td className="border px-3 py-2">{val.templateName}</td>
              <td className="border px-3 py-2">{val.createdOn}</td>
              <td className="border px-3 py-2">{val.updatedOn}</td>
              <td className="border px-3 py-2 space-x-1">
                <button onClick={() => navigate(`${NAVIGATE_PATH.MAKER_DRAFT_TEMPLATE +  val.templateId}`)} className="text-blue-500 hover:underline">Edit</button>
                <span>|</span>
                <button onClick={() => deleteDraftData(val.templateId)} className="text-blue-500 hover:underline">Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default DraftTable;
