import axios from 'axios';

const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL, 
  baseURL: "http://dpuat.wealthapp.hdfcbankuat.com/dp-internal/notification-admin",
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_NAME = 'X-Auth-Token'

const emptyFile = new File([], 'empty.txt')


// Define API request functions
export const fetchTemplates = () => {
  return apiClient.get('/v1/templates', {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });  
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/v1/templates/draft/${templateId}`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getTemplateAllFieldsByTemplateId = (templateId) => {
  return apiClient.get(`/v1/templates/${templateId}`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getAllTemplates = () => {
  return apiClient.get(`/v1/templates/draft`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};
export const createTemplate = (templateData, imageFile) => {
  return apiClient.post(`/v1/templates/draft?image=${imageFile}`, templateData, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const updateTemplate = (templateId, templateData, imageFile) => {
  return apiClient.put(`/v1/templates/draft/${templateId}?image=${imageFile}`, templateData, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/v1/templates/draft/${templateId}`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};
export const deleteNonApprovedTemplate = (templateId) => {
  return apiClient.delete(`templates/${templateId}`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const submitForCUG_Approval_Template = (templateData, imageFile) => {
  return apiClient.put(`/v1/templates/template/cug-approval?image=${imageFile}`, templateData , {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getTemplatesBySearchCriteria = (data) => {
  return apiClient.post(`/v1/templates`, data, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markCUGReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-reject`, comment, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markCUGApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-approved`, comment, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const submitForPRODApproval = (templateId, formData) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approval`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`
    },
  });
};

export const markCUGFailed = (templateId, formData) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-failed`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`
    },
  });
};

export const markPRODReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-reject`, comment, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const markPRODApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approved`, comment, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markPRODEnable = (templateId) => {
  return apiClient.patch(`templates/${templateId}/enable`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markPRODDisable = (templateId) => {
  return apiClient.patch(`templates/${templateId}/disable`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const getAllCUGUsers = () => {
  return apiClient.get(`/cug/users`, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

export const deleteSelectedCUGUsers = (selectedUsers) => {
  return apiClient.delete(`/cug/users`, selectedUsers, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const createNewCugUser = (user) => {
  return apiClient.post(`/cug/users`, user, {
    headers: {
      TOKEN_NAME : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
};

// LOGIN API's

export const userLogin = (data) => {
  return apiClient.post(`/v1/user/login`, data);
};
