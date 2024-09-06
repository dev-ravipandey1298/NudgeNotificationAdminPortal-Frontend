import React, { useEffect } from "react";
import PageHeader from "./PageHeader";

const DraftTable = ({setShowDraft}) => {
  const data = [
    {
      templateId: "10234599",
      templateName: "Salary Credited",
      createdOn: new Date().toLocaleString(),
      status: "approved",
    },
    {
      templateId: "10234600",
      templateName: "Salary Credited",
      createdOn: new Date().toLocaleString(),
      status: "approved",
    },
    {
      templateId: "10234601",
      templateName: "Salary Credited",
      createdOn: new Date().toLocaleString(),
      status: "approved",
    },
    {
      templateId: "10234602",
      templateName: "Salary Credited",
      createdOn: new Date().toLocaleString(),
      status: "approved",
    },
  ];

  return (
    <div>
      <PageHeader heading={"Drafts"}/>
      <table className="shadow-lg bg-white mx-auto mt-5">
        <tr>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Status</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-3 py-2">{val.templateId}</td>
              <td className="border px-3 py-2">{val.templateName}</td>
              <td className="border px-3 py-2">{val.createdOn}</td>
              <td className="border px-3 py-2">{val.status}</td>
              <td className="border px-3 py-2 space-x-1">
                <button className="text-blue-500 hover:underline">Edit</button>
                <span>|</span>
                <button className="text-blue-500 hover:underline">Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default DraftTable;
