// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import "./Header.css";
// import intownBanner from "../assets/images/intown-banner.png";

// const PLAY_STORE_URL =
//   "https://play.google.com/store/search?q=intown&c=apps&hl=en_IN";

// const MENU_DATA = [
//   {
//     id: "core",
//     title: "CORE PLATFORM",
//     description:
//       "Explore the core INtown platform and understand how every part connects local customers, merchants and the wider ecosystem.",
//     links: [
//       { name: "Home", path: "/Home" },
//       { name: "How It Works", path: "/HowItWorks" },
//       { name: "Ecosystem", path: "/Ecosystem" },
//     ],
//   },
//   {
//     id: "billing",
//     title: "PRODUCT & BILLING",
//     description:
//       "Explore plans, upgrades, location services and payment experiences built for the INtown ecosystem.",
//     links: [
//       { name: "Upgrades", path: "/Upgrades" },
//       { name: "Download", path: "/Download" },
//     ],
//   },
//   {
//     id: "solutions",
//     title: "ECOSYSTEM & SOLUTIONS",
//     description:
//       "Discover solutions designed for customers, merchants and D2C brands across the local ecosystem.",
//     links: [
//       { name: "For Customers", path: "/ForCustomers" },
//       { name: "For Merchants", path: "/ForMerchants" },
//       { name: "For D2C Brands", path: "/ForBrands" },
//     ],
//   },
//   {
//     id: "support",
//     title: "SUPPORT & COMPANY",
//     description:
//       "Learn more about INtown, connect with the team and explore the main company sections.",
//     links: [
//       { name: "About Us", path: "/about" },
//       { name: "Contact Us", path: "/ContactSection" },
//     ],
//   },
//   {
//     id: "legal",
//     title: "LEGAL & POLICY",
//     description:
//       "Review privacy, terms, merchant policies, refunds and account deletion information.",
//     links: [
//       { name: "Privacy Policy", path: "/privacy" },
//       { name: "Terms & Conditions", path: "/terms" },
//       { name: "Merchant Terms", path: "/MerchantTerms" },
//       { name: "Refund Policy", path: "/refund" },
//       { name: "Delete Account", path: "/DeleteAccount" },
//     ],
//   },
// ];

// /* =========================================================
//    MOBILE / TABLET MENU ITEM
// ========================================================= */

// function MobileMenuItem({
//   data,
//   openSection,
//   setOpenSection,
// }) {
//   const isOpen = openSection === data.id;

//   return (
//     <div
//       className={`mobile-menu-item ${
//         isOpen ? "active" : ""
//       }`}
//     >
//       <button
//         type="button"
//         className="mobile-menu-title"
//         onClick={() =>
//           setOpenSection(
//             isOpen ? null : data.id
//           )
//         }
//       >
//         <span className="mobile-menu-title-text">
//           {data.title}
//         </span>

//         <span className="mobile-arrow">
//           {isOpen ? "−" : "+"}
//         </span>
//       </button>

//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             className="mobile-submenu"
//             initial={{
//               height: 0,
//               opacity: 0,
//             }}
//             animate={{
//               height: "auto",
//               opacity: 1,
//             }}
//             exit={{
//               height: 0,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.3,
//               ease: "easeInOut",
//             }}
//           >
//             <p className="mobile-description">
//               {data.description}
//             </p>

//             <div className="mobile-submenu-links">
//               {data.links.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.path}
//                   className="mobile-submenu-link"
//                 >
//                   <span>{link.name}</span>

//                   <span className="submenu-arrow">
//                     →
//                   </span>
//                 </a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* =========================================================
//    HEADER
// ========================================================= */

// export default function Header() {
//   const [showPlusModal, setShowPlusModal] =
//     useState(false);

//   const [showMenuModal, setShowMenuModal] =
//     useState(false);

//   const [activeMenu, setActiveMenu] =
//     useState(MENU_DATA[0].id);

//   const [openSection, setOpenSection] =
//     useState(null);

//   const [screenMode, setScreenMode] =
//     useState("desktop");

//   const [hoverExpand, setHoverExpand] =
//     useState(false);

//   /* =======================================================
//      RESPONSIVE MODE
//   ======================================================= */

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       if (width <= 768) {
//         setScreenMode("mobile");
//       } else if (width <= 1100) {
//         setScreenMode("tablet");
//       } else {
//         setScreenMode("desktop");
//       }
//     };

//     handleResize();

//     window.addEventListener(
//       "resize",
//       handleResize
//     );

//     return () => {
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );
//     };
//   }, []);

//   /* =======================================================
//      BODY LOCK
//   ======================================================= */

//   useEffect(() => {
//     if (
//       showPlusModal ||
//       showMenuModal
//     ) {
//       document.body.classList.add(
//         "header-modal-open"
//       );
//     } else {
//       document.body.classList.remove(
//         "header-modal-open"
//       );
//     }

//     return () => {
//       document.body.classList.remove(
//         "header-modal-open"
//       );
//     };
//   }, [
//     showPlusModal,
//     showMenuModal,
//   ]);

//   const isDesktop =
//     screenMode === "desktop";

//   const isTablet =
//     screenMode === "tablet";

//   const isMobile =
//     screenMode === "mobile";

//   const isSideMode =
//     isTablet || isMobile;

//   /* =======================================================
//      PLUS
//   ======================================================= */

//   const handlePlusClick = () => {
//     setShowPlusModal((prev) => !prev);

//     setShowMenuModal(false);
//     setOpenSection(null);
//   };

//   /* =======================================================
//      MENU
//   ======================================================= */

//   const handleMenuClick = () => {
//     setShowMenuModal((prev) => !prev);

//     setShowPlusModal(false);
//     setOpenSection(null);
//   };

//   const activeData =
//     MENU_DATA.find(
//       (item) =>
//         item.id === activeMenu
//     ) || MENU_DATA[0];

//   /* =======================================================
//      PLUS ANIMATION
//   ======================================================= */

//   const plusAnimation = isDesktop
//     ? {
//         initial: {
//           y: "-100%",
//           x: 0,
//         },
//         animate: {
//           y: 0,
//           x: 0,
//         },
//         exit: {
//           y: "-100%",
//           x: 0,
//         },
//       }
//     : {
//         initial: {
//           x: "-100%",
//           y: 0,
//         },
//         animate: {
//           x: 0,
//           y: 0,
//         },
//         exit: {
//           x: "-100%",
//           y: 0,
//         },
//       };

//   /* =======================================================
//      MENU ANIMATION
//   ======================================================= */

//   const menuAnimation = isDesktop
//     ? {
//         initial: {
//           y: "100%",
//           x: 0,
//         },
//         animate: {
//           y: 0,
//           x: 0,
//         },
//         exit: {
//           y: "100%",
//           x: 0,
//         },
//       }
//     : {
//         initial: {
//           x: "100%",
//           y: 0,
//         },
//         animate: {
//           x: 0,
//           y: 0,
//         },
//         exit: {
//           x: "100%",
//           y: 0,
//         },
//       };

//   return (
//     <div className="header-wrapper">

//       {/* =================================================
//           FIXED HEADER
//       ================================================= */}

//       <header className="header">

//         {/* ================= LOGO ================= */}

//         <div className="logo-box">
//           <a
//             href="/Home"
//             className="logo-link"
//           >
//             <img
//               src="/images/intown-logo.jpg"
//               alt="INtown Logo"
//               className="logo-img"
//             />
//           </a>
//         </div>

//         {/* =================================================
//             CENTER
//         ================================================= */}

//         <div className="header-center">

//           {isDesktop && (
//             <nav className="desktop-nav">

//               <a href="/Home">
//                 Home
//               </a>

//               <a href="/HowItWorks">
//                 How It Works
//               </a>

//               <a href="/ForCustomers">
//                 Customers
//               </a>

//               <a href="/ForMerchants">
//                 Merchants
//               </a>

//               <a href="/ForBrands">
//                 Brands
//               </a>

//               <a href="/Ecosystem">
//                 Ecosystem
//               </a>

//               <a href="/about">
//                 About
//               </a>

//             </nav>
//           )}

//           {(isDesktop || isTablet) && (
//             <div className="download-wrapper">

//               <a
//                 href={PLAY_STORE_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="download-btn"
//               >
//                 Download App
//               </a>

//             </div>
//           )}

//         </div>

//         {/* =================================================
//             RIGHT SIDE
//         ================================================= */}

//         <div className="header-right">

//           {/* ================= EXPAND ================= */}

//           <div
//             className="expand-area"
//             onMouseEnter={() => {
//               if (isDesktop) {
//                 setHoverExpand(true);
//               }
//             }}
//             onMouseLeave={() => {
//               if (isDesktop) {
//                 setHoverExpand(false);
//               }
//             }}
//           >

//             {isDesktop ? (
//               <button
//                 type="button"
//                 className={`expand-button ${
//                   hoverExpand
//                     ? "expand-visible"
//                     : ""
//                 }`}
//                 onClick={handlePlusClick}
//               >
//                 <span className="expand-chevron">
//                   ⌄
//                 </span>

//                 <span className="expand-click-text">
//                   click to expand
//                 </span>
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 className="side-expand-button"
//                 onClick={handlePlusClick}
//               >
//                 <span className="expand-chevron">
//                   ⌄
//                 </span>

//                 <span className="expand-click-text">
//                   click to expand
//                 </span>
//               </button>
//             )}

//             {/* DESKTOP ONLY */}

//             {isDesktop && (
//               <>
//                 <span className="right-separator">
//                   |
//                 </span>

//                 <span className="hyperlocal-text">
//                   INtown is for Hyperlocal Market
//                 </span>
//               </>
//             )}

//           </div>

//           {/* =================================================
//               MENU SEPARATOR
//           ================================================= */}

//           <span className="menu-separator">
//             |
//           </span>

//           {/* =================================================
//               MENU BUTTON
//           ================================================= */}

//           <button
//             type="button"
//             className="menu-box"
//             onClick={handleMenuClick}
//             aria-label="Open menu"
//           >
//             {showMenuModal
//               ? "×"
//               : "☰"}
//           </button>

//         </div>

//       </header>

//       {/* =================================================
//           PLUS / DROP DOWN MODAL
//       ================================================= */}

//       <AnimatePresence mode="wait">

//         {showPlusModal && (
//           <motion.div
//             className={`plus-modal ${
//               isDesktop
//                 ? "desktop-plus-modal"
//                 : "side-plus-modal"
//             }`}
//             initial={
//               plusAnimation.initial
//             }
//             animate={
//               plusAnimation.animate
//             }
//             exit={
//               plusAnimation.exit
//             }
//             transition={{
//               duration: 0.52,
//               ease: [
//                 0.4,
//                 0,
//                 0.2,
//                 1,
//               ],
//             }}
//           >

//             <div className="plus-modal-inner">

//               <motion.div
//                 className="plus-image-box"
//                 initial={{
//                   opacity: 0,
//                   x: -35,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 transition={{
//                   duration: 0.45,
//                   delay: 0.12,
//                 }}
//               >
//                 <img
//                   src={intownBanner}
//                   alt="INtown Banner"
//                   className="modal-banner"
//                 />
//               </motion.div>

//               <motion.div
//                 className="plus-text"
//                 initial={{
//                   opacity: 0,
//                   x: 35,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 transition={{
//                   duration: 0.45,
//                   delay: 0.18,
//                 }}
//               >

//                 <span className="orange-label">
//                   EXPLORE MORE
//                 </span>

//                 <h2>
//                   A REFLECTION
//                   <br />
//                   OF CLARITY.
//                 </h2>

//                 <p>
//                   Discover a smarter way
//                   to connect with your
//                   local community and
//                   everything around you.
//                 </p>

//                 <a
//                   href="/HowItWorks"
//                   className="orange-action"
//                 >
//                   Explore More →
//                 </a>

//               </motion.div>

//             </div>

//           </motion.div>
//         )}

//       </AnimatePresence>

//       {/* =================================================
//           MENU MODAL
//       ================================================= */}

//       <AnimatePresence mode="wait">

//         {showMenuModal && (
//           <motion.div
//             className="menu-modal"
//             initial={
//               menuAnimation.initial
//             }
//             animate={
//               menuAnimation.animate
//             }
//             exit={
//               menuAnimation.exit
//             }
//             transition={{
//               duration: 0.52,
//               ease: [
//                 0.4,
//                 0,
//                 0.2,
//                 1,
//               ],
//             }}
//           >

//             {/* =================================================
//                 DESKTOP MENU
//             ================================================= */}

//             {isDesktop && (
//               <div className="desktop-menu-layout">

//                 <div className="desktop-menu-list">

//                   {MENU_DATA.map(
//                     (menu) => (
//                       <a
//                         key={menu.id}
//                         href={
//                           menu.links[0].path
//                         }
//                         className={`desktop-menu-item ${
//                           activeMenu ===
//                           menu.id
//                             ? "active"
//                             : ""
//                         }`}
//                         onMouseEnter={() =>
//                           setActiveMenu(
//                             menu.id
//                           )
//                         }
//                       >

//                         <span className="desktop-menu-title">
//                           {menu.title}
//                         </span>

//                         <span className="desktop-menu-arrow">
//                           →
//                         </span>

//                       </a>
//                     )
//                   )}

//                 </div>

//                 {/* CENTER CONTENT */}

//                 <div className="desktop-menu-details">

//                   <AnimatePresence mode="wait">

//                     <motion.div
//                       key={
//                         activeData.id
//                       }
//                       className="desktop-detail-inner"
//                       initial={{
//                         opacity: 0,
//                         y: 15,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       exit={{
//                         opacity: 0,
//                         y: -10,
//                       }}
//                       transition={{
//                         duration: 0.3,
//                       }}
//                     >

//                       <span className="detail-label">
//                         {activeData.title}
//                       </span>

//                       <h2>
//                         {activeData.title}
//                       </h2>

//                       <p className="detail-description">
//                         {
//                           activeData.description
//                         }
//                       </p>

//                       <div className="detail-links">

//                         {activeData.links.map(
//                           (link) => (
//                             <a
//                               key={
//                                 link.name
//                               }
//                               href={
//                                 link.path
//                               }
//                               className="detail-link"
//                             >
//                               <span>
//                                 {
//                                   link.name
//                                 }
//                               </span>

//                               <span>
//                                 →
//                               </span>
//                             </a>
//                           )
//                         )}

//                       </div>

//                     </motion.div>

//                   </AnimatePresence>

//                 </div>

//               </div>
//             )}

//             {/* =================================================
//                 TABLET / MOBILE MENU
//             ================================================= */}

//             {isSideMode && (
//               <div className="mobile-menu-layout">

//                 <div className="mobile-menu-content">

//                   <div className="mobile-menu-heading">
//                     <span>
//                       EXPLORE
//                     </span>

//                     <h2>
//                       INtown
//                     </h2>

//                     <p>
//                       Everything you need,
//                       all in one place.
//                     </p>
//                   </div>

//                   <div className="mobile-menu-list">

//                     {MENU_DATA.map(
//                       (menu) => (
//                         <MobileMenuItem
//                           key={
//                             menu.id
//                           }
//                           data={
//                             menu
//                           }
//                           openSection={
//                             openSection
//                           }
//                           setOpenSection={
//                             setOpenSection
//                           }
//                         />
//                       )
//                     )}

//                   </div>

//                 </div>

//                 <div className="menu-footer">

//                   <a
//                     href={
//                       PLAY_STORE_URL
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="orange-action"
//                   >
//                     Download INtown
//                   </a>

//                 </div>

//               </div>
//             )}

//           </motion.div>
//         )}

//       </AnimatePresence>

//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Header.css";
import intownBanner from "../assets/images/intown-banner.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/search?q=intown&c=apps&hl=en_IN";

const MENU_DATA = [
  {
    id: "core",
    title: "CORE PLATFORM",
    description:
      "Explore the core INtown platform and understand how every part connects local customers, merchants and the wider ecosystem.",
    links: [
      { name: "Home", path: "/Home" },
      { name: "How It Works", path: "/HowItWorks" },
      { name: "Ecosystem", path: "/Ecosystem" },
    ],
  },
  {
    id: "billing",
    title: "PRODUCT & BILLING",
    description:
      "Explore plans, upgrades, location services and payment experiences built for the INtown ecosystem.",
    links: [
      { name: "Upgrades", path: "/Upgrades" },
      { name: "Download", path: "/Download" },
    ],
  },
  {
    id: "solutions",
    title: "ECOSYSTEM & SOLUTIONS",
    description:
      "Discover solutions designed for customers, merchants and D2C brands across the local ecosystem.",
    links: [
      { name: "For Customers", path: "/ForCustomers" },
      { name: "For Merchants", path: "/ForMerchants" },
      { name: "For D2C Brands", path: "/ForBrands" },
    ],
  },
  {
    id: "support",
    title: "SUPPORT & COMPANY",
    description:
      "Learn more about INtown, connect with the team and explore the main company sections.",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/ContactSection" },
    ],
  },
  {
    id: "legal",
    title: "LEGAL & POLICY",
    description:
      "Review privacy, terms, merchant policies, refunds and account deletion information.",
    links: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Merchant Terms", path: "/MerchantTerms" },
      { name: "Refund Policy", path: "/refund" },
      { name: "Delete Account", path: "/Delete-Account" },
    ],
  },
];

function MobileMenuItem({
  data,
  openSection,
  setOpenSection,
  handleNavigation,
}) {
  const isOpen = openSection === data.id;

  return (
    <div className={`mobile-menu-item ${isOpen ? "active" : ""}`}>
      <button
        type="button"
        className="mobile-menu-title"
        onClick={() =>
          setOpenSection(isOpen ? null : data.id)
        }
      >
        <span className="mobile-menu-title-text">
          {data.title}
        </span>

        <span className="mobile-arrow">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="mobile-submenu"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <p className="mobile-description">
              {data.description}
            </p>

            <div className="mobile-submenu-links">
              {data.links.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="mobile-submenu-link"
                  onClick={(e) =>
                    handleNavigation(e, link.path)
                  }
                >
                  <span>{link.name}</span>

                  <span className="submenu-arrow">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [showPlusModal, setShowPlusModal] =
    useState(false);

  const [showMenuModal, setShowMenuModal] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState(MENU_DATA[0].id);

  const [openSection, setOpenSection] =
    useState(null);

  const [screenMode, setScreenMode] =
    useState("desktop");

  const [hoverExpand, setHoverExpand] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setScreenMode("mobile");
      } else if (width <= 1100) {
        setScreenMode("tablet");
      } else {
        setScreenMode("desktop");
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    if (showPlusModal || showMenuModal) {
      document.body.classList.add(
        "header-modal-open"
      );
    } else {
      document.body.classList.remove(
        "header-modal-open"
      );
    }

    return () => {
      document.body.classList.remove(
        "header-modal-open"
      );
    };
  }, [
    showPlusModal,
    showMenuModal,
  ]);

  useEffect(() => {
    const shouldScrollTop =
      sessionStorage.getItem(
        "intown-scroll-top"
      );

    if (shouldScrollTop === "true") {
      sessionStorage.removeItem(
        "intown-scroll-top"
      );

      window.history.scrollRestoration = "manual";

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, []);

  const handleNavigation = (e, path) => {
    if (!path) return;

    e.preventDefault();

    setShowMenuModal(false);
    setShowPlusModal(false);
    setOpenSection(null);

    sessionStorage.setItem(
      "intown-scroll-top",
      "true"
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    window.location.href = path;
  };

  const isDesktop =
    screenMode === "desktop";

  const isTablet =
    screenMode === "tablet";

  const isMobile =
    screenMode === "mobile";

  const isSideMode =
    isTablet || isMobile;

  const handlePlusClick = () => {
    setShowPlusModal((prev) => !prev);
    setShowMenuModal(false);
    setOpenSection(null);
  };

  const handleMenuClick = () => {
    setShowMenuModal((prev) => !prev);
    setShowPlusModal(false);
    setOpenSection(null);
  };

  const activeData =
    MENU_DATA.find(
      (item) =>
        item.id === activeMenu
    ) || MENU_DATA[0];

  const plusAnimation = isDesktop
    ? {
        initial: {
          y: "-100%",
          x: 0,
        },
        animate: {
          y: 0,
          x: 0,
        },
        exit: {
          y: "-100%",
          x: 0,
        },
      }
    : {
        initial: {
          x: "-100%",
          y: 0,
        },
        animate: {
          x: 0,
          y: 0,
        },
        exit: {
          x: "-100%",
          y: 0,
        },
      };

  const menuAnimation = isDesktop
    ? {
        initial: {
          y: "100%",
          x: 0,
        },
        animate: {
          y: 0,
          x: 0,
        },
        exit: {
          y: "100%",
          x: 0,
        },
      }
    : {
        initial: {
          x: "100%",
          y: 0,
        },
        animate: {
          x: 0,
          y: 0,
        },
        exit: {
          x: "100%",
          y: 0,
        },
      };

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="logo-box">
          <a
            href="/Home"
            className="logo-link"
            onClick={(e) =>
              handleNavigation(e, "/Home")
            }
          >
            <img
              src="/images/intown-logo.jpg"
              alt="INtown Logo"
              className="logo-img"
            />
          </a>
        </div>

        <div className="header-center">
          {isDesktop && (
            <nav className="desktop-nav">
              <a
                href="/Home"
                onClick={(e) =>
                  handleNavigation(e, "/Home")
                }
              >
                Home
              </a>

              <a
                href="/HowItWorks"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "/HowItWorks"
                  )
                }
              >
                How It Works
              </a>

              <a
                href="/ForCustomers"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "/ForCustomers"
                  )
                }
              >
                Customers
              </a>

              <a
                href="/ForMerchants"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "/ForMerchants"
                  )
                }
              >
                Merchants
              </a>

              <a
                href="/ForBrands"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "/ForBrands"
                  )
                }
              >
                Brands
              </a>

              <a
                href="/Ecosystem"
                onClick={(e) =>
                  handleNavigation(
                    e,
                    "/Ecosystem"
                  )
                }
              >
                Ecosystem
              </a>

              <a
                href="/about"
                onClick={(e) =>
                  handleNavigation(e, "/about")
                }
              >
                About
              </a>
            </nav>
          )}

          {(isDesktop || isTablet) && (
            <div className="download-wrapper">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                Download App
              </a>
            </div>
          )}
        </div>

        <div className="header-right">
          <div
            className="expand-area"
            onMouseEnter={() => {
              if (isDesktop) {
                setHoverExpand(true);
              }
            }}
            onMouseLeave={() => {
              if (isDesktop) {
                setHoverExpand(false);
              }
            }}
          >
            {isDesktop ? (
              <button
                type="button"
                className={`expand-button ${
                  hoverExpand
                    ? "expand-visible"
                    : ""
                }`}
                onClick={handlePlusClick}
              >
                <span className="expand-chevron">
                  ⌄
                </span>

                <span className="expand-click-text">
                  click to explore
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="side-expand-button"
                onClick={handlePlusClick}
              >
                <span className="expand-chevron">
                  ⌄
                </span>

                <span className="expand-click-text">
                  click to explore
                </span>
              </button>
            )}

            {isDesktop && (
              <>
                <span className="right-separator">
                  |
                </span>

                <span className="hyperlocal-text">
                  INtown is for Hyperlocal Market
                </span>
              </>
            )}
          </div>

          <span className="menu-separator">
            |
          </span>

          <button
            type="button"
            className="menu-box"
            onClick={handleMenuClick}
            aria-label="Open menu"
          >
            {showMenuModal ? "×" : "☰"}
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {showPlusModal && (
          <motion.div
            className={`plus-modal ${
              isDesktop
                ? "desktop-plus-modal"
                : "side-plus-modal"
            }`}
            initial={plusAnimation.initial}
            animate={plusAnimation.animate}
            exit={plusAnimation.exit}
            transition={{
              duration: 0.52,
              ease: [
                0.4,
                0,
                0.2,
                1,
              ],
            }}
          >
            <div className="plus-modal-inner">
              <motion.div
                className="plus-image-box"
                initial={{
                  opacity: 0,
                  x: -35,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.12,
                }}
              >
                <img
                  src={intownBanner}
                  alt="INtown Banner"
                  className="modal-banner"
                />
              </motion.div>

              <motion.div
                className="plus-text"
                initial={{
                  opacity: 0,
                  x: 35,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: 0.18,
                }}
              >
                <span className="orange-label">
                  EXPLORE MORE
                </span>

                <h2>
                  A REFLECTION
                  <br />
                  OF CLARITY.
                </h2>

                <p>
                  Discover a smarter way
                  to connect with your
                  local community and
                  everything around you.
                </p>

                <a
                  href="/HowItWorks"
                  className="orange-action"
                  onClick={(e) =>
                    handleNavigation(
                      e,
                      "/HowItWorks"
                    )
                  }
                >
                  Explore More →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showMenuModal && (
          <motion.div
            className="menu-modal"
            initial={menuAnimation.initial}
            animate={menuAnimation.animate}
            exit={menuAnimation.exit}
            transition={{
              duration: 0.52,
              ease: [
                0.4,
                0,
                0.2,
                1,
              ],
            }}
          >
            {isDesktop && (
              <div className="desktop-menu-layout">
                <div className="desktop-menu-list">
                  {MENU_DATA.map((menu) => (
                    <a
                      key={menu.id}
                      href={
                        menu.links[0].path
                      }
                      className={`desktop-menu-item ${
                        activeMenu ===
                        menu.id
                          ? "active"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        setActiveMenu(
                          menu.id
                        )
                      }
                      onClick={(e) =>
                        handleNavigation(
                          e,
                          menu.links[0].path
                        )
                      }
                    >
                      <span className="desktop-menu-title">
                        {menu.title}
                      </span>

                      <span className="desktop-menu-arrow">
                        →
                      </span>
                    </a>
                  ))}
                </div>

                <div className="desktop-menu-details">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeData.id}
                      className="desktop-detail-inner"
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <span className="detail-label">
                        {activeData.title}
                      </span>

                      <h2>
                        {activeData.title}
                      </h2>

                      <p className="detail-description">
                        {
                          activeData.description
                        }
                      </p>

                      <div className="detail-links">
                        {activeData.links.map(
                          (link) => (
                            <a
                              key={link.name}
                              href={link.path}
                              className="detail-link"
                              onClick={(e) =>
                                handleNavigation(
                                  e,
                                  link.path
                                )
                              }
                            >
                              <span>
                                {link.name}
                              </span>

                              <span>
                                →
                              </span>
                            </a>
                          )
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}

            {isSideMode && (
              <div className="mobile-menu-layout">
                <div className="mobile-menu-content">
                  <div className="mobile-menu-heading">
                    <span>
                      EXPLORE
                    </span>

                    <h2>INtown</h2>

                    <p>
                      Everything you need,
                      all in one place.
                    </p>
                  </div>

                  <div className="mobile-menu-list">
                    {MENU_DATA.map(
                      (menu) => (
                        <MobileMenuItem
                          key={menu.id}
                          data={menu}
                          openSection={
                            openSection
                          }
                          setOpenSection={
                            setOpenSection
                          }
                          handleNavigation={
                            handleNavigation
                          }
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="menu-footer">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="orange-action"
                  >
                    Download INtown
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}