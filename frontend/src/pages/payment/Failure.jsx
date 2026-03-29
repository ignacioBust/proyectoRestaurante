import { useNavigate } from 'react-router-dom'

const Failure = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
                <div className="text-6xl mb-4">❌</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Pago fallido</h1>
                <p className="text-gray-500 mb-6">Hubo un problema con tu pago. Podés intentarlo de nuevo cuando quieras.</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                >
                    Volver al dashboard
                </button>
            </div>
        </div>
    )
}

export default Failure