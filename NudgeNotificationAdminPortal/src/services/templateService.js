import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL for your API
  baseURL: "http://localhost:8080/notification-portal",
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
  return apiClient.get('/templates'); 
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/templates/draft/${templateId}`); 
};

export const getAllTemplates = () => {
  return apiClient.get(`/templates/draft`); 
};
export const createTemplate = (templateData) => {
  return apiClient.post('/templates/draft', templateData); 
};

export const updateTemplate = (templateId, templateData) => {
  return apiClient.put(`/templates/draft/${templateId}`, templateData); 
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/templates/draft/${templateId}`); 
};

export const submitForCUG_Approval_Template = (templateData) => {
  return apiClient.put(`/templates/cug-approval`, templateData ); 
};

export const getTemplatesBySearchCriteria = (data) => {
  return apiClient.post(`/templates`, data); 
};

export const markCUGReject = (templateId, comment) => {
  return apiClient.patch(`/templates/${templateId}/cug-reject`, comment); 
};

export const markCUGApproved = (templateId, comment) => {
  return apiClient.patch(`/templates/${templateId}/cug-approved`, comment); 
};

export const submitForPRODApproval = (templateId, formData) => {
  return apiClient.patch(`/templates/${templateId}/final-approval`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const markPRODReject = (templateId, comment) => {
  return apiClient.patch(`/templates/${templateId}/final-reject`, comment); 
};

export const markPRODApproved = (templateId, comment) => {
  return apiClient.patch(`/templates/${templateId}/final-approved`, comment); 
};

// LOGIN API's

export const userLogin = (data) => {
  return apiClient.post(`/v1/user/login`, data); // LOGIN POST request to /templates?status=
};
