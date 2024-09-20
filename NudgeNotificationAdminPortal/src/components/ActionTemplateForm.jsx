import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import downArrow from '/icons/down-arrow.png'
import { useNavigate, useParams } from 'react-router-dom';
import { getNotificationTemplateById, getTemplateById, markCUGFailed, submitForCUG_Approval_Template, submitForPRODApproval } from '../services/templateService';
import { NAVIGATE_PATH } from '../constants/routeConstant';
import Alert from './Alert';
import { ERROR_MESSAGE } from '../constants/ErrorMessageConstant';
import preview from '/icons/preview.png'
import { ShowImage } from './ShowImage';
import { occurrenceFrequencyOption, occurrenceHoursOption } from '../constants/reoccuranceValue';

const ActionTemplateForm = () => {
  const { templateId, status } = useParams();
  const navigate = useNavigate();
  const formDataPROD = new FormData();
  const formDataCreate = new FormData();

  const [formData, setFormData] = useState({
    templateId: templateId,
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    occurrenceFrequency: 1,
    occurrenceUnit: 'Week',
    occurrenceDays: [],
    hourOfDay: 9,
    environment: 'CUG',
    file: null,
    imageFile : null,
    makerComment: '',
    comment: ''
  });

  const [showDays, setShowDays] = useState(false);

  const [isResubmit, setIsResubmit] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false);
  const [alertTrue, setAlertTrue] = useState(true);
  const [error, setError] = useState(false);
  const [showNotificationImage, setShowNotificationImage] = useState(false);

  useEffect(() => {
    getTemplateByIdBackend(templateId);

    if (status === "CUG_FAILED" || status === "REJECTED") {
      setIsResubmit(true);
    }

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

  // Handle file upload
  const handleImageFileChange = (e) => {
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
      const response = await getNotificationTemplateById(templateId);

      if (response.status == 200) {
        const data = response.data.payload;
        setFormData({
          templateId: templateId,
          templateName: data.templateData.templateName,
          title: data.templateData.title,
          body: data.templateData.body,
          startDate: data.templateData.startDate,
          endDate: data.templateData.endDate,
          occurrenceFrequency: data.templateData.occurrenceFrequency,
          occurrenceUnit: data.templateData.occurrenceUnit,
          occurrenceDays: data.templateData.occurrenceDays,
          hourOfDay: data.templateData.hourOfDay,
          checkerCUGComment: data.checkerCUGComment,
          checkerFinalComment: data.checkerFinalComment,
          makerComment: data.makerComment,
          imageUrl: data.templateData.imageUrl,
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

      if (response.status == 200) {
        setSubmitMessage(response.data.message)
        setshowAlert(true)
      } else {
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
      if (response.status == 200) {
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

  const submitForm = (data) => {
    const payload = {
      "templateName": data.templateName,
      "title": data.title,
      "body": data.body,
      "startDate": data.startDate,
      "endDate": data.endDate,
      "occurrenceFrequency": data.occurrenceFrequency,
      "occurrenceUnit": data.occurrenceUnit,
      "occurrenceDays": data.occurrenceDays,
      "hourOfDay": data.hourOfDay
    }
    return JSON.stringify(payload);
  }

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isResubmit) {
      formDataPROD.append('file', formData.file);
      formDataPROD.append('comment', formData.comment);

      if (formData.file == null) {
        setSubmitMessage(ERROR_MESSAGE.EVIDENCE_REQUIRED)
        setAlertTrue(false)
        setshowAlert(true);
      }
      submitForProdApprovalBackend(templateId, formDataPROD);
    } else {
      if (formData.imageFile === undefined || formData.imageFile === null) {
        const emptyFile = new File([], 'empty.txt')
        setFormData((prevData) => ({
          ...prevData,
          imageFile: emptyFile,
        }));
      }

      formDataCreate.append('payload', new Blob([submitForm(formData)], { type: 'application/json' }));
      formDataCreate.append('image', formData.imageFile);
      submitForCUGApprovalBackend(formDataCreate);
    }

  };

  const submitForCUGApprovalBackend = async (data) => {
    try {
      const response = await submitForCUG_Approval_Template(data);
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

  // Reset form
  const handleFailed = () => {
    formDataPROD.append('file', formData.file);
    formDataPROD.append('comment', formData.comment);

    if (formData.file == null) {
      setSubmitMessage(ERROR_MESSAGE.SOME_EXCEPTION_OCCURRED)
      setAlertTrue(false)
      setshowAlert(true);
    }

    markCUGFailedBackend(templateId, formDataPROD)
  };

  const handleClickBack = () => {
    navigate(NAVIGATE_PATH.MAKER_ACTION_TEMPLATE)
  }

  const maxDays = formData.occurrenceUnit === 'Week' ? 7 : 31;

  return (
    <>
      <PageHeader handleClickBack={handleClickBack} heading={"Action Nudge Template"} />
      <div className="flex justify-center items-center p-4">
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
                disabled={!isResubmit}
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
                disabled={!isResubmit}
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
                disabled={!isResubmit}
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
                disabled={!isResubmit}
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
                disabled={!isResubmit}
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
                    disabled={!isResubmit}
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
                    disabled={!isResubmit}
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
                    <p>Show D.</p> <span><img className='h-4 w-4' src={downArrow} alt="" /></span>
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
                            disabled={isResubmit ? !formData.occurrenceDays.includes(val) &&
                              formData.occurrenceDays.length >= formData.occurrenceFrequency : !isResubmit}
                          />
                          <span>{maxDays == 7 ? occurrenceFrequencyOption[val - 1].label : val}</span>
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
                    disabled={!isResubmit}
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

            {/* Images */}
            {!isResubmit && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="showEvidence">
                <p className="inline font-medium text-gray-700 mb-2">Show Notification Image :</p>
              </label>
              <div className="flex items-center justify-center pb-1 h-8 w-8">
                <img onClick={() => setShowNotificationImage(true)} src={preview} alt="" />
              </div>
            </div>}

            {/* Notification Image */}
            {isResubmit && <div>
              <label className="block font-medium text-gray-700 mb-2">Notification Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>}

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
            {!isResubmit && <div>
              <label className="block font-medium text-gray-700 mb-2">Upload CUG Evidence*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>}

            {/* Maker failed Comment */}
            {(status === "CUG_FAILED" || status === "CUG_FAILED") && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Maker's Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.makerComment != '' ? formData.makerComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* Checker Comment */}
            {(status === "REJECTED" || status === "CUG_APPROVED") && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Checker's CUG Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.checkerCUGComment != '' ? formData.checkerCUGComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* Checker Comment */}
            {(status === "REJECTED" || status === "CUG_APPROVED") && formData.checkerFinalComment != '' && <div className="space-y-1 space-x-2 flex items-center">
              <label htmlFor="checkerComment">
                <p className="inline font-medium text-gray-700 mb-2">Checker's Final Comment :</p>
              </label>
              <div className="flex items-center justify-center pb-1">
                <p>{formData.checkerFinalComment != '' ? formData.checkerFinalComment : '**NO Comments**'}</p>
              </div>
            </div>}

            {/* Comment */}
            {!isResubmit && <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                name="comment"
                placeholder='Provide your comment here ...'
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-2 bg-gray-50 border border-gray-400 rounded"
              />
            </div>}


            {/* Buttons */}
            <div>
              {!isResubmit ? <div className="flex justify-end space-x-2 mt-4">
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
              </div> :
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Re-Submit
                  </button>
                </div>}
            </div>
          </div>
        </form>
        {showAlert && <Alert alertDetail={{ success: alertTrue, message: submitMessage }} handleCloseAlert={() => { setshowAlert(false); setAlertTrue(true) }} />}
        {showNotificationImage && <ShowImage file={formData.imageUrl} handleCloseAlert={() => setShowNotificationImage(false)} />}
      </div>
    </>
  );
};

export default ActionTemplateForm;
