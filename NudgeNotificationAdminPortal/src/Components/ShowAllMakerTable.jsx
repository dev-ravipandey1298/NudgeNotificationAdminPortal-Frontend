import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const ShowAllMakerTable = ({ setShowAllRequest }) => {
  const data = [
    {
      templateId: "10234599",
      templateName: "Salary Credit",
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234599",
      templateName: "Salary Credit",
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
      approvedBy: "user1_checker",
      status: "approved"
    },
    {
      templateId: "10234599",
      templateName: "Salary Credit",
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234599",
      templateName: "Salary Credit",
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
      approvedBy: "",
      status: "pending_approval"
    },

  ];


  // useEffect(() => {
  //   sessionStorage.getItem("user") === null && navigate("/login")
  // }, [])

  return (
    <div>
      <PageHeader heading={"Search Nudge Template"}/>
      <table className="shadow-lg bg-white mx-auto mt-5 ">
        <tr>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Updated on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Approved By</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Status</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-3 py-2">{val.templateId}</td>
              {/* <td className="border px-8 py-4">{val.createdOn}</td> */}
              <td className="border px-3 py-2">{val.templateName}</td>
              {/* <td className="border px-8 py-4">{val.requestSentOn}</td> */}
              <td className="border px-3 py-2">{val.createdOn}</td>
              <td className="border px-3 py-2">{val.updatedOn}</td>
              <td className="border px-3 py-2">{val.approvedBy}</td>
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

export default ShowAllMakerTable;
