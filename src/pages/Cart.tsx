import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  color?: string;
  material?: string;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Ethereal Canvas Print',
    price: 129.99,
    quantity: 1,
    image: '/images/ethereal-canvas.jpg',
    category: 'Wall Art',
    color: '#C7D2FE'
  },
  {
    id: '2',
    name: 'Mystic Sculpture',
    price: 299.99,
    quantity: 1,
    image: '/images/mystic-sculpture.jpg',
    category: 'Sculptures',
    material: 'Resin'
  },
  {
    id: '6',
    name: 'Ethereal Throw Pillow',
    price: 59.99,
    quantity: 2,
    image: '/images/ethereal-pillow.jpg',
    category: 'Textiles',
    color: '#DDD6FE'
  }
];

const availablePromoCodes: PromoCode[] = [
  { code: 'DREAM10', discount: 10, type: 'percentage' },
  { code: 'ETHEREAL25', discount: 25, type: 'fixed' }
];

const shippingOptions: ShippingOption[] = [
  { id: 'standard', name: 'Standard Shipping', price: 15.99, estimatedDays: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 29.99, estimatedDays: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Delivery', price: 49.99, estimatedDays: 'Next business day' }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showConfirmRemove, setShowConfirmRemove] = useState<string | null>(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
  const discount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? subtotal * (appliedPromo.discount / 100) 
      : appliedPromo.discount
    : 0;
  const total = subtotal + shipping - discount;

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setShowConfirmRemove(null);
  };

  // Apply promo code
  const applyPromoCode = () => {
    const foundPromo = availablePromoCodes.find(
      p => p.code.toLowerCase() === promoCode.toLowerCase()
    );
    
    if (foundPromo) {
      setAppliedPromo(foundPromo);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  // Checkout animation
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real app, this would redirect to checkout page or process payment
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl text-text-primary mb-4"
          >
            Your Ethereal Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-subtle text-xl max-w-2xl mx-auto"
          >
            Review your selections and complete your journey into the ethereal
          </motion.p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-3xl text-text-primary">Shopping Cart</h2>
                <span className="text-text-subtle">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
              </div>

              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface rounded-2xl p-6 shadow-ethereal relative overflow-hidden group"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 pointer-events-none"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    />

                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      {/* Product Image */}
                      <Link to={`/products/${item.id}`} className="block w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-dream-200 to-ethereal-200 relative overflow-hidden flex-shrink-0">
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
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 text-center sm:text-left">
                        <Link to={`/products/${item.id}`} className="block">
                          <h3 className="font-display text-xl text-text-primary mb-1 hover:text-accent transition-colors duration-300">{item.name}</h3>
                        </Link>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                          <span className="text-text-subtle text-sm">{item.category}</span>
                          {item.color && (
                            <div className="flex items-center space-x-1">
                              <span className="text-text-subtle text-sm">Color:</span>
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            </div>
                          )}
                          {item.material && (
                            <span className="text-text-subtle text-sm">Material: {item.material}</span>
                          )}
                        </div>
                        <p className="text-accent font-semibold">${item.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-text-primary hover:bg-accent/5 border border-text-subtle/10"
                        >
                          -
                        </button>
                        <span className="text-text-primary w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-text-primary hover:bg-accent/5 border border-text-subtle/10"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex flex-col items-end space-y-2">
                        <span className="font-semibold text-text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        
                        {showConfirmRemove === item.id ? (
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-xs px-2 py-1 bg-red-500 text-white rounded-full"
                            >
                              Confirm
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowConfirmRemove(null)}
                              className="text-xs px-2 py-1 bg-surface text-text-subtle rounded-full"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowConfirmRemove(item.id)}
                            className="text-text-subtle hover:text-red-500 transition-colors duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link to="/products">
                  <motion.button
                    whileHover={{ x: -5 }}
                    className="flex items-center text-accent hover:text-accent/80 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface rounded-2xl p-8 shadow-ethereal h-fit sticky top-24"
            >
              <h2 className="font-display text-2xl text-text-primary mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 bg-background rounded-l-full border border-text-subtle/10 focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-accent text-white rounded-r-full"
                  >
                    Apply
                  </motion.button>
                </div>
                {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                {appliedPromo && (
                  <div className="flex items-center justify-between mt-2 text-accent">
                    <span>Code {appliedPromo.code} applied!</span>
                    <button 
                      onClick={() => setAppliedPromo(null)}
                      className="text-text-subtle hover:text-red-500 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping Options */}
              <div className="mb-6">
                <h3 className="font-display text-lg text-text-primary mb-3">Shipping</h3>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={() => setSelectedShipping(option.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-text-primary">{option.name}</span>
                          <span className="text-accent">${option.price.toFixed(2)}</span>
                        </div>
                        <p className="text-text-subtle text-sm">{option.estimatedDays}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-subtle">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-subtle">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-text-subtle/10" />
                <div className="flex justify-between text-text-primary font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                {isCheckingOut ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mx-auto"
                  />
                ) : (
                  <>
                    <span className="relative z-10">Proceed to Checkout</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-light/0 via-accent-light/30 to-accent-light/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "linear",
                      }}
                    />
                  </>
                )}
              </motion.button>

              <p className="mt-6 text-center text-text-subtle text-sm">
                Free shipping on orders over $500
              </p>

              {/* Secure Checkout Badge */}
              <div className="mt-8 flex items-center justify-center text-text-subtle text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="mb-8">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-6 inline-block"
              >
                ✨
              </motion.div>
              <h2 className="font-display text-3xl text-text-primary mb-4">Your Cart is Empty</h2>
              <p className="text-text-subtle text-lg max-w-md mx-auto mb-8">
                Your journey into the ethereal awaits. Explore our collection to find pieces that resonate with your spirit.
              </p>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                >
                  Explore Collection
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 