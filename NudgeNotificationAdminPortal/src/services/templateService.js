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

apiClient.interceptors.request.use(
  (config) => {
    
    const token = sessionStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.error('Unauthorized access - logging out...');
      // Redirect to login page or show a notification
    }
    return Promise.reject(error);
  }
);

// Define API request functions
export const fetchTemplates = () => {
  return apiClient.get('/v1/templates'); // GET request to /templates
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/v1/templates/draft/${templateId}`); // GET request to /templates/:templateId
};

export const getAllTemplates = () => {
  return apiClient.get(`/v1/templates/draft`); // GET All
};

export const createTemplate = (templateData) => {
  return apiClient.post('/v1/templates/draft', templateData); // POST request to /templates
};

export const updateTemplate = (templateId, templateData) => {
  return apiClient.put(`/v1/templates/draft/${templateId}`, templateData); // PUT request to /templates/:templateId
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/v1/templates/draft/${templateId}`); // DELETE request to /templates/:templateId
};

export const submitForCUG_Approval_Template = (templateData) => {
  return apiClient.put(`/v1/templates/cug-approval`, templateData); // PUT request to /templates/cug-approval
};

export const getAllSearchTemplate = () => {
  return apiClient.get(`/v1/templates?status=APPROVAL_PENDING_CUG&status=APPROVAL_PENDING_PROD`); // GET request to /templates?status=
};

export const getAllSearchActionTemplate = () => {
  return apiClient.get(`/v1/templates?status=CUG_APPROVED&status=REJECTED&status=CUG_FAILED`); // GET request to /templates?status=
};

export const markCUGReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-reject`, comment); // PATCH request to /templates?status=
};

export const markCUGApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/cug-approved`, comment); // PATCH request to /templates?status=
};


export const submitForPRODApproval = (templateId, formData) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approval`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); 

};

export const markPRODReject = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-reject`, comment); // PATCH request to /templates?status=
};

export const markPRODApproved = (templateId, comment) => {
  return apiClient.patch(`/v1/templates/${templateId}/final-approved`, comment); // PATCH request to /templates?status=
};

// LOGIN API's

export const userLogin = (data) => {
  return apiClient.post(`/v1/user/login`, data); // LOGIN POST request to /templates?status=
};
