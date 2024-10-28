import axios from 'axios'

// Can be replaced with .env file
export const VITE_API_BASE_URL = 'https://swapi.dev/api'

const ax = axios.create({ baseURL: VITE_API_BASE_URL })

ax.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)

export default ax
