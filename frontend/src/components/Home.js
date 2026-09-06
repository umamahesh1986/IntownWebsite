import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Home.css";

import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const containerRef = useRef(null);

  const paragraphs = [
    `Local commerce is everywhere. But discovering it shouldn't be difficult.`,
    `The best store, product, service, or experience may already be around you. INtown helps you discover it.`,
  ];

  const totalWords = useMemo(() => {
    return paragraphs.join(" ").split(/\s+/).length;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.35"],
  });

  const revealIndex = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [0, totalWords]
  );

  let wordCounter = 0;

  const sectionAnimation = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <main className="home-page">

      <Header />

      {/* 
          SECTION 1 - HERO
       */}

      <section className="home-hero-section">

        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/images/intown-video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="home-hero-overlay"></div>

        <motion.div
          className="home-hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >

          <div className="home-hero-inner">

            

            <motion.span
              className="home-hero-eyebrow"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                  },
                },
              }}
            >

              <span className="hero-line">"
                Of the{" "}
                <span className="hero-local-highlight">
                  Local
                </span>
              </span>{" "}

              <span className="hero-line">
                By the{" "}
                <span className="hero-local-highlight">
                  Local
                </span>
              </span>{" "}

              <span className="hero-line">
                For the{" "}
                <span className="hero-local-highlight">
                  Local 
                </span> "
              </span>

            </motion.span>


            <motion.h1
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              Your Local World
              <span>
                Now More Discoverable
              </span>
            </motion.h1>


            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                  },
                },
              }}
            >
              Discover nearby stores, meaningful savings, exciting brands,
              local services, and experiences all through one connected
              local commerce ecosystem.
            </motion.p>


            <motion.div
              className="home-hero-buttons"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                  },
                },
              }}
            >

              <a
                href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
                target="_blank"
                rel="noopener,noreferrer"
                className="home-hero-btn home-hero-btn-primary"
              >
                Download the INtown App
                <span>↗</span>
              </a>


              <a
                href="/ecosystem"
                className="home-hero-btn home-hero-btn-secondary"
              >
                Explore INtown
                <span>↗</span>
              </a>

            </motion.div>


            <motion.div
              className="home-hero-bottom"
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                  },
                },
              }}
            >
              <span>
                Discover Local. Save More. Live Better.
              </span>
            </motion.div>

          </div>

        </motion.div>

      </section>


      {/* 
          SECTION 2 - BRAND POSITIONING
       */}

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


      {/* 
          SECTION 3 - DISCOVER LOCAL COMMERCE
      */}

      <motion.section
        ref={containerRef}
        className="home-discover-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={sectionAnimation}
      >

        <div className="home-discover-container">

          <div className="home-discover-title">
            Discover Local Commerce
          </div>

          <h2 className="home-discover-heading">

            {paragraphs[0]
              .split(/\s+/)
              .map((word, index) => {

                const currentIndex = wordCounter++;

                return (
                  <RevealWord
                    key={`${word}-${index}`}
                    word={word}
                    index={currentIndex}
                    revealIndex={revealIndex}
                  />
                );
              })}

          </h2>


          <p className="home-discover-description">

            {paragraphs[1]
              .split(/\s+/)
              .map((word, index) => {

                const currentIndex = wordCounter++;

                return (
                  <RevealWord
                    key={`${word}-${index}`}
                    word={word}
                    index={currentIndex}
                    revealIndex={revealIndex}
                  />
                );
              })}

          </p>


          <motion.div
            className="home-commerce-flow"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >

            <motion.div
              className="home-commerce-item"
              variants={cardAnimation}
              custom={0}
            >
              Customer
            </motion.div>

            <motion.div
              className="home-commerce-arrow"
              variants={cardAnimation}
              custom={1}
            >
              →
            </motion.div>

            <motion.div
              className="home-commerce-item"
              variants={cardAnimation}
              custom={2}
            >
              INtown
            </motion.div>

            <motion.div
              className="home-commerce-arrow"
              variants={cardAnimation}
              custom={3}
            >
              →
            </motion.div>

            <motion.div
              className="home-commerce-item"
              variants={cardAnimation}
              custom={4}
            >
              Local Store
            </motion.div>

            <motion.div
              className="home-commerce-arrow"
              variants={cardAnimation}
              custom={5}
            >
              →
            </motion.div>

            <motion.div
              className="home-commerce-item"
              variants={cardAnimation}
              custom={6}
            >
              Savings
            </motion.div>

            <motion.div
              className="home-commerce-arrow"
              variants={cardAnimation}
              custom={7}
            >
              →
            </motion.div>

            <motion.div
              className="home-commerce-item"
              variants={cardAnimation}
              custom={8}
            >
              Community
            </motion.div>

          </motion.div>

        </div>

      </motion.section>


      {/* 
          SECTION 4 - PROBLEM
     */}

      <motion.section
        className="home-problem-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-problem-container">

          <div className="home-problem-label">
            The Problem
          </div>

          <h2 className="home-problem-heading">
            A lot happens locally
            <span>
              Very little gets discovered
            </span>
          </h2>


          <motion.div
            className="home-problem-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >

            <motion.article
              className="home-problem-card"
              variants={cardAnimation}
              custom={0}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
            >

              <h3>
                Customers
              </h3>

              <p>
                Too many choices. Not enough relevant discovery.
              </p>

            </motion.article>


            <motion.article
              className="home-problem-card"
              variants={cardAnimation}
              custom={1}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
            >

              <h3>
                Merchants
              </h3>

              <p>
                Great businesses. Limited visibility.
              </p>

            </motion.article>


            <motion.article
              className="home-problem-card"
              variants={cardAnimation}
              custom={2}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.25,
                },
              }}
            >

              <h3>
                Brands
              </h3>

              <p>
                Strong products. Limited offline access.
              </p>

            </motion.article>

          </motion.div>


          <div className="home-problem-connect">

            <p>
              INtown connects all three.
            </p>

          </div>

        </div>

      </motion.section>


      {/* 
          SECTION 5 - ONE LOCAL COMMERCE ECOSYSTEM
     */}

      <motion.section
        className="home-ecosystem-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-ecosystem-container">

          <div className="home-ecosystem-header">

            <div className="home-ecosystem-label">
              One Local Commerce Ecosystem
            </div>

            <h2 className="home-ecosystem-heading">
              One ecosystem
              <span>
                Multiple possibilities
              </span>
            </h2>

            <p className="home-ecosystem-description">
              INtown brings together the people, businesses, brands, and
              experiences that make local communities unique.
            </p>

          </div>


          <motion.div
            className="home-ecosystem-center"
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
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="home-ecosystem-core">

              <span className="home-ecosystem-core-name">
                INtown
              </span>

              <span className="home-ecosystem-core-text">
                The connective layer of local commerce
              </span>

            </div>

          </motion.div>


          <motion.div
            className="home-ecosystem-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >

            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={0}
            >
              <h3>
                Customers
              </h3>
            </motion.article>


            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={1}
            >
              <h3>
                Local Stores
              </h3>
            </motion.article>


            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={2}
            >
              <h3>
                D2C Brands
              </h3>
            </motion.article>


            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={3}
            >
              <h3>
                Services
              </h3>
            </motion.article>


            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={4}
            >
              <h3>
                Experiences
              </h3>
            </motion.article>


            <motion.article
              className="home-ecosystem-card"
              variants={cardAnimation}
              custom={5}
            >
              <h3>
                Technology
              </h3>
            </motion.article>

          </motion.div>

        </div>

      </motion.section>


      {/*
          SECTION 6 - HOW INTOWN WORKS
       */}

      <motion.section
        className="home-how-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-how-container">

          <div className="home-how-header">

            <div className="home-how-label">
              How INtown Works
            </div>

            <h2 className="home-how-heading">
              Discover  Visit
              <span>
                Save  Repeat
              </span>
            </h2>

          </div>


          <motion.div
            className="home-how-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >

            <motion.article
              className="home-how-card"
              variants={cardAnimation}
              custom={0}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
            >

             

              <div className="home-how-icon">
                ↓
              </div>

              <h3>
                Download
              </h3>

              <p>
                Get the INtown app.
              </p>

            </motion.article>


            <motion.article
              className="home-how-card"
              variants={cardAnimation}
              custom={1}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
            >

             

              <div className="home-how-icon">
                ◎
              </div>

              <h3>
                Discover
              </h3>

              <p>
                Explore nearby stores, offers, brands, services,
                and experiences.
              </p>

            </motion.article>


            <motion.article
              className="home-how-card"
              variants={cardAnimation}
              custom={2}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
            >

             

              <div className="home-how-icon">
                ↗
              </div>

              <h3>
                Visit
              </h3>

              <p>
                Choose where you want to shop or experience.
              </p>

            </motion.article>


            <motion.article
              className="home-how-card"
              variants={cardAnimation}
              custom={3}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.25,
                },
              }}
            >

             

              <div className="home-how-icon">
                ✓
              </div>

              <h3>
                Save
              </h3>

              <p>
                Show the app at billing and enjoy eligible
                savings.
              </p>

            </motion.article>

          </motion.div>


          <motion.div
            className="home-how-cta"
            initial={{
              opacity: 0,
              y: 25,
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

            <a
              href="/Download"
              className="home-how-button"
            >
              Start Discovering Local
              <span>
                ↗
              </span>
            </a>

          </motion.div>

        </div>

      </motion.section>


      {/* 
          SECTION 7 - LOCAL
      */}

      <motion.section
        className="home-local-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-local-container">

          <div className="home-local-header">

            <div className="home-local-label">
              Discover Local Stores and Savings
            </div>

            <h2 className="home-local-heading">
              Your neighborhood
              <span>
                has more to offer
              </span>
            </h2>

            <p className="home-local-description">
              Discover new places, find relevant savings, explore local
              products, and support the businesses around you.
            </p>

          </div>


          <motion.div
            className="home-local-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >

            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={0}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Discover Local Stores
                </h3>
              </div>
            </motion.article>


            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={1}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Find Relevant Offers
                </h3>
              </div>
            </motion.article>


            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={2}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Save on Everyday Purchases
                </h3>
              </div>
            </motion.article>


            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={3}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Explore New Brands
                </h3>
              </div>
            </motion.article>


            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={4}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Discover Local Services
                </h3>
              </div>
            </motion.article>


            <motion.article
              className="home-local-card"
              variants={cardAnimation}
              custom={5}
              whileHover={{
                y: -8,
              }}
            >
              <div className="home-local-card-content">
                <h3>
                  Experience More Nearby
                </h3>
              </div>
            </motion.article>

          </motion.div>


          <div className="home-local-cta">

            <a
              href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener,noreferrer"
              className="home-local-btn"
            >
              Download the App
              <span>
                ↗
              </span>
            </a>

          </div>

        </div>

      </motion.section>


      {/* 
          SECTION 8 - HELP LOCAL BUSINESSES GROW
      */}

      <motion.section
        className="home-merchant-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-merchant-container">

          <div className="home-merchant-header">

            <div className="home-merchant-label">
              Help Local Businesses Grow
            </div>

            <h2 className="home-merchant-heading">
              Your next customer
              <span>
                could already be nearby
              </span>
            </h2>

            <p className="home-merchant-description">
              INtown helps local businesses get discovered, attract
              customers, increase visibility, and build stronger
              relationships with their community.
            </p>

          </div>


          <motion.div
            className="home-merchant-flow"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >

            <motion.article
              className="home-merchant-card"
              variants={cardAnimation}
              custom={0}
              whileHover={{
                x: 8,
              }}
            >

             

              <div className="home-merchant-card-content">
                <h3>
                  Get Discovered
                </h3>

                <span>
                  →
                </span>
              </div>

            </motion.article>


            <motion.article
              className="home-merchant-card"
              variants={cardAnimation}
              custom={1}
              whileHover={{
                x: 8,
              }}
            >

             

              <div className="home-merchant-card-content">
                <h3>
                  Get Visited
                </h3>

                <span>
                  →
                </span>
              </div>

            </motion.article>


            <motion.article
              className="home-merchant-card"
              variants={cardAnimation}
              custom={2}
              whileHover={{
                x: 8,
              }}
            >

             

              <div className="home-merchant-card-content">
                <h3>
                  Get Remembered
                </h3>

                <span>
                  →
                </span>
              </div>

            </motion.article>


            <motion.article
              className="home-merchant-card"
              variants={cardAnimation}
              custom={3}
              whileHover={{
                x: 8,
              }}
            >

              

              <div className="home-merchant-card-content">
                <h3>
                  Get Revisited
                </h3>

                <span>
                  →
                </span>
              </div>

            </motion.article>

          </motion.div>


          <div className="home-merchant-cta">

            <a
              href="/ForMerchants"
              className="home-merchant-btn"
            >
              Join INtown as a Merchant
              <span>
                ↗
              </span>
            </a>

          </div>

        </div>

      </motion.section>


      {/* 
          SECTION 9 - D2C BRANDS
      */}

      <motion.section
        className="home-brands-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-brands-container">

          <div className="home-brands-content">

            <div className="home-brands-label">
              Bring D2C Brands Into Local Retail
            </div>

            <h2 className="home-brands-heading">
              From online discovery
              <span>
                to offline presence
              </span>
            </h2>

            <p className="home-brands-description">
              Reach customers where they already shop. Explore neighborhood
              retail, local product discovery, sampling, and retail
              collaborations through the INtown ecosystem.
            </p>


            <div className="home-brands-cta">

              <a
                href="/ForBrands"
                className="home-brands-btn"
              >
                Partner With INtown
                <span>
                  ↗
                </span>
              </a>

            </div>

          </div>


          <motion.div
            className="home-brands-visual"
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: -5,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="home-brands-orbit orbit-one"></div>

            <div className="home-brands-orbit orbit-two"></div>

            <div className="home-brands-orbit orbit-three"></div>


            <motion.div
              className="home-brands-core"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <span className="home-brands-core-small">
                D2C
              </span>

              <strong>
                Brands
              </strong>

              <span className="home-brands-core-text">
                Meet local customers
              </span>

            </motion.div>


            <div className="home-brands-node node-one">
              Discovery
            </div>

            <div className="home-brands-node node-two">
              Retail
            </div>

            <div className="home-brands-node node-three">
              Sampling
            </div>

            <div className="home-brands-node node-four">
              Community
            </div>

          </motion.div>

        </div>

      </motion.section>


      {/* 
          SECTION 10 - TECHNOLOGY
       */}

      <motion.section
        className="home-technology-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={sectionAnimation}
      >

        <div className="home-technology-container">

          <div className="home-technology-header">

            <div className="home-technology-label">
              Technology for Local Commerce
            </div>

            <h2 className="home-technology-heading">
              Technology that brings
              <span>
                local commerce closer
              </span>
            </h2>

          </div>


          <motion.div
            className="home-technology-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >

            <motion.article
              className="home-technology-card"
              variants={cardAnimation}
              custom={0}
              whileHover={{
                y: -8,
              }}
            >

             

              <h3>
                Smart Discovery
              </h3>

              <p>
                Find relevant local opportunities.
              </p>

            </motion.article>


            <motion.article
              className="home-technology-card"
              variants={cardAnimation}
              custom={1}
              whileHover={{
                y: -8,
              }}
            >

             

              <h3>
                Personalised Recommendations
              </h3>

              <p>
                Discover what matters to you.
              </p>

            </motion.article>


            <motion.article
              className="home-technology-card"
              variants={cardAnimation}
              custom={2}
              whileHover={{
                y: -8,
              }}
            >


              <h3>
                Intelligent Engagement
              </h3>

              <p>
                Receive useful updates and offers.
              </p>

            </motion.article>


            <motion.article
              className="home-technology-card"
              variants={cardAnimation}
              custom={3}
              whileHover={{
                y: -8,
              }}
            >

           

              <h3>
                Merchant Growth
              </h3>

              <p>
                Help businesses attract and retain customers.
              </p>

            </motion.article>


            <motion.article
              className="home-technology-card"
              variants={cardAnimation}
              custom={4}
              whileHover={{
                y: -8,
              }}
            >

              

              <h3>
                Local Collaboration
              </h3>

              <p>
                Connect brands, businesses, and communities.
              </p>

            </motion.article>

          </motion.div>

        </div>

      </motion.section>


      {/* 
          SECTION 11 - FUTURE
       */}

      <motion.section
        className="home-future-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        variants={sectionAnimation}
      >

        <div className="home-future-container">

          <div className="home-future-label">
            The Future of Local Commerce
          </div>


          <motion.h2
            className="home-future-heading"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            We believe the future of commerce is local, connected, and intelligent.
          </motion.h2>


          <p className="home-future-description">
            Technology should not only make large platforms stronger.
            It should also help local businesses become more visible,
            accessible, and competitive.
          </p>

        </div>

      </motion.section>


      {/* 
          SECTION 12 - FINAL CTA
      */}

      <motion.section
        className="home-final-section"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              duration: 1,
            },
          },
        }}
      >

        <div className="home-final-glow"></div>


        <motion.div
          className="home-final-container"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div className="home-final-label">
            Discover More. Live Local.
          </div>


          <h2 className="home-final-heading">
            Your local world
            <span>
              is waiting
            </span>
          </h2>


          <p className="home-final-description">
            Discover more of your neighborhood with INtown.
          </p>


          <div className="home-final-buttons">

            <a
              href="https://play.google.com/store/search?q=intown&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener,noreferrer"
              className="home-final-btn home-final-btn-primary"
            >
              Download the INtown App
              <span>
                ↗
              </span>
            </a>


            <a
              href="/ContactSection"
              className="home-final-btn home-final-btn-secondary"
            >
              Talk to us
              <span>
                ↗
              </span>
            </a>

          </div>

        </motion.div>

      </motion.section>


      <Footer />

    </main>
  );
};


/* 
   WORD REVEAL
 */

const RevealWord = ({
  word,
  index,
  revealIndex,
}) => {

  const color = useTransform(
    revealIndex,
    [index, index + 1],
    ["#555555", "#ffffff"]
  );

  return (
    <motion.span
      className="home-reveal-word"
      style={{
        color,
      }}
    >
      {word}{" "}
    </motion.span>
  );
};


export default Home;