import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, // Base URL for your API
  baseURL: "http://localhost:8080",
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Example of handling request interceptors
// apiClient.interceptors.request.use(
//   (config) => {
//     // You can add authentication tokens or other headers here
//     const token = localStorage.getItem('authToken'); // Example: Fetch token from local storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Example of handling response interceptors
// apiClient.interceptors.response.use(
//   (response) => {
//     return response.data; // Modify or transform the response data if needed
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
  return apiClient.get('/templates'); // GET request to /templates
};

export const getTemplateById = (templateId) => {
  return apiClient.get(`/notification-portal/templates/draft/${templateId}`); // GET request to /templates/:templateId
};

export const getAllTemplates = () => {
  return apiClient.get(`/notification-portal/templates/draft`); // GET All
};

export const createTemplate = (templateData) => {
  return apiClient.post('/notification-portal/templates/draft', templateData); // POST request to /templates
};

export const updateTemplate = (templateId, templateData) => {
  return apiClient.put(`/notification-portal/templates/draft/${templateId}`, templateData); // PUT request to /templates/:templateId
};

export const deleteTemplate = (templateId) => {
  return apiClient.delete(`/notification-portal/templates/draft/${templateId}`); // DELETE request to /templates/:templateId
};
