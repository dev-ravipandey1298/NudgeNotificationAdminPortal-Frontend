import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { useNavigate, useParams } from 'react-router-dom';
import { getTemplateById, submitForCUG_Approval_Template, updateTemplate } from '../services/templateService';
import Alert from './Alert';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import { ERROR_MESSAGE } from '../constants/ErrorMessageConstant';
import { occurrenceFrequencyOption, occurrenceHoursOption } from '../constants/reoccuranceValue';


const DraftTemplateForm = () => {

  const { templateId, status } = useParams();
  const navigate = useNavigate();


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
    imageFile: null
  });

  const [showDays, setShowDays] = useState(false);

  const [isCheckedFinalSubmit, setIsCheckedFinalSubmit] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const [alertTrue, setAlertTrue] = useState(true);
  const [error, setError] = useState(false);

  const formDataUpdate = new FormData();

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
          hourOfDay: data.hourOfDay,
          environment: 'CUG',
          imageFile: data.imageFile,
          comment: '',
        })

      }
    } catch (error) {
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
      console.log(error)
    }
  }

  const updateTemplateBackend = async (templateId, formData) => {
    try {
      const response = await updateTemplate(templateId, formData);
      setSubmitMessage("Template Updated successfully with ID: " + templateId)
      setshowAlert(true)
    } catch (error) {
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
      console.log(error)
    }
  }

  const submitForCUGApprovalBackend = async (formData) => {
    try {
      const response = await submitForCUG_Approval_Template(formData);
      if (response.status == 200) {
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

  const submitForm = (data) => {
    const payload = {
      "templateId": templateId,
      "templateName": data.templateName,
      "title": data.title,
      "body": data.body,
      "startDate": data.startDate,
      "endDate": data.endDate,
      "occurrenceFrequency": data.occurrenceFrequency,
      "occurrenceUnit": data.occurrenceUnit,
      "occurrenceDays": data.occurrenceDays,
      "hourOfDay": data.hourOfDay,
    }
    return JSON.stringify(payload);
  }

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const errorArray = [];

    if (start > end) {
      setError(true);
      errorArray.push(ERROR_MESSAGE.DATE_RANGE)
    }

    if (formData.occurrenceFrequency != formData.occurrenceDays.length) {
      setError(true);
      errorArray.push(ERROR_MESSAGE.SELECTED_DAYS_NOT_EQUAL_TO_FREQUENCY)
    }

    if (formData.imageFile === undefined || formData.imageFile === null) {
      const emptyFile = new File([], 'empty.txt')
      setFormData((prevData) => ({
        ...prevData,
        imageFile: emptyFile,
      }));
    }

    formDataUpdate.append('payload', new Blob([submitForm(formData)], { type: 'application/json' }));
    formDataUpdate.append('image', formData.imageFile);

    if (error) {
      const errorsString = errorArray.join(", ")
      setSubmitMessage(errorsString);
      setAlertTrue(false)
      setshowAlert(true);
      console.log(errorArray)
    } else {
      isCheckedFinalSubmit ? submitForCUGApprovalBackend(formDataUpdate) : updateTemplateBackend(templateId, formDataUpdate);
    }
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
      occurrenceUnit: 'Week',
      occurrenceDays: [],
      hourOfDay : 9,
      environment: 'CUG',
      imageFile: null,
      comment: '',
    });
  };

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.MAKER_DRAFTS)
  }

  // Generate days for recurrence checkboxes
  const maxDays = formData.occurrenceUnit === 'Week' ? 7 : 31;

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Draft's Template form"} />
      <div className="flex justify-center items-center   p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-6xl  grid grid-cols-2 gap-8"
        >
          {/* Left Section */}
          <div className="space-y-4">

            {/* Template Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Template Name*</label>
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
              <label className="block font-medium text-gray-700 mb-2">Title*</label>
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
              <label className="block font-medium text-gray-700 mb-2">Body*</label>
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
              <label className="block font-medium text-gray-700 mb-2">Start Date*</label>
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
              <label className="block font-medium text-gray-700 mb-2">End Date*</label>
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
            {(formData.startDate !== formData.endDate) && <div>
              <label className="block font-medium text-gray-700 mb-2">Reoccurrence*: </label>
              {/* Recurrence */}
              <div className="grid grid-cols-4 gap-4">

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Duration*</label>
                  <select
                    name="occurrenceUnit"
                    value={formData.occurrenceUnit}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
                  >
                    <option value="Week">Weekly</option>
                    <option value="Month">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Frequency*</label>
                  <select
                    name="occurrenceFrequency"
                    value={formData.occurrenceFrequency}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
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
                  <label className="block font-medium text-gray-700 mb-2">Days*</label>
                  <div
                    onClick={() => showDays ? setShowDays(false) : setShowDays(true)}
                    className='w-24 h-[2.50rem] rounded-sm text-nowrap p-2 bg-gray-50 border border-gray-400 flex justify-between items-center' >
                    <p>Select D.</p> <span><img className='h-4 w-4' src={downArrow} alt="" /></span>
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
                            disabled={
                              !formData.occurrenceDays.includes(val) &&
                              formData.occurrenceDays.length >= formData.occurrenceFrequency
                            }
                          />
                          <span>{maxDays == 7 ? occurrenceFrequencyOption[val-1].label : val}</span>
                        </label>
                      </div>
                    ))}
                  </div>}
                </div>

                 {/* hour Of Day */}
                 <div>
                  <label className="block font-medium text-gray-700 mb-2">Hours Of Day*</label>
                  <select
                    name="hourOfDay"
                    value={formData.hourOfDay}
                    onChange={handleChange}
                    className="w-24 p-2 bg-gray-50 border border-gray-400 rounded"
                  >
                    {Array.from({ length: 24 }, (_, i) => i).map((val) => (
                      <option key={val} value={val}>
                        {occurrenceHoursOption[val].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>}

            {/* Notification Image */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Notification Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
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

            <div className="flex items-center space-x-2">
              <input onClick={() => isCheckedFinalSubmit ? setIsCheckedFinalSubmit(false) : setIsCheckedFinalSubmit(true)} type="checkbox" id="finalSubmit" className="h-[0.60rem] w-[0.60rem]" name="finalSubmit" value="submitted" />
              <label className="font-medium text-red-700 text-sm font-mono" for="finalSubmit"> Submit for CUG approval</label>
            </div>


            {/* Buttons */}
            <div>
              {!isCheckedFinalSubmit ? <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
              </div>
                :
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              }
            </div>
          </div>
        </form>
        {showAlert && <Alert alertDetail={{ success: alertTrue, message: submitMessage }} handleCloseAlert={() => { setshowAlert(false); setAlertTrue(true); setError(false); }} />}
      </div>
    </>
  );
};

export default DraftTemplateForm;
