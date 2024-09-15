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
    recDay: 1,
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
      recDay: 1,
      environment: 'CUG',
      imageFile: null,
      comment: '',
    });
  };

  // Adjust recDay based on recFrequency
  const maxDays = formData.recFrequency * 10;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6">Form</h2>

        {/* Template Name */}
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Start - End Date */}
        <div className="mb-4">
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

        <div className="mb-4">
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

        {/* Recurrence */}
        <div className="mb-4 grid grid-cols-3 gap-2">
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

          <div>
            <label className="block text-gray-700 mb-2">Day</label>
            <select
              name="recDay"
              value={formData.recDay}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {Array.from({ length: maxDays }, (_, i) => i + 1).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
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
        <div className="mb-4">
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
        <div className="flex justify-between">
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
      </form>
    </div>
  );
};

export default FormComponent;
