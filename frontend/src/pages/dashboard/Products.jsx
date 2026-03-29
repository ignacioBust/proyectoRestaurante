import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/products";


const Products = () => {

    const { category_id } = useParams()
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({ name: '', description: '', price: '', category_id: category_id, image_url: '' })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productEdit, setProductEdit] = useState(null);


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const data = await getProducts(category_id)
                setProducts(data)
                setLoading(false)

            } catch (error) {
                setError('Error al cargar productos')
                setLoading(false)

            }
        }

        fetchProducts()


    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const newProduct = await createProduct(form)
            setProducts([...products, newProduct])
            setForm({ name: '', description: '', price: '', category_id: category_id, image_url: '' })
        } catch (error) {
            setError('Error al crear producto')

        }
    }


    const handleDelete = async (id) => {
        setError(null)
        try {
            await deleteProduct(id)
            setProducts(products.filter(prod => prod.id !== id))
        } catch (error) {
            setError('Error al eliminar producto')
        }
    }

    const handleEdit = (product) => {
        setProductEdit(product)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const upProduct = await updateProduct(productEdit.id, productEdit)
            setProducts(products.map(prod => prod.id === productEdit.id ? upProduct : prod))
            setProductEdit(null)
        } catch (error) {
            setError('Error al actualizar producto')
        }
    }


    return (
        <div>
            <h1>Productos</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de Productos
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="Nombre del producto"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />

                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                        placeholder="Descripción del producto"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mt-3"
                    />
                    <input
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                        placeholder="Precio del producto"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mt-3"
                    />

                    <input
                        type="text"
                        name="image_url"
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        placeholder="URL de la imagen"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mt-3" />
                </div>
                {loading && (
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                        Cargando...
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                >
                    Crear Producto
                </button>
            </form>

            <div className="mt-8 space-y-3">
                {products.map((product) => (
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center justify-between" key={product.id}>
                        <div className="flex items-center gap-4">
                            {product.image_url && (
                                <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="w-60 h-40 object-cover rounded-lg"
                                    />
                                    
                            )}

                        </div>
                        <span className="font-medium text-gray-800">{product.name}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-orange-100 hover:bg-orange-200 text-orange-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {productEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" >
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Editar Producto</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre del producto
                                </label>
                                <input
                                    type="text"
                                    value={productEdit.name}
                                    onChange={(e) => setProductEdit({ ...productEdit, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    value={productEdit.description}
                                    onChange={(e) => setProductEdit({ ...productEdit, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    value={productEdit.price}
                                    onChange={(e) => setProductEdit({ ...productEdit, price: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    value={productEdit.image_url}
                                    onChange={(e) => setProductEdit({ ...productEdit, image_url: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />

                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    Actualizar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setProductEdit(null)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    Cancelar
                                </button>

                            </div>
                        </form>

                    </div>

                </div>
            )}



        </div>
    )
}

export default Products