import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./About.css";

import Header from "./Header";
import Footer from "./Footer";

const founderStory = [
  {
    title: "The Inspiration",
    desc: "A story about growing up around local businesses and understanding the importance of neighborhood commerce.",
  },
  {
    title: "The Problem",
    desc: "Local merchants often have great products and services but limited visibility.",
  },
  {
    title: "The Opportunity",
    desc: "Technology can connect customers with the businesses around them.",
  },
  {
    title: "The Mission",
    desc: "Build a stronger, more connected local commerce ecosystem.",
  },
];

const storyParagraphs = [
  `Every local store has a story of passion, trust, and connection. But in the digital era, many of these businesses are losing visibility while customers are paying more and getting less of that personal touch.`,

  `INtown was created to change that story. Our vision is to bring technology and community together, helping local merchants grow without extra costs and giving customers a smarter, more personal way to save.`,

  `We believe that strong local markets build stronger communities — and with INtown, we're making it effortless for people to shop local, save instantly, and stay connected.`,

  `Let's redefine the way local shopping works together.`,
];

const About = () => {
  const storyRef = useRef(null);

  const words = useMemo(() => {
    return storyParagraphs.flatMap((paragraph) =>
      paragraph.split(/\s+/)
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start 0.75", "end 0.30"],
  });

  const revealProgress = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, words.length]
  );

  return (
    <div className="about-page">

      <Header />

      <main>

        {/* =========================================================
            HERO SECTION
        ========================================================= */}

        <section
          className="about-hero"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.82) 0%,
                rgba(0, 0, 0, 0.68) 35%,
                rgba(0, 0, 0, 0.38) 65%,
                rgba(0, 0, 0, 0.18) 100%
              ),
               url("https://play-lh.googleusercontent.com/a_KXf5bLNovfBQCYf-2NF08H1pHsiNywHDL0C8xfPxPHfpc2KWbmi7iS8QHnfSdRZ7qTLsTh8OJ9TIUgIM77-g=w526-h296-rw")
            `,
          }}
        >

          <div className="about-hero-inner">

            {/* HERO CONTENT */}

            <motion.div
              className="about-hero-content"
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

              <span className="about-label">
                ABOUT INTOWN
              </span>

              <h1>
                Born from
                <br />
                <span>local shops.</span>
              </h1>

              <p>
                INtown was created from a simple observation:
                Local businesses are everywhere. But they are
                not always easy to discover.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =========================================================
            FOUNDER STORY
        ========================================================= */}

        <section className="about-story">

          <motion.div
            className="about-section-heading"
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

            <span className="about-label">
              THE FOUNDER STORY
            </span>

            <h2>
              From a simple observation
              <br />
              to a bigger mission.
            </h2>

            <p>
              INtown started with a belief that local commerce
              can be easier to discover, easier to access, and
              more valuable for everyone.
            </p>

          </motion.div>


          <div className="about-story-grid">

            {founderStory.map((item, index) => (

              <motion.div
                key={item.title}
                className="about-story-card"
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

                <div className="about-story-accent" />

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


        {/* =========================================================
            MISSION + VISION
        ========================================================= */}

        <section className="about-values">

          <div className="about-values-grid">

            {/* MISSION */}

            <motion.div
              className="about-value-card about-mission-card"
              initial={{
                opacity: 0,
                x: -40,
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
              }}
              whileHover={{
                y: -8,
              }}
            >

              <h3 className="about-label">
                OUR MISSION
              </h3>

              <p>
                To make local commerce more discoverable,
                accessible, valuable, and connected for everyone.
              </p>

            </motion.div>


            {/* VISION */}

            <motion.div
              className="about-value-card about-vision-card"
              initial={{
                opacity: 0,
                x: 40,
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
              }}
              whileHover={{
                y: -8,
              }}
            >

              <h3 className="about-label">
                OUR VISION
              </h3>

              <p>
                To build the world's most connected local
                commerce ecosystem.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =========================================================
            FINAL FOUNDER STORY
        ========================================================= */}

        <section
          ref={storyRef}
          className="about-founder-section"
        >

          <div className="about-founder-card">

            <div className="about-founder-text">

              {storyParagraphs.map(
                (paragraph, paragraphIndex) => {

                  const paragraphWords =
                    paragraph.split(/\s+/);

                  const startIndex =
                    storyParagraphs
                      .slice(0, paragraphIndex)
                      .reduce(
                        (total, item) =>
                          total +
                          item.split(/\s+/).length,
                        0
                      );

                  return (
                    <p
                      key={paragraphIndex}
                      className="about-founder-paragraph"
                    >

                      {paragraphWords.map(
                        (word, wordIndex) => {

                          const wordIndexGlobal =
                            startIndex + wordIndex;

                          return (
                            <FounderWord
                              key={`${paragraphIndex}-${wordIndex}`}
                              word={word}
                              index={wordIndexGlobal}
                              revealProgress={
                                revealProgress
                              }
                            />
                          );
                        }
                      )}

                    </p>
                  );
                }
              )}

            </div>


            {/* SIGNATURE */}

            <div className="about-founder-signature">

              <div className="about-founder-name">
                – Vinod Reddy Vembuluru
              </div>

              <div className="about-founder-role">
                Founder & CEO, INtown
              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
};


/* =========================================================
   WORD REVEAL
========================================================= */

const FounderWord = ({
  word,
  index,
  revealProgress,
}) => {

  const color = useTransform(
    revealProgress,
    (value) =>
      index < value
        ? "#ffffff"
        : "#555555"
  );

  return (
    <motion.span
      className="about-founder-word"
      style={{
        color,
      }}
    >
      {word}{" "}
    </motion.span>
  );
};

export default About;