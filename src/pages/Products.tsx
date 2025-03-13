import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  new?: boolean;
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Ethereal Canvas Print',
    price: 129.99,
    category: 'Wall Art',
    image: '/images/ethereal-canvas.jpg',
    description: 'A mesmerizing canvas print that captures the essence of ethereal beauty.',
    featured: true
  },
  {
    id: '2',
    name: 'Mystic Sculpture',
    price: 299.99,
    category: 'Sculptures',
    image: '/images/mystic-sculpture.jpg',
    description: 'Hand-crafted sculpture embodying the flow of mystical energies.',
    new: true
  },
  {
    id: '3',
    name: 'Dream Tapestry',
    price: 159.99,
    category: 'Textiles',
    image: '/images/dream-tapestry.jpg',
    description: 'Woven with ethereal patterns that shift in different lights.'
  },
  {
    id: '4',
    name: 'Celestial Pendant Light',
    price: 249.99,
    category: 'Lighting',
    image: '/images/celestial-light.jpg',
    description: 'A hanging light fixture that casts dreamlike patterns on your walls.',
    featured: true
  },
  {
    id: '5',
    name: 'Whisper Vase',
    price: 89.99,
    category: 'Decor',
    image: '/images/whisper-vase.jpg',
    description: 'Translucent vase with flowing lines that catch and bend light beautifully.'
  },
  {
    id: '6',
    name: 'Ethereal Throw Pillow',
    price: 59.99,
    category: 'Textiles',
    image: '/images/ethereal-pillow.jpg',
    description: 'Soft, cloud-like pillow with shimmering fabric that changes in different light.',
    new: true
  },
  {
    id: '7',
    name: 'Mist Wall Hanging',
    price: 119.99,
    category: 'Wall Art',
    image: '/images/mist-hanging.jpg',
    description: 'Delicate wall hanging that appears to float like morning mist.'
  },
  {
    id: '8',
    name: 'Dreamscape Rug',
    price: 199.99,
    category: 'Textiles',
    image: '/images/dreamscape-rug.jpg',
    description: 'Plush rug with swirling patterns reminiscent of dreams and distant galaxies.',
    featured: true
  }
];

const categories = ['All', 'Wall Art', 'Sculptures', 'Textiles', 'Lighting', 'Decor'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filter and sort products
  useEffect(() => {
    let result = [...sampleProducts];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.new && !b.new) return -1;
          if (!a.new && b.new) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl text-text-primary mb-4"
          >
            Ethereal Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-subtle text-xl max-w-2xl mx-auto"
          >
            Discover pieces that transcend ordinary design, bringing dreams into your space
          </motion.p>
        </div>

        {/* Featured Products Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl text-text-primary mb-8">Featured Designs</h2>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex space-x-6 py-4 overflow-x-auto scrollbar-hide">
              {sampleProducts.filter(p => p.featured).map((product) => (
                <motion.div
                  key={`featured-${product.id}`}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-80"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="bg-surface rounded-xl shadow-ethereal overflow-hidden group">
                      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-dream-200 to-ethereal-200 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                        <p className="text-text-subtle mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-accent font-semibold">${product.price}</span>
                          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">Featured</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-text-primary mb-4 md:mb-0">All Designs</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-text-subtle hover:text-accent transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Filters</span>
              </button>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-surface rounded-full px-4 py-2 pr-8 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="featured">Featured</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-subtle">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-surface rounded-2xl p-6 shadow-ethereal">
                  <div className="mb-6">
                    <h3 className="font-display text-lg text-text-primary mb-4">Search</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search designs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-3 bg-background rounded-full shadow-soft focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-text-primary mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                            selectedCategory === category
                              ? 'bg-accent text-white shadow-glow'
                              : 'bg-background text-text-secondary hover:bg-accent/5'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <Link to={`/products/${product.id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-surface rounded-2xl shadow-ethereal overflow-hidden h-full"
                    >
                      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-dream-200 to-ethereal-200 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                        {(product.new || product.featured) && (
                          <div className="absolute top-4 right-4 z-10">
                            {product.new && (
                              <span className="inline-block px-3 py-1 bg-dream-300 text-white text-xs font-semibold rounded-full shadow-glow">
                                New
                              </span>
                            )}
                            {product.featured && !product.new && (
                              <span className="inline-block px-3 py-1 bg-accent/80 text-white text-xs font-semibold rounded-full shadow-glow">
                                Featured
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                        <p className="text-text-subtle mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-accent font-semibold">${product.price}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors duration-300"
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-text-subtle text-lg">No products match your filters. Try adjusting your search criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
} 