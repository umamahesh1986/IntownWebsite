<<<<<<< HEAD

=======
>>>>>>> 8590915 (intown)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

<<<<<<< HEAD
/* =========================================================
   FOOTER SECTION
========================================================= */
=======
/* FOOTER SECTION */
>>>>>>> 8590915 (intown)

const FooterSection = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="footer-section">
      <div
        className="section-header"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        <span className="section-icon">
          {open ? "−" : "+"}
        </span>
      </div>

      <ul className={`section-links ${open ? "open" : ""}`}>
        {links.map((link, i) => (
          <li key={i}>
            <Link
              to={link.path}
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


<<<<<<< HEAD
/* =========================================================
   FOOTER
========================================================= */
=======
/* FOOTER */
>>>>>>> 8590915 (intown)

const Footer = () => {
  const sections = [
    {
      title: "PLATFORM",
      links: [
        {
          name: "Home",
          path: "/Home",
        },
        {
          name: "How It Works",
          path: "/HowItWorks",
        },
        {
          name: "Ecosystem",
          path: "/Ecosystem",
        },
      ],
    },

    {
      title: "PRODUCT & BILLING",
      links: [
        {
          name: "Upgrades",
          path: "/Upgrades",
        },
        {
          name: "Download",
          path: "/Download",
        },
      ],
    },

    {
      title: "ECOSYSTEM & SOLUTIONS",
      links: [
        {
          name: "For Customers",
          path: "/ForCustomers",
        },
        {
          name: "For Merchants",
          path: "/ForMerchants",
        },
        {
          name: "For DC2 Brands",
          path: "/ForBrands",
        },
      ],
    },

    {
      title: "SUPPORT & COMPANY",
      links: [
        {
          name: "About Us",
          path: "/about",
        },
        {
          name: "Contact Us",
          path: "/ContactSection",
        },
        {
          name: "modal",
          path: "/ModalCustomer",
        },
      ],
    },

    {
      title: "LEGAL & POLICY",
      links: [
        {
          name: "Privacy Policy",
          path: "/privacy",
        },
        {
          name: "Terms & Conditions",
          path: "/terms",
        },
        {
<<<<<<< HEAD
          name: "MerchantTerms",
=======
          name: "Merchant Terms",
>>>>>>> 8590915 (intown)
          path: "/MerchantTerms",
        },
        {
          name: "Refund Policy",
          path: "/refund",
        },
        {
          name: "Delete Account",
          path: "/Delete-Account",
        },
      ],
    },
  ];


<<<<<<< HEAD
  /* =========================================================
     COMMON LINK CLICK
     ---------------------------------------------------------
     Every footer link goes to the top of the page.
  ========================================================= */
=======
 
>>>>>>> 8590915 (intown)

  const handleFooterLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };


  return (
    <footer className="footer">
      <div className="footer-container">

<<<<<<< HEAD
        {/* =================================================
            TOP
        ================================================= */}

        <div className="footer-top">

          {/* =================================================
              LEFT
          ================================================= */}
=======
       

        <div className="footer-top">

        
>>>>>>> 8590915 (intown)

          <div className="footer-left">

            <p className="footer-tagline">
              Shop Local, Save Instantly! Connecting Communities
              Through Personal Bond.
            </p>

            <p className="footer-description">
              India’s most trusted local savings network helping
              customers save instantly.
            </p>
          </div>


<<<<<<< HEAD
          {/* =================================================
              RIGHT
          ================================================= */}
=======
>>>>>>> 8590915 (intown)

          <div className="footer-right">

            {sections.map((sec, i) => (
              <FooterSection
                key={i}
                title={sec.title}
                links={sec.links}
              />
            ))}

          </div>

        </div>


<<<<<<< HEAD
        {/* =================================================
            BOTTOM
        ================================================= */}
=======
     
>>>>>>> 8590915 (intown)

        <div className="footer-bottom">

          {/* COPYRIGHT */}

          <p className="copyright">
            © 2026 Yagnavihar Lifestyle Pvt. Ltd.
          </p>


          {/* BADGES */}

          <div className="footer-badges">

            <img
              src="/images/t-hub.png"
              alt="T-Hub"
            />

            <img
              src="/images/StartupIndia.png"
              alt="Startup India"
            />

          </div>


          {/* LEGAL LINKS */}

          <div className="footer-legal">

            <Link
              to="/privacy"
              onClick={handleFooterLinkClick}
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              onClick={handleFooterLinkClick}
            >
              Terms
            </Link>

            <Link
              to="/refund"
              onClick={handleFooterLinkClick}
            >
              Refund
            </Link>

            <Link
              to="/Delete-Account"
              onClick={handleFooterLinkClick}
            >
              Delete
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;