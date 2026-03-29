import { useState } from "react";
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from "react-router-dom";


const Login = () => {

    const { login } = useAuth()
    const navigate = useNavigate()
    const [ form, setForm ] = useState({ email: '', password: '' })
    const [error, setError] = useState(null);


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try{
            await login( form.email, form.password )
            navigate('/dashboard')
        }catch (err){
            setError('Credenciales incorrectas. Intentá de nuevo.')
        }
    }


    return (
         <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="text-4xl mb-2">🍽️</div>
                    <h1 className="text-2xl font-bold text-gray-800">MenuQR</h1>
                    <p className="text-gray-500 text-sm mt-1">Iniciá sesión en tu cuenta</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                        Registrate gratis
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login