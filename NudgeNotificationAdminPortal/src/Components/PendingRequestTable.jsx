import React, { useEffect, useState } from 'react'
import TemplateForm from './TemplateForm';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);

  const pendingRequestData = [
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234600",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_2",
      approvedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "pending_approval"
    },
    {
      templateId: "10234601",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_1",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234602",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy: "user_maker_3",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },

  ];

  const handleView = () => {
    setShowTemplateForm(true);
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate("/login")
  }, [])

  return (
    <div>
      {!showTemplateForm ? 
      <>
    <div  className="text-blue-500 underline p-2 hover:cursor-pointer">
        Back
      </div>
      
        <table className="shadow-lg bg-white">
          <thead>
            <tr>
              <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-8 py-4">
                Template Id
              </th>
              <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-8 py-4">Requested On</th>
              <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-8 py-4">Requested By</th>
              <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-8 py-4">Status</th>
              <th key={crypto.randomUUID()} className="bg-blue-100 border text-left px-8 py-4">Action</th>
            </tr>
          </thead>
          {pendingRequestData.map((val, key) => {
            return (
              <tbody>
                <tr key={key}>
                  <td className="border px-8 py-4">{val.templateId}</td>
                  <td className="border px-8 py-4">{val.requestedOn}</td>
                  <td className="border px-8 py-4">{val.requestedBy}</td>
                  <td className="border px-8 py-4">{val.status}</td>
                  <td className="border px-8 py-4 space-x-1">
                    <button onClick={handleView} className="text-blue-500 hover:underline">View</button>
                    {/* <span>|</span> */}
                    {/* <button className="text-blue-500 hover:underline">Edit</button>
                    <span>|</span>
                    <button className="text-blue-500 hover:underline">
                      Delete
                    </button> */}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        </>
        :
        <TemplateForm />}
    </div>
  );
}

export default PendingRequestTable
