import { useEffect, useState } from "react";
import { updateTheme } from "../../api/theme";
import { useAuth } from "../../context/AuthContext";


const Theme = () => {
    const { user, setUser } = useAuth()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(true)




    const handleTheme = async (theme) => {
        setLoading(true)
        setError(null)

        try {
            const updateUser = await updateTheme(theme)
            setUser(updateUser)
            setSuccess(true)
            setLoading(false)

        } catch (error) {
            setError('Error al cambiar el tema ', error)
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Elegí tu tema</h1>
                <p className="text-gray-500 mb-8">Seleccioná el diseño visual de tu menú público.</p>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                {success && user?.theme && (
                    <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                        Tema {user?.theme} aplicado correctamente ✅
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Tema Light */}
                    <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${user?.theme === 'light' ? 'border-orange-500' : 'border-gray-100'}`}>
                        <div className="bg-white p-4 border-b border-gray-100">
                            <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                            <div className="h-2 w-24 bg-gray-100 rounded mb-3"></div>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-gray-100 rounded"></div>
                                <div>
                                    <div className="h-2 w-16 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-2 w-10 bg-orange-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1">Claro</h3>
                            <p className="text-xs text-gray-500 mb-3">Fondo blanco, estilo limpio.</p>
                            <button
                                onClick={() => handleTheme('light')}
                                disabled={loading}
                                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${user?.theme === 'light' ? 'bg-orange-500 text-white' : 'border border-orange-500 text-orange-500 hover:bg-orange-50'}`}
                            >
                                {user?.theme === 'light' ? 'Seleccionado ✓' : 'Seleccionar'}
                            </button>
                        </div>
                    </div>

                    {/* Tema Dark */}
                   
                    <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${user?.plan !== 'pro' ?  'opacity-60' : ''} ${user?.theme === 'dark' ? 'border-orange-500' : 'border-gray-100'}`}>
                        <div className="bg-gray-900 p-4 border-b border-gray-700">
                            <div className="h-3 w-16 bg-gray-600 rounded mb-2"></div>
                            <div className="h-2 w-24 bg-gray-700 rounded mb-3"></div>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-gray-700 rounded"></div>
                                <div>
                                    <div className="h-2 w-16 bg-gray-600 rounded mb-1"></div>
                                    <div className="h-2 w-10 bg-orange-400 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1">Oscuro</h3>
                            <p className="text-xs text-gray-500 mb-3">Fondo negro, estilo elegante.</p>
                            <button
                                onClick={() => user?.plan === 'pro' && handleTheme('dark')}
                                disabled={loading}
                                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${user?.theme === 'dark' ? 'bg-orange-500 text-white' : 'border border-orange-500 text-orange-500 hover:bg-orange-50'}`}
                            >
                                { user?.plan !== 'pro' ? '🔒 Solo Plan Pro' : user?.theme === 'dark' ? 'Seleccionado ✓' : 'Seleccionar'}
                            </button>
                        </div>
                    </div>

                    {/* Tema Colorful */}
                    <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${user?.plan !== 'pro' ? 'opacity-60' : ''} ${user?.theme === 'colorful' ? 'border-orange-500' : 'border-gray-100'}`}>
                        <div className="bg-gradient-to-br from-pink-400 to-orange-400 p-4 border-b border-orange-300">
                            <div className="h-3 w-16 bg-white opacity-50 rounded mb-2"></div>
                            <div className="h-2 w-24 bg-white opacity-30 rounded mb-3"></div>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-white opacity-40 rounded"></div>
                                <div>
                                    <div className="h-2 w-16 bg-white opacity-50 rounded mb-1"></div>
                                    <div className="h-2 w-10 bg-yellow-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1">Colorido</h3>
                            <p className="text-xs text-gray-500 mb-3">Colores vibrantes y llamativos.</p>
                            <button
                                onClick={() => user?.plan === 'pro' && handleTheme('colorful')}
                                disabled={loading}
                                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${user?.theme === 'colorful' ? 'bg-orange-500 text-white' : 'border border-orange-500 text-orange-500 hover:bg-orange-50'}`}
                            >
                                {user?.plan !== 'pro' ? '🔒 Solo Plan Pro' : user?.theme === 'colorful' ? 'Seleccionado ✓' : 'Seleccionar'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Theme