import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 animate-fade-in">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-3 sm:mb-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex-grow sm:ml-6">
        <h3 className="text-base font-medium line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        <p className="mt-1 font-semibold text-primary-700">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <div className="flex items-center mt-3 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={() => decreaseQuantity(item.id)}
            className="px-2 py-1 text-gray-600 hover:text-primary-600 focus:outline-none"
            aria-label="Decrease quantity"
          >
            <FaMinus size={12} />
          </button>
          <span className="px-2 py-1 text-center w-8">{item.quantity}</span>
          <button 
            onClick={() => increaseQuantity(item.id)}
            className="px-2 py-1 text-gray-600 hover:text-primary-600 focus:outline-none"
            aria-label="Increase quantity"
          >
            <FaPlus size={12} />
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="ml-3 text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default CartItem