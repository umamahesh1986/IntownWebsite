import React from "react";
import "./Download.css";
import Footer from "./Footer";
import Header from "./Header";

const PLAY_STORE_URL =
  "https://play.google.com/store/search?q=intown&c=apps&hl=en_IN";

const Download = () => {
  return (
    <div className="download-page">

   <Header />

      <section className="download-hero">
        <div className="download-container">

          <div className="download-hero-content">

            <span className="download-label">
              Download
            </span>

            <h1>
              Your local world
              <br />
              is waiting.
            </h1>

            <p className="download-description">
              Discover more of your neighborhood with INtown —
              nearby stores, relevant savings, new brands, local
              services and experiences.
            </p>

            <div className="download-buttons">

              <a
                href="/Home"
                className="download-store-btn"
                aria-label="Download on the App Store"
              >
                <span className="download-store-icon">
                  
                </span>

                <span className="download-store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener,noreferrer"
                className="download-store-btn"
                aria-label="Get it on Google Play"
              >
                <span className="download-store-icon play-icon">
                  ▶
                </span>

                <span className="download-store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </span>
              </a>

            </div>

          </div>

          <div className="download-phone-area">

            <div className="download-orange-glow"></div>

            <div className="download-phone">

              <div className="download-phone-notch"></div>

              <div className="download-phone-screen">

                <div className="download-app-header">
                  <span>INtown</span>

                  <span className="download-location">
                    ●
                  </span>
                </div>

                <div className="download-search">
                  Search nearby
                </div>

                <div className="download-mini-card">
                  <span className="mini-card-dot"></span>

                  <div>
                    <strong>Nearby stores</strong>
                    <small>
                      Discover around you
                    </small>
                  </div>
                </div>

                <div className="download-mini-card">
                  <span className="mini-card-dot"></span>

                  <div>
                    <strong>Local savings</strong>
                    <small>
                      Save while you shop
                    </small>
                  </div>
                </div>

                <div className="download-mini-card">
                  <span className="mini-card-dot"></span>

                  <div>
                    <strong>New brands</strong>
                    <small>
                      Explore local businesses
                    </small>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="download-inside">

        <div className="download-container">

          <div className="download-section-heading">

            <span className="download-small-label">
              Inside the app
            </span>

            <h2>
              Discover. Visit.
              <br />
              Save. Repeat.
            </h2>

            <p>
              INtown brings nearby stores, offers, brands, services
              and experiences into one calm, connected place — so
              the best option around you is also the easiest one
              to find.
            </p>

          </div>

          <div className="download-feature-grid">

            <article className="download-feature-card">

<<<<<<< HEAD
              <span className="download-feature-number">
                01
              </span>
=======
             
>>>>>>> 8590915 (intown)

              <div className="download-feature-icon">
                <span>⌖</span>
              </div>

              <h3>
                Nearby discovery
              </h3>

              <p>
                A live view of the businesses and offers closest
                to you.
              </p>

            </article>

            <article className="download-feature-card">

<<<<<<< HEAD
              <span className="download-feature-number">
                02
              </span>
=======
             
>>>>>>> 8590915 (intown)

              <div className="download-feature-icon">
                <span>₹</span>
              </div>

              <h3>
                Savings at billing
              </h3>

              <p>
                Show the app at checkout and enjoy eligible savings.
              </p>

            </article>

            <article className="download-feature-card">

<<<<<<< HEAD
              <span className="download-feature-number">
                03
              </span>
=======
            
>>>>>>> 8590915 (intown)

              <div className="download-feature-icon">
                <span>✦</span>
              </div>

              <h3>
                Local experiences
              </h3>

              <p>
                Find services, experiences and new brands around
                your neighborhood.
              </p>

            </article>

            <article className="download-feature-card">

<<<<<<< HEAD
              <span className="download-feature-number">
                04
              </span>
=======
             
>>>>>>> 8590915 (intown)

              <div className="download-feature-icon">
                <span>↗</span>
              </div>

              <h3>
                Discover more
              </h3>

              <p>
                Explore your local world and keep finding better
                places to visit.
              </p>

            </article>

          </div>

        </div>

      </section>

      <section className="download-cta">

        <div className="download-container">

          <div className="download-cta-box">

            <div>

              <span className="download-small-label">
                Start exploring
              </span>

              <h2>
                Your neighborhood
                <br />
                has more to offer.
              </h2>

            </div>

            <div className="download-cta-buttons">

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener,noreferrer"
                className="download-cta-button"
              >
                Download App

                <span>
                  ↗
                </span>
              </a>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default Download;