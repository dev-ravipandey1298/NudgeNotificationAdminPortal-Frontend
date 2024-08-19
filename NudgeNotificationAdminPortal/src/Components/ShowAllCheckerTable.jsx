import React from "react";

const ShowAllMakerTable = () => {
  const data = [
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
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_2",
      approvedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "approved"
    },
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
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestedOn: new Date().toLocaleString(),
      requestedBy:"user_maker_3",
      approvedOn: "",
      approvedBy: "",
      status: "pending_approval"
    },
    
  ];
  return (
    <div>
      <table className="shadow-lg bg-white">
        <tr>
          <th className="bg-blue-100 border text-left px-8 py-4">
            Template Id
          </th>
          <th className="bg-blue-100 border text-left px-8 py-4">Created on</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Requested On</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Requested By</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Approved On</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Approved By</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Status</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-8 py-4">{val.templateId}</td>
              <td className="border px-8 py-4">{val.createdOn}</td>
              <td className="border px-8 py-4">{val.requestedOn}</td>
              <td className="border px-8 py-4">{val.requestedBy}</td>
              <td className="border px-8 py-4">{val.approvedOn}</td>
              <td className="border px-8 py-4">{val.approvedBy}</td>
              <td className="border px-8 py-4">{val.status}</td>
              <td className="border px-8 py-4 space-x-1">
                <button className="text-blue-500 hover:underline">View</button>
                <span>|</span>
                <button className="text-blue-500 hover:underline">Edit</button>
                <span>|</span>
                <button className="text-blue-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ShowAllMakerTable;
