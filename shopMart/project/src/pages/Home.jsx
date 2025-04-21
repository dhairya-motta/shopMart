import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopMart</h1>
        <p className="text-gray-600 mb-8">Discover amazing products at great prices</p>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default Home