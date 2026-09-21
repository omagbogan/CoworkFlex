import { useState, useEffect } from 'react'
import { getDesksBySpace, createReservation } from '../services/reservationService'

function ReservationModal({ space, onClose }) {
    const [desks, setDesks] = useState([])
    const [selectedDesk, setSelectedDesk] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const now = new Date().toISOString().slice(0, 16)

    useEffect(() => {
        const fetchDesks = async () => {
            try {
                const data = await getDesksBySpace(space.id)
                setDesks(data)
            } catch (error) {
                console.error('Erreur chargement bureaux', error)
            }
        }
        fetchDesks()
    }, [space.id])

    const handleSubmit = async () => {
        if (!selectedDesk || !startDateTime || !endDateTime) {
            setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' })
            return
        }

        try {
            setLoading(true)
            await createReservation({
                userId: 1,
                deskId: parseInt(selectedDesk),
                startDateTime: startDateTime,
                endDateTime: endDateTime
            })
            setMessage({ type: 'success', text: 'Réservation confirmée avec succès !' })
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Erreur lors de la réservation'
            })
        } finally {
            setLoading(false)
        }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">

                {/* En-tête */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Réserver un bureau
                    </h2>
                    <button onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                        ✕
                    </button>
                </div>

                <p className="text-gray-500 mb-6">
                    📍 {space.name} — {space.city}
                </p>

                {/* Choix du bureau */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de bureau
                    </label>
                    <select
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedDesk}
                        onChange={(e) => setSelectedDesk(e.target.value)}>
                        <option value="">Choisir un bureau...</option>
                        {desks.map(desk => (
                            <option key={desk.id} value={desk.id}>
                                {deskTypeLabel(desk.type)} — {desk.price}€/jour
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date de début */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date et heure de début
                    </label>
                    <input
                        type="datetime-local"
                        min={now}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                    />
                </div>

                {/* Date de fin */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date et heure de fin
                    </label>
                    <input
                        type="datetime-local"
                        min={now}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                    />
                </div>

                {/* Message de succès ou d'erreur */}
                {message && (
                    <div className={`p-3 rounded-lg mb-4 text-sm ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Boutons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                        {loading ? 'En cours...' : 'Confirmer'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReservationModal