import api from './axios'


export const getCategories = async () => {
    try{
        const categories = await api.get('/categories')
        return categories.data

    }catch(error){
        console.error('Error fetching categories:', error)
        throw error
    }
}

export const createCategory = async (categoryData) =>{
    try{
        const response = await api.post('/categories', categoryData)
        return response.data

    }catch(error){
        console.error('Error creating category:', error)
        throw error
    }
}

export const updateCategory = async (categoryId, categoryData) => {
    try{
        const response = await api.put(`/categories/${categoryId}`, categoryData)
        return response.data
    }catch(error){
        console.error('Error updating category:', error)
        throw error
    }
}


export const deleteCategory = async (categoryId) => {
    try{
        await api.delete(`/categories/${categoryId}`)

    }catch(error){
        console.error('Error deleting category:', error)
        throw error
    }
}