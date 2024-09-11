import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import filter from "/icons/filter.png"

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

  const [pendingRequestData, setPendingRequestData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false, // Select All
    checkbox2: false, // pending_approval_prod
    checkbox3: false, // pending_approval_cug
    checkbox4: false, // cug_approved
    checkbox5: false, // prod_approved
    checkbox6: false, // cug_rejected
    checkbox7: false // prod_rejected
  });


  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };

  const handleFetchData = async () => {
    setShowFilter(false)
    console.log(checkboxes)
    // if((checkboxes.checkbox2 && checkboxes.checkbox3) || (!checkboxes.checkbox2 && !checkboxes.checkbox3)){
    //   setPendingRequestData(getAllPendingNudgeTemplatesForApproval())
    // }else if(checkboxes.checkbox2){
    //   setPendingRequestData(getAllProdPendingNudgeTemplatesForApproval());
    // }else{
    //   setPendingRequestData(getAllCugPendingNudgeTemplatesForApproval())
    // }
  };


  // useEffect(() => {
  //   sessionStorage.getItem("user") === null && navigate("/login")
  // }, [])

  return (
    <div>
      <PageHeader heading={"Search Nudge Template"}/>
      <SearchBar/>
      <table className="shadow-lg bg-white mx-auto mt-5 ">
        <tr>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Updated on</th>
          <th className="bg-blue-100 border text-left px-3 py-2">Approved By</th>
          <th className="bg-blue-100 border text-left px-3 py-2">
          <div className='flex justify-between items-center'>
                <div>Status</div>
                <div className='h-5 w-5'>
                  <img onClick={() => showFilter ? setShowFilter(false) : setShowFilter(true)} src={filter} alt="" />
                </div>
                {showFilter &&
                  <div className='w-[11.5] p-2 border absolute bottom-[13.7rem]  bg-white shadow-md rounded-sm'>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox2} type="checkbox" id="checkbox2" className="h-[0.60rem] w-[0.60rem]" name="pendingPROD" value="pending_approval_prod" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingPROD"> pending_approval_prod</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox3} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> pending_approval_cug</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox4} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> cug_approved</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox5} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> prod_approved</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox6} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> cug_rejected</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox7} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> prod_rejected</label>
                    </div>
                    <div className='flex justify-end pt-2' >
                    <button  onClick={handleFetchData} className='text-xs font-medium px-2 p-1 rounded-sm text-white bg-green-700 hover:bg-green-600'>Filter</button>
                    </div>
                  </div>
                  }
              </div>
          </th>
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
