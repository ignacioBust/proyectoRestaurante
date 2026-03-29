import api from './axios'

export const getProducts = async (category_id) => {
    try{
        const products = await api.get(`/categories/${category_id}/products`)
        return products.data
    }catch(error){
        console.error('Error fetching products:', error)
        throw error
    }
}

export const createProduct = async ( productData) => {
    try{
        const response = await api.post(`/products`, productData)
        return response.data
    }catch(error){
        console.error('Error al crear el producto:', error)
        throw error
    }
}

export const updateProduct = async (productId, productData) =>{
    try{
        const response = await api.put(`/products/${productId}`, productData)
        return response.data
    }catch(error){
        console.error('Error en la actualizacion del producto:', error)
        throw error
    }
}

export const deleteProduct = async (productId) => {
    try{
        await api.delete(`/products/${productId}`)
    }catch(error){
        console.error('Error al eliminar el producto:', error)
        throw error
    }
}