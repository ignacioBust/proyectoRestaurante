import axios from 'axios'

const baseURL = window.location.hostname === 'localhost' 
    ? 'http://127.0.0.1:8000/api'
    : 'https://proyectorestaurante-production.up.railway.app/api'

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})



// Interceptor para agregar el token en cada request automáticamente
api.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api