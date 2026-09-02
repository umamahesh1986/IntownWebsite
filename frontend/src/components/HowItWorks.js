import React from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

import Header from "./Header";
import Footer from "./Footer";

const HowItWorks = () => {
  return (
    <main className="how-it-works-page">

      {/* HEADER */}
      <Header />


      {/* HERO SECTION */}
      <section className="hiw-hero-section">
        <div className="hiw-hero-glow"></div>

        <div className="hiw-container hiw-hero-container">

          <motion.span
            className="hiw-eyebrow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            How It Works
          </motion.span>


          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            A smarter way to
            <span>discover local commerce.</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            INtown connects discovery, savings, businesses, brands,
            and experiences in one ecosystem.
          </motion.p>


          <motion.a
            href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener,noreferrer"
            className="hiw-primary-btn"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            Download the INtown App
            <span>↗</span>
          </motion.a>

        </div>
      </section>


      {/* FOR CUSTOMERS */}
      <section className="hiw-audience-section hiw-customer-section">

        <div className="hiw-container">

          <motion.div
            className="hiw-section-intro"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >

            <span className="hiw-section-label">
              For Customers
            </span>

            <h2>
              Discover what is
              <span>already around you.</span>
            </h2>

          </motion.div>


          <motion.div
            className="hiw-flow-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >

            <FlowItem number="01" title="Discover" />
            <FlowArrow />
            <FlowItem number="02" title="Choose" />
            <FlowArrow />
            <FlowItem number="03" title="Visit" />
            <FlowArrow />
            <FlowItem number="04" title="Save" />

          </motion.div>

        </div>

      </section>


      {/* FOR MERCHANTS */}
      <section className="hiw-audience-section hiw-merchant-section">

        <div className="hiw-container">

          <motion.div
            className="hiw-section-intro"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >

            <span className="hiw-section-label">
              For Merchants
            </span>

            <h2>
              Turn nearby visibility
              <span>into real footfall.</span>
            </h2>

          </motion.div>


          <motion.div
            className="hiw-flow-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >

            <FlowItem number="01" title="List" />
            <FlowArrow />
            <FlowItem number="02" title="Get Discovered" />
            <FlowArrow />
            <FlowItem number="03" title="Attract Customers" />
            <FlowArrow />
            <FlowItem number="04" title="Grow" />

          </motion.div>

        </div>

      </section>


      {/* FOR BRANDS */}
      <section className="hiw-audience-section hiw-brand-section">

        <div className="hiw-container">

          <motion.div
            className="hiw-section-intro"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >

            <span className="hiw-section-label">
              For Brands
            </span>

            <h2>
              Move from online discovery
              <span>to local shelves.</span>
            </h2>

          </motion.div>


          <motion.div
            className="hiw-flow-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >

            <FlowItem number="01" title="Partner" />
            <FlowArrow />
            <FlowItem number="02" title="Reach Local Customers" />
            <FlowArrow />
            <FlowItem number="03" title="Test" />
            <FlowArrow />
            <FlowItem number="04" title="Grow Offline" />

          </motion.div>

        </div>

      </section>


      {/* ECOSYSTEM VISUAL */}
      <section className="hiw-ecosystem-section">

        <div className="hiw-ecosystem-glow"></div>

        <div className="hiw-container">

          <motion.div
            className="hiw-ecosystem-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >

            <span className="hiw-section-label">
              Ecosystem Visual
            </span>

            <h2>
              Customers
              <span>↔ INtown ↔</span>
              D2C Brands
            </h2>

          </motion.div>


          {/* MAIN NETWORK */}
          <motion.div
            className="hiw-ecosystem-network"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >

            <motion.div
              className="hiw-network-card"
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
            >
              <strong>Customers</strong>
            </motion.div>


            <motion.div
              className="hiw-network-arrow"
              animate={{
                x: [0, 8, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↔
            </motion.div>


            <motion.div
              className="hiw-network-core"
              whileHover={{
                scale: 1.05,
              }}
            >

              <strong>INtown</strong>

              <small>
                The connective layer
                of local commerce
              </small>

            </motion.div>


            <motion.div
              className="hiw-network-arrow"
              animate={{
                x: [0, -8, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↔
            </motion.div>


            <motion.div
              className="hiw-network-card"
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
            >
              <strong>D2C Brands</strong>
            </motion.div>

          </motion.div>


          {/* ECOSYSTEM ITEMS */}
          <div className="hiw-ecosystem-items">

            {[
              "Local Stores",
              "Services",
              "Experiences",
              "Communities",
            ].map((item, index) => (
              <motion.div
                key={item}
                className="hiw-ecosystem-item"
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
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
              >
                {item}
              </motion.div>
            ))}

          </div>


          <motion.p
            className="hiw-ecosystem-description"
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            INtown connects{" "}
            <strong>local stores, services, experiences,</strong>{" "}
            and <strong>communities</strong> into one
            discoverable network.
          </motion.p>

        </div>

      </section>


      {/* FOOTER */}
      <Footer />

    </main>
  );
};


/* =========================================================
   FLOW ITEM
========================================================= */

const FlowItem = ({ number, title }) => {
  return (
    <motion.div
      className="hiw-flow-item"
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <small>{number}</small>
      <h3>{title}</h3>
    </motion.div>
  );
};


/* =========================================================
   FLOW ARROW
========================================================= */

const FlowArrow = () => {
  return (
    <motion.div
      className="hiw-flow-arrow"
      animate={{
        x: [0, 6, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      →
    </motion.div>
  );
};


export default HowItWorks;