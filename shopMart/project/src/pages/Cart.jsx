import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {
  const { cartItems, removeFromCart } = useCart()
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded shadow p-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center border-b py-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart