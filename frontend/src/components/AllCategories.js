import React from "react";
import { motion } from "framer-motion";

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

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const AllCategories = ({
  categories,
  search,
  setSearch,
  onBack,
  onCategoryClick,
}) => {
  const filteredCategories = categories.filter((category) =>
    normalize(getCategoryName(category)).includes(
      normalize(search)
    )
  );

  return (
    <section className="all-section">

      <div className="content-container">

        <div className="back-row">
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>

        <div className="heading-content">

          <div className="heading-eyebrow">
            INTOWN
          </div>

          <h1>All Categories</h1>

          <p>
            Explore all local categories available
            around you.
          </p>

          <div className="shopping-badge">
            <span>LOCAL</span>
            <i></i>
            <span>SHOPPING</span>
          </div>

        </div>

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

        </div>

      </div>

      <div className="content-container all-cards">

        {!filteredCategories.length ? (
          <div className="empty-categories">
            <div className="empty-icon">⌕</div>
            <p>No categories found.</p>
          </div>
        ) : (
          <div className="categories-grid">

            {filteredCategories.map(
              (category, index) => {
                const name =
                  getCategoryName(category);

                const image =
                  getCategoryImage(category);

                return (
                  <motion.button
                    type="button"
                    key={getCategoryId(
                      category,
                      index
                    )}
                    className="category-card"
                    onClick={() =>
                      onCategoryClick(category)
                    }
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.025,
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
                            event.currentTarget.style.display =
                              "none";

                            const placeholder =
                              event.currentTarget.parentElement.querySelector(
                                ".category-placeholder"
                              );

                            if (placeholder) {
                              placeholder.style.display =
                                "flex";
                            }
                          }}
                        />
                      ) : null}

                      <div
                        className="category-placeholder"
                        style={{
                          display: image
                            ? "none"
                            : "flex",
                        }}
                      >
                        <span>
                          {name
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>

                    </div>

                    <div className="category-name">
                      {name}
                    </div>

                    <span className="category-card-arrow">
                      →
                    </span>

                  </motion.button>
                );
              }
            )}

          </div>
        )}

      </div>

    </section>
  );
};

export default AllCategories;


