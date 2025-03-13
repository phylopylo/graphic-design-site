import React from 'react';
import { motion } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Ethereal Canvas Print',
    price: 129.99,
    quantity: 1,
    image: '/images/ethereal-canvas.jpg'
  },
  {
    id: '2',
    name: 'Mystic Sculpture',
    price: 299.99,
    quantity: 1,
    image: '/images/mystic-sculpture.jpg'
  }
];

export default function Cart() {
  const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="font-display text-4xl text-text-primary mb-12 text-center">
          Your Ethereal Collection
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {sampleCartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-6 shadow-ethereal"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-dream-200 to-ethereal-200 relative overflow-hidden">
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
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-text-primary mb-2">{item.name}</h3>
                    <p className="text-accent font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-primary hover:bg-accent/5 border border-text-subtle/10">
                      -
                    </button>
                    <span className="text-text-primary">{item.quantity}</span>
                    <button className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-primary hover:bg-accent/5 border border-text-subtle/10">
                      +
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-text-subtle hover:text-accent transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface rounded-2xl p-8 shadow-ethereal h-fit"
          >
            <h2 className="font-display text-2xl text-text-primary mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-text-subtle">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-subtle">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="h-px bg-text-subtle/10" />
              <div className="flex justify-between text-text-primary font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 py-4 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
            >
              Proceed to Checkout
            </motion.button>

            <p className="mt-6 text-center text-text-subtle text-sm">
              Free shipping on orders over $500
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 