import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { DateRangePicker } from "react-date-range";
import calendar from "/icons/calendar.png"
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import PageHeader from "./PageHeader";
import { createNudgeTemplateData, genrateNewTemplateId, getNudgeTemplateData, getNudgeTemplateDataById, updateNudgeTemplates } from "../services/nudgeTemplateService";
import { occurrenceDaysOption, occurrenceFrequencyOption, occurrenceHoursOption, occurrenceUnitOption } from "../constants/reoccuranceValue";
import { validateLocaleAndSetLanguage } from "typescript";
import Warning from "./Warning";
import { createTemplate, getTemplateById, markCUGApproved, markCUGReject, markPRODApproved, markPRODReject, submitForCUG_Approval_Template, submitForPRODApproval, updateTemplate } from "../services/templateService";



const TemplateForm = () => {
  const warningMessage = "Do you want to proceed with submitting the nudge template for review?"
  const {templateId, status} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, control, reset} = useForm();

  const [isChecker, setIsChecker] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [onEditScreen, setOnEditScreen] = useState(false);
  const [newTempId, setNewTempId] = useState('');
  const [templateDetails, setTemplateDetails] = useState({});
  const [isCheckedFinalSubmit, setIsCheckedFinalSubmit] = useState(false);
  const [dateRangePreview, setDateRangePreview] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [templateNameValue, setTemplateNameValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [checkerCommentValue, setCheckerCommentValue] = useState('');
  const [makerCommentValue, setMakerCommentValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [showReoccuranceError, setShowReoccuranceError] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isActionScreen, setIsActionScreen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const formDataPROD = new FormData();
  const [isCreatedScreen, setIsCreatedScreen] = useState(false);
  const [formData, setFormData] = useState({
    templateName: '',
    title: '',
    body: '',
    startDate: '',
    endDate: '',
    occurrenceFrequency: [],
    occurrenceUnit: [],
    occurrenceDays: []
  });

  const isReoccuranceSelected = false;
  // const isReoccuranceSelected = (selectedFrequency.length == 0
  //   || selectedUnit.length == 0
  //   || selectedDays.length == 0
  //   || selectedHours.length == 0)

  useEffect(() => {
    getTemplateByIdBackend(templateId);
    const userDetails = JSON.parse(sessionStorage.getItem("user"))
    document.getElementsByClassName("dropdown-container")[0].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("dropdown-container")[1].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("dropdown-container")[2].style.backgroundColor = '#f9fafb'
    // document.getElementsByClassName("dropdown-container")[3].style.backgroundColor = '#f9fafb'
    // document.getElementsByClassName("gray")[0].textContent = "Period..."
    // document.getElementsByClassName("gray")[2].textContent = "Duration..."
    // document.getElementsByClassName("gray")[4].textContent = "Day..."
    // document.getElementsByClassName("gray")[6].textContent = "Hrs..."
    userDetails !== null ? userDetails.role === "CHECKER" ? setReadOnly(true) : setReadOnly(false) : navigate("/login")
    userDetails !== null ? userDetails.role === "CHECKER" ? setIsChecker(true) : setIsChecker(false) : navigate("/login")
    if (location.pathname.includes("drafts")) {
      console.log("Is Here")
      setReadOnly(false);
      setOnEditScreen(true);
      // setOuccuranceData()
      // setDateRangeWithFormattedValue()
    }

    if (location.pathname.includes("actions")) {
      setReadOnly(true);
      setIsActionScreen(true);
    }
    if (location.pathname.includes("create")) {
      setIsCreatedScreen(true)
    }
    // userDetails !== null && (userDetails.role === "CHECKER") && setOuccuranceData();
    // userDetails !== null && userDetails.role === "CHECKER" && setDateRangeWithFormattedValue()
   
  }, [])



  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  // const setOuccuranceData = () => {
  //   setSelectedFrequency(formData.occurrenceFrequency)
  //   setSelectedUnit(formData.occurrenceUnit)
  //   setSelectedDays(formData.occurrenceDays)
  //   // setSelectedHours(getNudgeTemplateDataById(templateId)[0].occurrenceHours)
  // }

  // const setDateRangeWithFormattedValue = () => {
  //   const startDateToConvert = convertDateFormat(formData.startDate).toString
  //   const endDateToConvert = convertDateFormat(formData.endDate).toString
  //   setDateRangePreview({ startDate: new Date(startDateToConvert), endDate: new Date(endDateToConvert), color: String })
  // }

  let setNudgeData = (data) => {
    const nudgeData = {
      "templateName": templateNameValue,
      "title": titleValue,
      "body": bodyValue,
      "startDate": new Date(data.dateRange[0].startDate).toISOString().split('T')[0],
      "endDate": new Date(data.dateRange[0].endDate).toISOString().split('T')[0],
      "occurrenceFrequency": selectedFrequency.map(item => item.value)[0],
      "occurrenceUnit":selectedUnit.map(item => item.value)[0],
      "occurrenceDays": selectedDays.map(item => item.value)
    }
    return JSON.stringify(nudgeData);
  }


  const createTemplateBackend = async (data) => {
    try {
      const response = await createTemplate(setNudgeData(data))
      if(response.status == 201){
        setSubmitMessage("Template saved to Draft successfully with ID: " + response.data.payload.templateId)
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  const updateTemplateBackend = async (templateId, data) => {
    try {
      const response = await updateTemplate(templateId, setNudgeData(data));
      setSubmitMessage("Template Updated successfully with ID: " + templateId)
      setshowAlert(true)
    } catch (error) {
      
    }
  }

  const getTemplateByIdBackend = async (templateId) => {
    try {
      const response = await getTemplateById(templateId);
      
      if(response.status == 200){
        const data = response.data.payload;
        setFormData({
          templateName : data.templateName,
          title : data.title,
          body : data.body,
          // startDate : data.startDate,
          // endDate : data.endDate,
          // occurrenceFrequency : [ { label: data.occurrenceFrequency, value: data.occurrenceFrequency } ],
          // occurrenceUnit : [ { label: data.occurrenceUnit, value: data.occurrenceUnit } ],
          // occurrenceDays :  data.occurrenceDays.map(num => ({label: num.toString(), value: num.toString()}))
        })
        setTemplateNameValue(data.templateName)
        setTitleValue(data.title)
        setBodyValue(data.body)
        setDateRangePreview({ startDate: new Date(data.startDate), endDate: new Date(data.endDate), color: String })
        setSelectedFrequency( [ { label: data.occurrenceFrequency, value: data.occurrenceFrequency } ])
        setSelectedUnit([ { label: data.occurrenceUnit, value: data.occurrenceUnit } ])
        setSelectedDays(data.occurrenceDays.map(num => ({label: num.toString(), value: num.toString()})))
       
      }
    } catch (error) {
      
    }
  }

  let submitNudgeData = () => {
    const nudgeData = {
      "templateId" : templateId,
      "templateName": templateNameValue,
      "title": titleValue,
      "body": bodyValue,
      "startDate": dateRangePreview.startDate.toISOString().split('T')[0],
      "endDate": dateRangePreview.endDate.toISOString().split('T')[0],
      // "startDate": new Date(data.dateRange[0].startDate).toISOString().split('T')[0],
      // "endDate": new Date(data.dateRange[0].endDate).toISOString().split('T')[0],
      "occurrenceFrequency": selectedFrequency.map(item => item.value)[0],
      "occurrenceUnit":selectedUnit.map(item => item.value)[0],
      "occurrenceDays": selectedDays.map(item => item.value),
    }
    return JSON.stringify(nudgeData);
  }

  let submitComment = () => {
    const commentData = {
      "comment" : checkerCommentValue
    }
    return JSON.stringify(commentData)
  }

  const submitForCUGApprovalBackend = async () => {
   try {
     const response = await submitForCUG_Approval_Template(submitNudgeData());
     if(response.status == 200){
      console.log(response.data.message)
      setSubmitMessage(response.data.message)
      setshowAlert(true)
     }
   } catch (error) {
    
   }

  }

  const markCUGRejectBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markCUGReject(templateId, comment)
      if(response.status == 200){
        
        setSubmitMessage("Template rejected successfully.")
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  const markCUGApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markCUGApproved(templateId, comment)
      if(response.status == 200){
        setSubmitMessage("Template approved successfully.")
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  const markPRODRejectBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODReject(templateId, comment)
      if(response.status == 200){
        
        setSubmitMessage("Template rejected for PROD successfully.")
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  const markPRODApprovedBackend = async () => {
    try {
      const comment = submitComment()
      const response = await markPRODApproved(templateId, comment)
      if(response.status == 200){
        setSubmitMessage("Template approved for PROD successfully.")
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }

  const submitForProdApprovalBackend = async (templateId, formDataPROD) => {
    try {
     
      
      console.log(formDataPROD)
      const response = await submitForPRODApproval(templateId, formDataPROD);

      if(response.status == 200){
        setSubmitMessage(response.data.message)
        setshowAlert(true)
      }
    } catch (error) {
      
    }
  }


  const onSubmit = async (data) => {
    if(!onEditScreen && !isActionScreen){
    createTemplateBackend(data) 
    }else if (!isCheckedFinalSubmit && onEditScreen && !isActionScreen){
      console.log(data)
      updateTemplateBackend(templateId, data);
    }else if (isCheckedFinalSubmit && onEditScreen && !isActionScreen){
      submitForCUGApprovalBackend()
    }else if(isActionScreen){
      console.log(selectedFile)
      console.log(makerCommentValue)
      
      formDataPROD.append('file', data.img[0]);
      formDataPROD.append('comment', makerCommentValue);
      submitForProdApprovalBackend(templateId,formDataPROD);
    }

    // if (isReoccuranceSelected) {
    //   setShowReoccuranceError(true)
    // } else {
    //   setShowReoccuranceError(false)
    //   if (isCheckedFinalSubmit) {
    //     setShowWarning(true)
    //     setSubmitStatus('pending_approval_cug')
    //     console.log("Final click");
    //     console.log(submitStatus)
    //     updateNudgeTemplates(updateNudgeData(data))
    //   } else {
    //     setSubmitStatus('draft')
    //     const msg = createNudgeTemplateData(setNudgeData(data))
    //     if (msg == true) {
    //       setshowAlert(true)
    //     }
    //   }
    // }
    // // console.log(msg)
    // console.log(getNudgeTemplateData())

  };

  const handleReset = () => {
    setSelectedFrequency([])
    setSelectedUnit([])
    setSelectedDays([])
    setSelectedHours([])
    setShowReoccuranceError(false)
    reset({
      templateName: '',
      title: '',
      body: '',
      comment: '',
    });
  }

  const handleConfirmWarning = () => {
    setShowWarning(false)
  }

  const handleCloseWarning = () => {
    setShowWarning(false)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  };

  return (
    <div className="">
      <PageHeader heading={"Nudge Template"} />
      <form
        className=" flex  mx-auto justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-3  w-[42%]">
          {/* {errors.templateName && (
            <p className="text-red-500 text-xs font-medium mt-1">**{errors.templateName.message}</p>
          )} */}
          <div className="flex justify-between">

            {/* Template Id */}
            <div className="flex space-x-2 items-center">
              <label htmlFor="templateId">
                <p className="inline font-medium">Template Id</p>
                <p className="text-red-500 inline">*</p>:
              </label>
              {
                <div className="h-8 w-20 flex">
                  <input
                    className={`font-medium text-red-800 outline-none border-[0.03rem] bg-gray-50 rounded-[0.250rem] p-1 w-full ${!isChecker
                      ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                      : "focus:border-grey-500]"
                      }`}
                    {...register("templateId")}
                    disabled={true}
                    value={templateId}
                  />
                </div>
              }
            </div>

            {/* Template Name */}
            <div className="flex space-x-2 items-center">
              <label htmlFor="templateName">
                <p className="inline font-medium">Template Name</p>
                <p className="text-red-500 inline">*</p>:
              </label>
              {

                <div className="">
                  <input
                    id="templateName"
                    className={`outline-none border-[0.03rem] bg-gray-50 rounded-[0.250rem] p-1 w-full ${!isChecker
                      ? `border-gray-400 focus:border-blue-500  focus:border-[0.100rem] focus:shadow-md`
                      : "focus:border-grey-500]"
                      }`}
                    {...register("templateName")}
                    // {...register("templateName", { required: "Template Name is required" })}
                    // {...(isChecker && {
                    //   value: templateJSON.title,
                    //   readOnly: "readOnly",
                    // })}
                    readOnly={readOnly}
                    value={templateNameValue}
                    onChange={(e) => setTemplateNameValue(e.target.value)}

                  />
                </div>
              }
            </div>

          </div>
          {/* Title box */}
          {/* {errors.title && (
            <p className="text-red-500 text-xs font-medium mt-1">**{errors.title.message}</p>
          )} */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="title">
              <p className="inline font-medium">Title</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            {
              <div className="h-8 w-full">
                <input
                  id="title"
                  className={`outline-none border-[0.03rem] bg-gray-50 rounded-[0.250rem] p-1 w-full ${!isChecker
                    ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    : "focus:border-grey-500]"
                    }`}
                  {...register("title")}
                  // {...register("title", { required: "Title is required" })}
                  // {...(isChecker && {
                  //   value: formData.title,
                  //   readOnly: "readOnly",
                  // })}
                  readOnly={readOnly}
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
              </div>
            }
          </div>

          {/* <div className=""> */}
          {/* Body Text Filed */}
          {/* {errors.body && (
            <p className="text-red-500 text-xs font-medium mt-1">**{errors.body.message}</p>
          )} */}
          <div className="flex space-x-1">

            <div>
              <label htmlFor="body">
                <p className="inline font-medium">Body</p>
                <p className="text-red-500 inline">*</p>:
              </label>
            </div >
            <Controller
              name="body"
              control={control}
              // rules={{ required: "Body is required" }}
              render={({ field: { onChange, value } }) => (
                <textarea
                  id="body"
                  className={`outline-none bg-gray-50 border-[0.03rem] rounded-[0.250rem] p-1 ${!isChecker
                    ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    : "focus:border-grey-500]"
                    }`}
                  cols={60}
                  placeholder="Provide your Nudge description here .."
                  rows={3}
                  onChange={(e) => setBodyValue(e.target.value)}
                  readOnly={isChecker}
                  value={bodyValue}
                />
              )}
            />

          </div>

          {/* Start -End Date */}
          {/* {errors.dateRange && (
            <p className="text-red-500 text-xs font-medium mt-1">**{errors.dateRange.message}</p>
          )} */}
          <div className="flex justify-between">

            <label htmlFor="startEndDate" className="">
              <p className="inline font-medium">Start - End Date</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <Controller
              control={control}
              name="dateRange"
              // rules={{ required: "Start - End Date is required." }}
              render={({ field }) => (
                <DateRangePicker
                  className="border shadow-lg rounded-xl"
                  ranges={field.value || [{
                    startDate: (onEditScreen || isChecker || isActionScreen) ? dateRangePreview.startDate : new Date(),
                    endDate: (onEditScreen || isChecker || isActionScreen) ? dateRangePreview.endDate : new Date(),
                    key: 'selection'
                  }]}
                  // onChange={item => field.onChange([item.selection])}
                  onChange={isChecker ? item => item : item => field.onChange([item.selection])}
                  {...((isChecker || onEditScreen || isActionScreen) && { preview: dateRangePreview })}
                  dragSelectionEnabled={!isChecker}
                />
              )}
            />
          </div>
        </div>
        <div className="border border-grey-500 mx-10 my-20 rounded-xl"></div>

        {/* Left Side */}
        <div className=" w-[42%] space-y-3">
          {(showReoccuranceError) && (
            <p className="text-red-500 text-xs font-medium mt-1">**All fields in reoccurance are required to schedule notification.</p>
          )}

          <div>
            <label htmlFor="execution">
              <p className="inline font-medium">Reoccurrence</p>
              <p className="text-red-500 inline">*</p>:
            </label>
          </div>

          <div className="flex space-x-3">
            <div className="space-y-1 flex items-center">
              <label className="pr-2" htmlFor="selectedFrequency">
                <p className="inline font-medium">Every</p>
              </label>
              <Controller
                name="selectedFrequency"

                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-16"
                    options={occurrenceFrequencyOption}
                    value={selectedFrequency}
                    onChange={isChecker ? {} : setSelectedFrequency}
                    onBlur={onBlur}
                    labelledBy="Frequency"
                    name={name}
                  />
                )}
              />
            </div>

            <div className="space-y-1 mt-1 flex items-center">
              <Controller
                name="selectedUnit"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-20"
                    options={occurrenceUnitOption}
                    value={selectedUnit}
                    onChange={isChecker ? {} : setSelectedUnit}
                    onBlur={onBlur}
                    labelledBy="Unit"
                    name={name}
                  />
                )}
              />
            </div>

            <div className="space-y-1 flex items-center">
              <label className="pr-2" htmlFor="selectedDays">
                <p className="inline font-medium">on</p>
              </label>
              <Controller
                name="selectedDays"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-16"
                    options={occurrenceDaysOption}
                    value={selectedDays}
                    onChange={isChecker ? {} : setSelectedDays}
                    onBlur={onBlur}
                    labelledBy="Days"
                    name={name}
                  />
                )}
              />
              <label className="pl-2" htmlFor="selectedHours">
                <p className="inline font-medium">day</p>
              </label>
            </div>

            {/* <div className="space-y-1 flex items-center">
              <label className="mt-1 pr-2" htmlFor="selectedHours">
                <p className="inline font-medium">at</p>
              </label>
              <Controller
                name="selectedHours"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-24"
                    options={occurrenceHoursOption}
                    value={selectedHours}
                    onChange={isChecker ? {} : setSelectedHours}
                    onBlur={onBlur}
                    labelledBy="Hours"
                    name={name}
                  />
                )}
              />
              <label className="pl-2" htmlFor="selectedHours">
                <p className="inline font-medium">hrs</p>
              </label>
            </div> */}
          </div>

          {/* CUG Evidence */}
          {isActionScreen && <div className="space-y-1 space-x-2 flex items-center">
            <label htmlFor="img">
              <p className="inline font-medium">CUG Evidence</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
              {...register("img")}
            />
          </div>}

          {/* Template Type Select Box  */}
          <div className="space-y-1">
            <label className="pr-2" htmlFor="environment">
              <p className="inline font-medium">Environment</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <Controller
              name="environment"
              disabled={true}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="bg-gray-50 outline-none border-[0.03rem] rounded-[0.250rem] p-1  border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                  onClick={(event) => {
                    field.onChange(event)
                    setSelectedTemplate(event.target.value)
                  }

                  }
                  value={(isCreatedScreen || onEditScreen || (!isActionScreen && (status == "CUG_APPROVED" || status == "REJECTED" || status == "APPROVAL_PENDING_CUG"))) ? "CUG" : "PROD"}
                >
                  <option value="CUG">CUG</option> 
                  <option value="PROD">PROD</option> 
                </select>
              )}
            />
          </div>

          {/* Checker Comment */}
          {(isActionScreen) && <div className="space-y-1 space-x-2 flex items-center">
            <label htmlFor="comment">
              <p className="inline font-medium">Checker's Comment</p>:
            </label>
            <div className="flex items-center justify-center pb-1">
              <p>{checkerCommentValue}</p>
            </div>
          </div>}

          {(isChecker && status == "APPROVAL_PENDING_PROD") && <div className="space-y-1 space-x-2 flex items-center">
            <label htmlFor="comment">
              <p className="inline font-medium">Maker's Comment</p>:
            </label>
            <div className="flex items-center justify-center pb-1">
              <p>{makerCommentValue}</p>
            </div>
          </div>}

          

          {/* Comment */}
          {(isChecker || isActionScreen) && <div className="space-y-1 space-x-2 flex">
            <label htmlFor="comment">
              <p className="inline font-medium">Comment</p>:
            </label>
            <Controller
              name="comment"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <textarea
                    className="bg-gray-50 outline-none border-[0.03rem] rounded-[0.250rem] p-1 w-full border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    cols={50}
                    placeholder="Add Comment here..."
                    rows={3}
                    onChange={isChecker ? (e) => setCheckerCommentValue(e.target.value) :(e) => setMakerCommentValue(e.target.value)}
                    value={isChecker ? checkerCommentValue : makerCommentValue}
                  />
                </div>
              )}
            />
          </div>}

          {(!isChecker && !isActionScreen) && <div className="">
            <input onClick={() => isCheckedFinalSubmit ? setIsCheckedFinalSubmit(false) : setIsCheckedFinalSubmit(true)} type="checkbox" id="finalSubmit" className="h-[0.60rem] w-[0.60rem]" name="finalSubmit" value="submitted" />
            <label className="font-medium text-red-700 text-sm font-mono" for="finalSubmit"> Submit for CUG approval</label>
          </div>}


          <div className=" flex justify-end">
            {!isChecker ? (!isCheckedFinalSubmit && !isActionScreen) ? (
              <div className="flex justify-between space-x-2">
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-red-600 hover:bg-red-500 rounded flex justify-center text-white font-semibold"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-blue-600 hover:bg-blue-500 rounded flex justify-center text-white font-semibold"
                  type="submit">
                  Draft
                </button>
              </div>
            ) :
              <div>
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-green-700 hover:bg-green-600 rounded flex justify-center text-white font-semibold"
                  type="submit">
                  Submit
                </button>
              </div>
              : (
                <div className="flex justify-between space-x-2">
                  <button
                    onClick={status == "APPROVAL_PENDING_PROD" ? () => markPRODApprovedBackend() :() => markCUGApprovedBackend()}
                    className="mt-4 w-[5.5rem] p-2 px-4 bg-green-700 hover:bg-green-600 rounded flex justify-center text-white font-semibold"
                    type="button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={status == "APPROVAL_PENDING_PROD" ? () => markPRODRejectBackend() : () => markCUGRejectBackend()}
                    className="mt-4 w-[5.5rem] p-2 px-4 bg-red-700 hover:bg-red-600 rounded flex justify-center text-white font-semibold"
                    type="button"
                  >
                    Reject
                  </button>
                </div>
              )}
          </div>
        </div>
      </form>
      {showAlert && <Alert alertDetail={{ success: true, message: submitMessage }} handleCloseAlert={() => setshowAlert(false)} />}
      {showWarning && <Warning message={warningMessage} handleConfirmWarning={handleConfirmWarning} handleCloseWarning={handleCloseWarning} />}
    </div>
  );
};

export default TemplateForm;
