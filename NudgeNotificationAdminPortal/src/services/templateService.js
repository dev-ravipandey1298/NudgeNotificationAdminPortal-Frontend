import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL for your API
  baseURL: "https://dpuat.wealthapp.hdfcbankuat.com/dp/notification-portal",
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
    
//     const token = sessionStorage.getItem('authToken'); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// apiClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // Handle errors globally
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors
//       console.error('Unauthorized access - logging out...');
//       // Redirect to login page or show a notification
//     }
//     return Promise.reject(error);
//   }
// );

 

// Define API request functions
export const fetchTemplates = () => {
  return apiClient.get('/v1/templates', {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/v1/templates/draft/${templateId}`, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const getAllTemplates = () => {
  return apiClient.get(`/v1/templates/draft`, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};
export const createTemplate = (templateData) => {
  return apiClient.post('/v1/templates/draft', templateData, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const updateTemplate = (templateId, templateData) => {
  return apiClient.put(`/v1/templates/draft/${templateId}`, templateData, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/v1/templates/draft/${templateId}`, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const submitForCUG_Approval_Template = (templateData) => {
  return apiClient.put(`/v1/templates/cug-approval`, templateData, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const getAllSearchTemplate = () => {
  return apiClient.get(`/v1/templates?status=APPROVAL_PENDING_CUG&status=APPROVAL_PENDING_PROD`, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const getAllSearchActionTemplate = () => {
  return apiClient.get(`/v1/templates?status=CUG_APPROVED&status=REJECTED&status=CUG_FAILED`, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markCUGReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-reject`, comment, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markCUGApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-approved`, comment, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const submitForPRODApproval = (templateId, formData) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approval`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 

};

export const markPRODReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-reject`, comment, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

export const markPRODApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approved`, comment, {
    headers: {
      'X-Auth-Notification-Portal' : `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  }); 
};

// LOGIN API's

export const userLogin = (data) => {
  return apiClient.post(`/v1/user/login`, data); // LOGIN POST request to /templates?status=
};
