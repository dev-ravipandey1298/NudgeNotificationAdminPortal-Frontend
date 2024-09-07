import React, { useEffect, useState } from 'react'
import TemplateForm from './TemplateForm';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import { getAllPendingNudgeTemplatesForApproval } from '../Services/nudgeTemplateService';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();

  const[pendingRequestData, setPendingRequestData] = useState([]);

  const handleView = () => {
    // setShowTemplateForm(true);
    navigate("/checker/show/nudge-template-form")
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate("/login")
    setPendingRequestData(getAllPendingNudgeTemplatesForApproval())
  }, [])

  return (
        <>
        <PageHeader heading={"Pending Requests"}/>
          <table className="shadow-lg bg-white  mx-auto mt-5">
            <thead>
              <tr>
                <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested On</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested By</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Status</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            {pendingRequestData.map((val, key) => {
              return (
                <tbody>
                  <tr key={val.templateId}>
                    <td className="border px-3 py-2">{val.templateId}</td>
                    <td className="border px-3 py-2">{val.templateName}</td>
                    <td className="border px-3 py-2">{val.requestedOn}</td>
                    <td className="border px-3 py-2">{val.createdBy}</td>
                    <td className="border px-3 py-2">{val.status}</td>
                    <td className="border px-3 py-2 space-x-1">
                      <button onClick={handleView} className="text-blue-500 hover:underline">Approve/Reject</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
  );
}

export default PendingRequestTable
