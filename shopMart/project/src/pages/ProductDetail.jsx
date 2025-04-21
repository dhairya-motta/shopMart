import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa'

function ProductDetail() {
  const { id } = useParams()
  const { getProductById } = useProducts()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const productData = await getProductById(id)
        setProduct(productData)
        setError(null)
      } catch (err) {
        setError('Failed to load product details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id, getProductById])
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row animate-pulse">
            <div className="w-full lg:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full lg:w-1/2 p-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return null
  }
  
  // Generate random rating between 3.5 and 5
  const rating = Math.random() * (5 - 3.5) + 3.5
  const wholePart = Math.floor(rating)
  const decimalPart = rating - wholePart
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>
          
          <div className="w-full lg:w-1/2 p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  i < wholePart ? (
                    <FaStar key={i} />
                  ) : i === wholePart && decimalPart > 0 ? (
                    <FaStar key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {rating.toFixed(1)} ({Math.floor(Math.random() * 100) + 20} reviews)
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-primary-700">${product.price.toFixed(2)}</span>
              {Math.random() > 0.5 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 my-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Quantity:</p>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-8 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              
              <Link
                to="/cart"
                className="btn bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700"
              >
                Buy Now
              </Link>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail