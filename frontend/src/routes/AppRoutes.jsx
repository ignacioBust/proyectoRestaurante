import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Menu from '../pages/dashboard/Menu'
import Products from '../pages/dashboard/Products'
import PublicMenu from '../pages/PublicMenu'
import Success from '../pages/payment/Success'
import Failure from '../pages/payment/Failure'
import Pending from '../pages/payment/Pending'
import Landing from '../pages/Landing'
import Theme from '../pages/dashboard/Theme'

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth()
    return token ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path='/dashboard/menu' element={
                    <ProtectedRoute>
                        <Menu />
                    </ProtectedRoute>
                }/>
                <Route path='/dashboard/menu/:category_id/products' element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                }/>
                <Route path='/dashboard/theme' element={
                    <ProtectedRoute>
                        <Theme/>
                    </ProtectedRoute>
                }/>
                <Route path='/menu/:user_id' element={<PublicMenu/>} />
                <Route path='/payment/success' element={<Success/>}/>
                <Route path='/payment/failure' element={<Failure/>}/>
                <Route path='/payment/pending' element={<Pending/>}/>


                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes