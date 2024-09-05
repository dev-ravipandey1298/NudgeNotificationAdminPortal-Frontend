import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const ShowAllMakerTable = ({ setShowAllRequest }) => {
  const data = [
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestSentOn: new Date().toLocaleString(),
      approversComment: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestSentOn: new Date().toLocaleString(),
      approversComment: `Verified`,
      approvedBy: "user1_checker",
      status: "approved"
    },
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestSentOn: new Date().toLocaleString(),
      approversComment: "",
      approvedBy: "",
      status: "pending_approval"
    },
    {
      templateId: "10234599",
      createdOn: new Date().toLocaleString(),
      requestSentOn: new Date().toLocaleString(),
      approversComment: "",
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
      <table className="shadow-lg bg-white mx-auto mt-5 w-[95%]">
        <tr>
          <th className="bg-blue-100 border text-left px-8 py-4">
            Template Id
          </th>
          <th className="bg-blue-100 border text-left px-8 py-4">Created on</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Request Sent On</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Approver's Comment</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Approved By</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Status</th>
          <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="border px-8 py-4">{val.templateId}</td>
              {/* <td className="border px-8 py-4">{val.createdOn}</td> */}
              <td className="border px-8 py-4">
                <span className="flex flex-col items-center">
                  <p>{val.createdOn.substring(0, val.createdOn.indexOf(",") + 1)}</p>
                  <p>{val.createdOn.substring(val.createdOn.indexOf(",") + 1)}</p>
                </span>
              </td>
              {/* <td className="border px-8 py-4">{val.requestSentOn}</td> */}
              <td className="border px-8 py-4">
                <span className="flex flex-col items-center">
                  <p>{val.requestSentOn.substring(0, val.requestSentOn.indexOf(",") + 1)}</p>
                  <p>{val.requestSentOn.substring(val.requestSentOn.indexOf(",") + 1)}</p>
                </span>
              </td>

              <td className="border px-8 py-4">{val.approversComment}</td>
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
