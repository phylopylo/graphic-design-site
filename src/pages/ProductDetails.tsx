import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  details: string[];
  specifications: { [key: string]: string };
  colors?: string[];
  materials?: string[];
  relatedProducts?: string[];
}

const sampleProducts: { [key: string]: ProductDetails } = {
  '1': {
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
    },
    colors: ['#E0E7FF', '#C7D2FE', '#818CF8'],
    materials: ['Canvas', 'Aluminum'],
    relatedProducts: ['2', '7', '8']
  },
  '2': {
    id: '2',
    name: 'Mystic Sculpture',
    price: 299.99,
    category: 'Sculptures',
    image: '/images/mystic-sculpture.jpg',
    description: 'Hand-crafted sculpture embodying the flow of mystical energies, creating a focal point of tranquility and wonder.',
    details: [
      'Hand-sculpted by master artisans',
      'Organic flowing forms',
      'Subtle iridescent finish',
      'Weighted base for stability'
    ],
    specifications: {
      'Dimensions': '12" x 8" x 18"',
      'Material': 'Resin composite',
      'Weight': '3.2 lbs',
      'Care': 'Dust with soft cloth'
    },
    colors: ['#DDD6FE', '#C4B5FD', '#8B5CF6'],
    materials: ['Resin', 'Marble powder'],
    relatedProducts: ['5', '4', '1']
  }
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications'>('details');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Simulate loading product data
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = sampleProducts[id || '1'] || sampleProducts['1'];
    setProduct(foundProduct);
    
    if (foundProduct.colors && foundProduct.colors.length > 0) {
      setSelectedColor(foundProduct.colors[0]);
    }
    
    if (foundProduct.materials && foundProduct.materials.length > 0) {
      setSelectedMaterial(foundProduct.materials[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full"
        />
      </div>
    );
  }

  // Generate multiple product images (in a real app, these would be actual different images)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Get related products
  const relatedProductsData = product.relatedProducts?.map(id => sampleProducts[id]) || [];

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-text-subtle">
            <li>
              <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-accent transition-colors duration-300">Collection</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-accent">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-dream-200 to-ethereal-200 aspect-w-4 aspect-h-3">
              <motion.div
                animate={isRotating ? { rotateY: 360 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full"
              >
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setIsRotating(true)}
                    onAnimationEnd={() => setIsRotating(false)}
                    className="bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(index)}
                  className={`relative rounded-xl overflow-hidden aspect-square ${
                    activeImage === index ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-dream-200 to-ethereal-200" />
                </motion.button>
              ))}
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
              <div className="flex items-center space-x-4 mb-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">{product.category}</span>
                <span className="text-text-subtle">Limited Edition</span>
              </div>
              <h1 className="font-display text-4xl text-text-primary mb-4">{product.name}</h1>
              <p className="text-text-subtle text-lg">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-display text-accent">${product.price}</span>
              <div className="h-6 w-px bg-text-subtle/20" />
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-text-subtle">(42 reviews)</span>
              </div>
            </div>

            {/* Color Options */}
            {product.colors && (
              <div>
                <h3 className="font-display text-lg text-text-primary mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full transition-transform duration-300 ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-accent scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Material Options */}
            {product.materials && (
              <div>
                <h3 className="font-display text-lg text-text-primary mb-3">Material</h3>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                        selectedMaterial === material
                          ? 'bg-accent text-white'
                          : 'bg-surface text-text-primary hover:bg-accent/10'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-surface text-text-primary rounded-full hover:bg-accent/5 transition-colors duration-300"
                >
                  Save to Wishlist
                </motion.button>
              </div>
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
                    {product.details.map((detail, index) => (
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
                    {Object.entries(product.specifications).map(([key, value], index) => (
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

        {/* Related Products */}
        {relatedProductsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="font-display text-3xl text-text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProductsData.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -8 }}
                  className="bg-surface rounded-2xl shadow-ethereal overflow-hidden"
                >
                  <Link to={`/products/${relatedProduct.id}`} className="block">
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
                      <h3 className="font-display text-xl text-text-primary mb-2">{relatedProduct.name}</h3>
                      <p className="text-text-subtle mb-4 line-clamp-2">{relatedProduct.description}</p>
                      <span className="text-accent font-semibold">${relatedProduct.price}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 