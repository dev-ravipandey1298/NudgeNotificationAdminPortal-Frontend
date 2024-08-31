import React, { useState } from 'react'

const Alert = ({alertDetail}) => {

    return (
        <div className={`h-10 rounded-md ${!alertDetail.isWarn ? 'bg-green-600' : 'bg-red-600'}  w-[30rem] mx-auto flex items-center`}>
            <p className='pl-3 text-lg font-semibold'>{}</p>
        </div>
    )
}

export default Alert;