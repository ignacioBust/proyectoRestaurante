import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { getPublicMenu } from "../api/publicMenu";



const PublicMenu = () => {

    const { user_id } = useParams();
    const [menu, setMenu] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState('light');


    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getPublicMenu(user_id);
                setMenu(data);
                setCategories(data.categories);
                setTheme(data.theme)
                setLoading(false);

            } catch (error) {
                setError('Error fetching menu');
                setLoading(false);
            }
        }

        fetchMenu();
    }, [user_id])


    const themes = {
        light: {
            bg: 'min-h-screen bg-gray-50',
            header: 'bg-orange-500 text-white py-12 px-6 text-center',
            categoryTitle: 'text-xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-5',
            productCard: 'bg-white rounded-2xl shadow-sm p-4 flex gap-4 border border-gray-100',
            productName: 'font-semibold text-gray-800',
            productDescription: 'text-sm text-gray-500 mt-1',
            productPrice: 'text-orange-500 font-bold mt-2',
        },
        dark: {
            bg: 'min-h-screen bg-gray-900',
            header: 'bg-gray-800 text-white py-12 px-6 text-center',
            categoryTitle: 'text-xl font-bold text-white border-b-2 border-orange-400 pb-2 mb-5',
            productCard: 'bg-gray-800 rounded-2xl shadow-sm p-4 flex gap-4 border border-gray-700',
            productName: 'font-semibold text-white',
            productDescription: 'text-sm text-gray-400 mt-1',
            productPrice: 'text-orange-400 font-bold mt-2',
        },
        colorful: {
            bg: 'min-h-screen bg-pink-50',
            header: 'bg-gradient-to-r from-pink-500 to-orange-400 text-white py-12 px-6 text-center',
            categoryTitle: 'text-xl font-bold text-pink-600 border-b-2 border-pink-400 pb-2 mb-5',
            productCard: 'bg-white rounded-2xl shadow-sm p-4 flex gap-4 border border-pink-100',
            productName: 'font-semibold text-gray-800',
            productDescription: 'text-sm text-gray-500 mt-1',
            productPrice: 'text-pink-500 font-bold mt-2',
        }
    }

    const t = themes[theme] || themes.light


    return (
        <div className={t.bg}>
            {/* Header */}
            <div className={t.header}>
                <div className="text-5xl mb-3">🍽️</div>
                <h1 className="text-3xl font-bold">Nuestro Menú</h1>
                <p className="mt-2 text-sm opacity-80">Escaneá y disfrutá</p>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-8">
                {loading && (
                    <div className="text-center text-gray-500 py-20">
                        <div className="text-4xl mb-3">⏳</div>
                        <p>Cargando Menú...</p>
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 py-20">
                        <div className="text-4xl mb-3">❌</div>
                        <p>{error}</p>
                    </div>
                )}
                {!loading && !error && categories.map((category) => (
                    <div key={category.id} className="mb-10">
                        <h2 className={t.categoryTitle}>
                            {category.nombre}
                        </h2>
                        <div className="space-y-4">
                            {category.products.map((product) => (
                                <div key={product.id} className={t.productCard}>
                                    {product.image_url && (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex flex-col justify-center flex-1">
                                        <h3 className={t.productName}>{product.name}</h3>
                                        {product.description && (
                                            <p className={t.productDescription}>{product.description}</p>
                                        )}
                                        <span className={t.productPrice}>${product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="text-center text-gray-400 text-xs py-6">
                Powered by <span className="text-orange-400 font-medium">MenuQR</span>
            </div>
        </div>
    )

}

export default PublicMenu;