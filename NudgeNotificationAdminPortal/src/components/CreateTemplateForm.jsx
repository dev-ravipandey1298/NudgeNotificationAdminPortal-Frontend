import React, { useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { createTemplate } from '../services/templateService';
import Alert from './Alert';

const CreateTemplateForm = () => {
  const [formData, setFormData] = useState({
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    occurrenceFrequency: 1,
    occurrenceUnit: '',
    occurrenceDays: [],
    environment: 'CUG'
  });

  const [showDays, setShowDays] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);


  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: e.target.files[0],
    }));
  };

  // Handle multi-select for Recurrence Days
  const handleRecDayChange = (e) => {
    const { value, checked } = e.target;
    let newOccurrenceDays = [...formData.occurrenceDays];

    if (checked) {
      if (newOccurrenceDays.length < formData.occurrenceFrequency) {
        newOccurrenceDays.push(Number(value));
      }
    } else {
      newOccurrenceDays = newOccurrenceDays.filter((day) => day !== Number(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      occurrenceDays: newOccurrenceDays,
    }));
  };

  const createTemplateBackend = async (data) => {
    try {
      const response = await createTemplate(data)
      if(response.status == 201){
        setSubmitMessage("Template saved to Draft successfully with ID: " + response.data.payload.templateId)
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    createTemplateBackend(JSON.stringify(formData))
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      templateName: '',
      title: '',
      body: '',
      startDate: '',
      endDate: '',
      occurrenceFrequency: 1,
      occurrenceUnit: 'Weekly',
      occurrenceDays: [],
      environment: 'CUG',
      imageFile: null,
      comment: '',
    });
  };

  // Generate days for recurrence checkboxes
  const maxDays = formData.occurrenceUnit === 'Weekly' ? 7 : 31;

  return (
    <>
    <PageHeader heading={"Nudge Template"}/>                        
    <div className="flex justify-center items-center   p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-6xl  grid grid-cols-2 gap-8"
      >
        {/* Left Section */}
        <div className="space-y-4">

          {/* Template Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Template Name</label>
            <input
              type="text"
              name="templateName"
              value={formData.templateName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              rows={4}
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              required
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="space-y-4">

          {/* Recurrence */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Frequency</label>
              <select
                name="occurrenceFrequency"
                value={formData.occurrenceFrequency}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Type</label>
              <select
                name="occurrenceUnit"
                value={formData.occurrenceUnit}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Recurrence Days (Multi-select with checkboxes) */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Days</label>
              <div 
              onClick={() => showDays ? setShowDays(false) : setShowDays(true)}
              className='text-nowrap p-2 bg-gray-50 border border-gray-400 flex justify-between' >
                <p>Select Days</p> <span><img src={downArrow} alt="" /></span>
              </div>
              {showDays && <div className="grid grid-cols-3 gap-2 border p-4 rounded absolute bg-white shadow-xl">
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((val) => (
                  <div key={val}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={val}
                        checked={formData.occurrenceDays.includes(val)}
                        onChange={handleRecDayChange}
                        disabled={
                          !formData.occurrenceDays.includes(val) &&
                          formData.occurrenceDays.length >= formData.occurrenceFrequency
                        }
                      />
                      <span>{val}</span>
                    </label>
                  </div>
                ))}
              </div>}
            </div>
          </div>

          {/* Environment */}
        <div className="mb-4 w-[50%]">
          <label className="block font-medium text-gray-700 mb-2">Environment</label>
          <select
            name="environment"
            value={formData.environment}
            disabled={true}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
          >
            <option value="CUG">CUG</option>
            <option value="PROD">PROD</option>
          </select>
        </div>


          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      {showAlert && <Alert alertDetail={{ success: true, message: submitMessage }} handleCloseAlert={() => setshowAlert(false)} />}
    </div>
    </>
  );
};

export default CreateTemplateForm;
