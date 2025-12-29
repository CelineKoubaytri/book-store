const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Helper to get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('session-id');
  if (!sessionId) {
    sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session-id', sessionId);
  }
  return sessionId;
};

// Helper to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const sessionId = getSessionId();
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': sessionId,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Books API
export const booksAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/books${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },
  
  getById: async (id) => {
    return apiRequest(`/books/${id}`);
  },
  
  create: async (bookData) => {
    return apiRequest('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  },
  
  update: async (id, bookData) => {
    return apiRequest(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  },
  
  delete: async (id) => {
    return apiRequest(`/books/${id}`, {
      method: 'DELETE',
    });
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    return apiRequest('/cart');
  },
  
  add: async (bookId, quantity = 1) => {
    return apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ bookId, quantity }),
    });
  },
  
  update: async (bookId, quantity) => {
    return apiRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ bookId, quantity }),
    });
  },
  
  remove: async (bookId) => {
    return apiRequest(`/cart/remove/${bookId}`, {
      method: 'DELETE',
    });
  },
  
  clear: async () => {
    return apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    return apiRequest('/orders');
  },
  
  getById: async (id) => {
    return apiRequest(`/orders/${id}`);
  },
  
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

