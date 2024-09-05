import React, { useEffect } from "react";
import PageHeader from "./PageHeader";

const DraftTable = ({setShowDraft}) => {
  const data = [
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      updatedOn: "",
    },
    {
      templateId: "10234600",
      createdOn: new Date().toLocaleString(),
      updatedOn: "",
    },
    {
      templateId: "10234601",
      createdOn: new Date().toLocaleString(),
      updatedOn: "",
    },
    {
      templateId: "10234602",
      createdOn: new Date().toLocaleString(),
      updatedOn: "",
    },
  ];

  return (
    <div>
      <PageHeader heading={"Drafts"}/>
      <table className="shadow-lg bg-white mx-auto mt-5">
        <tr>
          <th className="bg-blue-100 border text-left px-8 py-4">
            Template Id
          </th>
          <th className="bg-blue-100 border text-left px-8 py-4">Created on</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Updated on</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-8 py-4">{val.templateId}</td>
              <td className="border px-8 py-4">{val.createdOn}</td>
              <td className="border px-8 py-4">{val.updatedOn}</td>
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

export default DraftTable;
