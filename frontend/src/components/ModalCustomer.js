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




    import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';
import LocationPicker from './LocationPicker';

const CUSTOMER_API_URL =
  'https://devapi.intownlocal.com/IN/customer/';

const IMAGE_UPLOAD_URL =
  'http://in-town-dev.eba-czzrpn3v.eu-north-1.elasticbeanstalk.com/in-town/v1/s3/upload';

const INITIAL_FORM = {
  contactName: '',
  customerLocation: '',
  customerAddress: '',
  customerLat: null,
  customerLng: null,
  email: '',
  phone: '',
  pincode: '',
  address: '',
  customerImage: [],
  introducedBy: '',
  agreeTerms: false,
};

const ModalCustomer = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLocationPickerOpen, setIsLocationPickerOpen] =
    useState(false);

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  const [registrationId, setRegistrationId] =
    useState(null);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationError, setLocationError] =
    useState('');

  /*
   * Automatically get current GPS location
   * whenever customer modal is opened.
   */
  useEffect(() => {
    if (!isOpen) return;

    getCurrentLocation();
  }, [isOpen]);

  /*
   * Get REAL-TIME browser location
   */
  const getCurrentLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationLoading(false);
      setLocationError(
        'Location is not supported by this browser.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('GPS Latitude:', latitude);
        console.log('GPS Longitude:', longitude);

        try {
          /*
           * Reverse geocoding:
           * GPS coordinates -> readable address
           */
          const addressData =
            await reverseGeocode(latitude, longitude);

          const displayLocation =
            addressData?.display_name ||
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

          const readableAddress =
            buildReadableAddress(addressData);

          setFormData((prev) => ({
            ...prev,

            customerLocation: displayLocation,

            customerAddress:
              readableAddress || displayLocation,

            customerLat: latitude,
            customerLng: longitude,

            /*
             * If address is empty,
             * automatically use GPS address.
             */
            address:
              prev.address.trim() ||
              readableAddress ||
              displayLocation,
          }));

          setErrors((prev) => ({
            ...prev,
            customerLocation: '',
          }));

          console.log('Current Location:', {
            latitude,
            longitude,
            displayLocation,
            readableAddress,
          });
        } catch (error) {
          console.error(
            'Reverse geocoding error:',
            error
          );

          /*
           * Even if address API fails,
           * GPS coordinates are still retained.
           */
          setFormData((prev) => ({
            ...prev,
            customerLocation:
              `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            customerLat: latitude,
            customerLng: longitude,
          }));
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error(
          'Geolocation error:',
          error
        );

        setLocationLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              'Location permission denied. Please allow location access.'
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError(
              'Current location is unavailable.'
            );
            break;

          case error.TIMEOUT:
            setLocationError(
              'Location request timed out. Please try again.'
            );
            break;

          default:
            setLocationError(
              'Unable to get your current location.'
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /*
   * GPS coordinates -> Address
   */
  const reverseGeocode = async (
    latitude,
    longitude
  ) => {
    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?format=jsonv2` +
      `&lat=${encodeURIComponent(latitude)}` +
      `&lon=${encodeURIComponent(longitude)}` +
      `&zoom=18` +
      `&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Reverse geocoding failed: ${response.status}`
      );
    }

    return response.json();
  };

  /*
   * Create readable address from Nominatim response
   */
  const buildReadableAddress = (data) => {
    if (!data?.address) {
      return data?.display_name || '';
    }

    const a = data.address;

    const parts = [
      a.house_number,
      a.road,
      a.neighbourhood,
      a.suburb,
      a.village,
      a.town,
      a.city,
      a.district,
      a.state_district,
      a.state,
      a.postcode,
      a.country,
    ].filter(Boolean);

    return [...new Set(parts)].join(', ');
  };

  /*
   * Open LocationPicker
   */
  const openLocationPicker = () => {
    setIsLocationPickerOpen(true);
  };

  /*
   * LocationPicker returns selected location
   */
  const handleLocationSelect = (locationData) => {
    console.log(
      'Location selected from picker:',
      locationData
    );

    const latitude = Number(locationData?.lat);
    const longitude = Number(locationData?.lng);

    setFormData((prev) => ({
      ...prev,

      customerLocation:
        locationData?.displayText ||
        `${latitude}, ${longitude}`,

      customerAddress:
        locationData?.address ||
        locationData?.displayText ||
        '',

      customerLat:
        Number.isFinite(latitude)
          ? latitude
          : null,

      customerLng:
        Number.isFinite(longitude)
          ? longitude
          : null,

      address:
        prev.address.trim() ||
        locationData?.address ||
        locationData?.displayText ||
        '',
    }));

    setErrors((prev) => ({
      ...prev,
      customerLocation: '',
    }));

    setLocationError('');
    setIsLocationPickerOpen(false);
  };

  /*
   * Input change
   */
  const handleInputChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    let finalValue =
      type === 'checkbox'
        ? checked
        : value;

    /*
     * Phone: numbers only, max 10
     */
    if (name === 'phone') {
      finalValue = value
        .replace(/\D/g, '')
        .slice(0, 10);
    }

    /*
     * Pincode: numbers only, max 6
     */
    if (name === 'pincode') {
      finalValue = value
        .replace(/\D/g, '')
        .slice(0, 6);
    }

    /*
     * Referred By: phone number only
     */
    if (name === 'introducedBy') {
      finalValue = value
        .replace(/\D/g, '')
        .slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /*
   * JPG image upload
   */
  const handleCustomerImageUpload = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      const isJpg =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        /\.jpe?g$/i.test(file.name);

      if (isJpg) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(
        `Only JPG images are allowed.\n\nIgnored:\n${invalidFiles.join(
          '\n'
        )}`
      );
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        customerImage: [
          ...prev.customerImage,
          ...validFiles,
        ],
      }));
    }

    /*
     * Allow selecting the same file again
     */
    e.target.value = '';
  };

  /*
   * Remove uploaded image
   */
  const removeCustomerImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      customerImage:
        prev.customerImage.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /*
   * Validation
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName =
        'Contact name is required';
    } else if (
      formData.contactName.trim().length < 2
    ) {
      newErrors.contactName =
        'Contact name must be at least 2 characters';
    }

    if (!formData.customerLocation.trim()) {
      newErrors.customerLocation =
        'Please select your location';
    }

    /*
     * Important:
     * Registration should have actual GPS coordinates.
     */
    if (
      !Number.isFinite(
        Number(formData.customerLat)
      ) ||
      !Number.isFinite(
        Number(formData.customerLng)
      )
    ) {
      newErrors.customerLocation =
        'Please select a valid current location';
    }

    if (!formData.email.trim()) {
      newErrors.email =
        'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        'Please enter a valid email address';
    }

    const phone =
      formData.phone.replace(/\D/g, '');

    if (!phone) {
      newErrors.phone =
        'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        'Phone number must be exactly 10 digits';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        'Pincode is required';
    } else if (
      !/^\d{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode =
        'Pincode must be exactly 6 digits';
    }

    const referral =
      formData.introducedBy.replace(/\D/g, '');

    if (
      referral &&
      !/^\d{10}$/.test(referral)
    ) {
      newErrors.introducedBy =
        'Referral phone number must be exactly 10 digits';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms =
        'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /*
   * Field validation class
   */
  const getFieldValidationClass = (
    fieldName,
    value
  ) => {
    if (
      value === null ||
      value === undefined
    ) {
      return 'field-pending';
    }

    if (
      typeof value === 'boolean'
    ) {
      return value
        ? 'field-valid'
        : 'field-invalid';
    }

    if (
      Array.isArray(value)
    ) {
      return value.length > 0
        ? 'field-valid'
        : 'field-pending';
    }

    if (
      typeof value === 'string' &&
      !value.trim()
    ) {
      return 'field-pending';
    }

    switch (fieldName) {
      case 'contactName':
        return value.trim().length >= 2
          ? 'field-valid'
          : 'field-invalid';

      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          value
        )
          ? 'field-valid'
          : 'field-invalid';

      case 'phone':
        return /^\d{10}$/.test(
          value.replace(/\D/g, '')
        )
          ? 'field-valid'
          : 'field-invalid';

      case 'pincode':
        return /^\d{6}$/.test(value)
          ? 'field-valid'
          : 'field-invalid';

      case 'customerLocation':
        return value.trim()
          ? 'field-valid'
          : 'field-invalid';

      case 'introducedBy':
        return /^\d{10}$/.test(
          value.replace(/\D/g, '')
        )
          ? 'field-valid'
          : 'field-pending';

      default:
        return 'field-pending';
    }
  };

  /*
   * Image upload API
   *
   * This is done AFTER successful customer
   * registration because registration ID is
   * required by the upload API.
   */
  const uploadImages = async (
    images,
    userType,
    inTownId
  ) => {
    if (
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return [];
    }

    const results = [];

    for (const file of images) {
      const isJpg =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        /\.jpe?g$/i.test(file.name);

      if (!isJpg) {
        continue;
      }

      const uploadFormData =
        new FormData();

      uploadFormData.append(
        'file',
        file
      );

      const uploadUrl =
        `${IMAGE_UPLOAD_URL}` +
        `?userType=${encodeURIComponent(
          userType || 'CUSTOMER'
        )}` +
        `&inTownId=${encodeURIComponent(
          inTownId
        )}`;

      const response = await fetch(
        uploadUrl,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      const data =
        await response.json().catch(
          () => ({})
        );

      if (!response.ok) {
        throw new Error(
          data?.message ||
          `Image upload failed for ${file.name}`
        );
      }

      results.push(data);
    }

    return results;
  };

  /*
   * Build CUSTOMER registration payload
   */
  const buildCustomerPayload = () => {
    const latitude =
      Number(formData.customerLat);

    const longitude =
      Number(formData.customerLng);

    return {
      contactName:
        formData.contactName.trim(),

      phoneNumber:
        formData.phone.replace(/\D/g, ''),

      email:
        formData.email.trim(),

      pincode:
        formData.pincode.trim(),

      address:
        (
          formData.address ||
          formData.customerAddress ||
          formData.customerLocation ||
          ''
        ).trim(),

      introducedBy:
        formData.introducedBy
          .replace(/\D/g, ''),

      acceptedTerms:
        formData.agreeTerms
          ? 'ACCEPTED'
          : 'NOT_ACCEPTED',

      /*
       * These are NOT hardcoded.
       * They come from browser GPS /
       * LocationPicker.
       */
      latitude,
      longitude,

      /*
       * Registration starts without images.
       * Images are uploaded after registration
       * using returned customer ID.
       */
      storeImages: [],

      userType: 'CUSTOMER',
    };
  };

  /*
   * Submit customer registration
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const isValid =
      validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Make sure coordinates are valid
       */
      const latitude =
        Number(formData.customerLat);

      const longitude =
        Number(formData.customerLng);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        throw new Error(
          'Please select your current location before registering.'
        );
      }

      /*
       * Build payload
       */
      const payload =
        buildCustomerPayload();

      /*
       * Debug logs
       */
      console.log(
        '========== CUSTOMER REGISTRATION =========='
      );

      console.log(
        'API:',
        CUSTOMER_API_URL
      );

      console.log(
        'Customer GPS:',
        {
          latitude,
          longitude,
        }
      );

      console.log(
        'Customer Payload:',
        payload
      );

      console.log(
        'Customer Payload JSON:',
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      /*
       * Registration API
       */
      const response =
        await fetch(
          CUSTOMER_API_URL,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
              Accept:
                'application/json',
            },

            body:
              JSON.stringify(payload),
          }
        );

      /*
       * Read response safely
       */
      const responseText =
        await response.text();

      let result = {};

      try {
        result =
          responseText
            ? JSON.parse(responseText)
            : {};
      } catch {
        result = {
          rawResponse:
            responseText,
        };
      }

      console.log(
        'Registration STATUS:',
        response.status
      );

      console.log(
        'Registration RESPONSE:',
        result
      );

      /*
       * Error response
       */
      if (!response.ok) {
        let message =
          result?.message ||
          result?.error ||
          result?.details ||
          result?.rawResponse ||
          `Registration failed (${response.status})`;

        /*
         * Special duplicate handling
         */
        if (
          response.status === 409
        ) {
          message =
            result?.message ||
            result?.error ||
            'Customer with this phone number already exists.';
        }

        throw new Error(message);
      }

      /*
       * Extract registration ID
       *
       * Backend responses can sometimes
       * be wrapped inside body.
       */
      const responseId =
        result?.id ||
        result?.customerId ||
        result?.body?.id ||
        result?.body?.customerId ||
        result?.data?.id ||
        result?.data?.customerId ||
        null;

      console.log(
        'Customer Registration ID:',
        responseId
      );

      /*
       * If API returns success but no ID
       */
      if (!responseId) {
        console.warn(
          'Registration succeeded but customer ID was not found:',
          result
        );

        /*
         * Still show success because
         * backend returned 2xx.
         */
        setShowSuccessModal(true);
        return;
      }

      setRegistrationId(
        responseId
      );

      /*
       * Determine user type
       */
      const responseUserType =
        result?.userType ||
        result?.body?.userType ||
        result?.data?.userType ||
        'CUSTOMER';

      /*
       * Upload customer images AFTER
       * registration succeeds.
       */
      if (
        formData.customerImage.length > 0
      ) {
        try {
          const uploadResults =
            await uploadImages(
              formData.customerImage,
              responseUserType,
              responseId
            );

          console.log(
            'Customer image upload results:',
            uploadResults
          );

          const successfulUploads =
            uploadResults.filter(
              (item) =>
                item?.status ===
                  'Success' ||
                item?.url
            );

          const failedUploads =
            uploadResults.filter(
              (item) =>
                item?.status ===
                'Failed'
            );

          console.log(
            'Successful uploads:',
            successfulUploads
          );

          if (
            failedUploads.length > 0
          ) {
            alert(
              `Registration successful, but ${failedUploads.length} image(s) failed to upload.`
            );
          }
        } catch (uploadError) {
          console.error(
            'Customer image upload error:',
            uploadError
          );

          alert(
            `Customer registration successful, but image upload failed: ${uploadError.message}`
          );
        }
      }

      /*
       * Registration successful
       */
      setShowSuccessModal(true);
    } catch (error) {
      console.error(
        'CUSTOMER REGISTRATION ERROR:',
        error
      );

      alert(
        `Registration failed: ${
          error?.message ||
          'Something went wrong'
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * Reset modal
   */
  const handleClose = () => {
    setFormData({
      ...INITIAL_FORM,
    });

    setErrors({});
    setIsSubmitting(false);
    setIsLocationPickerOpen(false);
    setShowSuccessModal(false);
    setRegistrationId(null);
    setLocationLoading(false);
    setLocationError('');

    onClose();
  };

  /*
   * Success close
   */
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setRegistrationId(null);
    handleClose();
  };

  /*
   * Form validity
   */
  const isFormValid = () => {
    const phone =
      formData.phone.replace(/\D/g, '');

    const hasCoordinates =
      Number.isFinite(
        Number(formData.customerLat)
      ) &&
      Number.isFinite(
        Number(formData.customerLng)
      );

    const referral =
      formData.introducedBy.replace(
        /\D/g,
        ''
      );

    const referralValid =
      referral === '' ||
      /^\d{10}$/.test(referral);

    return (
      formData.contactName.trim()
        .length >= 2 &&

      formData.customerLocation.trim()
        .length > 0 &&

      hasCoordinates &&

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      ) &&

      /^\d{10}$/.test(phone) &&

      /^\d{6}$/.test(
        formData.pincode
      ) &&

      referralValid &&

      formData.agreeTerms
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={handleClose}
      >
        <motion.div
          className="modal-content"
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
            y: 50,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <span className="modal-eyebrow">
                INTOWN LOCAL
              </span>

              <h2 className="modal-title">
                Customer Registration
              </h2>

              <p className="modal-subtitle">
                Discover and connect with
                your local world.
              </p>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form
            className="modal-form"
            onSubmit={handleSubmit}
          >
            {/* Contact Name */}
            <div className="form-group">
              <label htmlFor="customer-contactName">
                Contact Name *
              </label>

              <input
                id="customer-contactName"
                type="text"
                name="contactName"
                value={
                  formData.contactName
                }
                onChange={
                  handleInputChange
                }
                className={
                  errors.contactName
                    ? 'error'
                    : getFieldValidationClass(
                        'contactName',
                        formData.contactName
                      )
                }
                placeholder="Enter your full name"
                autoComplete="name"
              />

              {errors.contactName && (
                <span className="error-message">
                  {errors.contactName}
                </span>
              )}
            </div>

            {/* Customer Location */}
            <div className="form-group">
              <label htmlFor="customer-location">
                Select Customer Location *
              </label>

              <div className="location-input-container">
                <input
                  id="customer-location"
                  type="text"
                  value={
                    formData.customerLocation
                  }
                  readOnly
                  onClick={
                    openLocationPicker
                  }
                  className={`location-input ${
                    errors.customerLocation
                      ? 'error'
                      : getFieldValidationClass(
                          'customerLocation',
                          formData.customerLocation
                        )
                  }`}
                  placeholder={
                    locationLoading
                      ? 'Getting your current location...'
                      : 'Click to select your location'
                  }
                />

                <button
                  type="button"
                  className="location-picker-btn"
                  onClick={
                    openLocationPicker
                  }
                  disabled={
                    locationLoading
                  }
                  title="Select location"
                >
                  {locationLoading
                    ? '⏳'
                    : '📍'}
                </button>
              </div>

              {locationLoading && (
                <div className="location-status">
                  <span className="small-loader" />
                  Detecting your current
                  location...
                </div>
              )}

              {!locationLoading &&
                formData.customerLat !== null &&
                formData.customerLng !== null && (
                  <div className="location-success">
                    ✓ Current location
                    detected
                  </div>
                )}

              {locationError && (
                <div className="location-warning">
                  ⚠ {locationError}
                </div>
              )}

              {formData.customerLat !==
                null &&
                formData.customerLng !==
                  null && (
                  <div className="coordinates">
                    <span>
                      Lat:{' '}
                      {Number(
                        formData.customerLat
                      ).toFixed(6)}
                    </span>

                    <span>
                      Lng:{' '}
                      {Number(
                        formData.customerLng
                      ).toFixed(6)}
                    </span>
                  </div>
                )}

              {errors.customerLocation && (
                <span className="error-message">
                  {
                    errors.customerLocation
                  }
                </span>
              )}

              <button
                type="button"
                className="get-current-location-btn"
                onClick={
                  getCurrentLocation
                }
                disabled={
                  locationLoading
                }
              >
                {locationLoading
                  ? 'Detecting...'
                  : '↻ Use Current Location'}
              </button>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="customer-email">
                Email *
              </label>

              <input
                id="customer-email"
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleInputChange
                }
                className={
                  errors.email
                    ? 'error'
                    : getFieldValidationClass(
                        'email',
                        formData.email
                      )
                }
                placeholder="Enter your email address"
                autoComplete="email"
              />

              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="customer-phone">
                Phone Number *
              </label>

              <div className="phone-wrapper">
                <span className="country-code">
                  +91
                </span>

                <input
                  id="customer-phone"
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleInputChange
                  }
                  className={
                    errors.phone
                      ? 'error'
                      : getFieldValidationClass(
                          'phone',
                          formData.phone
                        )
                  }
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>

              {errors.phone && (
                <span className="error-message">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label htmlFor="customer-pincode">
                Pincode *
              </label>

              <input
                id="customer-pincode"
                type="text"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleInputChange
                }
                className={
                  errors.pincode
                    ? 'error'
                    : getFieldValidationClass(
                        'pincode',
                        formData.pincode
                      )
                }
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                inputMode="numeric"
                autoComplete="postal-code"
              />

              {errors.pincode && (
                <span className="error-message">
                  {errors.pincode}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="customer-address">
                Address
              </label>

              <textarea
                id="customer-address"
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleInputChange
                }
                placeholder="Enter your complete address"
                rows={3}
              />
            </div>

            {/* JPG Upload */}
            <div className="form-group">
              <label htmlFor="customerImageUpload">
                Upload Images
              </label>

              <div className="image-upload-container">
                <input
                  type="file"
                  id="customerImageUpload"
                  name="customerImageUpload"
                  onChange={
                    handleCustomerImageUpload
                  }
                  accept=".jpg,.jpeg,image/jpeg"
                  multiple
                  className="image-upload-input"
                />

                <label
                  htmlFor="customerImageUpload"
                  className="image-upload-label"
                >
                  <span className="upload-icon">
                    📷
                  </span>

                  <span className="upload-text">
                    Click to upload images
                  </span>

                  <span className="upload-hint">
                    JPG / JPEG only
                  </span>
                </label>
              </div>

              {formData.customerImage
                .length > 0 && (
                <div className="uploaded-images">
                  {formData.customerImage.map(
                    (
                      file,
                      index
                    ) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="image-preview"
                      >
                        <img
                          src={URL.createObjectURL(
                            file
                          )}
                          alt={`Preview ${
                            index + 1
                          }`}
                          className="preview-image"
                        />

                        <button
                          type="button"
                          className="remove-image"
                          onClick={() =>
                            removeCustomerImage(
                              index
                            )
                          }
                          aria-label={`Remove ${file.name}`}
                        >
                          ×
                        </button>

                        <span className="image-name">
                          {file.name}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Referred By */}
            <div className="form-group">
              <label htmlFor="customer-introducedBy">
                Referred By{' '}
                <small>
                  (phone number only)
                </small>
              </label>

              <input
                id="customer-introducedBy"
                type="tel"
                name="introducedBy"
                value={
                  formData.introducedBy
                }
                onChange={
                  handleInputChange
                }
                className={
                  errors.introducedBy
                    ? 'error'
                    : getFieldValidationClass(
                        'introducedBy',
                        formData.introducedBy
                      )
                }
                placeholder="Enter referrer's mobile number"
                maxLength={10}
                inputMode="numeric"
              />

              {errors.introducedBy && (
                <span className="error-message">
                  {
                    errors.introducedBy
                  }
                </span>
              )}
            </div>

            {/* Terms */}
            <div
              className={`form-group checkbox-group ${
                errors.agreeTerms
                  ? 'checkbox-error'
                  : ''
              }`}
            >
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={
                    formData.agreeTerms
                  }
                  onChange={
                    handleInputChange
                  }
                />

                <span className="checkmark" />

                <span>
                  I agree to the{' '}
                  <strong>
                    Terms & Conditions
                  </strong>
                </span>
              </label>

              {errors.agreeTerms && (
                <span className="error-message">
                  {errors.agreeTerms}
                </span>
              )}
            </div>

            {/* Terms text */}
            <div className="terms-text">
              <p>
                By registering, you agree
                to our terms of service and
                privacy policy. We will use
                your information to provide
                you with exclusive offers
                and updates from local
                merchants.
              </p>
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <motion.button
                type="button"
                className="btn-secondary"
                onClick={
                  handleClose
                }
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                className={`btn-primary ${
                  !isFormValid()
                    ? 'btn-disabled'
                    : ''
                }`}
                disabled={
                  isSubmitting ||
                  !isFormValid()
                }
                whileHover={
                  isFormValid()
                    ? {
                        scale: 1.03,
                      }
                    : {}
                }
                whileTap={
                  isFormValid()
                    ? {
                        scale: 0.97,
                      }
                    : {}
                }
              >
                {isSubmitting ? (
                  <>
                    <span className="button-loader" />
                    Registering...
                  </>
                ) : (
                  'Register Customer'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Location Picker */}
        <LocationPicker
          isOpen={
            isLocationPickerOpen
          }
          onClose={() =>
            setIsLocationPickerOpen(
              false
            )
          }
          onLocationSelect={
            handleLocationSelect
          }
          currentLocation={
            formData.customerAddress
          }
          currentCoordinates={{
            lat: formData.customerLat,
            lng: formData.customerLng,
          }}
        />

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              className="success-modal-overlay"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={
                handleSuccessModalClose
              }
            >
              <motion.div
                className="success-modal-container"
                initial={{
                  scale: 0.75,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.75,
                  opacity: 0,
                }}
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <div className="success-modal-content">
                  <div className="success-icon">
                    ✓
                  </div>

                  <h3 className="success-title">
                    Registration
                    Successful!
                  </h3>

                  <p className="success-message">
                    Your customer
                    registration has been
                    successfully completed.
                    Welcome to INtown!
                  </p>

                  {registrationId && (
                    <div className="registration-id-display">
                      <p className="id-label">
                        Your Registration
                        ID
                      </p>

                      <p className="id-value">
                        {registrationId}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="success-ok-button"
                    onClick={
                      handleSuccessModalClose
                    }
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalCustomer;