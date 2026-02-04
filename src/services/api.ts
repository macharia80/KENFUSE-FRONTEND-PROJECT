import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kenfuse_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('kenfuse_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('kenfuse_token')
    return Promise.resolve()
  }
}

// Memorials API
export const memorialsAPI = {
  getAll: () => api.get('/memorials'),
  getById: (id: number) => api.get(`/memorials/${id}`),
  create: (data: any) => api.post('/memorials', data),
  update: (id: number, data: any) => api.put(`/memorials/${id}`, data),
  delete: (id: number) => api.delete(`/memorials/${id}`),
  getPDF: (id: number) => 
    api.get(`/memorials/${id}/pdf`, { 
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    }),
}

// Wills API
export const willsAPI = {
  getAll: () => api.get('/wills'),
  getById: (id: number) => api.get(`/wills/${id}`),
  create: (data: any) => api.post('/wills', data),
  update: (id: number, data: any) => api.put(`/wills/${id}`, data),
  delete: (id: number) => api.delete(`/wills/${id}`),
  getPDF: (id: number) => 
    api.get(`/wills/${id}/pdf`, { 
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    }),
}

// Beneficiaries API
export const beneficiariesAPI = {
  getAll: () => api.get('/beneficiaries'),
  create: (data: any) => api.post('/beneficiaries', data),
  update: (id: number, data: any) => api.put(`/beneficiaries/${id}`, data),
  delete: (id: number) => api.delete(`/beneficiaries/${id}`),
}

export default api
