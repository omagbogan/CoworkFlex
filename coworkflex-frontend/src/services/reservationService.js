import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const headers = {
    'X-User-Id': '1'
}

export const getDesksBySpace = async (spaceId) => {
    const response = await axios.get(`${API_URL}/spaces/${spaceId}/desks`, { headers })
    return response.data
}

export const createReservation = async (reservation) => {
    const response = await axios.post(`${API_URL}/reservations`, reservation, { headers })
    return response.data
}

export const getUserReservations = async (userId) => {
    const response = await axios.get(`${API_URL}/reservations/user/${userId}`, { headers })
    return response.data
}

export const cancelReservation = async (id) => {
    const response = await axios.delete(`${API_URL}/reservations/${id}`, { headers })
    return response.data
}