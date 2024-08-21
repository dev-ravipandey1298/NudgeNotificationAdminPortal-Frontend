import React, { useState } from 'react'
import TemplateForm from './TemplateForm';

const PendingRequestTable = ({ userDetails, pendingRequestData }) => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);

  // const pendingRequestData = [
  //     {
  //       templateId: "10234599",
  //       requestedOn: new Date().toLocaleString(),
  //       requestedBy:"user_maker_1",
  //       status: "pending_approval"
  //     },
  //     {
  //       templateId: "10234599",
  //       requestedOn: new Date().toLocaleString(),
  //       requestedBy:"user_maker_2",
  //       status: "pending_approval"
  //     },
  //     {
  //       templateId: "10234599",
  //       requestedOn: new Date().toLocaleString(),
  //       requestedBy:"user_maker_2",
  //       status: "pending_approval"
  //     },
  //     {
  //       templateId: "10234599",
  //       requestedOn: new Date().toLocaleString(),
  //       requestedBy:"user_maker_2",
  //       status: "pending_approval"
  //     },   
  //   ];

  const handleView = () => {
    setShowTemplateForm(true);
  }

  return (
    <>
      {!showTemplateForm ? <div className='px-5 py-5 pt-14 flex justify-center'>
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
      </div>
        :
        <TemplateForm userDetails={userDetails} />}
    </>
  );
}

export default PendingRequestTable
