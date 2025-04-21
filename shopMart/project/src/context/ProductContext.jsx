import { createContext, useContext, useState, useEffect } from 'react'
import { fetchProducts, fetchProductById, fetchCategories } from '../services/api'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Fetch all products on mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data)
        
        const categoryData = await fetchCategories()
        setCategories(categoryData)
        
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    getProducts()
  }, [])
  
  // Get a single product by ID
  const getProductById = async (id) => {
    try {
      // First check if the product is already in state
      const existingProduct = products.find(p => p.id.toString() === id.toString())
      if (existingProduct) return existingProduct
      
      // If not, fetch it from API
      const product = await fetchProductById(id)
      return product
    } catch (err) {
      console.error(`Error fetching product with ID ${id}:`, err)
      throw new Error('Failed to load product details')
    }
  }
  
  // Filter products by category
  const filterProductsByCategory = (category) => {
    if (!category) return products
    return products.filter(product => product.category === category)
  }
  
  // Sort products
  const sortProducts = (productsToSort, sortType) => {
    const sortedProducts = [...productsToSort]
    
    switch (sortType) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sortedProducts
    }
  }
  
  // Filter products by price range
  const filterProductsByPrice = (productsToFilter, minPrice, maxPrice) => {
    return productsToFilter.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    )
  }
  
  return (
    <ProductContext.Provider 
      value={{
        products,
        categories,
        loading,
        error,
        getProductById,
        filterProductsByCategory,
        sortProducts,
        filterProductsByPrice
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}