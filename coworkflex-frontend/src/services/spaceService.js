import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const headers = {
    'X-User-Id': '1'
}

export const getAllSpaces = async (city, capacity) => {
    const params = {}
    if (city) params.city = city
    if (capacity) params.capacity = capacity

    const response = await axios.get(`${API_URL}/spaces`, { headers, params })
    return response.data
}