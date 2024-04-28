const API_URL = import.meta.env.VITE_APIURL
import axios from "axios"

const api = axios.create({
    baseURL: API_URL as string
})

export default api