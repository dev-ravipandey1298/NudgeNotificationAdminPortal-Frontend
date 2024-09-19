import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { useNavigate, useParams } from 'react-router-dom';
import { getTemplateById, markCUGFailed, submitForPRODApproval } from '../services/templateService';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import Alert from './Alert';
import { ERROR_MESSAGE } from '../constants/ErrorMessageConstant';

const ActionTemplateForm = () => {
  const { templateId, status } = useParams();
  const navigate = useNavigate();
  const formDataPROD = new FormData();

  const [formData, setFormData] = useState({
    templateId: templateId,
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    occurrenceFrequency: 1,
    occurrenceUnit: '',
    occurrenceDays: [],
    environment: 'CUG',
    file: null,
    comment: ''
  });

  const [showDays, setShowDays] = useState(false);

  const [isCheckedFinalSubmit, setIsCheckedFinalSubmit] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const [alertTrue, setAlertTrue] = useState(true);
  const [error, setError] = useState(false);
  const [showNotificationImage, setShowNotificationImage] = useState(false);

  useEffect(() => {
    getTemplateByIdBackend(templateId);
  }, [])



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
      file: e.target.files[0],
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

  const getTemplateByIdBackend = async (templateId) => {
    try {
      const response = await getTemplateById(templateId);

      if (response.status == 200) {
        const data = response.data.payload;
        setFormData({
          templateId: templateId,
          templateName: data.templateName,
          title: data.title,
          body: data.body,
          startDate: data.startDate,
          endDate: data.endDate,
          occurrenceFrequency: data.occurrenceFrequency,
          occurrenceUnit: data.occurrenceUnit,
          occurrenceDays: data.occurrenceDays,
          environment: 'CUG',
          file: null,
          comment: '',
        })

      }
    } catch (error) {

    }
  }
  
  const submitForProdApprovalBackend = async (templateId, formDataPROD) => {
    try {
      const response = await submitForPRODApproval(templateId, formDataPROD);

      if(response.status == 200){
        setSubmitMessage(response.data.message)
        setshowAlert(true)
      }
    } catch (error) {
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
      console.log(error)
    }
  }

  const markCUGFailedBackend = async (templateId, formDataPROD) => {
    try {
      const response = await markCUGFailed(templateId, formDataPROD);
      if(response.status == 200){
        setSubmitMessage("Template mark as failed successfully")
        setshowAlert(true)
      }
    } catch (error) {
      setSubmitMessage(ERROR_MESSAGE.EVIDENCE_REQUIRED)
      setAlertTrue(false)
      setshowAlert(true);
      console.log(error)
    }
  }


  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    formDataPROD.append('file', formData.file);
    formDataPROD.append('comment', formData.comment);

    if(formData.file == null){
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
    }

    submitForProdApprovalBackend(templateId, formDataPROD);
  };

  // Reset form
  const handleFailed = () => {
    formDataPROD.append('file', formData.file);
    formDataPROD.append('comment', formData.comment);

    if(formData.file == null){
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
    }

    markCUGFailedBackend(templateId, formDataPROD)
  };

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.MAKER_ACTION_TEMPLATE)
  }

  // Generate days for recurrence checkboxes
  const maxDays = formData.occurrenceUnit === 'Week' ? 7 : 31;

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Nudge Template"} />
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
            <label className="block font-medium text-gray-700 mb-2">Reoccurance: </label>
            {/* Recurrence */}
            <div className="grid grid-cols-3 gap-4">
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">Duration</label>
                <select
                  disabled
                  name="occurrenceUnit"
                  value={formData.occurrenceUnit}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
                >
                  <option value="Week">Weekly</option>
                  <option value="Month">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  disabled
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


              {/* Recurrence Days (Multi-select with checkboxes) */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Days</label>
                <div
                  onClick={() => showDays ? setShowDays(false) : setShowDays(true)}
                  className='text-nowrap p-2 bg-gray-50 border border-gray-400 flex justify-between' >
                  <p>Show Days</p> <span><img src={downArrow} alt="" /></span>
                </div>
                {showDays && <div className="grid grid-cols-3 gap-2 border p-4 rounded absolute bg-white shadow-xl">
                  {Array.from({ length: maxDays }, (_, i) => i + 1).map((val) => (
                    <div key={val} >
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={val}
                          checked={formData.occurrenceDays.includes(val)}
                          onChange={handleRecDayChange}
                          disabled={true}
                        />
                        <span>{val}</span>
                      </label>
                    </div>
                  ))}
                </div>}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Notification Image :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={() => setShowNotificationImage(true)} src={preview} alt="" />
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

            {/* CUG Evidence Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Upload CUG Evidence</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>

                  {/* Checker Comment */}
            <div className="space-y-1 space-x-2 flex items-center">
            <label htmlFor="comment">
              <p className="inline font-medium text-gray-700 mb-2">Checker's Comment :</p>
            </label>
            <div className="flex items-center justify-center pb-1">
              <p></p>
            </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>


            {/* Buttons */}
            <div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleFailed}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Failed
                </button>
              </div>
            </div>
          </div>
        </form>
        {showAlert && <Alert alertDetail={{ success: alertTrue, message: submitMessage }} handleCloseAlert={() => {setshowAlert(false); setAlertTrue(true)}} />}
        {showNotificationImage && <ShowImage file={formData.imageUrl} handleCloseAlert={() => setShowNotificationImage(false)}/>}
      </div>
    </>
  );
};

export default ActionTemplateForm;
