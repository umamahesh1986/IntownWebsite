import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Upgrades.css";

import Header from "./Header";
import Footer from "./Footer";

const FAQ_DATA = [
  {
    id: 1,
    q: "How do I start?",
    a: "Download the INtown app, sign up, and activate your membership.",
  },
  {
    id: 2,
    q: "How do I use at a store?",
    a: "Show your active membership and enter the bill amount with savings in the application.",
  },
  {
    id: 3,
    q: "Is there any usage limit?",
    a: "No, enjoy unlimited savings all year.",
  },
  {
    id: 4,
    q: "How do the savings apply?",
    a: "The merchant verifies your membership and suggests you enter the saved amount in the application.",
  },
  {
    id: 5,
    q: "How do I pay?",
    a: "Pay via cash, UPI, or any payment option available at the local shop.",
  },
  {
    id: 6,
    q: "Can I use it in any location?",
    a: "Yes, you can use it in all our collaborated local shops.",
  },
  {
    id: 7,
    q: "Membership issues?",
    a: "If a store refuses your valid membership, contact support via the app immediately.",
  },
  {
    id: 8,
    q: "Can others use my account?",
    a: "No, memberships are personal and non-transferable.",
  },
  {
    id: 9,
    q: "What is the validity?",
    a: "INtown validity is 12 months from the date of first purchase and can be used anywhere in India.",
  },
  {
    id: 10,
    q: "How do I renew?",
    a: "Open 'My Membership' in the app and renew in seconds.",
  },
];

export default function Upgrades() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />

      <main className="upgrades">

        {/* ================= FAQ SECTION ================= */}

        <section className="upgrade-section upgrade-section-two">
          <div className="faq-wrapper">

            <motion.button
              type="button"
              className="faq-main"
              onClick={() => setOpen((prev) => !prev)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              aria-expanded={open}
            >
              <span className="faq-title">FAQs</span>

              <span className={open ? "arrow rotate" : "arrow"}>
                ▼
              </span>
            </motion.button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="faq-container"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {FAQ_DATA.map((item, index) => (
                    <motion.article
                      className="faq-item"
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.04,
                      }}
                    >
                      <h3 className="faq-q">{item.q}</h3>

                      <p className="faq-a">{item.a}</p>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* ================= DOWNLOAD SECTION ================= */}

        <section className="upgrade-section upgrade-section-one">
          <motion.div
            className="scanner-content"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >

            {/* QR CARD */}

            <motion.div
              className="scanner-box"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="scanner-image-wrap"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25 }}
              >
                <img
                  className="scanner-image"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://play.google.com/store/search?q=intown&c=apps&hl=en"
                  alt="Scan to download INtown"
                />
              </motion.div>

              <div className="scanner-text">
                <span className="scanner-small">
                  SCAN TO
                </span>

                <h3 className="download-heading">
                  <span className="download-word">
                    DOWNLOAD
                  </span>

                  <span className="intown-word">
                    INtown
                  </span>
                </h3>
              </div>
            </motion.div>

            {/* CREDIBILITY CONTENT */}

            <div className="credibility-content">

              <motion.h1
                className="credHeading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                }}
              >
                not everyone gets it
              </motion.h1>

              <motion.p
                className="credDesc"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}
              >
                like all good things in life, earning membership is not easy;
                but unlocking a greater future makes the effort worthwhile.
              </motion.p>

            </div>

          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}