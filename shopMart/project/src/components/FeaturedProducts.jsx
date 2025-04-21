import { useEffect, useState } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductCard from './ProductCard'

function FeaturedProducts() {
  const { products, loading } = useProducts()
  const [featuredProducts, setFeaturedProducts] = useState([])
  
  useEffect(() => {
    if (products.length > 0) {
      // Get 4 random products to feature
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
      
      setFeaturedProducts(randomProducts)
    }
  }, [products])
  
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="bg-gray-200 h-64 w-full"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts