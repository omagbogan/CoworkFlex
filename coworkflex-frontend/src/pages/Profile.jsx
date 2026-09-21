import { useState, useEffect } from 'react'
import { getUserReservations, cancelReservation } from '../services/reservationService'

function Profile() {
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = async () => {
        try {
            setLoading(true)
            const data = await getUserReservations(1)
            setReservations(data)
        } catch (error) {
            console.error('Erreur chargement réservations', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async (id) => {
        try {
            await cancelReservation(id)
            setMessage({ type: 'success', text: 'Réservation annulée avec succès' })
            fetchReservations()
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Erreur lors de l\'annulation'
            })
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const deskTypeLabel = (type) => {
        switch(type) {
            case 'OPEN_SPACE': return 'Open Space'
            case 'BUREAU_PRIVE': return 'Bureau Privé'
            case 'SALLE_REUNION': return 'Salle de Réunion'
            default: return type
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Mes Réservations
            </h1>
            <p className="text-gray-500 mb-8">
                Historique et gestion de vos réservations
            </p>

            {/* Message */}
            {message && (
                <div className={`p-4 rounded-lg mb-6 ${
                    message.type === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Tableau des réservations */}
            {loading ? (
                <p className="text-center text-gray-400">Chargement...</p>
            ) : reservations.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-5xl mb-4">📋</p>
                    <p>Aucune réservation pour l'instant</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Espace</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Bureau</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Début</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Fin</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Statut</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reservations.map(reservation => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {reservation.desk.space.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {deskTypeLabel(reservation.desk.type)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(reservation.startDateTime)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(reservation.endDateTime)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                            reservation.status === 'CONFIRMED'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {reservation.status === 'CONFIRMED' ? 'Confirmée' : 'Annulée'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {reservation.status === 'CONFIRMED' && (
                                            <button
                                                onClick={() => handleCancel(reservation.id)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium transition">
                                                Annuler
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Profile