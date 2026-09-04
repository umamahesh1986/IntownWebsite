// import React, { useState } from "react";
// import "./ModalCustomer.css";

// const ModalCustomer = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     contactName: "",
//     address: "",
//     phone: "",
//     email: "",
//     pincode: "",
//     referredBy: "",
//     agreeTerms: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.contactName.trim()) {
//       newErrors.contactName = "Contact name is required";
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     const phone = formData.phone.replace(/\D/g, "");

//     if (!phone) {
//       newErrors.phone = "Phone number is required";
//     } else if (phone.length !== 10) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
//     ) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.pincode.trim()) {
//       newErrors.pincode = "Pincode is required";
//     } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
//       newErrors.pincode = "Pincode must be exactly 6 digits";
//     }

//     if (!formData.agreeTerms) {
//       newErrors.agreeTerms =
//         "Please accept Terms & Conditions";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     /*
//       Customer API payload
//       Location is NOT taken from the form.
//     */
//     const payload = {
//       isPrivileged: false,
//       contactName: formData.contactName.trim(),
//       address: formData.address.trim(),
//       phoneNumber: formData.phone.replace(/\D/g, ""),
//       email: formData.email.trim(),
//       pincode: Number(formData.pincode),

//       // Swagger example
//       userType: "IN_MERCHANT",

//       // No location field in UI.
//       // API schema contains these fields.
//       longitude: 0.1,
//       latitude: 0.1,

//       referredBy: formData.referredBy.trim(),
//       deviceId: "web",
//     };

//     console.log(
//       "Customer Registration Payload:",
//       JSON.stringify(payload, null, 2)
//     );

//     try {
//       const response = await fetch(
//         "https://devapi.intownlocal.com/IN/customer/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const responseText = await response.text();

//       let data = {};

//       try {
//         data = responseText
//           ? JSON.parse(responseText)
//           : {};
//       } catch {
//         data = {
//           message: responseText,
//         };
//       }

//       console.log("API Status:", response.status);
//       console.log("API Response:", data);

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             data?.error ||
//             `Registration failed with status ${response.status}`
//         );
//       }

//       setSuccess(true);

//     } catch (error) {
//       console.error(
//         "Customer Registration Error:",
//         error
//       );

//       alert(
//         error.message ||
//           "Customer registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({
//       contactName: "",
//       address: "",
//       phone: "",
//       email: "",
//       pincode: "",
//       referredBy: "",
//       agreeTerms: false,
//     });

//     setErrors({});
//     setSuccess(false);
//     setLoading(false);

//     onClose();
//   };

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="customer-modal-overlay">
//       <div className="customer-modal">

//         {/* Close */}
//         <button
//           type="button"
//           className="customer-close-btn"
//           onClick={handleClose}
//         >
//           ×
//         </button>

//         {!success ? (
//           <>
//             {/* Header */}
//             <div className="customer-modal-header">
//               <h2>Customer Registration</h2>

//               <p>
//                 Create your INtown customer account
//               </p>
//             </div>

//             <form onSubmit={handleSubmit}>

//               {/* Full Name */}
//               <div className="form-group">
//                 <label htmlFor="contactName">
//                   Full Name *
//                 </label>

//                 <input
//                   type="text"
//                   id="contactName"
//                   name="contactName"
//                   value={formData.contactName}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   className={
//                     errors.contactName
//                       ? "error"
//                       : ""
//                   }
//                 />

//                 {errors.contactName && (
//                   <span className="error-message">
//                     {errors.contactName}
//                   </span>
//                 )}
//               </div>

//               {/* Address */}
//               <div className="form-group">
//                 <label htmlFor="address">
//                   Address *
//                 </label>

//                 <textarea
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Enter your address"
//                   rows="3"
//                   className={
//                     errors.address
//                       ? "error"
//                       : ""
//                   }
//                 />

//                 {errors.address && (
//                   <span className="error-message">
//                     {errors.address}
//                   </span>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className="form-group">
//                 <label htmlFor="phone">
//                   Phone Number *
//                 </label>

//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter 10 digit phone number"
//                   maxLength="10"
//                   className={
//                     errors.phone
//                       ? "error"
//                       : ""
//                   }
//                 />

//                 {errors.phone && (
//                   <span className="error-message">
//                     {errors.phone}
//                   </span>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="form-group">
//                 <label htmlFor="email">
//                   Email *
//                 </label>

//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className={
//                     errors.email
//                       ? "error"
//                       : ""
//                   }
//                 />

//                 {errors.email && (
//                   <span className="error-message">
//                     {errors.email}
//                   </span>
//                 )}
//               </div>

//               {/* Pincode */}
//               <div className="form-group">
//                 <label htmlFor="pincode">
//                   Pincode *
//                 </label>

//                 <input
//                   type="text"
//                   id="pincode"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   placeholder="Enter pincode"
//                   maxLength="6"
//                   className={
//                     errors.pincode
//                       ? "error"
//                       : ""
//                   }
//                 />

//                 {errors.pincode && (
//                   <span className="error-message">
//                     {errors.pincode}
//                   </span>
//                 )}
//               </div>

//               {/* Referred By */}
//               <div className="form-group">
//                 <label htmlFor="referredBy">
//                   Referred By
//                 </label>

//                 <input
//                   type="text"
//                   id="referredBy"
//                   name="referredBy"
//                   value={formData.referredBy}
//                   onChange={handleChange}
//                   placeholder="Enter referral number"
//                 />
//               </div>

//               {/* Terms */}
//               <div className="terms-group">
//                 <label className="terms-label">
//                   <input
//                     type="checkbox"
//                     name="agreeTerms"
//                     checked={formData.agreeTerms}
//                     onChange={handleChange}
//                   />

//                   <span>
//                     I agree to the Terms & Conditions
//                   </span>
//                 </label>

//                 {errors.agreeTerms && (
//                   <span className="error-message">
//                     {errors.agreeTerms}
//                   </span>
//                 )}
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="customer-register-btn"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Registering..."
//                   : "Register"}
//               </button>

//             </form>
//           </>
//         ) : (
//           <div className="customer-success">

//             <div className="success-icon">
//               ✓
//             </div>

//             <h2>
//               Registration Successful!
//             </h2>

//             <p>
//               Your customer account has been
//               created successfully.
//             </p>

//             <button
//               type="button"
//               className="customer-register-btn"
//               onClick={handleClose}
//             >
//               Continue
//             </button>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ModalCustomer;



import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ModalCustomer.css";

const INITIAL_FORM = {
  contactName: "",
  address: "",
  phone: "",
  email: "",
  pincode: "",
  referredBy: "",
  agreeTerms: false,
};

const ModalCustomer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [locationStatus, setLocationStatus] = useState(
    "Getting your location..."
  );

  // Get real-time browser location
  useEffect(() => {
    if (!isOpen) return;

    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    setLocationStatus("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        setLocationStatus("Location detected successfully.");
      },
      (error) => {
        console.error("Location Error:", error);

        setLocationStatus(
          "Unable to get location. Please allow location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === "checkbox" ? checked : value;

    // Allow only numbers for phone
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Allow only numbers for pincode
    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Full name is required.";
    } else if (formData.contactName.trim().length < 3) {
      newErrors.contactName = "Please enter a valid full name.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms =
        "Please accept the Terms & Conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Location permission check
    if (
      location.latitude === null ||
      location.longitude === null
    ) {
      alert(
        "Please allow location permission before registering."
      );
      return;
    }

    setLoading(true);

    const payload = {
      isPrivileged: false,

      contactName: formData.contactName.trim(),

      address: formData.address.trim(),

      phoneNumber: formData.phone.replace(/\D/g, ""),

      email: formData.email.trim(),

      pincode: Number(formData.pincode),

      // Keep this according to your Swagger API requirement.
      userType: "IN_MERCHANT",

      // Real-time browser location
      latitude: location.latitude,
      longitude: location.longitude,

      referredBy: formData.referredBy.trim(),

      deviceId: "web",
    };

    console.log(
      "Customer Registration Payload:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const response = await fetch(
        "https://devapi.intownlocal.com/IN/customer/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        data = {
          message: responseText,
        };
      }

      console.log("API Status:", response.status);
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Registration failed with status ${response.status}`
        );
      }

      setSuccess(true);
    } catch (error) {
      console.error(
        "Customer Registration Error:",
        error
      );

      alert(
        error.message ||
          "Customer registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSuccess(false);
    setLoading(false);

    setLocation({
      latitude: null,
      longitude: null,
    });

    setLocationStatus("Getting your location...");

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="customer-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            className="customer-modal"
            initial={{
              opacity: 0,
              y: 70,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 50,
              scale: 0.96,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              type="button"
              className="customer-close-btn"
              onClick={handleClose}
              whileHover={{
                rotate: 90,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              aria-label="Close"
            >
              ×
            </motion.button>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="customer-modal-header">
                    <motion.div
                      className="customer-header-icon"
                      initial={{
                        scale: 0,
                        rotate: -20,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 0.4,
                        type: "spring",
                      }}
                    >
                      <span>IN</span>
                    </motion.div>

                    <h2>Customer Registration</h2>

                    <p>
                      Create your INtown customer account
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="customer-form"
                  >
                    {/* Full Name */}
                    <motion.div
                      className="form-group"
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08,
                      }}
                    >
                      <label htmlFor="contactName">
                        Full Name <span>*</span>
                      </label>

                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className={
                          errors.contactName
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors.contactName && (
                        <span className="error-message">
                          {errors.contactName}
                        </span>
                      )}
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      className="form-group"
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.12,
                      }}
                    >
                      <label htmlFor="address">
                        Address <span>*</span>
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows={3}
                        autoComplete="street-address"
                        className={
                          errors.address
                            ? "input-error"
                            : ""
                        }
                      />

                      {errors.address && (
                        <span className="error-message">
                          {errors.address}
                        </span>
                      )}
                    </motion.div>

                    {/* Phone + Email */}
                    <div className="form-row">
                      <motion.div
                        className="form-group"
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.16,
                        }}
                      >
                        <label htmlFor="phone">
                          Phone Number <span>*</span>
                        </label>

                        <div className="phone-input-wrapper">
                          <span className="country-code">
                            +91
                          </span>

                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10 digit number"
                            inputMode="numeric"
                            autoComplete="tel"
                            className={
                              errors.phone
                                ? "input-error"
                                : ""
                            }
                          />
                        </div>

                        {errors.phone && (
                          <span className="error-message">
                            {errors.phone}
                          </span>
                        )}
                      </motion.div>

                      <motion.div
                        className="form-group"
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.16,
                        }}
                      >
                        <label htmlFor="email">
                          Email <span>*</span>
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          autoComplete="email"
                          className={
                            errors.email
                              ? "input-error"
                              : ""
                          }
                        />

                        {errors.email && (
                          <span className="error-message">
                            {errors.email}
                          </span>
                        )}
                      </motion.div>
                    </div>

                    {/* Pincode + Referral */}
                    <div className="form-row">
                      <motion.div
                        className="form-group"
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.2,
                        }}
                      >
                        <label htmlFor="pincode">
                          Pincode <span>*</span>
                        </label>

                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6 digit pincode"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          className={
                            errors.pincode
                              ? "input-error"
                              : ""
                          }
                        />

                        {errors.pincode && (
                          <span className="error-message">
                            {errors.pincode}
                          </span>
                        )}
                      </motion.div>

                      <motion.div
                        className="form-group"
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.2,
                        }}
                      >
                        <label htmlFor="referredBy">
                          Referred By
                        </label>

                        <input
                          type="text"
                          id="referredBy"
                          name="referredBy"
                          value={formData.referredBy}
                          onChange={handleChange}
                          placeholder="Referral number"
                        />
                      </motion.div>
                    </div>

                    {/* Location */}
                    <motion.div
                      className="location-status"
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.24,
                      }}
                    >
                      <div className="location-dot">
                        <span />
                      </div>

                      <div>
                        <strong>
                          Location
                        </strong>

                        <p>
                          {locationStatus}
                        </p>
                      </div>
                    </motion.div>

                    {/* Terms */}
                    <motion.div
                      className="terms-group"
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.28,
                      }}
                    >
                      <label className="terms-label">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={
                            formData.agreeTerms
                          }
                          onChange={handleChange}
                        />

                        <span className="custom-checkbox">
                          ✓
                        </span>

                        <span className="terms-text">
                          I agree to the{" "}
                          <button
                            type="button"
                            className="terms-link"
                          >
                            Terms & Conditions
                          </button>
                        </span>
                      </label>

                      {errors.agreeTerms && (
                        <span className="error-message">
                          {errors.agreeTerms}
                        </span>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="customer-register-btn"
                      disabled={loading}
                      whileHover={
                        !loading
                          ? {
                              scale: 1.015,
                            }
                          : {}
                      }
                      whileTap={
                        !loading
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                    >
                      <span>
                        {loading
                          ? "Registering..."
                          : "Create Customer Account"}
                      </span>

                      {!loading && (
                        <span className="button-arrow">
                          →
                        </span>
                      )}

                      {loading && (
                        <span className="loader" />
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                /* Success */
                <motion.div
                  key="success"
                  className="customer-success"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <motion.div
                    className="success-icon"
                    initial={{
                      scale: 0,
                      rotate: -45,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 180,
                    }}
                  >
                    ✓
                  </motion.div>

                  <motion.h2
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.25,
                    }}
                  >
                    Registration Successful!
                  </motion.h2>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3,
                    }}
                  >
                    Your INtown customer account
                    has been created successfully.
                  </motion.p>

                  <motion.button
                    type="button"
                    className="customer-register-btn success-btn"
                    onClick={handleClose}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    Continue
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCustomer;

