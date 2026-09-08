import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ForCustomers.css";

import Header from "./Header";
import Footer from "./Footer";
import CustomerModal from "./CustomerModal";

const features = [
  {
    title: "Discover Local Stores",
    desc: "Find businesses around you.",
    icon: "⌖",
  },
  {
    title: "Find Relevant Savings",
    desc: "Discover offers that actually matter.",
    icon: "%",
  },
  {
    title: "Explore New Brands",
    desc: "Discover products beyond traditional shopping.",
    icon: "✦",
  },
  {
    title: "Discover Services",
    desc: "Find local businesses for everyday needs.",
    icon: "◆",
  },
  {
    title: "Access Experiences",
    desc: "Explore restaurants, salons and other local experiences.",
    icon: "◉",
  },
];

const ForCustomers = () => {
  const [isCustomerRegistrationOpen, setIsCustomerRegistrationOpen] =
    useState(false);

  // OPEN MODAL
  const openCustomerRegistration = () => {
    setIsCustomerRegistrationOpen(true);
  };

  // CLOSE MODAL
  const closeCustomerRegistration = () => {
    setIsCustomerRegistrationOpen(false);
  };

  return (
    <div className="for-customers">

      <Header />

      {/* HERO SECTION */}
      <motion.section
        className="customers-hero"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.12) 100%), url('/images/customer.jpg')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="customers-hero-inner">

          {/* LEFT CONTENT */}
          <motion.div
            className="customers-hero-content"
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >

            <div className="customers-eyebrow">
              For Customers
            </div>

            <h1>
              Discover more
              <br />
              <span>Spend smarter</span>
            </h1>

            <p className="customers-hero-description">
              Your neighborhood is full of possibilities.
              INtown helps you find them.
            </p>

            {/* OPEN MODAL */}
            <button
              type="button"
              className="customers-download-btn"
              onClick={openCustomerRegistration}
            >
              Register as Customer
              <span>↗</span>
            </button>

          </motion.div>
        </div>
      </motion.section>

      {/* WHAT YOU GET */}
      <section className="customers-benefits">
        <div className="customers-benefits-inner">

          <motion.div
            className="customers-section-heading"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="customers-section-label">
              What you get
            </span>

            <h2>
              Everything local, in one app.
            </h2>

            <p>
              From everyday essentials to new discoveries,
              INtown surfaces what is relevant and nearby.
            </p>
          </motion.div>

          <div className="customers-benefits-grid">

            {features.map((feature, index) => (
              <motion.div
                className="customer-benefit-card"
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                <div className="customer-benefit-icon">
                  {feature.icon}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.desc}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="customers-final-cta">

        <motion.div
          className="customers-final-cta-inner"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="customers-final-cta-content">

            <span className="customers-section-label">
              Start discovering
            </span>

            <h2>
              Start discovering your local <em>world.</em>
            </h2>

            <p>
              Download INtown and see what's around you.
            </p>

            <a
              href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="customers-final-btn"
            >
              Download the INtown App
              <span>↗</span>
            </a>

          </div>
        </motion.div>
      </section>

      {/* CUSTOMER REGISTRATION MODAL */}
      <CustomerModal
        isOpen={isCustomerRegistrationOpen}
        onClose={closeCustomerRegistration}
        type="customer"
      />

      <Footer />

    </div>
  );
};

export default ForCustomers;