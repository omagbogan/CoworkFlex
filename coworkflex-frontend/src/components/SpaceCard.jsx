function SpaceCard({ space, onSelect }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
             onClick={() => onSelect(space)}>
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800">{space.name}</h2>
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                    {space.city}
                </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{space.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-gray-600">
                    👥 Capacité : <strong>{space.capacity} personnes</strong>
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    Voir les bureaux
                </button>
            </div>
        </div>
    )
}

export default SpaceCard