import React from "react";
import "./MerchantTerms.css";
import Header from "./Header";
import Footer from "./Footer";

const MerchantTerms = () => {
  return (
    <div className="merchant-terms-page">
<Header />
      {/* HERO */}

      <div className="merchant-terms-hero">
        <div className="merchant-terms-container">

          <span className="merchant-terms-label">
            INTOWN
          </span>

          <h1>
            Merchant Terms
          </h1>

          <p className="merchant-terms-intro">
            These terms govern the relationship between INtown and
            businesses that list their products, services, or offers
            on the INtown platform.
          </p>

          <p className="merchant-terms-updated">
            Last updated: August 12, 2026
          </p>

        </div>
      </div>

      {/* TERMS CONTENT */}

      <div className="merchant-terms-content">
        <div className="merchant-terms-container">

          <div className="merchant-terms-list">

            {/* 01 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                01
              </span>

              <div className="merchant-term-text">

                <h2>
                  Merchant Agreement
                </h2>

                <p>
                  These Merchant Terms govern the relationship between
                  INtown and businesses ("Merchants") who list their
                  products, services, or offers on the INtown platform.
                  By joining INtown as a Merchant, you agree to these
                  terms.
                </p>

              </div>

            </article>

            {/* 02 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                02
              </span>

              <div className="merchant-term-text">

                <h2>
                  Merchant Responsibilities
                </h2>

                <p>
                  Merchants agree to provide accurate business
                  information, maintain valid licenses and permits,
                  honor offers displayed on the platform, and provide
                  quality products and services to customers.
                </p>

                <p className="merchant-term-extra">
                  Merchants must not engage in deceptive, fraudulent,
                  or discriminatory practices.
                </p>

              </div>

            </article>

            {/* 03 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                03
              </span>

              <div className="merchant-term-text">

                <h2>
                  Offers and Promotions
                </h2>

                <p>
                  Merchants are responsible for creating, managing,
                  and fulfilling their own offers. Offers must clearly
                  state any terms, conditions, or limitations. INtown
                  reserves the right to remove offers that violate
                  these terms.
                </p>

              </div>

            </article>

            {/* 04 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                04
              </span>

              <div className="merchant-term-text">

                <h2>
                  Listing and Visibility
                </h2>

                <p>
                  INtown endeavors to display merchant listings to
                  relevant customers but does not guarantee specific
                  placement, visibility, or business outcomes. Listing
                  position may vary based on relevance, location, and
                  other factors.
                </p>

              </div>

            </article>

            {/* 05 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                05
              </span>

              <div className="merchant-term-text">

                <h2>
                  Fees and Payments
                </h2>

                <p>
                  Merchant pricing plans and fees are outlined in the
                  agreement signed during onboarding. INtown may charge
                  fees for premium features, placements, or services.
                  Fees are subject to change with prior notice.
                </p>

              </div>

            </article>

            {/* 06 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                06
              </span>

              <div className="merchant-term-text">

                <h2>
                  Data and Privacy
                </h2>

                <p>
                  Merchants must comply with all applicable data
                  protection laws when interacting with customer data
                  through the platform. Merchants may not use customer
                  data obtained through INtown for purposes outside the
                  platform without consent.
                </p>

              </div>

            </article>

            {/* 07 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                07
              </span>

              <div className="merchant-term-text">

                <h2>
                  Termination
                </h2>

                <p>
                  Either party may terminate the merchant relationship
                  with notice. INtown may suspend or terminate merchant
                  accounts that violate these terms or applicable laws.
                </p>

              </div>

            </article>

            {/* 08 */}

            <article className="merchant-term-item">

              <span className="merchant-term-number">
                08
              </span>

              <div className="merchant-term-text">

                <h2>
                  Contact
                </h2>

                <p>
                  For questions about Merchant Terms, please contact
                  us through the Contact page and select the
                  "Merchants" category.
                </p>

              </div>

            </article>

          </div>

          {/* IMPORTANT NOTICE */}

          <div className="merchant-terms-notice">

            <div className="merchant-terms-notice-icon">
              !
            </div>

            <div className="merchant-terms-notice-content">

              <h3>
                Important Notice
              </h3>

              <p>
                These Merchant Terms are provided for the INtown
                website and platform. Final legal wording should be
                reviewed and approved by qualified legal counsel
                before publication.
              </p>

            </div>

          </div>

        </div>
      </div>
<Footer />
    </div>
  );
};

export default MerchantTerms;