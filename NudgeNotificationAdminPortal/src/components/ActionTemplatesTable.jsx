import React, { useEffect, useState } from 'react'
import PageHeader from './PageHeader';
import { useNavigate } from 'react-router-dom';
import { getTemplatesBySearchCriteria } from '../services/templateService';

const ActionTemplatesTable = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const searchCriteria = {
        templateId : '',
        templateName : '',
        status : ["CUG_APPROVED", "REJECTED", "CUG_FAILED", ]
      }
      getActionTemplates(JSON.stringify(searchCriteria))
    }, [])

    const getActionTemplates = async (searchCriteria) => {
      try {
        console.log(searchCriteria)
        const response = await getTemplatesBySearchCriteria(searchCriteria);  
        setData(response.data.payload)
      } catch (error) {
        
      }
    }
    
  return (
    <div>
      <PageHeader heading={"Action Templates"}/>
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
                <button onClick={() => navigate(`/maker/actions/nudge-template-form/templateId/${val.templateId}/status/${val.status}`)} className="text-blue-500 hover:underline">Edit</button>
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
  )
}

export default ActionTemplatesTable