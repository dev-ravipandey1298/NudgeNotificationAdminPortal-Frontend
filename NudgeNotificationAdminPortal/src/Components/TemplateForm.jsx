import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const TemplateForm = () => {

  const { register, handleSubmit, control, reset } = useForm(
    {
      defaultValues: {
        selectedItems: [] // Default value for multiple selections
      }
    }
  );


  const navigate = useNavigate();
  const [isChecker, setIsChecker] = useState(false);
  const [errorPayload, setErrorPayload] = useState("");
  const [errorQuery, setErrorQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [alertDetail, setAlertDetail] = useState({ message: "", isWarn: false })
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("user"))
    userDetails !== null ? setIsChecker(userDetails.role === "CHECKER") : navigate("/login")
  }, [])


  const daysOption = [
    { label: 'Day 1', value: '1' },
    { label: 'Day 2', value: '2' },
    { label: 'Day 3', value: '3' },
    { label: 'Day 4', value: '4' },
    { label: 'Day 5', value: '5' },
    { label: 'Day 6', value: '6' },
    { label: 'Day 7', value: '7' },
    { label: 'Day 8', value: '8' },
    { label: 'Day 9', value: '9' },
    { label: 'Day 10', value: '10' },
    { label: 'Day 11', value: '11' },
    { label: 'Day 12', value: '12' },
    { label: 'Day 13', value: '13' },
    { label: 'Day 14', value: '14' },
    { label: 'Day 15', value: '15' },
    { label: 'Day 16', value: '16' },
    { label: 'Day 17', value: '17' },
    { label: 'Day 18', value: '18' },
    { label: 'Day 19', value: '19' },
    { label: 'Day 20', value: '20' },
    { label: 'Day 21', value: '21' },
    { label: 'Day 22', value: '22' },
    { label: 'Day 23', value: '23' },
    { label: 'Day 24', value: '24' },
    { label: 'Day 25', value: '25' },
    { label: 'Day 26', value: '26' },
    { label: 'Day 27', value: '27' },
    { label: 'Day 28', value: '28' },
    { label: 'Day 29', value: '29' },
    { label: 'Day 30', value: '30' },
    { label: 'Day 31', value: '31' }, 
  ];

  const weekOption =  [
    { label: 'Day 1', value: '1' },
    { label: 'Day 2', value: '2' },
    { label: 'Day 3', value: '3' },
    { label: 'Day 4', value: '4' },
    { label: 'Day 5', value: '5' },
    { label: 'Day 6', value: '6' },
    { label: 'Day 7', value: '7' }
  ]

  const templateJSON = {
    title: "Nudge Notification",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, repudiandae illo ullam rem cum soluta iste vero autem at tempora!",
    comment: ""
  };



  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);

    console.log("Clicked Radio");
    console.log(selectedOption);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log("submit clicked === :");
    console.log(data);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //   const validateSqlQuery = (query) => {
  //     if (query === undefined || query === "") {
  //       setErrorQuery("");
  //       return true;
  //     } else {
  //       const trimmedQuery = query.trim();
  //       // const isSelectQuery = /^SELECT\b/i.test(trimmedQuery);
  //       // /^(?=.*SELECT.*FROM)(?!.*(?:CREATE|DROP|UPDATE|INSERT|ALTER|DELETE|ATTACH|DETACH)).*$/
  //       const isSelectQuery =
  //         /^(?=.*SELECT.*FROM.)(?!.*(?:CREATE|DROP|UPDATE|INSERT|ALTER|DELETE|ATTACH|DETACH)).*$/.test(
  //           trimmedQuery.toUpperCase()
  //         );
  //       // const isSelectQuery =
  //       //     /^SELECT|select\b(?!.*\b(insert|delete|update|INSERT|DELETE|UPDATE)\b).+$/i.test(
  //       //         trimmedQuery,
  //       //     );
  //       isSelectQuery
  //         ? setErrorQuery("")
  //         : setErrorQuery("*Query should be a valid SELECT statement");
  //       return isSelectQuery;
  //     }
  //   };

  const validatePayload = (payload) => {
    if (payload === undefined || payload === "") {
      setErrorPayload("");
      return true;
    } else {
      try {
        setErrorPayload("");
        JSON.parse(payload);
      } catch (e) {
        setErrorPayload("Payload should be in JSON format.");
        return false;
      }
      return true;
    }
  };

  return (
    <div className="bg-fuchsia-50">
      <div onClick={() => setShowTemplate(false)} className="text-blue-500 underline p-2 hover:cursor-pointer">
        Back
      </div>
      <div className="pt-7">
        {showAlert && <Alert alertDetail={alertDetail} />}
      </div>
      <h1 className="mx-auto flex justify-center  text-2xl font-bold">
        Nudge Template Creator
      </h1>
      <div className="mx-auto flex justify-center pt-12 p-4 ">
        <form
          className="p-8 pb-12 outline-none border-[0.22rem] border-blue-500 rounded-lg p-1 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Template Type Select Box  */}
          {/* <div className="space-y-1">
                        <label className="pr-2" htmlFor="templateType">
                            <p className="inline font-medium">Template Type</p>
                            <p className="text-red-500 inline">*</p>:
                        </label>
                        <Controller
                            name="Template Type"
                            rules={{ required: "Please select template type" }}
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="outline-none border-2 border-gray-300 focus:border-blue-500 focus:border-blue-500 rounded-lg p-2 "
                                    onClick={(event) =>
                                        setSelectedTemplate(event.target.value)
                                    }
                                >
                                    <option value="">Select Type</option>
                                    <option value="All">All</option>
                                    <option value="Common">Common</option>
                                    <option value="Parameter">Parameter</option>
                                </select>
                            )}
                        />
                    </div> */}

          {/* Title box */}
          <div className="space-y-1">
            <label htmlFor="title">
              <p className="inline font-medium">Title</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <br />
            {
              <input
                className={`outline-none border-2 rounded-lg p-1 w-full ${!isChecker
                    ? "border-gray-300 focus:border-blue-500 "
                    : "focus:border-grey-500]"
                  }`}
                {...register("title")}
                {...(isChecker && {
                  value: templateJSON.title,
                  readOnly: "readOnly",
                })}
              />
            }
          </div>

          {/* Body Text Filed */}
          <div className="space-y-1">
            <label htmlFor="body">
              <p className="inline font-medium">Body</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <br />
            <Controller
              name="Body"
              control={control}
              rules={{
                required: true,
                validate: {
                  maxLength: (value) => value.length >= 1,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <textarea
                  className={`outline-none border-2 rounded-lg p-1 ${!isChecker
                      ? "border-gray-300 focus:border-blue-500"
                      : "focus:border-grey-500"
                    }`}
                  cols={40}
                  placeholder="Body"
                  rows={4}
                  onChange={onChange}
                  readOnly={isChecker}
                  value={!isChecker ? value : templateJSON.body}
                />
              )}
            />
          </div>

          {/* Payload */}
          <div className="space-y-1">
            <label className="" htmlFor="payload">
              <p className="inline font-medium">Payload</p>:
            </label>

            <Controller
              name="payload"
              control={control}
              rules={{
                validate: validatePayload,
              }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <textarea
                    className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
                    placeholder="Payload should be in JSON format"
                    cols={40}
                    rows={8}
                    onChange={onChange}
                    value={value}
                  />
                  {errorPayload !== "" && (
                    <p className="text-red-500 font-medium">{errorPayload}</p>
                  )}
                </div>
              )}
            />
          </div>


          <div>
            <label htmlFor="execution">
              <p className="inline font-medium">Execution at every</p>
              <p className="text-red-500 inline">*</p>:
            </label>
          </div>

          <div className="flex space-x-3">
            <div className="space-y-1 flex items-center">
              <label className="pr-2" htmlFor="selectedDays">
                <p className="inline font-medium">Month</p>
                <p className="text-red-500 inline">*</p>:
              </label>
              <Controller
                name="selectedDays"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    options={daysOption}
                    value={value || []}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelledBy="Days"
                    name={name}
                  />
                )}
              />
            </div>

            <div className="space-y-1 flex items-center">
              <label className="pr-2" htmlFor="selectedWeeks">
                <p className="inline font-medium">Week</p>
                <p className="text-red-500 inline">*</p>:
              </label>
              <Controller
                name="selectedWeeks"
                control={control}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <MultiSelect
                    options={weekOption}
                    value={value || []}
                    onChange={onChange}
                    onBlur={onBlur}
                    labelledBy="Weeks"
                    name={name}
                  />
                )}
              />
            </div>

          </div>

          <div className="space-y-1">
              <label className="pr-2" htmlFor="hours">
                <p className="inline font-medium">Hours</p>
                <p className="text-red-500 inline">*</p>:
              </label>
              <Controller
                name="Hours"
                rules={{ required: "Please select template type" }}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="outline-none border-2 border-gray-300 focus:border-blue-500 focus:border-blue-500 rounded-lg p-2 "
                    onClick={(event) =>
                      setSelectedTemplate(event.target.value)
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                )}
              />
            </div>

          {/* <div className="space-y-1">
            <label htmlFor="execDaysOfWeek">
              <p className="inline font-medium">Execution By</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <label>
              <input
                type="radio"
                className="m-1 ml-2"
                value="daysOfMonth"
                onClick={handleRadioChange}
                {...register("radioOption", { required: true })}
              />
              day's of month
            </label>
            <label>
              <input
                type="radio"
                value="daysOfWeek"
                className="m-1 ml-2"
                onClick={handleRadioChange}
                {...register("radioOption", { required: true })}
              />
              day's of week
            </label>
            <label>
              <input
                type="radio"
                value="both"
                className="m-1 ml-2"
                onClick={handleRadioChange}
                {...register("radioOption", { required: true })}
              />
              both
            </label>
          </div> */}

          {/* Execution day of month's */}
          {/* <div className="space-y-1">
            {(selectedOption === "daysOfMonth" ||
              selectedOption === "both") && (
              <div>
                <label htmlFor="execDaysOfMonth">
                  <p className="inline font-medium">Execution days of month</p>
                  <p className="text-red-500 inline">*</p>:
                </label>

                <input
                  className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
                  placeholder="Use , to seprate value"
                  {...register("execDaysOfMonth")}
                />
              </div>
            )}
          </div> */}
          {/* Execution week of month's */}
          {/* <div className="space-y-1">
            
            {(selectedOption === "daysOfWeek" || selectedOption === "both") && (
              <div>
                <label htmlFor="execDaysOfWeek">
                  <p className="inline font-medium">Execution days of week</p>
                  <p className="text-red-500 inline">*</p>:
                </label>
                <br />
                <input
                  className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
                  placeholder="Use , to seprate value"
                  {...register("execDaysOfWeek")}
                />
              </div>
            )}
          </div> */}
          {/* <div className="space-y-1">
            {(selectedOption === "daysOfWeek" ||
              selectedOption === "both" ||
              selectedOption === "daysOfMonth") && (
              <div>
                <label htmlFor="execTime">
                  <p className="inline font-medium">Execution Time</p>
                  <p className="text-red-500 inline">*</p>:
                </label>

                <br />

                <input
                  className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
                  placeholder="Use , to seprate value"
                  {...register("execTime")}
                />
              </div>
            )}
          </div> */}


          <div className="space-y-1">
            {/* Image URL */}
            <label htmlFor="img">
              <p className="inline font-medium">Image</p>
              <p className="text-red-500 inline">*</p>:
            </label>
            <br />
            <input
              type="file"
              onChange={handleFileChange}
              className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
              {...register("img")}
            />
          </div>

          {/* Query */}
          {/* <div className="space-y-1">
            <label htmlFor="query">
              <p className="inline font-medium">Query</p>:
            </label>
            <br />
            <Controller
              name="query"
              control={control}
              rules={{
                validate: validateSqlQuery,
              }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <textarea
                    className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
                    cols={50}
                    placeholder="Provide your SQL Query that should be an SELECT Query"
                    rows={5}
                    onChange={onChange}
                    value={value}
                  />
                  {errorQuery !== "" && (
                    <p className="text-red-500 font-medium">{errorQuery}</p>
                  )}
                </div>
              )}
            />
          </div> */}

          {/* Auto Scheduled */}
          {/* <div className="space-y-1">
            {selectedTemplate === "All" && (
              <label className="flex w-fit" htmlFor="autoScheduled">
                Auto Scheduled:
                <input
                  className="m-1 mt-[7.5px]"
                  type="checkbox"
                  id="autoScheduled"
                  {...register("autoScheduled")}
                />
              </label>
            )}
          </div> */}

          {/* Comment */}
          {isChecker && (
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
                      className="outline-none border-2 border-gray-300 focus:border-blue-500 rounded-lg p-1"
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
          )}
          <div className=" flex justify-end">
            {!isChecker ? (
              <div className="flex justify-between space-x-2">
                <button
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-red-500 hover:bg-red-700 rounded flex justify-center text-white font-semibold"
                  type="button"
                  onClick={reset}
                >
                  Reset
                </button>
                <input
                  className="mt-4 w-[5.5rem] p-2 px-4 bg-sky-500 hover:bg-sky-700 rounded flex justify-center text-white font-semibold"
                  type="submit"
                />
              </div>
            ) : (
              <div className="flex justify-between space-x-2">
                <button
                  className="mt-4 w-fit p-2 px-4 bg-blue-700 hover:bg-blue-600 rounded flex justify-center text-white font-semibold"
                  type="submit"
                >
                  {templateJSON.comment.length > 0 ? 'Update Your Comment' : 'Post a Comment'}
                </button>
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
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
