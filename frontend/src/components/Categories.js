import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./Categories.css";

const CATEGORIES_API =
  "https://devapi.intownlocal.com/IN/categories/?forRegistration=true";

const QUICK_CATEGORIES = [
  "All",
  "Food",
  "Groceries",
  "Dairy Products",
  "Pharmacy",
  "Bakery",
  "Meat",
  "Restaurants",
  "Beauty",
];

const SECTIONS = [
  {
    title: "Fresh & Daily Essentials",
    categories: [
      "Groceries",
      "Fruits",
      "Vegetables",
      "Dairy Products",
      "Bakery",
      "Meat",
    ],
  },
  {
    title: "Food & Dining",
    categories: [
      "Restaurants",
      "Cafes",
      "Juice Shops",
      "Ice Cream Shops",
      "Food",
    ],
  },
  {
    title: "Fashion & Accessories",
    categories: [
      "Boutique",
      "Women's Wear",
      "Men's Wear",
      "Kids Wear",
      "Footwear",
      "Bags & Accessories",
      "Jewellery",
      "Imitation Jewellery",
      "Fancy Store",
      "Eyewear",
    ],
  },
  {
    title: "Beauty & Wellness",
    categories: [
      "Beauty Parlors",
      "Men's Salons",
      "Wellness Centers",
      "Gyms",
      "Yoga",
      "Ayurvedic",
    ],
  },
  {
    title: "Health & Medical",
    categories: [
      "Pharmacy",
      "Dental Clinics",
      "Eye Clinics",
      "Diagnostic Labs",
      "Physiotherapy",
    ],
  },
  {
    title: "Home & Living",
    categories: [
      "Furniture",
      "Home Interior",
      "Electrical",
      "Hardware",
      "Paint",
      "Plumbers",
      "Home Services",
      "Pest Control",
    ],
  },
  {
    title: "Electronics & Mobile",
    categories: [
      "Electronics & Home Appliances",
      "Mobile Stores",
      "Mobile Repairs",
      "Computer Hardware",
      "Xerox Shops",
    ],
  },
  {
    title: "Automotive",
    categories: ["Car Wash", "Mechanic"],
  },
  {
    title: "Everyday Services",
    categories: [
      "Laundry",
      "Tailoring",
      "Photo Studios",
      "Others",
    ],
  },
  {
    title: "Education & Learning",
    categories: ["Art Classes", "Stationery"],
  },
  {
    title: "Pets & More",
    categories: ["Pet"],
  },
];

const CATEGORY_ALIASES = {
  Food: [
    "Food",
    "Restaurants",
    "Restaurant",
    "Cafes",
    "Cafe",
    "Juice Shops",
    "Juice Shop",
    "Ice Cream Shops",
    "Ice Cream",
  ],

  Beauty: [
    "Beauty",
    "Beauty Parlors",
    "Beauty Parlor",
    "Men's Salons",
    "Men's Salon",
    "Wellness Centers",
    "Wellness Center",
    "Gyms",
    "Gym",
    "Yoga",
    "Ayurvedic",
  ],

  Groceries: [
    "Groceries",
    "Grocery",
    "Vegetables",
    "Fruits",
  ],

  "Dairy Products": [
    "Dairy Products",
    "Dairy",
    "Milk",
    "Curd",
    "Ghee",
  ],

  Pharmacy: ["Pharmacy"],

  Bakery: ["Bakery"],

  Meat: [
    "Meat",
    "Chicken",
    "Mutton",
    "Fish",
  ],

  Restaurants: [
    "Restaurants",
    "Restaurant",
  ],
};

const CATEGORY_EMOJIS = {
  Groceries: "🛒",
  Fruits: "🍎",
  Vegetables: "🥦",
  "Dairy Products": "🥛",
  Bakery: "🥐",
  Meat: "🥩",
  Restaurants: "🍽️",
  Cafes: "☕",
  "Juice Shops": "🥤",
  "Ice Cream Shops": "🍦",
  Food: "🍕",
  Boutique: "👗",
  "Women's Wear": "👚",
  "Men's Wear": "👔",
  "Kids Wear": "🧒",
  Footwear: "👟",
  "Bags & Accessories": "👜",
  Jewellery: "💎",
  "Imitation Jewellery": "💍",
  "Fancy Store": "✨",
  Eyewear: "👓",
  "Beauty Parlors": "💇‍♀️",
  "Men's Salons": "💈",
  "Wellness Centers": "🧘",
  Gyms: "🏋️",
  Yoga: "🧘‍♀️",
  Ayurvedic: "🌿",
  Pharmacy: "💊",
  "Dental Clinics": "🦷",
  "Eye Clinics": "👁️",
  "Diagnostic Labs": "🔬",
  Physiotherapy: "🩺",
  Furniture: "🛋️",
  "Home Interior": "🏠",
  Electrical: "💡",
  Hardware: "🔧",
  Paint: "🎨",
  Plumbers: "🚰",
  "Home Services": "🏡",
  "Pest Control": "🐜",
  "Electronics & Home Appliances": "📺",
  "Mobile Stores": "📱",
  "Mobile Repairs": "🛠️",
  "Computer Hardware": "💻",
  "Xerox Shops": "🖨️",
  "Car Wash": "🚗",
  Mechanic: "🔩",
  Laundry: "🧺",
  Tailoring: "🧵",
  "Photo Studios": "📸",
  Others: "📦",
  "Art Classes": "🎨",
  Stationery: "✏️",
  Pet: "🐶",
};

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const getCategoryName = (category) => {
  if (typeof category === "string") {
    return category;
  }

  return (
    category?.name ||
    category?.categoryName ||
    category?.title ||
    category?.category ||
    ""
  );
};

const getCategoryImage = (category) => {
  if (typeof category === "string") {
    return "";
  }

  return (
    category?.imageUrl ||
    category?.image ||
    category?.image_url ||
    category?.icon ||
    ""
  );
};

const getApiCategories = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  if (Array.isArray(data?.categories)) {
    return data.categories;
  }

  return [];
};

const createFallbackCategory = (name) => ({
  id: `local-${normalize(name).replace(/[^a-z0-9]+/g, "-")}`,
  name,
  imageUrl: "",
});

function isRelatedCategory(categoryName, selectedName) {
  if (selectedName === "All") {
    return true;
  }

  const aliases =
    CATEGORY_ALIASES[selectedName] || [selectedName];

  const category = normalize(categoryName);

  return aliases.some((alias) => {
    const normalizedAlias = normalize(alias);

    return (
      category === normalizedAlias ||
      category.includes(normalizedAlias) ||
      normalizedAlias.includes(category)
    );
  });
}

export default function Categories() {
  const [apiCategories, setApiCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedQuickCategory, setSelectedQuickCategory] =
    useState("All");

  const [showAllCategories, setShowAllCategories] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(CATEGORIES_API);

      if (!response.ok) {
        throw new Error("Categories API failed");
      }

      const data = await response.json();

      const categories = getApiCategories(data);

      setApiCategories(categories);
    } catch (err) {
      console.error(err);
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const apiMap = useMemo(() => {
    const map = new Map();

    apiCategories.forEach((item) => {
      const name = getCategoryName(item);

      if (name) {
        map.set(normalize(name), item);
      }
    });

    return map;
  }, [apiCategories]);

  const getCategoryData = useCallback(
    (name) => {
      const existing = apiMap.get(normalize(name));

      if (existing) {
        return {
          ...existing,
          name: getCategoryName(existing) || name,
        };
      }

      return createFallbackCategory(name);
    },
    [apiMap]
  );

  
  const filteredSections = useMemo(() => {
    if (showAllCategories) {
      return [];
    }

    return SECTIONS.map((section) => {
      const categories = section.categories
        .map(getCategoryData)
        .filter((category) => {
          const name = getCategoryName(category);

          const quickMatch = isRelatedCategory(
            name,
            selectedQuickCategory
          );

          const searchMatch =
            !search.trim() ||
            normalize(name).includes(normalize(search));

          return quickMatch && searchMatch;
        });

      return {
        ...section,
        categories,
      };
    }).filter((section) => section.categories.length > 0);
  }, [
    getCategoryData,
    search,
    selectedQuickCategory,
    showAllCategories,
  ]);

 
  const allApiCategories = useMemo(() => {
    if (!showAllCategories) {
      return [];
    }

    const searchValue = normalize(search);

    return apiCategories
      .filter((category) => {
        const name = getCategoryName(category);

        if (!searchValue) {
          return true;
        }

        return normalize(name).includes(searchValue);
      })
      .map((category) => ({
        ...category,
        name: getCategoryName(category),
      }))
      .filter((category) => category.name);
  }, [apiCategories, search, showAllCategories]);

  /*
   * QUICK CATEGORY BUTTON CLICK
   */
  const handleQuickClick = (name) => {
    setSelectedQuickCategory(name);

    /*
     * Clicking a quick category goes back to
     * normal section mode.
     */
    setShowAllCategories(false);

    window.setTimeout(() => {
      document
        .querySelector(".categories-content")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  
  const handleSeeAllCategories = () => {
    setShowAllCategories(true);
    setSelectedQuickCategory("All");
    setSearch("");

    window.setTimeout(() => {
      document
        .querySelector(".categories-content")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

 
  const handleCategoryClick = (category) => {
    const name = getCategoryName(category);

    setSelectedQuickCategory(name);
    setShowAllCategories(false);

    window.setTimeout(() => {
      document
        .querySelector(".categories-content")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  
  const handleBackToCategories = () => {
    setShowAllCategories(false);
    setSelectedQuickCategory("All");
    setSearch("");

    window.setTimeout(() => {
      document
        .querySelector(".categories-content")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="categories-page">

      {/* =========================
          CATEGORY PAGE HEADER
          ========================= */}

      <header className="categories-header">
        <div className="header-inner">

          <div className="header-brand">
            <div className="brand-logo">
              IN
            </div>

            <div className="brand-content">
              <h1>INtown</h1>

              <p>
                Discover Everything Near You
              </p>
            </div>
          </div>

          <div className="header-location">
            <span>📍</span>

            <span>
              Explore Local Categories
            </span>
          </div>

        </div>
      </header>

      {/* =========================
          HERO
          ========================= */}

      {!showAllCategories && (
        <section className="categories-hero">

          <motion.div
            className="hero-content"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >

            <span className="hero-small-text">
              EXPLORE LOCAL
            </span>

            <h2>
              Discover Categories
              <br />
              <span>Near You</span>
            </h2>

            <div className="small-orange-line" />

            <p>
              Find local shops, services, food,
              healthcare and everything you need
              in one place.
            </p>

          </motion.div>

        </section>
      )}

      {/* =========================
          SEARCH
          ========================= */}

      <section className="search-section">
        <div className="search-wrapper">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder={
              showAllCategories
                ? "Search all categories..."
                : "Search categories..."
            }
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </div>
      </section>

      {/* =========================
          QUICK CATEGORIES
          ========================= */}

      {!showAllCategories && (
        <section className="quick-section">

          <div className="section-heading centered-heading">
            <h3>
              Popular Categories
            </h3>

            <div className="small-orange-line" />
          </div>

          <div className="quick-buttons">

            {QUICK_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                type="button"
                className={`quick-button ${
                  selectedQuickCategory === category
                    ? "active"
                    : ""
                }`}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() =>
                  handleQuickClick(category)
                }
              >

                {CATEGORY_EMOJIS[category] && (
                  <span>
                    {CATEGORY_EMOJIS[category]}
                  </span>
                )}

                {category}

              </motion.button>
            ))}

          </div>

        </section>
      )}

      {/* =========================
          MAIN CATEGORY CONTENT
          ========================= */}

      <main className="categories-content">

        {/* LOADING */}

        {loading && (
          <div className="status-box">

            <div className="loader" />

            <p>
              Loading categories...
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="status-box">

            <p>
              {error}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={fetchCategories}
            >
              Try Again
            </button>

          </div>
        )}

        {/* =========================
            SEE ALL API CATEGORIES
            ========================= */}

        {!loading &&
          !error &&
          showAllCategories && (
            <section className="all-api-categories">

              <div className="all-categories-top">

                <div>
                  <span className="hero-small-text">
                    INtown
                  </span>

                  <h2>
                    All Categories
                  </h2>
                </div>

                <button
                  type="button"
                  className="back-categories-button"
                  onClick={handleBackToCategories}
                >
                  ← Back
                </button>

              </div>

              {allApiCategories.length > 0 ? (
                <div className="category-grid">

                  {allApiCategories.map(
                    (category, index) => (
                      <CategoryCard
                        key={`api-${category.id || category.name}-${index}`}
                        category={category}
                        index={index}
                        onClick={handleCategoryClick}
                      />
                    )
                  )}

                </div>
              ) : (
                <div className="empty-search">

                  <div className="empty-icon">
                    🔎
                  </div>

                  <h4>
                    No categories found
                  </h4>

                  <p>
                    Try another category name.
                  </p>

                </div>
              )}

            </section>
          )}

        {/* =========================
            NORMAL SECTION MODE
            ========================= */}

        {!loading &&
          !error &&
          !showAllCategories &&
          filteredSections.length > 0 && (
            filteredSections.map((section) => (
              <section
                className="category-section"
                key={section.title}
              >

                <div className="section-heading centered-heading">

                  <h3>
                    {section.title}
                  </h3>

                  <div className="small-orange-line" />

                </div>

                <div className="category-grid">

                  {section.categories.map(
                    (category, index) => (
                      <CategoryCard
                        key={`${section.title}-${category.name}`}
                        category={category}
                        index={index}
                        onClick={handleCategoryClick}
                      />
                    )
                  )}

                </div>

              </section>
            ))
          )}

        {/* NORMAL MODE EMPTY */}

        {!loading &&
          !error &&
          !showAllCategories &&
          filteredSections.length === 0 && (
            <div className="empty-search">

              <div className="empty-icon">
                🔎
              </div>

              <h4>
                No categories found
              </h4>

              <p>
                Try another category name.
              </p>

            </div>
          )}

      </main>

      {/* =========================
          SEE ALL FOOTER
          ========================= */}

      {!showAllCategories && (
        <section className="see-all-footer">

          <div className="see-all-content">

            <h3>
              See All Categories
            </h3>

            <div className="small-orange-line" />

            <p>
              Explore all local categories
              available on INtown.
            </p>

            <motion.button
              type="button"
              className="see-all-button"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleSeeAllCategories}
            >
              See All Categories
              <span>→</span>
            </motion.button>

          </div>

        </section>
      )}

    </div>
  );
}

/* =========================================
   CATEGORY CARD
   ========================================= */

function CategoryCard({
  category,
  index,
  onClick,
}) {
  const name = getCategoryName(category);
  const image = getCategoryImage(category);

  return (
    <motion.button
      type="button"
      className="category-card"

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
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.2),
      }}

      whileHover={{
        y: -6,
      }}

      whileTap={{
        scale: 0.97,
      }}

      onClick={() =>
        onClick(category)
      }
    >

      <div className="category-image">

        {image ? (
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display =
                "none";

              e.currentTarget.parentElement
                .querySelector(
                  ".image-fallback"
                )
                ?.classList.add("show");
            }}
          />
        ) : null}

        <span
          className={`image-fallback ${
            image ? "" : "show"
          }`}
        >
          {CATEGORY_EMOJIS[name] || "📂"}
        </span>

      </div>

      <div className="category-card-bottom">

        <h4>
          {name}
        </h4>

        <span className="category-arrow">
          →
        </span>

      </div>

    </motion.button>
  );
}