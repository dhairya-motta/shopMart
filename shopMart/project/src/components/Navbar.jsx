import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cartItems } = useCart()
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            ShopMart
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar