import React, { useEffect } from "react";
import "./Download.css";
import Footer from "./Footer";
import Header from "./Header";

const PLAY_STORE_URL =
  "https://play.google.com/store/search?q=intown&c=apps&hl=en_IN";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/intownlocal/id6766092424";

const getMobileStoreUrl = () => {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";
  if (/iPad|iPhone|iPod/i.test(ua) && !window.MSStream) return APP_STORE_URL;
  if (/android/i.test(ua)) return PLAY_STORE_URL;
  return null;
};

const Download = () => {
  // Auto-redirect mobile visitors (e.g. from the QR code) to their app store.
  useEffect(() => {
    const storeUrl = getMobileStoreUrl();
    if (storeUrl) window.location.replace(storeUrl);
  }, []);

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
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="download-store-btn"
                aria-label="Download on the App Store"
                data-testid="app-store-btn"
              >
                <span className="download-store-icon">
                  <svg viewBox="0 0 384 512" width="26" height="26" fill="currentColor" aria-hidden="true">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </span>

                <span className="download-store-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="download-store-btn"
                aria-label="Get it on Google Play"
                data-testid="play-store-btn"
              >
                <span className="download-store-icon play-icon">
                  <svg viewBox="0 0 512 512" width="24" height="24" aria-hidden="true">
                    <path fill="#EA4335" d="M325 234 92 12c-8-8-19-11-29-8l246 246 16-16z"/>
                    <path fill="#4285F4" d="M63 4c-5 4-8 11-8 19v466c0 8 3 15 8 19l255-252L63 4z"/>
                    <path fill="#FBBC04" d="M431 226l-75-43-19 19 19 19 75-43c15-9 15-24 0-33z" transform="translate(-31 30)"/>
                    <path fill="#34A853" d="M92 500l233-222-16-16-246 246c10 3 21 0 29-8z"/>
                  </svg>
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

              <span className="download-feature-number">
                01
              </span>

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

              <span className="download-feature-number">
                02
              </span>

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

              <span className="download-feature-number">
                03
              </span>

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

              <span className="download-feature-number">
                04
              </span>

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
                rel="noopener noreferrer"
                className="download-cta-button"
                data-testid="cta-download-btn"
                onClick={(e) => {
                  const storeUrl = getMobileStoreUrl();
                  if (storeUrl) {
                    e.preventDefault();
                    window.location.href = storeUrl;
                  }
                }}
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