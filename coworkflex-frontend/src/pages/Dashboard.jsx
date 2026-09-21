import { useState, useEffect } from 'react'
import { getAllSpaces } from '../services/spaceService'
import SpaceCard from '../components/SpaceCard'
import ReservationModal from '../components/ReservationModal'

function Dashboard() {
    const [spaces, setSpaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchCity, setSearchCity] = useState('')
    const [searchCapacity, setSearchCapacity] = useState('')
    const [selectedSpace, setSelectedSpace] = useState(null)

    useEffect(() => {
        fetchSpaces()
    }, [])

    const fetchSpaces = async (city, capacity) => {
        try {
            setLoading(true)
            const data = await getAllSpaces(city, capacity)
            setSpaces(data)
        } catch (error) {
            console.error('Erreur lors du chargement des espaces', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        fetchSpaces(searchCity, searchCapacity || undefined)
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Espaces de Coworking
            </h1>
            <p className="text-gray-500 mb-8">
                Trouvez et réservez votre espace de travail idéal
            </p>

            {/* Barre de recherche */}
            <div className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
                <input
                    type="text"
                    placeholder="🔍 Rechercher par ville..."
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Capacité min..."
                    className="w-40 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchCapacity}
                    onChange={(e) => setSearchCapacity(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Rechercher
                </button>
            </div>

            {/* Liste des espaces */}
            {loading ? (
                <p className="text-center text-gray-400">Chargement...</p>
            ) : spaces.length === 0 ? (
                <p className="text-center text-gray-400">Aucun espace trouvé.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spaces.map(space => (
                        <SpaceCard
                            key={space.id}
                            space={space}
                            onSelect={setSelectedSpace}
                        />
                    ))}
                </div>
            )}

            {/* Modal de réservation */}
            {selectedSpace && (
                <ReservationModal
                    space={selectedSpace}
                    onClose={() => setSelectedSpace(null)}
                />
            )}
        </div>
    )
}

export default Dashboard