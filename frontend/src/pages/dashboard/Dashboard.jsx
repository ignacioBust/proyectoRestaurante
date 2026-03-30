import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react'
import { payment } from "../../api/payment";
import { useEffect } from "react";

const Dashboard = () => {

    const { user, logout } = useAuth()
    const navigate = useNavigate()



    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const handleMenuClick = () => {
        navigate('/dashboard/menu')
    }

    const handlePayment = async () => {
        try {
            const response = await payment()
            window.location.href = response.init_point
        } catch (error) {
            console.error('Error al generar el pago')
        }
    }

    const handleThemeClick = () => {
        navigate('/dashboard/theme')
    }


    const downloadQR = () => {
        const svg = document.getElementById('qr-code')
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
            canvas.width = 200
            canvas.height = 200
            ctx.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL('image/png')
            const downloadLink = document.createElement('a')
            downloadLink.download = 'mi-qr-menu.png'
            downloadLink.href = pngFile
            downloadLink.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    const handleVerMenu = (id) => {
        navigate(`/menu/${id}`)
    }


    const appURL = window.location.hostname === 'localhost'
        ? 'http://localhost:5173'
        : 'https://proyecto-restaurante-sigma.vercel.app'


    return (
        <div className="min-h-screen bg-orange-50">

            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    <span className="text-xl font-bold text-gray-800">MenuQR</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Hola, <strong className="text-gray-700">{user?.name}</strong></span>
                    <button
                        onClick={handleLogout}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-10">

                {/* Bienvenida */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Bienvenido, {user?.name} 👋</h2>
                    <p className="text-gray-500 mt-1">Desde acá podés gestionar el menú de tu restaurante.</p>
                </div>

                {/* Cards de acceso rápido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div onClick={handleMenuClick} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-3xl mb-3">📋</div>
                        <h3 className="font-semibold text-gray-800 mb-1">Mi menú</h3>
                        <p className="text-sm text-gray-500">Agregá y editá los platos de tu restaurante.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div onClick={() => { }} className="text-3xl mb-3">📱</div>
                        <h3 className="font-semibold text-gray-800 mb-1">Mi QR</h3>
                        <QRCodeSVG
                            id="qr-code"
                            value={`${appURL}/menu/${user?.id}`}
                            size={150}
                            className="mx-auto"
                        />
                        <button
                            onClick={downloadQR}
                            className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"

                        >
                            Descargar QR

                        </button>
                        <p className="text-sm text-gray-500">Descargá el QR para poner en tus mesas.</p>
                    </div>
                    <div onClick={handleThemeClick} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-3xl mb-3">🎨</div>
                        <h3 className="font-semibold text-gray-800 mb-1">Diseño</h3>
                        <p className="text-sm text-gray-500">Elegí el tema visual de tu menú digital.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-3">⭐</div>
                        <h3 className="font-semibold text-gray-800 mb-1">Plan Pro</h3>
                        <p className="text-sm text-gray-500 mb-4">Desbloqueá todas las funcionalidades.</p>
                        <button
                            onClick={handlePayment}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                        >
                            Suscribirse al Plan Pro
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleVerMenu(user?.id)}>
                        <div className="text-3xl mb-3">👁️</div>
                        <h3 className="font-semibold text-gray-800 mb-1">Ver mi menú</h3>
                        <p className="text-sm text-gray-500">Mirá cómo ve tu menú el cliente.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
