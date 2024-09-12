import React from 'react'
import SearchBar from './SearchBar';

const SearchTableForMackerChecker = () => {
  
    useEffect(() => {
        sessionStorage.getItem("user") === null && navigate("/login")
      }, [])
    
      const showAllRequestData = [
        {
          templateId: "10234603",
          createdOn: new Date().toLocaleString(),
          requestedOn: new Date().toLocaleString(),
          requestedBy: "user_maker_1",
          approvedOn: "",
          approvedBy: "",
          status: "approved"
        },
        {
          templateId: "10234598",
          createdOn: new Date().toLocaleString(),
          requestedOn: new Date().toLocaleString(),
          requestedBy: "user_maker_2",
          approvedOn: new Date().toLocaleString(),
          approvedBy: "user1_checker",
          status: "approved"
        },
        {
          templateId: "10234604",
          createdOn: new Date().toLocaleString(),
          requestedOn: new Date().toLocaleString(),
          requestedBy: "user_maker_1",
          approvedOn: "",
          approvedBy: "",
          status: "approved"
        },
        {
          templateId: "10234596",
          createdOn: new Date().toLocaleString(),
          requestedOn: new Date().toLocaleString(),
          requestedBy: "user_maker_3",
          approvedOn: "",
          approvedBy: "",
          status: "approved"
        },
    
      ];
      
      return (
        <div>
          <PageHeader heading={"Search Requests"}/>
          <SearchBar/>
          <table className="shadow-lg mx-auto">
            <thead>
              <tr key={crypto.randomUUID()}>
                <th className="bg-blue-100 border text-left px-3 py-2">
                  Template Id
                </th>
                <th className="bg-blue-100 border text-left px-3 py-2">Created on</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested On</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Requested By</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Approved By</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Status</th>
                <th className="bg-blue-100 border text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            {showAllRequestData.map((val, key) => {
              return (
                <tbody>
                  <tr key={key}>
                    <td className="border px-3 py-2">{val.templateId}</td>
                    <td className="border px-3 py-2">{val.createdOn}</td>
                    <td className="border px-3 py-2">{val.requestedOn}</td>
                    <td className="border px-3 py-2">{val.requestedBy}</td>
                    <td className="border px-3 py-2">{val.approvedBy}</td>
                    <td className="border px-3 py-2">{val.status}</td>
                    <td className="border px-3 py-2 space-x-1">
                      <button className="text-blue-500 hover:underline">View</button>
                      <span>|</span>
                      <button className="text-blue-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
}

export default SearchTableForMackerChecker