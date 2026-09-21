import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                CoWork-Flex
            </Link>
            <div className="flex gap-6">
                <Link to="/"
                    className="text-gray-600 hover:text-blue-600 transition font-medium">
                    🏢 Espaces
                </Link>
                <Link to="/profile"
                    className="text-gray-600 hover:text-blue-600 transition font-medium">
                    👤 Mes Réservations
                </Link>
            </div>
        </nav>
    )
}

export default Navbar