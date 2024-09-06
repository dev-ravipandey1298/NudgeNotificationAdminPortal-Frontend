import React, { useEffect, useState } from 'react'
import TemplateForm from './TemplateForm';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();

  const pendingRequestData = [
    {
      templateId: "10234599",
      templateName: "Salary Notification",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234600",
      templateName: "Salary Notification",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_2",
      approvedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "pending_approval"
    },
    {
      templateId: "10234601",
      templateName: "Salary Notification",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234602",
      templateName: "Salary Notification",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_3",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },

  ];

  const handleView = () => {
    // setShowTemplateForm(true);
    navigate("/checker/show/nudge-template-form")
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate("/login")
  }, [])

  return (
        <>
        <PageHeader heading={"Pending Requests"}/>
          <table className="shadow-lg bg-white  mx-auto mt-5">
            <thead>
              <tr>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">
                  Template Id
                </th>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">
                  Template Name
                </th>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">Requested On</th>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">Requested By</th>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">Status</th>
                <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            {pendingRequestData.map((val, key) => {
              return (
                <tbody>
                  <tr key={key}>
                    <td className="border px-3 py-2">{val.templateId}</td>
                    <td className="border px-3 py-2">{val.templateName}</td>
                    <td className="border px-3 py-2">{val.requestedOn}</td>
                    <td className="border px-3 py-2">{val.requestedBy}</td>
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
