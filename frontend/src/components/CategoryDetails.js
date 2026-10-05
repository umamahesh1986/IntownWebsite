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

const CategoryDetails = ({
  category,
  onBack,
  onSeeAll,
}) => {
  if (!category) {
    return null;
  }

  const name = getCategoryName(category);
  const image = getCategoryImage(category);

  return (
    <section className="detail-section">

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

        <motion.div
          className="detail-card"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <div>
            {image ? (
              <img
                src={image}
                alt={name}
                className="detail-image"
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";

                  const placeholder =
                    event.currentTarget.parentElement.querySelector(
                      ".detail-placeholder"
                    );

                  if (placeholder) {
                    placeholder.style.display =
                      "flex";
                  }
                }}
              />
            ) : null}

            <div
              className="detail-placeholder"
              style={{
                display: image ? "none" : "flex",
              }}
            >
              <span>
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="detail-content">

            <div className="detail-label">
              LOCAL CATEGORY
            </div>

            <h1>{name}</h1>

            <p>
              Find trusted local shops, products
              and everyday services related to{" "}
              {name}.
            </p>

            <div className="detail-line">
              ✓ Local businesses
            </div>

            <div className="detail-line">
              ✓ Products and services
            </div>

            <div className="detail-line">
              ✓ Easy local discovery
            </div>

          </div>

        </motion.div>

        <div className="detail-button-wrapper">

          <motion.button
            type="button"
            className="see-all-button"
            onClick={onSeeAll}
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span>See All Categories</span>

            <span className="see-all-arrow">
              →
            </span>
          </motion.button>

        </div>

      </div>

    </section>
  );
};

export default CategoryDetails;