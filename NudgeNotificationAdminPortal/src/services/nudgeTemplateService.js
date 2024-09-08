import { occurrenceHoursOption } from "../constants/reoccuranceValue";

let nudgeTemplateData = [
    {   
        templateId : 1000001,
        templateName : "Birthday Wishes",
        title: "Happy Birthday",
        body: "Wish you a very Happy Birthday",
        startDate: "2024-08-01",
        endDate: "2025-08-01",
        occurrenceFrequency: [],
        occurrenceUnit: [],
        occurrenceDays: [],
        occurrenceHours : [],
        createdBy: '',
        createdOn: '',
        approvedBy: '',
        status : ''
    }
]; 

export const setDataInLocalStorage = () => {
    localStorage.getItem('nudgeTempDataLocal') === null &&
    localStorage.setItem('nudgeTempDataLocal', JSON.stringify(nudgeTemplateData))
}

export const getNudgeTemplateData = () => {
    const nudgeTemplateData_LS = localStorage.getItem('nudgeTempDataLocal');
    return JSON.parse(nudgeTemplateData_LS)
}

export const getNudgeTemplateDataById = (templateId) => {
    return getNudgeTemplateData().filter(template => template.templateId == templateId);
}

export const createNudgeTemplateData = (nudgeData) => {
    // console.log(nudgeData)
    nudgeTemplateData = getNudgeTemplateData();
    nudgeTemplateData.push(nudgeData)
    localStorage.setItem('nudgeTempDataLocal', JSON.stringify(nudgeTemplateData))
    return "Template Created Sucessfully."
}

export const genrateNewTemplateId =  () => {
    let newTemplateId = null;
    if (nudgeTemplateData.length > 0) {
        const lastTemplateId = getNudgeTemplateData()[getNudgeTemplateData().length - 1].templateId;
        newTemplateId = lastTemplateId + 1;
        // Your logic here
    } else {
        newTemplateId = 1000001
    }
    return newTemplateId;
}

export const getAllDraftNudgeTemplate = () => {
    return getNudgeTemplateData().filter(template => template.status === 'draft');
}


export const getAllPendingNudgeTemplatesForApproval = () => {
    return getNudgeTemplateData().filter(template => (template.status === 'pending_approval_cug' || template.status === 'pending_approval_prod'));
}
