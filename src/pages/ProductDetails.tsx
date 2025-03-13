import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  details: string[];
  specifications: { [key: string]: string };
}

const sampleProduct: ProductDetails = {
  id: '1',
  name: 'Ethereal Canvas Print',
  price: 129.99,
  category: 'Wall Art',
  image: '/images/ethereal-canvas.jpg',
  description: 'A mesmerizing canvas print that captures the essence of ethereal beauty, perfect for creating a dreamy atmosphere in any space.',
  details: [
    'Hand-finished with ethereal glazes',
    'Premium archival-quality canvas',
    'Floating frame with subtle glow effect',
    'Limited edition of 100 pieces'
  ],
  specifications: {
    'Dimensions': '24" x 36"',
    'Material': 'Museum-grade canvas',
    'Frame': 'Floating aluminum frame',
    'Finish': 'UV-protective coating'
  }
};

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications'>('details');

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-dream-200 to-ethereal-200"
          >
            <div className="aspect-w-4 aspect-h-3 relative">
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
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-display text-4xl text-text-primary mb-4">{sampleProduct.name}</h1>
              <p className="text-text-subtle text-lg">{sampleProduct.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-display text-accent">${sampleProduct.price}</span>
              <div className="h-6 w-px bg-text-subtle/20" />
              <span className="text-text-subtle">Limited Edition</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-primary hover:bg-accent/5"
                >
                  -
                </button>
                <span className="text-xl text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-primary hover:bg-accent/5"
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
              >
                Add to Cart
              </motion.button>
            </div>

            <div className="border-t border-text-subtle/10 pt-8">
              <div className="flex space-x-8 mb-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-lg transition-colors duration-300 ${
                    activeTab === 'details' ? 'text-accent' : 'text-text-subtle hover:text-text-primary'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`text-lg transition-colors duration-300 ${
                    activeTab === 'specifications' ? 'text-accent' : 'text-text-subtle hover:text-text-primary'
                  }`}
                >
                  Specifications
                </button>
              </div>

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeTab === 'details' && (
                  <ul className="space-y-3">
                    {sampleProduct.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-text-primary"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(sampleProduct.specifications).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="block text-text-subtle">{key}</span>
                        <span className="block text-text-primary">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 