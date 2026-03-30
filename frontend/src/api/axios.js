import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})
console.log('API URL:', import.meta.env.VITE_API_URL)


// Interceptor para agregar el token en cada request automáticamente
api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api