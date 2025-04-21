import { Link } from 'react-router-dom'

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Gadgets and devices for everyday use',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg'
  },
  {
    id: 'jewelery',
    name: 'Jewelry',
    description: 'Elegant pieces to complement your style',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'
  },
  {
    id: "men's clothing",
    name: "Men's Clothing",
    description: 'Quality clothing for men',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
  },
  {
    id: "women's clothing",
    name: "Women's Clothing",
    description: 'Trendy clothing for women',
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
  }
]

function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our wide range of products across various categories designed to meet your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.id)}`}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                <span className="inline-block text-white text-sm font-medium border-b border-white pb-1 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Browse Products
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories