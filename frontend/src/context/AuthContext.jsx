import { createContext, useContext, useEffect, useState } from "react";

import api from '../api/axios'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const register = async (name, email, password, password_confirmation) => {
        const res = await api.post('/register', {name, email, password, password_confirmation})
        setUser(res.data.user)
        setToken(res.data.access_token)
        localStorage.setItem('token', res.data.access_token)
    }

    const login = async (email, password) => {
        const res = await api.post('/login', {email, password })
        setUser(res.data.user)
        setToken(res.data.access_token)
        localStorage.setItem('token', res.data.access_token)
    }


    const logout = async () => {
        await api.post('/logout')
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        const fetchUser = async () => {
            if(token){
                try{
                    const res = await api.get('/user')
                    setUser(res.data)
                }catch(error){
                    setToken(null)
                    localStorage.removeItem('token')
                }
            }
        }

        fetchUser()
    }, [])


    return (

        <AuthContext.Provider value= {{ user, setUser, token, register, login, logout}}>
            { children }
        </AuthContext.Provider>
    )


}


export const useAuth = () =>  useContext(AuthContext)