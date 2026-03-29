import api from './axios'


export const payment = async () => {
    try{
        const pay = await api.post('/payment/create-preference')
        return pay.data
    }catch(error){
        console.error('Error al general el pago')
        throw error
    }
}