import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from './PageHeader';

const CUGManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [newUsers, setNewUsers] = useState([]); 
  const [userData, setUserData] = useState({ name: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteMode, setDeleteMode] = useState(false); 
  
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/get-users'); 
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle checkbox toggle
  const handleCheckboxChange = (name) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((userId) => userId !== name)
        : [...prevSelected, name]
    );
  };

  // Handle deletion of selected users
  const handleDeleteSelectedUsers = async () => {
    if (selectedUsers.length === 0) return;

    setLoading(true);
    try {
      // await axios.post('/api/delete-users', { userIds: selectedUsers }); 
      setUsers(users.filter((user) => !selectedUsers.includes(user.name))); 
      setSelectedUsers([]); // Reset selected users
    } catch (err) {
      setError('Failed to delete users');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding new users to the list
  const handleAddUser = () => {
    if (userData.name && userData.mobile) {
      setNewUsers([...newUsers, { name: Date.now(), ...userData }]);
      setUserData({ name: '', mobile: '' });
    }
  };

  // Handle submitting new users to backend
  const handleSubmitNewUsers = () => {
    setLoading(true);
    try {
      // await axios.post('/api/add-users', { users: newUsers }); 
      
      setUsers([...users, ...newUsers]); 
      setNewUsers([]); 
    } catch (err) {
      setError('Failed to add users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <PageHeader heading={"CUG Management Screen"}/>
    <div className="w-full max-w-6xl p-6 mx-auto bg-white">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap">
          <li className={`mr-2 cursor-pointer ${activeTab === 0 ? 'border-b-2 border-blue-500' : ''}`}>
            <button onClick={() => setActiveTab(0)} className="p-2">All CUG Users</button>
          </li>
          <li className={`mr-2 cursor-pointer ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`}>
            <button onClick={() => { setActiveTab(1); setUserData({ name: '', mobile: '' }); }} className="p-2">Add CUG Users</button>
          </li>
        </ul>
      </div>

      {/* Tab Contents */}
      {activeTab === 0 && (
        <div>
          <h2 className="text-lg font-bold">CUG Users List</h2>

          {/* Toggle Delete Mode Switch */}
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <span className="mr-2 text-sm font-medium">Enable Delete Mode</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={deleteMode}
                onChange={() => setDeleteMode(!deleteMode)}
              />
            </label>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <table className="w-full mt-4 table-auto">
                <thead>
                  <tr>
                    {deleteMode && <th className="px-4 py-2 text-left bg-blue-100 border">Select</th>}
                    <th className="px-4 py-2 text-left bg-blue-100 border">Name</th>
                    <th className="px-4 py-2 text-left bg-blue-100 border">Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.name}>
                      {deleteMode && (
                        <td className="px-4 py-2 border">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.name)}
                            onChange={() => handleCheckboxChange(user.name)}
                          />
                        </td>
                      )}
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Delete Button - Only visible if deleteMode is enabled */}
              {deleteMode && (
                <button
                  onClick={handleDeleteSelectedUsers}
                  className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
                  disabled={selectedUsers.length === 0}
                >
                  Delete Selected Users
                </button>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <h2 className="text-lg font-bold">Add CUG Users</h2>

          {/* Add User Form */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <input
              type="text"
              placeholder="Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="px-4 py-2  border rounded w-full"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={userData.mobile}
              onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
              className="px-4 py-2 border rounded w-full"
            />
          
            <button
              onClick={handleAddUser}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-nowrap "
            >
              + Add User
            </button>
            
          </div>

          {/* List of Newly Added Users */}
          <h3 className="mt-4 text-md">New Users</h3>
          {newUsers.length > 0 ? (
            <ul className="mt-2">
              {newUsers.map((user) => (
                <li key={user.name} className="flex items-center justify-between px-4 py-2 border-b">
                  <span>{user.name} - {user.mobile}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new users added yet.</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmitNewUsers}
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            disabled={newUsers.length === 0}
          >
            Submit New Users
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default CUGManagementPage;
