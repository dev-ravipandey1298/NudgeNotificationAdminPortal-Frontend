import React from 'react'

const PageHeader = ({heading}) => {
  return (
    <div className="border-b-2 border-blue-800 w-[70%] mb-3 ml-5 mt-1">
      <h2 className="font-medium text-blue-700 ml-3">{heading}</h2>
    </div>
  )
}

export default PageHeader