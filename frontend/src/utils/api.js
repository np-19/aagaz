const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Quiz API functions
export const quizAPI = {
  // Get quiz questions for a specific grade
  getQuestions: (grade) => apiCall(`/quiz/${grade}`),
  
  // Submit quiz answers and get recommendations
  submitAnswers: (data) => apiCall('/quiz/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Career API functions
export const careerAPI = {
  // Get all career clusters
  getClusters: () => apiCall('/careers/clusters'),
  
  // Search careers
  search: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/careers/search?${queryString}`);
  },
  
  // Get careers by cluster
  getByCluster: (clusterName) => apiCall(`/careers/cluster/${clusterName}`),
  
  // Get specific career details
  getDetails: (careerCode) => apiCall(`/careers/${careerCode}`),
};

// College API functions
export const collegeAPI = {
  // Get all colleges
  getAll: () => apiCall('/colleges'),
  
  // Search colleges
  search: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/colleges/search?${queryString}`);
  },
  
  // Get colleges by type
  getByType: (type) => apiCall(`/colleges/type/${type}`),
  
  // Get specific college details
  getDetails: (collegeName) => apiCall(`/colleges/${collegeName}`),
};

// Recommendation API functions
export const recommendationAPI = {
  // Get personalized recommendations
  getPersonalized: (data) => apiCall('/recommendations/personalized', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Get trending careers
  getTrending: () => apiCall('/recommendations/trending'),
};

// User API functions
export const userAPI = {
  // Save quiz results
  saveQuizResults: (data) => apiCall('/user/quiz-results', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Get quiz history
  getQuizHistory: (userId) => apiCall(`/user/${userId}/quiz-history`),
  
  // Save user preferences
  savePreferences: (data) => apiCall('/user/preferences', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Get user preferences
  getPreferences: (userId) => apiCall(`/user/${userId}/preferences`),
  
  // Get dashboard data
  getDashboardData: (userId) => apiCall(`/user/${userId}/dashboard`),
};

// Health check
export const healthCheck = () => apiCall('/health');
