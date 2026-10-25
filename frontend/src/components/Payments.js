import React from 'react';
import { motion } from 'framer-motion';
import './Payments.css';

const Payments = () => {
  const validityFeatures = [
    {
      title: '12 Month Validity',
      description: 'Your INtown membership is valid for 12 months from the date of activation.',
      icon: '📅',
      color: '#ff6b35',
      image: '/images/instant-save.jpg'
    },
    {
      title: 'Unlimited Usage',
      description: 'Membership can be used unlimited times during this period across all partner stores.',
      icon: '♾️',
      color: '#ff8c42',
      image: '/images/unlimited_use.jpg'
    },
    {
      title: 'Smart Notifications',
      description: 'Notifications and reminders for renewal will be sent via the app, email, or SMS.',
      icon: '🔔',
      color: '#ff8c42',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    }
  ];

  const refundFeatures = [
    {
      title: 'Non-Refundable',
      description: 'Membership fees are non-refundable once activated.',
      icon: '❌',
      color: '#e74c3c'
    },
    {
      title: 'Technical Errors',
      description: 'Refunds will only be considered if the membership was not activated due to a technical error.',
      icon: '🔧',
      color: '#f39c12'
    },
    {
      title: 'Duplicate Charges',
      description: 'Refunds will be considered if there was a duplicate charge during payment.',
      icon: '▭',
      color: '#e74c3c'
    },
    {
      title: '7-10 Day Processing',
      description: 'In such cases, refunds will be processed within 7–10 business days after verification.',
      icon: '⏰',
      color: '#f39c12'
    },
    {
      title: 'Non-Transferable',
      description: 'Memberships cannot be transferred or exchanged.',
      icon: '🚫',
      color: '#e74c3c'
    },
    {
      title: 'Misuse Policy',
      description: 'INtown reserves the right to suspend or revoke memberships if misuse or fraudulent activity is detected.',
      icon: '🛡️',
      color: '#f39c12'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="payments" className="payments">
      <div className="payments-container">
        {/* Validity Section */}
        <motion.div 
          className="policy-section validity-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="policy-header">
            <h2 className="policy-title">
              Validity
            </h2>
            <p className="policy-subtitle">
              Your INtown membership terms and conditions for a seamless experience.
            </p>
          </div>

          <motion.div 
            className="policy-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {validityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="policy-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="policy-image-container">
                  <img src={feature.image} alt={feature.title} className="policy-image" />
                  <div className="policy-icon" style={{ backgroundColor: feature.color }}>
                    {feature.icon}
                  </div>
                </div>
                
                <div className="policy-content">
                  <h3 className="policy-card-title">{feature.title}</h3>
                  <p className="policy-card-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Refund Policy Section */}
        <motion.div 
          className="policy-section refund-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="policy-header">
            <h2 className="policy-title">
              Refund Policy
            </h2>
            <p className="policy-subtitle">
              Clear and transparent refund terms to ensure your peace of mind.
            </p>
          </div>

          <motion.div 
            className="refund-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {refundFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="refund-box"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="refund-icon" style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="refund-title">{feature.title}</h3>
                <p className="refund-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Section */}
        <motion.div 
          className="payments-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Trusted by 10,000+ Members</h3>
            <p className="cta-subtitle">Transparent policies, reliable service</p>
            <div className="ratings">
              <div className="rating">
                <span className="rating-score">4.8/5</span>
                <span className="rating-platform">APP STORE</span>
              </div>
              <div className="rating">
                <span className="rating-score">4.8/5</span>
                <span className="rating-platform">PLAY STORE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Payments;
