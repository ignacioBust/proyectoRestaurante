import { useState, useEffect, use } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api/categories";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({ nombre: '' })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categoryEdit, setCategoryEdit] = useState(null)
    const navigate = useNavigate()




    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
                setLoading(false)
            } catch (error) {
                setError('Error al cargar categorías')
                setLoading(false)
            }
        }

        fetchCategories()
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const newCategory = await createCategory(form)
            setCategories([...categories, newCategory])
            setForm({ nombre: '' })
        } catch (error) {
            setError('Error al crear categoría')

        }
    }

    const handleDelete = async (id) => {
        setError(null)
        try {
            await deleteCategory(id)
            setCategories(categories.filter(cat => cat.id !== id))
        } catch (error) {
            setError('Error al eliminar categoría')
        }
    }

    const handleEdit = (category) => {
        setCategoryEdit(category)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const updatedCategory = await updateCategory(categoryEdit.id, categoryEdit)
            setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat))
            setCategoryEdit(null)

        } catch (error) {
            setError('Error al actualizar categoría')
        }
    }


    return (
        <div>
            <h1>Mi Menú</h1>


            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la categoría
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        required
                        placeholder="Ingrese el nombre de la categoría"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                </div>
                {loading && (
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                        Cargando categorías...
                    </div>
                )}
                {error && (
                    < div className="bg-red-100 text-red-700 p-3 rounded-lg">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                >
                    Crear Categoría
                </button>
            </form>

            <div className="mt-8 space-y-3">
                {categories.map((category) => (
                    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center justify-between" key={category.id}>
                        <span className="font-medium text-gray-800">{category.nombre}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/dashboard/menu/${category.id}/products`)}
                                className="bg-green-100 hover:bg-green-200 text-green-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                            >
                                Ver productos
                            </button>
                            <button
                                onClick={() => handleEdit(category)}
                                className="bg-orange-100 hover:bg-orange-200 text-orange-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>

                ))}
            </div>

            {categoryEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Editar categoría</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre de la categoría
                                </label>
                                <input
                                    type="text"
                                    value={categoryEdit.nombre}
                                    onChange={(e) => setCategoryEdit({ ...categoryEdit, nombre: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCategoryEdit(null)}
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

export default Menu