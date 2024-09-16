import React, { useEffect, useState } from 'react'
import TemplateForm from './TemplateForm';
import { useNavigate } from 'react-router-dom';

import { getAllCugPendingNudgeTemplatesForApproval, getAllPendingNudgeTemplatesForApproval, getAllProdPendingNudgeTemplatesForApproval } from '../services/nudgeTemplateService';
import filter from '/icons/filter.png'
import PageHeader from './PageHeader';
import {getTemplatesBySearchCriteria } from '../services/templateService';
import { NAVIGATE_PATH } from '../constants/routeConstant';

const PendingRequestTable = () => {

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();

  const [pendingRequestData, setPendingRequestData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
  });

  const getPendingRequest = async (searchCriteria) => {
    try {
     
      const response = await getTemplatesBySearchCriteria(searchCriteria);
      console.log(response.data.payload)

      setPendingRequestData(response.data.payload)
    } catch (error) {
      
    }
  }

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };

  const handleFetchData = async () => {
    setShowFilter(false)
    if((checkboxes.checkbox2 && checkboxes.checkbox3) || (!checkboxes.checkbox2 && !checkboxes.checkbox3)){
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_PROD", "APPROVAL_PENDING_CUG"]
      }
      getPendingRequest(JSON.stringify(searchCriteria))
    }else if(checkboxes.checkbox2){
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_PROD"]
      }
      getPendingRequest(JSON.stringify(searchCriteria));
    }else{
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["APPROVAL_PENDING_CUG"]
      }
      getPendingRequest(JSON.stringify(searchCriteria))
    }
  };

  const handleView = (templateId) => {
    // setShowTemplateForm(true);
    navigate(NAVIGATE_PATH.CHECKER_REVIEW_TEMPLATE + templateId)
  }

  useEffect(() => {
    sessionStorage.getItem("user") === null && navigate(NAVIGATE_PATH.LOGIN)
    const searchCriteria = {
      templateId : '',
      templateName : '',
      status : ["APPROVAL_PENDING_CUG", "APPROVAL_PENDING_PROD"]
    }
    getPendingRequest(JSON.stringify(searchCriteria));
    
  }, [])

  return (
    <>
      <PageHeader heading={"Pending Requests"} />
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
                {showFilter &&
                  <div className='w-[11.5] p-2 border absolute bottom-[23.2rem]  bg-white'>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox2} type="checkbox" id="checkbox2" className="h-[0.60rem] w-[0.60rem]" name="pendingPROD" value="pending_approval_prod" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingPROD"> pending_approval_prod</label>
                    </div>
                    <div className="">
                      <input onChange={handleCheckboxChange} checked={checkboxes.checkbox3} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                      <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> pending_approval_cug</label>
                    </div>
                    <div className='flex justify-end pt-2' >
                    <button disabled={(!checkboxes.checkbox2 && !checkboxes.checkbox3)} onClick={handleFetchData} className='text-sm font-mono hover:text-green-600 text-green-700 '>Filter</button>
                    </div>
                  </div>
                  }
              </div>
            </th>
            <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
          </tr>
        </thead>
        {pendingRequestData.map((val, key) => {
          return (
            <tbody className=''>
              <tr key={key}>
                <td className="border px-3 py-2">{val.templateId}</td>
                <td className="border px-3 py-2">{val.templateName}</td>
                <td className="border px-3 py-2">{val.createdOn}</td>
                <td className="border px-3 py-2">{val.createdBy}</td>
                <td className="border px-3 py-2">{val.status}</td>
                <td className="border px-3 py-2 space-x-1">
                  <button onClick={() => navigate(`${NAVIGATE_PATH.CHECKER_REVIEW_TEMPLATE + val.templateId}/status/${val.status}`)} className="text-blue-500 hover:underline">Approve/Reject</button>
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
 