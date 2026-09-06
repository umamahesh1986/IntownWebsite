import React from "react";
import { motion } from "framer-motion";
import "./Ecosystem.css";

import Header from "./Header";
import Footer from "./Footer";

const ecosystemSides = [
  {
    id: "customers",
    title: "Customers",
    desc: "Discover local stores, products, services and experiences.",
  },
  {
    id: "stores",
    title: "Local Stores",
    desc: "Get discovered by nearby customers and grow your business.",
  },
  {
    id: "brands",
    title: "D2C Brands",
    desc: "Connect digital-first brands with local retail opportunities.",
  },
  {
    id: "services",
    title: "Services",
    desc: "Help people discover trusted services around them.",
  },
  {
    id: "experiences",
    title: "Experiences",
    desc: "Bring restaurants, salons and local experiences closer.",
  },
  {
    id: "technology",
    title: "Technology",
    desc: "Power better discovery and stronger local connections.",
  },
];

const ecosystemFeatures = [
  {
    title: "Customers Discover",
    desc: "Better local discovery, tuned to where you actually are.",
  },
  {
    title: "Merchants Grow",
    desc: "Better visibility and stronger customer relationships.",
  },
  {
    title: "Brands Reach",
    desc: "Better offline opportunities for digital-first brands.",
  },
  {
    title: "Communities Benefit",
    desc: "Stronger local commerce, and money that stays local.",
  },
];

const Ecosystem = () => {
  return (
    <div className="ecosystem-page">
      <Header />

      <main>

        {/* HERO */}

        <section className="eco-hero">
          <motion.div
            className="eco-hero-content"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <span className="eco-label">
              THE INTOWN ECOSYSTEM
            </span>

            <h1>
              Everything local
              <br />
              <span>Connected</span>
            </h1>

            <p>
              INtown connects the people, businesses, brands,
              and experiences that make communities thrive.
            </p>

            <motion.a
              href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener,noreferrer"
              className="eco-primary-btn"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              Download the INtown App
            </motion.a>
          </motion.div>
        </section>


        {/*BRAND POSITIONING*/}

        <section className="eco-positioning">

          <div className="eco-positioning-inner">

            <motion.div
              className="eco-positioning-header"
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
                duration: 0.7,
              }}
            >
              <span className="eco-label">
                MORE THAN A MARKETPLACE
              </span>

              <h2>
                Built for local commerce
                <br />
                <span>Designed for everyone</span>
              </h2>
            </motion.div>


            <div className="eco-positioning-layout">

              {/* LEFT SIDE */}

              <motion.div
                className="eco-positioning-statements"
                initial={{
                  opacity: 0,
                  x: -35,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
              >

                <div className="eco-positioning-line">
                 
                  <p>
                    INtown is not just a discount app.
                  </p>
                </div>

                <div className="eco-positioning-line">
                 
                  <p>
                    INtown is not just a coupon platform.
                  </p>
                </div>

                <div className="eco-positioning-line">
                
                  <p>
                    INtown is not just a marketplace.
                  </p>
                </div>

              </motion.div>


              {/* RIGHT — MAIN BRAND STATEMENT */}

              <motion.div
                className="eco-positioning-highlight"
                initial={{
                  opacity: 0,
                  x: 35,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
              >

               

                <h3>
                  INtown is a
                  <strong>
                    Local Commerce Ecosystem.
                  </strong>
                </h3>

                <div className="eco-highlight-divider" />

                <p>
                  Customers discover. Merchants grow.
                  Brands reach local markets. Communities
                  become stronger.
                </p>

              </motion.div>

            </div>

          </div>

        </section>


        {/* NETWORK */}

        <section className="eco-network">

          <motion.div
            className="eco-section-heading center"
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
            <span className="eco-label">
              ONE ECOSYSTEM
            </span>

            <h2>
              One ecosystem
              <br />
              Multiple possibilities
            </h2>
          </motion.div>


          <div className="eco-network-layout">

            <div className="eco-side eco-left">

              {ecosystemSides.slice(0, 3).map(
                (item, index) => (

                  <motion.div
                    key={item.id}
                    className="eco-node"
                    initial={{
                      opacity: 0,
                      x: -35,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    whileHover={{
                      x: 5,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                  >

                   

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>

                  </motion.div>

                )
              )}

            </div>


            <motion.div
              className="eco-center"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >

              <div className="eco-center-ring">

                <div className="eco-center-logo">
                  IN
                </div>

                

              </div>

            </motion.div>


            <div className="eco-side eco-right">

              {ecosystemSides.slice(3, 6).map(
                (item, index) => (

                  <motion.div
                    key={item.id}
                    className="eco-node"
                    initial={{
                      opacity: 0,
                      x: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    whileHover={{
                      x: -5,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                  >

                    

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>

                  </motion.div>

                )
              )}

            </div>

          </div>

        </section>


        {/* COMPONENTS */}

        <section className="eco-components">

          <motion.div
            className="eco-section-heading"
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

            <span className="eco-label">
              ECOSYSTEM COMPONENTS
            </span>

            <h2>
              When local businesses grow,
              <br />
              communities grow.
            </h2>

          </motion.div>


          <div className="eco-features">

            {ecosystemFeatures.map(
              (item, index) => (

                <motion.div
                  key={item.title}
                  className="eco-feature-card"
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
                    amount: 0.15,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                >

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.desc}
                  </p>

                </motion.div>

              )
            )}

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Ecosystem;