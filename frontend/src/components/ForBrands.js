import React from "react";
import { motion } from "framer-motion";
import "./ForBrands.css";

import Header from "./Header";
import Footer from "./Footer";

const opportunities = [
  {
    icon: "📍",
    title: "Reach Local Customers",
    desc: "Meet shoppers where they already are — in their own neighbourhood.",
  },
  {
    icon: "🤝",
    title: "Explore Retail Partnerships",
    desc: "Collaborate with local stores that already have footfall and trust.",
  },
  {
    icon: "🧪",
    title: "Test New Markets",
    desc: "Run sampling and pilots city by city before committing to scale.",
  },
  {
    icon: "🏬",
    title: "Build Offline Presence",
    desc: "Turn digital demand into a durable physical footprint.",
  },
];

const D2CBrands = () => {
  return (
    <div className="d2c-page">
      <Header />

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="d2c-hero"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(15, 15, 15, 0.82) 0%,
                rgba(15, 15, 15, 0.60) 45%,
                rgba(15, 15, 15, 0.20) 100%
              ),
              url("/images/personal_connection.jpg")
            `,
          }}
        >
          <motion.div
            className="d2c-hero-content"
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
            <span className="d2c-label">
              FOR D2C BRANDS
            </span>

            <h1>
              From online discovery to offline presence.
            </h1>

            <p>
              Reach customers where they already shop. Explore
              neighborhood retail, local product discovery,
              sampling, and retail collaborations through the
              INtown ecosystem.
            </p>

            <motion.a
              href="/ContactSection"
              className="d2c-primary-btn"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              Partner With INtown
              <span>→</span>
            </motion.a>
          </motion.div>
        </section>


        {/* =====================================================
            OPPORTUNITY
        ===================================================== */}

        <section className="d2c-opportunity">

          <motion.div
            className="d2c-section-heading"
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
            <span className="d2c-label">
              THE OPPORTUNITY
            </span>

            <h2>
              Bring D2C brands
              <br />
              into local retail.
            </h2>

            <p>
              Connect your digital brand with real-world
              customers and trusted local stores.
            </p>
          </motion.div>


          <div className="d2c-features">

            {opportunities.map((item, index) => (
              <motion.div
                key={item.title}
                className="d2c-feature-card"
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
                  y: -6,
                }}
              >
                <div className="d2c-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="d2c-cta">

          <motion.div
            className="d2c-cta-content"
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
            <span className="d2c-label">
              PARTNER WITH INTOWN
            </span>

            <h2>
              Take your brand from online
              <br />
              discovery to local retail.
            </h2>

            <p>
              Build meaningful offline connections and
              reach customers where they live and shop.
            </p>

            <motion.a
              href="/ContactSection"
              className="d2c-primary-btn"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              Partner With INtown
              <span>→</span>
            </motion.a>

          </motion.div>

        </section>

      </main>

      <Footer />
    </div>
  );
};

export default D2CBrands;