import api from './axios'



export const getPublicMenu = async (user_id) => {
    try{
        const menu = await api.get(`/menu/${user_id}`)
        return menu.data;
    }catch(error){
        console.error('Error fetching public menu:', error)
        throw error
    }
}