import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    <span className="text-xl font-bold text-gray-800">MenuQR</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2"
                    >
                        Iniciar sesión
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Empezar gratis
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
                    🚀 100% gratis para empezar
                </span>
                <h1 className="text-5xl font-bold text-gray-800 mt-6 mb-4 leading-tight">
                    El menú digital con QR para tu restaurante
                </h1>
                <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                    Creá tu menú digital en minutos, generá un código QR y tus clientes lo ven desde el celular. Sin papel, sin complicaciones.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors duration-200"
                    >
                        Crear mi menú gratis
                    </button>
                    <button
                        onClick={() => navigate('/menu/2')}
                        className="border border-gray-300 hover:border-gray-400 text-gray-600 font-semibold px-8 py-3 rounded-xl text-lg transition-colors duration-200"
                    >
                        Ver demo
                    </button>
                </div>
            </section>

            {/* Cómo funciona */}
            <section className="bg-orange-50 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">¿Cómo funciona?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="font-bold text-gray-800 mb-2">1. Registrate</h3>
                            <p className="text-gray-500 text-sm">Creá tu cuenta gratis en menos de un minuto.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">🍕</div>
                            <h3 className="font-bold text-gray-800 mb-2">2. Cargá tu menú</h3>
                            <p className="text-gray-500 text-sm">Agregá tus categorías y platos con fotos y precios.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="font-bold text-gray-800 mb-2">3. Compartí el QR</h3>
                            <p className="text-gray-500 text-sm">Descargá el QR y ponelo en tus mesas. ¡Listo!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Características */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Todo lo que necesitás</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 text-left p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl">📋</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Menú digital</h3>
                                <p className="text-gray-500 text-sm">Actualizá precios y platos en tiempo real desde cualquier dispositivo.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-left p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl">📱</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Código QR</h3>
                                <p className="text-gray-500 text-sm">Generá y descargá tu QR personalizado para poner en las mesas.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-left p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl">🎨</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Diseño atractivo</h3>
                                <p className="text-gray-500 text-sm">Temas visuales profesionales para que tu menú luzca increíble.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-left p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl">⚡</span>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Fácil de usar</h3>
                                <p className="text-gray-500 text-sm">Sin conocimientos técnicos. Si sabés usar WhatsApp, sabés usar MenuQR.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Precios */}
            <section className="bg-orange-50 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Precios simples</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 text-xl mb-2">Gratis</h3>
                            <div className="text-4xl font-bold text-gray-800 mb-6">$0<span className="text-lg text-gray-400">/mes</span></div>
                            <ul className="space-y-3 text-sm text-gray-600 mb-8 text-left">
                                <li>✅ Menú digital con QR</li>
                                <li>✅ 1 tema visual</li>
                                <li>✅ Actualizaciones ilimitadas</li>
                                <li>❌ Estadísticas de escaneos</li>
                                <li>❌ QR personalizado con logo</li>
                            </ul>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2.5 rounded-lg transition-colors duration-200"
                            >
                                Empezar gratis
                            </button>
                        </div>
                        <div className="bg-orange-500 rounded-2xl p-8 shadow-sm">
                            <h3 className="font-bold text-white text-xl mb-2">Pro</h3>
                            <div className="text-4xl font-bold text-white mb-6">$10<span className="text-lg text-orange-200">/mes</span></div>
                            <ul className="space-y-3 text-sm text-orange-100 mb-8 text-left">
                                <li>✅ Todo lo del plan gratis</li>
                                <li>✅ 3+ temas visuales</li>
                                <li>✅ Estadísticas de escaneos</li>
                                <li>✅ QR personalizado con logo</li>
                                <li>✅ Soporte prioritario</li>
                            </ul>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full bg-white text-orange-500 hover:bg-orange-50 font-semibold py-2.5 rounded-lg transition-colors duration-200"
                            >
                                Empezar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Listo para digitalizar tu menú?</h2>
                    <p className="text-gray-500 mb-8">Únete a los restaurantes que ya usan MenuQR. Es gratis y lleva menos de 5 minutos.</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors duration-200"
                    >
                        Crear mi menú gratis ahora
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-6 text-center text-gray-400 text-sm">
                © 2026 MenuQR. Todos los derechos reservados.
            </footer>

        </div>
    )
}

export default Landing