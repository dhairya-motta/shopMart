import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function ProductFilter({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sort, setSort] = useState('')
  
  useEffect(() => {
    const category = searchParams.get('category') || ''
    setSelectedCategory(category)
    
    const sortParam = searchParams.get('sort') || ''
    setSort(sortParam)
    
    const minPrice = searchParams.get('minPrice') || 0
    const maxPrice = searchParams.get('maxPrice') || 1000
    setPriceRange([Number(minPrice), Number(maxPrice)])
  }, [searchParams])
  
  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
    
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }
  
  const handleSortChange = (e) => {
    const sortValue = e.target.value
    setSort(sortValue)
    
    const params = new URLSearchParams(searchParams)
    if (sortValue) {
      params.set('sort', sortValue)
    } else {
      params.delete('sort')
    }
    setSearchParams(params)
  }
  
  const handlePriceChange = (min, max) => {
    setPriceRange([min, max])
    
    const params = new URLSearchParams(searchParams)
    params.set('minPrice', min)
    params.set('maxPrice', max)
    setSearchParams(params)
  }
  
  const handleReset = () => {
    setSelectedCategory('')
    setSort('')
    setPriceRange([0, 1000])
    setSearchParams({})
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
      
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default ProductFilter