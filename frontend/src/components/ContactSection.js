import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./ContactSection.css";
import Footer from "./Footer";
import Header from "./Header";
const ContactSection = () => {
  const [role, setRole] = useState("Partners");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const roles = [
    {
      title: "Customers",
      desc: "Have a question about the app?",
    },
    {
      title: "Merchants",
      desc: "Want to grow your business?",
    },
    {
      title: "Brands",
      desc: "Want to explore retail partnerships?",
    },
    {
      title: "Partners",
      desc: "Want to collaborate?",
    },
    {
      title: "Investors",
      desc: "Want to learn more?",
    },
  ];

  /*  GOOGLE MAP */

  useEffect(() => {
    let cancelled = false;
    let interval = null;

    const initializeMap = async () => {
      try {
        if (cancelled || !mapRef.current) {
          return;
        }

        if (
          !window.google ||
          !window.google.maps
        ) {
          return;
        }

        /*
         * Prevent duplicate map creation
         */
        if (mapInstanceRef.current) {
          return;
        }

        /*
         * Load Google Maps "maps" library
         */
        const mapsLibrary =
          await window.google.maps.importLibrary("maps");

        if (cancelled || !mapRef.current) {
          return;
        }

        const MapClass = mapsLibrary.Map;

        if (!MapClass) {
          console.error(
            "Google Maps Map library could not be loaded."
          );
          return;
        }

        const location = {
          lat: 17.385,
          lng: 78.4867,
        };

        /*
         * Create Map
         */
        const map = new MapClass(
          mapRef.current,
          {
            center: location,
            zoom: 15,

            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
          }
        );

        mapInstanceRef.current = map;

        /*
         * Load marker library
         */
        const markerLibrary =
          await window.google.maps.importLibrary(
            "marker"
          );

        if (cancelled) {
          return;
        }

        /*
         * Modern Advanced Marker
         */
        if (markerLibrary.AdvancedMarkerElement) {
          new markerLibrary.AdvancedMarkerElement({
            map,
            position: location,
            title: "INtown Office",
          });
        }
      } catch (error) {
        console.error(
          "Google Maps initialization error:",
          error
        );
      }
    };

    /*
     * Google Maps already loaded
     */
    if (
      window.google &&
      window.google.maps
    ) {
      initializeMap();
    } else {
      /*
       * Wait for Google Maps script
       */
      interval = setInterval(() => {
        if (
          window.google &&
          window.google.maps
        ) {
          clearInterval(interval);
          interval = null;

          initializeMap();
        }
      }, 100);
    }

    return () => {
      cancelled = true;

      if (interval) {
        clearInterval(interval);
      }

      mapInstanceRef.current = null;
    };
  }, []);

  /*  FORM SUBMIT */

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    e.target.reset();

    setRole("Partners");
  };

  return (
    <div className="contact-page">
      <Header />
      <main>

        {/* SECTION 1 - HERO */}

        <section className="contact-hero">
          <motion.div
            className="contact-hero-content"
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
            <h2>CONTACT</h2>

            <h3>
              Let’s build the future of
              <br />
              <span>local commerce</span> together.
            </h3>

            <p>
              Whether you are a customer, merchant,
              brand, partner, or investor, we would
              love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2 - CONTACT FORM */}

        <section className="contact-main">
          <div className="contact-container">

            {/* LEFT */}

            <motion.div
              className="contact-left"
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
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h4>Who are you?</h4>

              <p className="sub">
                Pick the conversation that fits.
              </p>

              <div className="roles">
                {roles.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`role-card ${
                      role === item.title
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setRole(item.title)
                    }
                    whileHover={{
                      x: 4,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <h5>{item.title}</h5>

                    <p>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT FORM */}

            <motion.div
              className="contact-right"
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
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <h4>
                  I am contacting as
                </h4>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >
                  {roles.map(
                    (item, index) => (
                      <option
                        key={index}
                        value={item.title}
                      >
                        {item.title}
                      </option>
                    )
                  )}
                </select>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

                <input
                  type="text"
                  placeholder="Business name (optional)"
                />

                <textarea
                  rows="5"
                  placeholder="Tell us what you are looking to do."
                  required
                />

                <button type="submit">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 - GET IN TOUCH */}

        <section className="contact-info-section">
          <motion.div
            className="contact-info-wrapper"
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
            <div className="contact-info-header">
              <h2>
                Get in Touch
              </h2>

              <p>
                Ready to join the INtown community?
                We're here to help you get started.
              </p>
            </div>

            <div className="contact-info-content">

              {/* CONTACT CARDS */}

              <div className="contact-cards">

                <div className="contact-card">
                  <h4>
                    🏢 Office
                  </h4>

                  <p>
                    T Hub, Plot No 1/C,
                    Raidurgam, Hyderabad,
                    Telangana 500032
                  </p>
                </div>

                <div className="contact-card">
                  <h4>
                    ✉ Email
                  </h4>

                  <p>
                    support@intownlocal.com
                  </p>
                </div>

                <div className="contact-card">
                  <h4>
                    ☎ Phone
                  </h4>

                  <p>
                    +91 9052263555
                  </p>
                </div>

              </div>

              {/* MAP */}

              <div
                className="map-box"
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "450px",
                }}
              >
                <div
                  ref={mapRef}
                  className="map"
                  style={{
                    width: "100%",
                    height: "450px",
                    position: "relative",
                  }}
                />
              </div>

            </div>
          </motion.div>
        </section>
   <Footer />
      </main>
    </div>
  );
};

export default ContactSection;

