import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Overlay image with gradient */}
      <div 
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2940&auto=format&fit=crop")',
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-xl fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Discover Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explore our curated collection of premium products for every occasion and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/products" 
              className="btn btn-primary text-base py-3 px-8"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="btn bg-transparent text-white border border-white hover:bg-white/10 text-base py-3 px-8"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero