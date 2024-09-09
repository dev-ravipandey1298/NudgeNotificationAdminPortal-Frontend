import React, { useEffect, useState } from 'react'

const FilterSelector = ({ checkboxes, handleCheckboxChange }) => {
    // const handleCheckboxChange = (event) => {
    //     const { value, checked } = event.target;
    //     console.log(value)
    //     console.log(checked)
    //     onCheckboxChange(value, checked);
    //   };
    
    return (
        <div className='w-[11.5] p-2 border absolute bottom-[25rem]  bg-white'>
            <div className="">
                <input onChange={handleCheckboxChange} checked={selectedValues.includes('pending_approval_prod')} type="checkbox" id="checkbox2" className="h-[0.60rem] w-[0.60rem]" name="pendingPROD" value="pending_approval_prod" />
                <label className="font-semibold text-red-700 text-sm font-mono" for="pendingPROD"> pending_approval_prod</label>
            </div>
            <div className="">
                <input onChange={handleCheckboxChange} checked={selectedValues.includes('pending_approval_cug')} type="checkbox" id="checkbox3" className="h-[0.60rem] w-[0.60rem]" name="pendingCUG" value="pending_approval_cug" />
                <label className="font-semibold text-red-700 text-sm font-mono" for="pendingCUG"> pending_approval_cug</label>
            </div>
        </div>
    )
}

export default FilterSelector