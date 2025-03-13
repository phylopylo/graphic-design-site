import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const supportCategories = [
  {
    icon: '🎨',
    title: 'Product Inquiries',
    description: 'Questions about our ethereal designs and custom orders.'
  },
  {
    icon: '📦',
    title: 'Shipping & Delivery',
    description: 'Track your order or inquire about shipping options.'
  },
  {
    icon: '💫',
    title: 'Returns & Refunds',
    description: 'Information about our return policy and refund process.'
  },
  {
    icon: '✨',
    title: 'Care Instructions',
    description: 'Learn how to maintain your ethereal pieces.'
  }
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl text-text-primary mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-subtle text-lg max-w-2xl mx-auto"
          >
            Have questions about our ethereal designs? We're here to help you create your perfect space.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Support Categories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl text-text-primary mb-8">How Can We Help?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {supportCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface rounded-2xl p-6 shadow-ethereal hover:shadow-glow transition-shadow duration-300"
                >
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="font-display text-xl text-text-primary mb-2">{category.title}</h3>
                  <p className="text-text-subtle">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-surface rounded-2xl p-8 shadow-ethereal"
          >
            <h2 className="font-display text-3xl text-text-primary mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text-primary mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background rounded-xl border border-text-subtle/10 focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-text-primary mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background rounded-xl border border-text-subtle/10 focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-text-primary mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background rounded-xl border border-text-subtle/10 focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-text-primary mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-background rounded-xl border border-text-subtle/10 focus:outline-none focus:ring-2 focus:ring-accent/20 text-text-primary resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-accent text-white rounded-full shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-8 text-text-subtle">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@etherealdesigns.com</span>
            </div>
            <div className="h-4 w-px bg-text-subtle/20" />
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (888) 123-4567</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 