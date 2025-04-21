import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }
  
  return (
    <div className="card group hover:translate-y-[-5px] transition-all duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain p-4 transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-sm truncate">
              {product.title}
            </p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium line-clamp-1">{product.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-primary-700">${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart} 
              className="btn btn-primary text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard