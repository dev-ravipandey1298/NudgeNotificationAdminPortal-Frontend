import React, { useEffect, useState } from 'react'
import TemplateForm from './TemplateForm';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import { getAllPendingNudgeTemplatesForApproval } from '../Services/nudgeTemplateService';
import filter from '/icons/filter.png'
import FilterSelector from './FilterSelector';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();

  const[pendingRequestData, setPendingRequestData] = useState([]);
  const[showFilter, setShowFilter] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (value, checked) => {
    setSelectedValues(prevValues => {
      if (checked) {
        return [...prevValues, value];
      } else {
        return prevValues.filter(v => v !== value);
      }
    });
    console.log("Handle Checkbox");
    console.log(selectedValues);
  };
  

  const handleView = (templateId) => {
    // setShowTemplateForm(true);
    navigate(`/checker/show/nudge-template-form/template/${templateId}`)
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate("/login")
    setPendingRequestData(getAllPendingNudgeTemplatesForApproval())
    console.log(selectedValues)
  }, [])

  return (
        <>
        <PageHeader heading={"Pending Requests"}/>
          <table className="shadow-lg bg-white  mx-auto mt-5 ">
            <thead>
              <tr>
                <th className="bg-blue-100 border text-left px-3 py-2">Template Id</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Template Name</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested On</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested By</th>
                <th className="bg-blue-100 border text-left px-3 py-2">
                  <div className='flex justify-between items-center'>
                    <div>Status</div>
                     <div className='h-5 w-5'>
                     <img onClick={() => showFilter ? setShowFilter(false) : setShowFilter(true)} src={filter} alt="" />
                    </div>
                    {!showFilter && <FilterSelector selectedValues={selectedValues} onCheckboxChange={handleCheckboxChange}/>}
                  </div>
                </th>
                <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            {pendingRequestData.map((val, key) => {
              return (
                <tbody className=''>
                  <tr key={val.templateId}>
                    <td className="border px-3 py-2">{val.templateId}</td>
                    <td className="border px-3 py-2">{val.templateName}</td>
                    <td className="border px-3 py-2">{val.requestedOn}</td>
                    <td className="border px-3 py-2">{val.createdBy}</td>
                    <td className="border px-3 py-2">{val.status}</td>
                    <td className="border px-3 py-2 space-x-1">
                      <button onClick={() => navigate(`/checker/show/nudge-template-form/templateId/${val.templateId}`)} className="text-blue-500 hover:underline">Approve/Reject</button>
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
