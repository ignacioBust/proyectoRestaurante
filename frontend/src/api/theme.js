import api from './axios'


export const updateTheme = async (theme) =>{

    try{
        const response = await api.put('/user/theme',{theme})
        return response.data
    }catch(error){
        console.error('Error al actualizar el tema')
        throw error
    }

}