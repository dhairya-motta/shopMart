import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { submitOrder } from '../services/api'

function Checkout() {
  const { cartItems, total, clearCart } = useCart()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  })
  
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  
  if (cartItems.length === 0 && !orderSuccess) {
    navigate('/cart')
    return null
  }
  
  // Calculate order summary
  const shipping = 5.99
  const tax = total * 0.1 // 10% tax
  const grandTotal = total + shipping + tax
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // Validate personal info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Validate phone (optional but must be valid if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid'
    }
    
    // Validate address
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required'
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'ZIP code is invalid'
    
    // Validate payment info
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required'
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number is invalid'
    }
    
    if (!formData.expDate.trim()) {
      newErrors.expDate = 'Expiration date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = 'Format must be MM/YY'
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    
    try {
      setSubmitting(true)
      
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        items: cartItems,
        total: grandTotal,
        // We don't send payment details in a real app for security reasons
      }
      
      // Submit order
      const response = await submitOrder(orderData)
      console.log('Order submitted successfully:', response)
      
      // Clear cart and show success
      clearCart()
      setOrderSuccess(true)
      
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('There was a problem processing your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've sent a confirmation email to {formData.email}.
          </p>
          
          <div className="mb-8 p-4 bg-gray-50 rounded-md mx-auto max-w-sm">
            <p className="text-sm text-gray-700">Order Reference: <span className="font-mono font-medium">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1 error-message">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1 error-message">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code*
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`input ${errors.zip ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs mt-1 error-message">{errors.zip}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card*
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`input ${errors.cardName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.cardName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className={`input ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1 error-message">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date*
                    </label>
                    <input
                      type="text"
                      id="expDate"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className={`input ${errors.expDate ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.expDate && (
                      <p className="text-red-500 text-xs mt-1 error-message">{errors.expDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV*
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className={`input ${errors.cvv ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1 error-message">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`btn btn-primary w-full py-3 text-center font-medium ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-base pt-2 mt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-primary-700">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout