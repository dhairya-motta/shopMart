import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="pt-16">
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About ShopWave</h1>
            <p className="text-xl text-gray-300">
              Your one-stop destination for quality products at amazing prices.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                Founded in 2025, ShopWave began with a simple mission: to create an online shopping experience that's both enjoyable and trustworthy. We believe that shopping should be more than just a transaction—it should be an experience that leaves you satisfied and excited about your purchase.
              </p>
              <p>
                What started as a small team of passionate e-commerce enthusiasts has grown into a thriving online marketplace that serves thousands of customers. Our commitment to quality products, competitive prices, and exceptional customer service remains at the heart of everything we do.
              </p>
              <p>
                At ShopWave, we carefully curate our product selection to ensure that we're offering only the best items across various categories. From electronics to fashion, home goods to accessories, we strive to bring you products that enhance your life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                We believe in putting our customers at the center of everything we do. Your satisfaction is our ultimate goal.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Quality Focus</h3>
              <p className="text-gray-600">
                We're committed to offering products that meet high standards of quality, durability, and performance.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-primary-600 text-4xl mb-4">👍</div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty and transparency in all our dealings with customers, partners, and suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore our wide selection of products and enjoy a seamless shopping experience.
          </p>
          <Link to="/products" className="btn btn-primary text-lg py-3 px-8">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About