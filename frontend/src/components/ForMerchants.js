import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ForMerchants.css";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

const funnelSteps = [
  {
    number: "01",
    title: "Visibility",
    desc: "Customers discover your business.",
  },
  {
    number: "02",
    title: "Interest",
    desc: "Customers explore what you offer.",
  },
  {
    number: "03",
    title: "Visit",
    desc: "Customers come to your store.",
  },
  {
    number: "04",
    title: "Purchase",
    desc: "Customers transact.",
  },
  {
    number: "05",
    title: "Return",
    desc: "Customers come back again.",
  },
];

const merchantFeatures = [
  {
    icon: "📍",
    title: "Business Discovery",
    desc: "Help nearby customers discover your business when they are ready to shop.",
  },
  {
    icon: "🎁",
    title: "Offers & Promotions",
    desc: "Create relevant offers that encourage customers to visit and purchase.",
  },
  {
    icon: "🤝",
    title: "Customer Engagement",
    desc: "Build meaningful relationships with customers in your local community.",
  },
  {
    icon: "↻",
    title: "Repeat Business",
    desc: "Give customers reasons to return and make your business their local choice.",
  },
];

const ForMerchants = () => {
  const [isMerchantRegistrationOpen, setIsMerchantRegistrationOpen] =
    useState(false);

  return (
    <div className="for-merchants">
      <Header />

      <main>
        {/* HERO */}
        <section
          className="merchant-hero"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.78) 0%,
                rgba(0, 0, 0, 0.58) 42%,
                rgba(0, 0, 0, 0.22) 72%,
                rgba(0, 0, 0, 0.12) 100%
              ),
              url("/images/merchant.jpg")
            `,
          }}
        >
          <div className="merchant-hero-inner">
            <motion.div
              className="merchant-hero-content"
              initial={{
                opacity: 0,
                x: -45,
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
              <span className="merchant-label">
                FOR MERCHANTS
              </span>

              <h1>
                Get discovered by the customers around{" "}
                 you
              </h1>

              <p>
                Your business deserves more visibility. INtown helps
                local businesses connect with nearby customers and
                build long-term relationships.
              </p>

              <motion.button
                type="button"
                className="merchant-primary-btn"
                onClick={() => setIsMerchantRegistrationOpen(true)}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Register Your Business
                <span>→</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* GROWTH FUNNEL */}
        <section className="merchant-funnel">
          <motion.div
            className="merchant-section-heading"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="merchant-section-label">
              MERCHANT GROWTH FUNNEL
            </span>

            <h2>
              Turn local discovery into
              <br />
              lasting  growth
            </h2>

            <div className="merchant-heading-line" />

            <p>
              INtown helps move customers through every
              stage of their journey with your business.
            </p>
          </motion.div>

          <div className="merchant-funnel-list">
            {funnelSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="merchant-funnel-item"
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
              >
                <div className="merchant-funnel-number">
                  {step.number}
                </div>

                <div className="merchant-funnel-text">
                  <h3>{step.title}</h3>

                  <p>{step.desc}</p>
                </div>

                {index !== funnelSteps.length - 1 && (
                  <div className="merchant-funnel-arrow">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="merchant-features">
          <motion.div
            className="merchant-section-heading"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="merchant-section-label">
              MERCHANT FEATURES
            </span>

            <h2>
              Everything you need
              <br />
              to grow locally
            </h2>

            <div className="merchant-heading-line" />
          </motion.div>

          <div className="merchant-feature-grid">
            {merchantFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="merchant-feature-card"
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
              >
                <div className="merchant-feature-icon">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="merchant-final"
          id="join-intown"
        >
          <motion.div
            className="merchant-final-card"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="merchant-final-content">
              <span className="merchant-section-label">
                GROW WITH INTOWN
              </span>

              <h2>
                Your business is local
                <br />
                Your growth should be too
              </h2>

              <div className="merchant-heading-line" />

              <p>
                Connect with nearby customers and build
                stronger relationships with your community.
              </p>

              <motion.button
                type="button"
                className="merchant-primary-btn"
                onClick={() => setIsMerchantRegistrationOpen(true)}
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Register Your Business
                <span>→</span>
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <Modal
        isOpen={isMerchantRegistrationOpen}
        onClose={() => setIsMerchantRegistrationOpen(false)}
        type="merchant"
      />

      <Footer />
    </div>
  );
};

export default ForMerchants;