import axios from 'axios';
import Cookies from 'js-cookie'; // Import ini G!

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Interceptor maut buat nempelin token otomatis
api.interceptors.request.use((config) => {
    // Ambil token dari Cookies, pastiin namanya "auth_token" sesuai AuthProvider lu
    const token = Cookies.get('auth_token'); 
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;