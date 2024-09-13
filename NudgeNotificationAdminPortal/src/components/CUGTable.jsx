import React, { useEffect, useState } from 'react'
import PageHeader from './PageHeader';
import { getAllSearchActionTemplate } from '../services/templateService';
import { useNavigate } from 'react-router-dom';

const CUGTable = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      getAllActionTemplate()
    }, [])

    const getAllActionTemplate = async () => {
      try {
        const response = await getAllSearchActionTemplate();
        if(response.status == 200){
          setData(response.data.payload)
        }
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

export default CUGTable