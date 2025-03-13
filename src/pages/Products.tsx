import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Ethereal Canvas Print',
    price: 129.99,
    category: 'Wall Art',
    image: '/images/ethereal-canvas.jpg',
    description: 'A mesmerizing canvas print that captures the essence of ethereal beauty.'
  },
  {
    id: '2',
    name: 'Mystic Sculpture',
    price: 299.99,
    category: 'Sculptures',
    image: '/images/mystic-sculpture.jpg',
    description: 'Hand-crafted sculpture embodying the flow of mystical energies.'
  },
  {
    id: '3',
    name: 'Dream Tapestry',
    price: 159.99,
    category: 'Textiles',
    image: '/images/dream-tapestry.jpg',
    description: 'Woven with ethereal patterns that shift in different lights.'
  },
];

const categories = ['All', 'Wall Art', 'Sculptures', 'Textiles'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = sampleProducts.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-5xl text-text-primary mb-12 text-center">
          Ethereal Collection
        </h1>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 bg-surface rounded-full shadow-soft focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-glow'
                    : 'bg-surface text-text-secondary hover:bg-accent/5'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-surface rounded-2xl shadow-ethereal overflow-hidden"
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
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-text-primary mb-2">{product.name}</h3>
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 