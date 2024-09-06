import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { DateRangePicker } from "react-date-range";
import calendar from "/icons/calendar.png"
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import PageHeader from "./PageHeader";



const TemplateForm = () => {

  const { register, handleSubmit, control, reset } = useForm(
    {
      defaultValues: {
        selectedItems: [] // Default value for multiple selections
      }
    }
  );

  const dropdownStyle = {
    backgroundColor: 'f9fafb',
  };


  const navigate = useNavigate();
  const [isChecker, setIsChecker] = useState(false);
  const [errorPayload, setErrorPayload] = useState("");
  const [errorQuery, setErrorQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [alertDetail, setAlertDetail] = useState({ message: "", isWarn: false })
  const [showAlert, setShowAlert] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("user"))
    document.getElementsByClassName("dropdown-container")[0].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("dropdown-container")[1].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("dropdown-container")[2].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("dropdown-container")[3].style.backgroundColor = '#f9fafb'
    document.getElementsByClassName("gray")[0].textContent = "Period..."
    document.getElementsByClassName("gray")[2].textContent = "Duration..."
    document.getElementsByClassName("gray")[4].textContent = "Day..."
    document.getElementsByClassName("gray")[6].textContent = "Hrs..."
    userDetails !== null ? userDetails.role === "CHECKER" ? setIsChecker(true) : setIsChecker(false) : navigate("/login")
  }, [])

  const dateRangePreview = { startDate: new Date(), endDate: new Date("2025-03-25"), color: String };

  const monthOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }
  ]

  const daysOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
  ];

  const weekOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' }
  ]

  const durationOption = [
    { label: 'Week', value: 'Week' },
    { label: 'Month', value: 'Month' }
  ]

  const hoursOption = [
    { label: '00:00', value: '00:00' },
    { label: '01:00', value: '01:00' },
    { label: '02:00', value: '02:00' },
    { label: '03:00', value: '03:00' },
    { label: '04:00', value: '04:00' },
    { label: '05:00', value: '05:00' },
    { label: '06:00', value: '06:00' },
    { label: '07:00', value: '07:00' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
    { label: '23:00', value: '23:00' },
    { label: '24:00', value: '24:00' }
  ]

  const templateJSON = {
    title: "Nudge Notification",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, repudiandae illo ullam rem cum soluta iste vero autem at tempora!",
    comment: ""
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log("submit clicked === :");
    console.log(data);
    data.environment = "CUG"
  };

  const handleReset = () => {
    reset({
      templateName: '',
      title: '',
      body: '',
      comment: ''
    });
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="">
      <PageHeader heading={"Nudge Template"} />
      <form
        className=" flex  mx-auto justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-3  w-[42%]">

          {/* Template Name */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="templateName">
              <p className="inline font-medium">Template Name</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            {
              <div className="h-8 ">
                <input
                  className={`outline-none border-[0.03rem] bg-gray-50 rounded-[0.250rem] p-1 w-full ${!isChecker
                    ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    : "focus:border-grey-500]"
                    }`}
                  {...register("templateName")}
                  // {...(isChecker && {
                  //   value: templateJSON.title,
                  //   readOnly: "readOnly",
                  // })}
                  defaultValue=""
                  readOnly={isChecker}
                  value={isChecker ? templateJSON.title : register.value}
                />
              </div>
            }
          </div>

          {/* Title box */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="title">
              <p className="inline font-medium">Title</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            {
              <div className="h-8 w-full">
                <input
                  className={`outline-none border-[0.03rem] bg-gray-50 rounded-[0.250rem] p-1 w-full ${!isChecker
                    ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    : "focus:border-grey-500]"
                    }`}
                  {...register("title")}
                  {...(isChecker && {
                    value: templateJSON.title,
                    readOnly: "readOnly",
                  })}
                />
              </div>
            }
          </div>

          {/* <div className=""> */}
          {/* Body Text Filed */}
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
              rules={{
                required: true,
                validate: {
                  maxLength: (value) => value.length >= 1,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <textarea
                  className={`outline-none bg-gray-50 border-[0.03rem] rounded-[0.250rem] p-1 ${!isChecker
                    ? "border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                    : "focus:border-grey-500]"
                    }`}
                  cols={60}
                  placeholder="Provide your Nudge description here .."
                  rows={3}
                  onChange={onChange}
                  readOnly={isChecker}
                  value={!isChecker ? value : templateJSON.body}
                />
              )}
            />

          </div>

          <div className="flex justify-between">

            <label htmlFor="startEndDate" className="">
              <p className="inline font-medium">Start - End Date</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <Controller
              control={control}
              name="dateRange"
              render={({ field }) => (
                <DateRangePicker
                  className="border shadow-lg rounded-xl"
                  ranges={field.value || [{
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                  }]}
                  // onChange={item => field.onChange([item.selection])}
                  onChange={isChecker ? item => item : item => field.onChange([item.selection])}
                // preview={dateRangePreview}
                // dragSelectionEnabled={false}
                // editableDateInputs={false}
                />
              )}
            />
          </div>
        </div>
        <div className="border border-grey-500 mx-10 my-20 rounded-xl"></div>
        <div className=" w-[42%] space-y-3">
          <div>
            <label htmlFor="execution">
              <p className="inline font-medium">Reouccurance</p>
              <p className="text-red-500 inline">*</p>:
            </label>
          </div>

          <div className="flex space-x-3">
            <div className="space-y-1 flex items-center">
              <label className="pr-2" htmlFor="selectedMonth">
                <p className="inline font-medium">Every</p>
              </label>
              <Controller
                name="selectedMonth"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-16"
                    options={monthOption}
                    value={value || []}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelledBy="Month"
                    name={name}
                  />
                )}
              />
            </div>

            <div className="space-y-1 mt-1 flex items-center">
              <Controller
                name="selectedDuration"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-20"
                    options={durationOption}
                    value={value || []}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelledBy="Duration"
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
                    options={daysOption}
                    value={value || []}
                    onChange={onChange}
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

            <div className="space-y-1 flex items-center">
              <label className="mt-1 pr-2" htmlFor="selectedHours">
                <p className="inline font-medium">at</p>
              </label>
              <Controller
                name="selectedHours"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    className="w-24"
                    options={hoursOption}
                    value={value || []}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelledBy="Hours"
                    name={name}
                  />
                )}
              />
              <label className="pl-2" htmlFor="selectedHours">
                <p className="inline font-medium">hrs</p>
              </label>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label htmlFor="comment">
              <p className="inline font-medium">Comment</p>:
            </label>
            <br />
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
                    onChange={onChange}
                    value={value}
                  />
                </div>
              )}
            />
          </div>

          {/* Template Type Select Box  */}
          <div className="space-y-1">
            <label className="pr-2" htmlFor="environment">
              <p className="inline font-medium">Environment</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <Controller
              name="environment"
              disabled={true}
              rules={{ required: "Environment should be select" }}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="bg-gray-50 outline-none border-[0.03rem] rounded-[0.250rem] p-1  border-gray-400 focus:border-blue-500 focus:border-[0.100rem] focus:shadow-md"
                  onClick={(event) =>
                    {field.onChange(event)
                    setSelectedTemplate(event.target.value)}
                  }
                >
                  <option value="CUG">CUG</option>
                  <option value="PROD">PROD</option>
                </select>
              )}
            />
          </div>

          <div className=" flex justify-end">
            {!isChecker ? (
              <div className="flex justify-between space-x-2">
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-red-700 hover:bg-red-600 rounded flex justify-center text-white font-semibold"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-blue-700 hover:bg-blue-600 rounded flex justify-center text-white font-semibold"
                  type="submit">
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between space-x-2">
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-green-700 hover:bg-green-600 rounded flex justify-center text-white font-semibold"
                  type="submit"
                >
                  Approve
                </button>
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-red-700 hover:bg-red-600 rounded flex justify-center text-white font-semibold"
                  type="submit"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
