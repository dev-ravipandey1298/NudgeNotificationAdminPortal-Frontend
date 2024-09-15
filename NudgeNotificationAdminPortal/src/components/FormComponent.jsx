import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    recFrequency: 1,
    recType: 'Weekly',
    recDays: [],
    environment: 'CUG',
    imageFile: null,
    comment: '',
  });

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
    let newRecDays = [...formData.recDays];

    if (checked) {
      if (newRecDays.length < formData.recFrequency) {
        newRecDays.push(Number(value));
      }
    } else {
      newRecDays = newRecDays.filter((day) => day !== Number(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      recDays: newRecDays,
    }));
  };

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      templateName: '',
      title: '',
      body: '',
      startDate: '',
      endDate: '',
      recFrequency: 1,
      recType: 'Weekly',
      recDays: [],
      environment: 'CUG',
      imageFile: null,
      comment: '',
    });
  };

  // Generate days for recurrence checkboxes
  const maxDays = formData.recType === 'Weekly' ? 7 : 31;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-6xl h-screen grid grid-cols-2 gap-8"
      >
        {/* Left Section */}
        <div className="space-y-6">

          {/* Template Name */}
          <div>
            <label className="block text-gray-700 mb-2">Template Name</label>
            <input
              type="text"
              name="templateName"
              value={formData.templateName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-gray-700 mb-2">Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">

          {/* Recurrence */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Frequency</label>
              <select
                name="recFrequency"
                value={formData.recFrequency}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                name="recType"
                value={formData.recType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Recurrence Days (Multi-select with checkboxes) */}
            <div>
              <label className="block text-gray-700 mb-2">Days</label>
              <div className="grid grid-cols-3 gap-2 border p-2 rounded">
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((val) => (
                  <div key={val}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={val}
                        checked={formData.recDays.includes(val)}
                        onChange={handleRecDayChange}
                        disabled={
                          !formData.recDays.includes(val) &&
                          formData.recDays.length >= formData.recFrequency
                        }
                      />
                      <span>{val}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Environment */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Environment</label>
          <select
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="CUG">CUG</option>
            <option value="PROD">PROD</option>
          </select>
        </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Comment */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
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
    </div>
  );
};

export default FormComponent;
