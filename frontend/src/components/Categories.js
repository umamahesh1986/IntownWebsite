import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import AllCategories from "./AllCategories";
import CategoryDetails from "./CategoryDetails";

import "./Categories.css";

const API_URL =
  "https://devapi.intownlocal.com/IN/categories/?forRegistration=true";

const QUICK_CATEGORIES = [
  "All",
  "Fresh & Daily Essentials",
  "Food & Dining",
  "Fashion & Lifestyle",
  "Beauty & Wellness",
  "Health & Medical",
  "Home & Services",
  "Electronics",
];

const CATEGORY_SECTIONS = [
  {
    title: "Fresh & Daily Essentials",
    keywords: [
      "grocery",
      "supermarket",
      "vegetable",
      "fruit",
      "meat",
      "chicken",
      "fish",
      "dairy",
      "bakery",
      "daily",
      "fresh",
    ],
  },
  {
    title: "Food & Dining",
    keywords: [
      "food",
      "restaurant",
      "hotel",
      "cafe",
      "sweet",
      "biryani",
      "tiffin",
      "dining",
      "juice",
    ],
  },
  {
    title: "Fashion & Lifestyle",
    keywords: [
      "fashion",
      "clothing",
      "dress",
      "textile",
      "tailor",
      "footwear",
      "shoe",
      "jewellery",
      "jewelry",
      "accessories",
      "lifestyle",
    ],
  },
  {
    title: "Beauty & Wellness",
    keywords: [
      "beauty",
      "salon",
      "spa",
      "parlour",
      "parlor",
      "cosmetic",
      "wellness",
      "hair",
      "makeup",
    ],
  },
  {
    title: "Health & Medical",
    keywords: [
      "health",
      "medical",
      "hospital",
      "clinic",
      "pharmacy",
      "doctor",
      "dental",
      "diagnostic",
      "medicine",
    ],
  },
  {
    title: "Home & Services",
    keywords: [
      "home",
      "service",
      "repair",
      "cleaning",
      "plumber",
      "electrician",
      "carpenter",
      "painting",
      "laundry",
      "furniture",
    ],
  },
  {
    title: "Electronics",
    keywords: [
      "electronic",
      "mobile",
      "phone",
      "computer",
      "laptop",
      "tv",
      "television",
      "appliance",
      "camera",
      "gadget",
    ],
  },
];

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const getCategoryName = (category) =>
  category?.name ||
  category?.categoryName ||
  category?.title ||
  category?.serviceName ||
  "Category";

const getCategoryImage = (category) =>
  category?.imageUrl ||
  category?.s3ImageUrl ||
  category?.image ||
  category?.imageURL ||
  "";

const getCategoryId = (category, index) =>
  category?.id ||
  category?.categoryId ||
  category?._id ||
  `category-${index}`;

const matchesSection = (category, section) => {
  const name = normalize(getCategoryName(category));

  return section.keywords.some((keyword) =>
    name.includes(normalize(keyword))
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const CategoryCard = ({ category, index, onClick }) => {
  const name = getCategoryName(category);
  const image = getCategoryImage(category);

  return (
    <motion.button
      type="button"
      className="category-card"
      onClick={() => onClick(category)}
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.035,
      }}
      whileHover={{
        y: -7,
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <div className="category-card-image-wrap">
        {image ? (
          <img
            src={image}
            alt={name}
            className="category-image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";

              const placeholder =
                event.currentTarget.parentElement.querySelector(
                  ".category-placeholder"
                );

              if (placeholder) {
                placeholder.style.display = "flex";
              }
            }}
          />
        ) : null}

        <div
          className="category-placeholder"
          style={{
            display: image ? "none" : "flex",
          }}
        >
          <span>{name.charAt(0).toUpperCase()}</span>
        </div>
      </div>

      <div className="category-name">{name}</div>

      <span className="category-card-arrow">→</span>
    </motion.button>
  );
};

/* =========================================================
   CATEGORY GRID
========================================================= */

const CategoryGrid = ({ categories, onCategoryClick }) => {
  if (!categories.length) {
    return (
      <div className="empty-categories">
        <div className="empty-icon">⌕</div>
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div className="categories-grid">
      {categories.map((category, index) => (
        <CategoryCard
          key={getCategoryId(category, index)}
          category={category}
          index={index}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

/* =========================================================
   CATEGORIES
========================================================= */

const Categories = ({ homeOnly = false }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* =========================================================
     FETCH CATEGORIES
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.categories)
          ? data.categories
          : Array.isArray(data?.content)
          ? data.content
          : [];

        if (mounted) {
          setCategories(list);
        }
      } catch (err) {
        if (mounted) {
          setError(
            "Unable to load categories. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     READ HOME NAVIGATION STATE
     
     Home:
     See All -> sessionStorage openAllCategories
     Card    -> sessionStorage selectedCategory
  ========================================================= */

  useEffect(() => {
    if (homeOnly) {
      return;
    }

    const openAllCategories =
      sessionStorage.getItem("openAllCategories");

    const savedCategory =
      sessionStorage.getItem("selectedCategory");

    /* =======================================================
       HOME -> ALL CATEGORIES
    ======================================================= */

    if (openAllCategories === "true") {
      setCurrentPage("all");
      setSelectedCategory(null);

      sessionStorage.removeItem("openAllCategories");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    /* =======================================================
       HOME -> CATEGORY DETAILS
    ======================================================= */

    if (savedCategory) {
      try {
        const category = JSON.parse(savedCategory);

        setSelectedCategory(category);
        setCurrentPage("details");

        sessionStorage.removeItem("selectedCategory");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        sessionStorage.removeItem("selectedCategory");
      }
    }
  }, [homeOnly]);

  /* =========================================================
     FILTERED CATEGORIES
  ========================================================= */

  const filteredCategories = useMemo(() => {
    let result = categories;

    if (activeCategory !== "All") {
      const section = CATEGORY_SECTIONS.find(
        (item) => item.title === activeCategory
      );

      if (section) {
        result = result.filter((category) =>
          matchesSection(category, section)
        );
      }
    }

    const searchValue = normalize(search);

    if (searchValue) {
      result = result.filter((category) =>
        normalize(getCategoryName(category)).includes(searchValue)
      );
    }

    return result;
  }, [categories, activeCategory, search]);

  /* =========================================================
     QUICK CATEGORY
  ========================================================= */

  const handleQuickCategory = (category) => {
    setActiveCategory(category);
    setSearch("");
    setCurrentPage("main");
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     SEE ALL
     
     Works from:
     1. Home
     2. Main Categories
     3. Category Details
  ========================================================= */

  const handleSeeAll = () => {
    /* =======================================================
       HOME PAGE
    ======================================================= */

    if (homeOnly) {
      sessionStorage.setItem(
        "openAllCategories",
        "true"
      );

      window.location.href = "/categories";

      return;
    }

    /* =======================================================
       CATEGORIES PAGE
    ======================================================= */

    setCurrentPage("all");
    setSelectedCategory(null);
    setSearch("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     CATEGORY CLICK
     
     Works from:
     1. Home category card
     2. Main Categories card
     3. AllCategories card
  ========================================================= */

  const handleCategoryClick = (category) => {
    /* =======================================================
       HOME CATEGORY CARD
    ======================================================= */

    if (homeOnly) {
      sessionStorage.setItem(
        "selectedCategory",
        JSON.stringify(category)
      );

      window.location.href = "/categories";

      return;
    }

    /* =======================================================
       CATEGORIES PAGE
    ======================================================= */

    setSelectedCategory(category);
    setCurrentPage("details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     BACK TO MAIN
  ========================================================= */

  const handleBackToMain = () => {
    setCurrentPage("main");
    setSelectedCategory(null);
    setActiveCategory("All");
    setSearch("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     BACK TO ALL
  ========================================================= */

  const handleBackToAll = () => {
    setCurrentPage("all");
    setSelectedCategory(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     HOME ONLY LOADING
  ========================================================= */

  if (homeOnly && loading) {
    return (
      <section className="home-category-preview">
        <div className="home-category-preview-inner">
          <div className="status-box">
            <div className="loader"></div>
            <p>Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     HOME ONLY ERROR
  ========================================================= */

  if (homeOnly && error) {
    return (
      <section className="home-category-preview">
        <div className="home-category-preview-inner">
          <div className="status-box error">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     HOME ONLY VIEW
  ========================================================= */

  if (homeOnly) {
    const homeSections = CATEGORY_SECTIONS.slice(0, 2);

    return (
      <section className="home-category-preview">
        <div className="home-category-preview-inner">

          {/* =================================================
              HOME HEADING
          ================================================= */}

          <div className="home-category-heading">

            <div className="home-category-eyebrow">
              EXPLORE INTOWN
            </div>

            <h2>
              Everything you need
              <span>close to home</span>
            </h2>

            <p>
              Discover local shops, products and everyday
              services in one place.
            </p>

          </div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="home-category-search">

            <div className="category-search">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search categories..."
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}

            </div>

          </div>

          {/* =================================================
              SEARCH RESULTS
          ================================================= */}

          {search ? (
            <motion.div
              className="home-category-row"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              <h2 className="section-heading">
                Search Results
              </h2>

              <CategoryGrid
                categories={filteredCategories}
                onCategoryClick={handleCategoryClick}
              />

            </motion.div>
          ) : (

            /* =================================================
               HOME SECTIONS
            ================================================= */

            homeSections.map((section) => {

              const sectionCategories = categories
                .filter((category) =>
                  matchesSection(category, section)
                )
                .slice(0, 8);

              if (!sectionCategories.length) {
                return null;
              }

              return (
                <motion.div
                  className="home-category-row"
                  key={section.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >

                  <h2 className="section-heading">
                    {section.title}
                  </h2>

                  <CategoryGrid
                    categories={sectionCategories}
                    onCategoryClick={handleCategoryClick}
                  />

                </motion.div>
              );
            })
          )}

          {/* =================================================
              HOME SEE ALL BUTTON
          ================================================= */}

          <div className="see-all-wrapper">

            <motion.button
              type="button"
              className="see-all-button"
              onClick={handleSeeAll}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >

              <span>
                See All Categories
              </span>

              <span className="see-all-arrow">
                →
              </span>

            </motion.button>

          </div>

        </div>
      </section>
    );
  }

  /* =========================================================
     NORMAL FULL CATEGORIES PAGE
  ========================================================= */

  return (
    <div className="categories-page">

      <header className="categories-header">
        <Header />
      </header>

      <main className="categories-main">

        <div className="categories-main-content">

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="status-box">
              <div className="loader"></div>
              <p>Loading categories...</p>
            </div>

          ) : error ? (

            /* =================================================
               ERROR
            ================================================= */

            <div className="status-box error">
              <p>{error}</p>
            </div>

          ) : currentPage === "all" ? (

            /* =================================================
               ALL CATEGORIES PAGE
            ================================================= */

            <motion.div
              key="all-page"
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              <AllCategories
                categories={categories}
                search={search}
                setSearch={setSearch}
                onBack={handleBackToMain}
                onCategoryClick={handleCategoryClick}
              />

            </motion.div>

          ) : currentPage === "details" ? (

            /* =================================================
               CATEGORY DETAILS PAGE
            ================================================= */

            <motion.div
              key="details-page"
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >

              <CategoryDetails
                category={selectedCategory}
                onBack={handleBackToAll}
                onSeeAll={handleSeeAll}
              />

            </motion.div>

          ) : (

            /* =================================================
               MAIN CATEGORIES PAGE
            ================================================= */

            <>

              {/* =================================================
                  HERO
              ================================================= */}

              <section className="categories-hero">

                <div className="content-container">

                  <motion.div
                    className="hero-inner"
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                  >

                    <div className="hero-copy">

                      <div className="heading-eyebrow">
                        INTOWN
                      </div>

                      <h1>
                        Everything you need,
                        <span>
                          close to home
                        </span>
                      </h1>

                      <p>
                        Discover local shops, products and
                        everyday services in one place.
                      </p>

                      <motion.div
                        className="shopping-badge"
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.25,
                          duration: 0.45,
                        }}
                      >

                        <span>LOCAL</span>

                        <i></i>

                        <span>SHOPPING</span>

                      </motion.div>

                    </div>

                  </motion.div>

                </div>

              </section>

              {/* =================================================
                  CONTROLS
              ================================================= */}

              <section className="main-section">

                <div className="content-container">

                  <div className="controls">

                    <div className="search-area">

                      <div className="category-search">

                        <span className="search-icon">
                          ⌕
                        </span>

                        <input
                          type="text"
                          value={search}
                          onChange={(event) =>
                            setSearch(event.target.value)
                          }
                          placeholder="Search categories..."
                        />

                        {search && (
                          <button
                            type="button"
                            className="search-clear"
                            onClick={() => setSearch("")}
                          >
                            ×
                          </button>
                        )}

                      </div>

                    </div>

                    <div className="buttons-area">

                      <div className="quick-buttons">

                        {QUICK_CATEGORIES.map(
                          (category) => (

                            <button
                              type="button"
                              key={category}
                              className={`quick-button ${
                                activeCategory === category
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleQuickCategory(category)
                              }
                            >
                              {category}
                            </button>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  CATEGORY SECTIONS
              ================================================= */}

              <section className="main-section">

                <div className="content-container">

                  {activeCategory === "All" && !search ? (

                    CATEGORY_SECTIONS.map((section) => {

                      const sectionCategories =
                        categories.filter((category) =>
                          matchesSection(
                            category,
                            section
                          )
                        );

                      if (!sectionCategories.length) {
                        return null;
                      }

                      return (
                        <motion.div
                          className="category-section"
                          key={section.title}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.1,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        >

                          <h2 className="section-heading">
                            {section.title}
                          </h2>

                          <CategoryGrid
                            categories={sectionCategories}
                            onCategoryClick={
                              handleCategoryClick
                            }
                          />

                        </motion.div>
                      );
                    })

                  ) : (

                    <motion.div
                      className="category-section"
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    >

                      <h2 className="section-heading">

                        {activeCategory === "All"
                          ? "Search Results"
                          : activeCategory}

                      </h2>

                      <CategoryGrid
                        categories={filteredCategories}
                        onCategoryClick={
                          handleCategoryClick
                        }
                      />

                    </motion.div>

                  )}

                  {/* =================================================
                      SEE ALL
                  ================================================= */}

                  <div className="see-all-wrapper">

                    <motion.button
                      type="button"
                      className="see-all-button"
                      onClick={handleSeeAll}
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                    >

                      <span>
                        See All Categories
                      </span>

                      <span className="see-all-arrow">
                        →
                      </span>

                    </motion.button>

                  </div>

                </div>

              </section>

            </>

          )}

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Categories;
