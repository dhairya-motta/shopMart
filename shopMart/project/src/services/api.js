import axios from 'axios'

// Base URL for the API
const API_BASE_URL = 'https://fakestoreapi.com'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of products in the category
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    throw error
  }
}

/**
 * Fetch all available product categories
 * @returns {Promise<Array>} List of categories
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

/**
 * Mock function to simulate a successful order submission
 * @param {Object} orderData - Order information
 * @returns {Promise<Object>} Order confirmation details
 */
export const submitOrder = async (orderData) => {
  try {
    // In a real app, this would be a POST request
    // const response = await api.post('/orders', orderData)
    
    // For this demo, we'll simulate a successful response
    return {
      id: Math.floor(Math.random() * 1000000),
      ...orderData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Error submitting order:', error)
    throw error
  }
}

export default api