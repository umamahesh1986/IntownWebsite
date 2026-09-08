import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CustomerModal.css";
import LocationPicker from "./LocationPicker";

const INTOWN_API_BASE = "https://api.intownlocal.com/IN";

const CustomerRegistration = ({ isOpen, onClose }) => {
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    contactName: "",
    address: "",
    customerLocation: "",
    email: "",
    phoneNumber: "",
    pincode: "",
    referredBy: "",
    customerLat: null,
    customerLng: null,
    images: [],
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLocationSelect = (location) => {
    const address =
      location.address ||
      location.formattedAddress ||
      location.name ||
      "";

    const lat =
      location.lat ??
      location.latitude ??
      null;

    const lng =
      location.lng ??
      location.longitude ??
      null;

    setFormData((prev) => ({
      ...prev,
      customerLocation: address,
      customerLat: lat,
      customerLng: lng,
    }));

    setErrors((prev) => ({
      ...prev,
      customerLocation: "",
    }));

    setIsLocationPickerOpen(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    const jpgFiles = files.filter((file) => {
      const fileName = file.name.toLowerCase();

      return (
        file.type === "image/jpeg" ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg")
      );
    });

    if (jpgFiles.length !== files.length) {
      setErrors((prev) => ({
        ...prev,
        images: "Only JPG/JPEG images are allowed.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...jpgFiles],
    }));

    e.target.value = "";
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required.";
    } else if (formData.contactName.trim().length < 2) {
      newErrors.contactName = "Enter a valid contact name.";
    }

    if (!formData.customerLocation.trim()) {
      newErrors.customerLocation = "Please select your location.";
    }

    if (
      formData.customerLat === null ||
      formData.customerLng === null
    ) {
      newErrors.customerLocation = "Please select a valid location.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.phoneNumber.trim()
      )
    ) {
      newErrors.phoneNumber =
        "Enter a valid 10-digit phone number.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (
      !/^\d{6}$/.test(
        formData.pincode.trim()
      )
    ) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    if (formData.referredBy.trim()) {
      if (
        !/^[6-9]\d{9}$/.test(
          formData.referredBy.trim()
        )
      ) {
        newErrors.referredBy =
          "Enter a valid 10-digit phone number.";
      }
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "Please accept the Terms & Conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      contactName: "",
      address: "",
      customerLocation: "",
      email: "",
      phoneNumber: "",
      pincode: "",
      referredBy: "",
      customerLat: null,
      customerLng: null,
      images: [],
      termsAccepted: false,
    });

    setErrors({});
    setIsLocationPickerOpen(false);
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setIsLocationPickerOpen(false);
    setShowSuccess(false);

    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        isPrivileged: false,
        contactName: formData.contactName.trim(),
        address:
          formData.address.trim() ||
          formData.customerLocation.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        pincode: Number(formData.pincode),
        userType: "IN_CUSTOMER",
        longitude: Number(formData.customerLng),
        latitude: Number(formData.customerLat),
        referredBy: formData.referredBy.trim(),
      };

      console.log(
        "Customer Registration Payload:",
        payload
      );

      const response = await fetch(
        `${INTOWN_API_BASE}/customer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      let result = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      console.log(
        "Customer API Response:",
        result
      );

      if (response.ok) {
        localStorage.setItem(
          "intown_customer",
          JSON.stringify(result)
        );

        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          resetForm();

          if (onClose) {
            onClose();
          }
        }, 2000);

        return;
      }

      if (response.status === 409) {
        const message =
          result?.message ||
          "Customer with this phone number or email already exists.";

        setErrors({
          phoneNumber: message,
        });

        return;
      }

      if (response.status === 400) {
        alert(
          result?.message ||
            "Invalid customer information."
        );

        return;
      }

      if (response.status === 500) {
        alert(
          result?.message ||
            "Server error. Please try again later."
        );

        return;
      }

      alert(
        result?.message ||
          "Customer registration failed."
      );
    } catch (error) {
      console.error(
        "Customer Registration Error:",
        error
      );

      alert(
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="customer-registration-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="customer-registration-modal"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <div className="customer-registration-top">
                <h2>
                  Customer Registration
                </h2>

                <button
                  type="button"
                  className="customer-registration-close"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  aria-label="Close customer registration"
                >
                  ×
                </button>
              </div>

              <form
                className="customer-registration-form"
                onSubmit={handleSubmit}
              >
                <div className="customer-field">
                  <label>
                    Contact Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Enter contact name"
                  />

                  {errors.contactName && (
                    <div className="customer-error">
                      {errors.contactName}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Select Customer Location{" "}
                    <span>*</span>
                  </label>

                  <button
                    type="button"
                    className={`customer-location-field ${
                      formData.customerLocation
                        ? "location-selected"
                        : ""
                    }`}
                    onClick={() =>
                      setIsLocationPickerOpen(true)
                    }
                  >
                    <span className="location-map-icon">
                      🗺️
                    </span>

                    <span className="location-value">
                      {formData.customerLocation ||
                        "Select Customer Location"}
                    </span>

                    <span className="location-arrow">
                      →
                    </span>
                  </button>

                  {errors.customerLocation && (
                    <div className="customer-error">
                      {errors.customerLocation}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Email <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />

                  {errors.email && (
                    <div className="customer-error">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Phone Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    maxLength={10}
                  />

                  {errors.phoneNumber && (
                    <div className="customer-error">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Pincode <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength={6}
                  />

                  {errors.pincode && (
                    <div className="customer-error">
                      {errors.pincode}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                <div className="customer-field">
                  <label>
                    Upload Images
                  </label>

                  <label
                    htmlFor="customer-images"
                    className="customer-image-upload"
                  >
                    <div className="customer-camera-icon">
                      📷
                    </div>

                    <div>
                      <strong>
                        Click to upload images
                      </strong>

                      <span>
                        JPG images only
                      </span>
                    </div>
                  </label>

                  <input
                    id="customer-images"
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    multiple
                    onChange={handleImageUpload}
                    className="customer-hidden-file"
                  />

                  {errors.images && (
                    <div className="customer-error">
                      {errors.images}
                    </div>
                  )}

                  {formData.images.length > 0 && (
                    <div className="customer-image-list">
                      {formData.images.map(
                        (file, index) => (
                          <div
                            className="customer-image-item"
                            key={`${file.name}-${index}`}
                          >
                            <span>
                              {file.name}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(index)
                              }
                            >
                              ×
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="customer-field">
                  <label>
                    Referred By{" "}
                    <span className="optional-text">
                      (phone number only)
                    </span>
                  </label>

                  <input
                    type="tel"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    placeholder="Enter referral phone number"
                    maxLength={10}
                  />

                  {errors.referredBy && (
                    <div className="customer-error">
                      {errors.referredBy}
                    </div>
                  )}
                </div>

                <div className="customer-terms-section">
                  <label className="customer-terms-row">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={
                        formData.termsAccepted
                      }
                      onChange={handleChange}
                    />

                    <span>
                      I agree to the{" "}
                      <strong>
                        Terms & Conditions
                      </strong>{" "}
                      below.
                    </span>
                  </label>

                  {errors.termsAccepted && (
                    <div className="customer-error">
                      {errors.termsAccepted}
                    </div>
                  )}

                  <p>
                    By registering, you agree to our
                    terms of service and privacy policy.
                    We will use your information to
                    provide you with exclusive offers
                    and updates from local merchants.
                    You can unsubscribe at any time.
                  </p>
                </div>

                <div className="customer-registration-actions">
                  <button
                    type="button"
                    className="customer-cancel-button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="customer-register-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Registering..."
                      : "Register Customer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LocationPicker
        isOpen={isLocationPickerOpen}
        onClose={() =>
          setIsLocationPickerOpen(false)
        }
        onLocationSelect={handleLocationSelect}
        currentLocation={
          formData.customerLocation
        }
        currentCoordinates={{
          lat: formData.customerLat,
          lng: formData.customerLng,
        }}
      />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="customer-success-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="customer-success-modal"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
            >
              <div className="customer-success-check">
                ✓
              </div>

              <h3>
                Registration Successful!
              </h3>

              <p>
                Your INtown customer account has
                been created successfully.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerRegistration;

