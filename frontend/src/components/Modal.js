import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';
import './GrowthPack.css';
import LocationPicker from './LocationPicker';

const INTOWN_API_BASE = 'https://api.intownlocal.com/IN';
const RAZORPAY_KEY_ID = 'rzp_live_RrNfvARmKIkZ7C';
const GST_RATE = 1.18;

const GROWTH_PACK_PLANS = [
  {
    id: 'START',
    name: 'START',
    basePrice: 499,
    features: [
      { label: 'Lifetime INtown access', included: true },
      { label: 'Store profile', included: true },
      { label: 'Products / services', included: true },
      { label: 'Create offers', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Pick @ store', included: true },
      { label: 'Slot Booking', included: true },
      { label: 'Circle', included: true },
      { label: 'Featured visibility', included: false },
      { label: 'Promotional campaign', included: false },
      { label: 'Promotional creative', included: false },
      { label: 'Social Media promotion', included: false },
      { label: 'Campaign report', included: false },
    ],
  },
  {
    id: 'LAUNCH',
    name: 'LAUNCH',
    basePrice: 999,
    recommended: true,
    features: [
      { label: 'Lifetime INtown access', included: true },
      { label: 'Store profile', included: true },
      { label: 'Products / services', included: true },
      { label: 'Create offers', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Pick @ store', included: true },
      { label: 'Slot Booking', included: true },
      { label: 'Circle', included: true },
      { label: 'Featured visibility', included: true },
      { label: 'Promotional campaign', included: true },
      { label: 'Promotional creative', included: true },
      { label: 'Social Media promotion', included: true },
      { label: 'Campaign report', included: true },
    ],
  },
];

const loadRazorpayWebScript = () => new Promise((resolve) => {
  if (typeof document === 'undefined') return resolve(false);
  if (window.Razorpay) return resolve(true);
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const openRazorpayWeb = (options) => new Promise((resolve, reject) => {
  const RazorpayCtor = window.Razorpay;
  if (!RazorpayCtor) {
    reject(new Error('Razorpay SDK not available'));
    return;
  }
  const rzp = new RazorpayCtor({
    ...options,
    handler: (response) => resolve(response),
    modal: {
      ondismiss: () => reject({ code: 'PAYMENT_CANCELLED', description: 'User cancelled payment' }),
    },
  });
  rzp.on('payment.failed', (resp) => {
    reject(resp?.error || new Error('Payment failed'));
  });
  rzp.open();
});

const Modal = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState({
    // Merchant fields
    businessName: '',
    contactName: '',
    businessCategory: '',
    businessDescription: '',
    yearsInBusiness: '',
    branches: '',
    email: '',
    phone: '',
    pincode: '',
    businessLocation: '',
    businessAddress: '',
    businessLat: null,
    businessLng: null,
    address: '',
    introducedBy: '',
    uploadedImages: [],
    // Customer fields
    customerLocation: '',
    customerAddress: '',
    customerLat: null,
    customerLng: null,
    customerImage: [],
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [locationPickerType, setLocationPickerType] = useState('customer');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [categoryLoadError, setCategoryLoadError] = useState('');
  const [hasOtherProducts, setHasOtherProducts] = useState(false);
  const [otherProducts, setOtherProducts] = useState('');

  // Merchant Growth Pack / joining-fee payment state
  const [selectedPlanId, setSelectedPlanId] = useState('LAUNCH');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  const selectedPlan = GROWTH_PACK_PLANS.find(p => p.id === selectedPlanId) || GROWTH_PACK_PLANS[0];
  const joiningFeeAmount = Math.round(selectedPlan.basePrice * GST_RATE * 100) / 100;
  const canInitiatePayment = (
    !paymentCompleted &&
    !isPaying &&
    formData.businessName.trim().length >= 2 &&
    formData.contactName.trim().length >= 2 &&
    selectedCategoryId !== null
  );

  const handlePayJoiningFee = async () => {
    setPaymentError('');

    const phoneDigits = formData.phone.replace(/\D/g, '');
    const missing = [];
    if (formData.businessName.trim().length < 2) missing.push('Business Name');
    if (formData.contactName.trim().length < 2) missing.push('Contact Name');
    if (!selectedCategoryId) missing.push('Business Category');
    if (formData.businessDescription.trim().length < 2) missing.push('Description');
    if (!formData.yearsInBusiness.trim()) missing.push('Years in Business');
    if (!formData.branches.trim()) missing.push('Branches');
    if (!/^\d{10}$/.test(phoneDigits)) missing.push('Valid 10-digit Phone Number');
    if (!/^\d{6}$/.test(formData.pincode)) missing.push('Valid 6-digit Pincode');
    if (!formData.businessLocation.trim()) missing.push('Business Location');

    if (missing.length > 0) {
      setPaymentError('Please fill: ' + missing.join(', '));
      return;
    }

    setIsPaying(true);
    try {
      // Step 1: Create order via existing backend
      const createOrderRes = await fetch(`${INTOWN_API_BASE}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          mobileNumber: phoneDigits,
          amount: joiningFeeAmount,
          description: 'INtown Merchant Joining Fee',
          notes: {
            type: 'MERCHANT_JOINING',
            plan: selectedPlan.name,
            phoneNumber: String(phoneDigits),
            contactName: String(formData.contactName || ''),
            businessName: String(formData.businessName || ''),
            businessCategory: String(formData.businessCategory || ''),
          },
        }),
      });

      if (!createOrderRes.ok) {
        const errData = await createOrderRes.json().catch(() => ({}));
        throw new Error(errData.message || errData.error || `Order creation failed (${createOrderRes.status})`);
      }

      const orderData = await createOrderRes.json();
      const amountRupees = Number(orderData.amount ?? joiningFeeAmount);
      const amountPaise = Math.round(amountRupees * 100);

      const razorpayOptions = {
        description: 'INtown Merchant Joining Fee',
        image: 'https://intown-prod.s3.ap-south-1.amazonaws.com/logo/intown-logo.png',
        currency: orderData.currency || 'INR',
        key: orderData.keyId || RAZORPAY_KEY_ID,
        amount: String(amountPaise),
        name: 'INtown',
        order_id: orderData.razorpayOrderId,
        prefill: {
          contact: phoneDigits,
          name: formData.contactName,
          email: formData.email || '',
        },
        theme: { color: '#ff6b35' },
      };

      // Step 2: Open Razorpay web checkout
      const ok = await loadRazorpayWebScript();
      if (!ok) throw new Error('Unable to load Razorpay. Please check your internet connection.');
      const paymentResponse = await openRazorpayWeb(razorpayOptions);

      // Step 3: Verify payment via existing backend
      const verifyRes = await fetch(`${INTOWN_API_BASE}/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpaySignature: paymentResponse.razorpay_signature,
          amount: amountPaise,
          mobileNumber: phoneDigits,
        }),
      });

      const verifyData = await verifyRes.json().catch(() => ({}));
      if (!verifyRes.ok || verifyData?.status === 'FAILED') {
        throw new Error(verifyData?.message || 'Payment verification failed');
      }

      setPaymentDetails({
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature,
      });
      setPaymentCompleted(true);
      setPaymentError('');
    } catch (err) {
      console.error('Joining fee payment error:', err);
      setPaymentCompleted(false);
      setPaymentDetails(null);
      setFormData(prev => ({ ...prev, agreeTerms: false }));
      const cancelled = err?.code === 'PAYMENT_CANCELLED' || String(err?.description || '').toLowerCase().includes('cancel');
      setPaymentError(cancelled
        ? 'Payment was cancelled. Please retry to continue registration.'
        : (err?.message || err?.description || 'Payment failed. Please retry to continue registration.'));
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    if (!isOpen || type !== 'merchant' || categories.length) return;

    const loadCategories = async () => {
      setIsCategoriesLoading(true);
      setCategoryLoadError('');
      try {
        const response = await fetch('https://api.intownlocal.com/IN/categories/?forRegistration=true');
        if (!response.ok) throw new Error('Unable to load categories');
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error('Category loading error:', error);
        setCategoryLoadError('Categories could not be loaded. Please try again.');
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [isOpen, type, categories.length]);

  // Generate unique inTownId starting from 100001
  const generateUniqueInTownId = () => {
    // Get the last used ID from localStorage or start from 100000
    const lastId = parseInt(localStorage.getItem('lastInTownId') || '100000', 10);
    const newId = lastId + 1;
    
    // Store the new ID for next time
    localStorage.setItem('lastInTownId', newId.toString());
    
    return newId;
  };

  const validateForm = () => {
    const newErrors = {};

    if (type === 'merchant') {
      // Business Name - at least two letters
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required';
      } else if (formData.businessName.trim().length < 2) {
        newErrors.businessName = 'Business name must be at least 2 letters';
      }

      // Contact Name - at least two letters
      if (!formData.contactName.trim()) {
        newErrors.contactName = 'Contact name is required';
      } else if (formData.contactName.trim().length < 2) {
        newErrors.contactName = 'Contact name must be at least 2 letters';
      }

      // Business Category - at least two letters
      if (!formData.businessCategory.trim()) {
        newErrors.businessCategory = 'Business category is required';
      } else if (formData.businessCategory.trim().length < 2) {
        newErrors.businessCategory = 'Business category must be at least 2 letters';
      }

      // Description of Business - at least two letters
      if (!formData.businessDescription.trim()) {
        newErrors.businessDescription = 'Business description is required';
      } else if (formData.businessDescription.trim().length < 2) {
        newErrors.businessDescription = 'Business description must be at least 2 letters';
      }

      // Years into Business - should not leave empty
      if (!formData.yearsInBusiness.trim()) {
        newErrors.yearsInBusiness = 'Years in business is required';
      }

      // Branches of Business - should not leave empty
      if (!formData.branches.trim()) {
        newErrors.branches = 'Number of branches is required';
      }

      // Email - email should be validated
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone Number - at least 10 numbers
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }

      // Pincode - should be Indian pincode validation (6 digits)
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be exactly 6 digits';
      }

      // Select Business Location - should select the location
      if (!formData.businessLocation.trim()) {
        newErrors.businessLocation = 'Business location is required';
      }

      // Address - optional (no validation needed)

      // Introduced By - optional field (no validation needed)

      // Upload Multi Image - optional (no validation needed)

      // Terms & Conditions - checkbox select mandatory
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
      }
    } else {
      // Customer validation - same validation rules as merchant
      if (!formData.contactName.trim()) {
        newErrors.contactName = 'Contact name is required';
      } else if (formData.contactName.trim().length < 2) {
        newErrors.contactName = 'Contact name must be at least 2 letters';
      }
      if (!formData.customerLocation.trim()) {
        newErrors.customerLocation = 'Customer location is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be exactly 6 digits';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    if (type === 'merchant') {
      return (
        formData.businessName.trim().length >= 2 &&
        formData.contactName.trim().length >= 2 &&
        formData.businessCategory.trim().length >= 2 &&
        formData.businessDescription.trim().length >= 2 &&
        formData.yearsInBusiness.trim() !== '' &&
        formData.branches.trim() !== '' &&
        formData.email.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        /^\d{10}$/.test(formData.phone.replace(/\D/g, '')) &&
        /^\d{6}$/.test(formData.pincode) &&
        formData.businessLocation.trim() !== '' &&
        paymentCompleted &&
        formData.agreeTerms
      );
    } else {
      return (
        formData.contactName.trim().length >= 2 &&
        formData.customerLocation.trim() !== '' &&
        formData.email.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        /^\d{10}$/.test(formData.phone.replace(/\D/g, '')) &&
        /^\d{6}$/.test(formData.pincode) &&
        formData.agreeTerms
      );
    }
  };

  const getFieldValidationClass = (fieldName, fieldValue) => {
    // Handle boolean values (like checkboxes)
    if (typeof fieldValue === 'boolean') {
      return fieldValue ? 'field-valid' : 'field-invalid';
    }

    // Handle string values
    if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
      return 'field-pending';
    }

    switch (fieldName) {
      case 'businessName':
      case 'contactName':
      case 'businessCategory':
      case 'businessDescription':
        return fieldValue.trim().length >= 2 ? 'field-valid' : 'field-invalid';
      
      case 'yearsInBusiness':
      case 'branches':
        return fieldValue.trim() !== '' ? 'field-valid' : 'field-invalid';
      
      case 'introducedBy':
        // Introduced By is optional - show green if user enters any value
        return fieldValue.trim() !== '' ? 'field-valid' : 'field-pending';
      
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue) ? 'field-valid' : 'field-invalid';
      
      case 'phone':
        return /^\d{10}$/.test(fieldValue.replace(/\D/g, '')) ? 'field-valid' : 'field-invalid';
      
      case 'pincode':
        return /^\d{6}$/.test(fieldValue) ? 'field-valid' : 'field-invalid';
      
      case 'businessLocation':
        return fieldValue.trim() !== '' ? 'field-valid' : 'field-invalid';
      
      case 'customerLocation':
        return fieldValue.trim() !== '' ? 'field-valid' : 'field-invalid';
      
      case 'address':
        // Address is optional - show green if user enters any value
        return fieldValue.trim() !== '' ? 'field-valid' : 'field-pending';
      
      case 'uploadedImages':
      case 'customerImage':
        // Image upload fields are optional - show green if files are selected
        return Array.isArray(fieldValue) && fieldValue.length > 0 ? 'field-valid' : 'field-pending';
      
      case 'agreeTerms':
        return fieldValue ? 'field-valid' : 'field-invalid';
      
      default:
        return 'field-pending';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for specific fields
    if (name === 'phone') {
      // Remove non-numeric characters for phone validation
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length > 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue.slice(0, 10)
        }));
      }
    }

    if (name === 'pincode') {
      // Remove non-numeric characters for pincode validation
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length > 6) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue.slice(0, 6)
        }));
      }
    }

    if (type === 'customer' && name === 'introducedBy') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    }
  };

  const selectCategory = async (category) => {
    if (selectedCategoryId === category.id) return;

    setSelectedCategoryId(category.id);
    setSelectedProductIds([]);
    setProducts([]);
    setHasOtherProducts(false);
    setOtherProducts('');
    setFormData(prev => ({ ...prev, businessCategory: category.name }));
    setErrors(prev => ({ ...prev, businessCategory: '' }));
    setIsProductsLoading(true);

    try {
      const response = await fetch(`https://api.intownlocal.com/IN/products/?categoryId=${category.id}`);
      if (!response.ok) throw new Error('Unable to load products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error('Product loading error:', error);
      setProducts([]);
    } finally {
      setIsProductsLoading(false);
      setIsProductsOpen(true);
    }
  };

  const toggleProduct = (productId) => {
    setSelectedProductIds(prev => (
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    ));
  };

  const removeSelectedProduct = (productId) => {
    setSelectedProductIds(prev => prev.filter(id => id !== productId));
  };

  const filteredCategories = categories.filter(category => (
    category.name?.toLowerCase().includes(categorySearch.trim().toLowerCase())
  ));
  const visibleCategories = showAllCategories ? filteredCategories : filteredCategories.slice(0, 9);
  const customProducts = hasOtherProducts
    ? otherProducts.split(',').map(name => name.trim()).filter(Boolean).map((name, index) => ({
      id: `custom-${index}-${name}`,
      name
    }))
    : [];
  const availableProducts = [...products, ...customProducts];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (file.type.startsWith('image/jpeg') || file.type.startsWith('image/jpg')) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`The following files are not JPG images and will be ignored: ${invalidFiles.join(', ')}`);
    }

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        uploadedImages: [...prev.uploadedImages, ...validFiles]
      }));
    }
  };

  const handleCustomerImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (file.type.startsWith('image/jpeg') || file.type.startsWith('image/jpg')) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`The following files are not JPG images and will be ignored: ${invalidFiles.join(', ')}`);
    }

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        customerImage: [...prev.customerImage, ...validFiles]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index)
    }));
  };

  const removeCustomerImage = (index) => {
    setFormData(prev => ({
      ...prev,
      customerImage: prev.customerImage.filter((_, i) => i !== index)
    }));
  };

  const handleLocationSelect = (locationData) => {
    console.log('Location data received:', locationData);
    
    if (locationPickerType === 'customer') {
      setFormData(prev => ({
        ...prev,
        customerLocation: locationData.displayText,
        customerAddress: locationData.address,
        customerLat: locationData.lat,
        customerLng: locationData.lng
      }));
      
      // Clear error if exists
      if (errors.customerLocation) {
        setErrors(prev => ({
          ...prev,
          customerLocation: ''
        }));
      }
    } else if (locationPickerType === 'merchant') {
      setFormData(prev => ({
        ...prev,
        businessLocation: locationData.displayText,
        businessAddress: locationData.address,
        address: prev.address || locationData.address,
        businessLat: locationData.lat,
        businessLng: locationData.lng
      }));
      
      console.log('Updated merchant location:', {
        businessLocation: locationData.displayText,
        businessLat: locationData.lat,
        businessLng: locationData.lng
      });
      
      // Clear error if exists
      if (errors.businessLocation) {
        setErrors(prev => ({
          ...prev,
          businessLocation: ''
        }));
      }
    }
  };

  const openLocationPicker = (pickerType) => {
    setLocationPickerType(pickerType);
    setIsLocationPickerOpen(true);
  };

  const uploadImages = async (images, userType, currentInTownId) => {
    const uploadPromises = images.map(async (file) => {
      // Validate file type
      if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/jpg')) {
        throw new Error(`File ${file.name} is not a JPG image. Only JPG images are accepted.`);
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `http://in-town-dev.eba-czzrpn3v.eu-north-1.elasticbeanstalk.com/in-town/v1/s3/upload?userType=${userType}&inTownId=${currentInTownId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`);
      }

      return response.json();
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (type === 'merchant' && (!paymentCompleted || !paymentDetails?.razorpayPaymentId)) {
      setPaymentError('Please pay the joining fee before completing registration.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload for registration (without ID as per requirement)
      const payload = type === 'merchant' ? { 
        storeImages: [], // Start with empty array, will be updated after successful registration
        userType: 'MERCHANT',
        // Map form data to API expected fields
        businessName: formData.businessName,
        contactName: formData.contactName,
        address: formData.address,
        shopName: formData.businessName, // Using businessName as shopName
        phoneNumber: formData.phone.replace(/\D/g, ''),
        email: formData.email,
        pincode: formData.pincode,
        businessCategory: formData.businessCategory,
        categoryList: selectedCategoryId ? [selectedCategoryId] : [],
        productIds: selectedProductIds.map(id => String(id)),
        productNames: availableProducts
          .filter(product => selectedProductIds.includes(product.id))
          .map(product => product.name),
        description: formData.businessDescription,
        fromYears: formData.yearsInBusiness,
        branchesOfBusiness: formData.branches,
        acceptedTerms: formData.agreeTerms ? 'ACCEPTED' : 'NOT_ACCEPTED',
        longitude: parseFloat(formData.businessLng) || 0,
        latitude: parseFloat(formData.businessLat) || 0,
        // Growth Pack joining-fee payment
        growthPack: selectedPlan.name,
        joiningFee: joiningFeeAmount,
        joiningFeePaid: true,
        razorpayPaymentId: paymentDetails?.razorpayPaymentId,
        razorpayOrderId: paymentDetails?.razorpayOrderId,
        razorpaySignature: paymentDetails?.razorpaySignature
      } : {
        // Customer registration payload - only required fields
        contactName: formData.contactName,
        phoneNumber: formData.phone.replace(/\D/g, ''),
        email: formData.email,
        pincode: formData.pincode,
        address: formData.address,
        introducedBy: formData.introducedBy,
        acceptedTerms: formData.agreeTerms ? 'ACCEPTED' : 'NOT_ACCEPTED',
        longitude: parseFloat(formData.customerLng) || 0,
        latitude: parseFloat(formData.customerLat) || 0,
        storeImages: [], // Start with empty array, will be updated after successful registration
        userType: 'CUSTOMER'
      };

      // Log payload for debugging
      console.log('Registration payload:', payload);
      console.log('Payload JSON string:', JSON.stringify(payload, null, 2));
      console.log('Form data coordinates:', {
        businessLat: formData.businessLat,
        businessLng: formData.businessLng,
        customerLat: formData.customerLat,
        customerLng: formData.customerLng
      });

      // Determine the API endpoint based on type
      const apiEndpoint = type === 'merchant' 
        ? 'http://api.intownlocal.com/IN/merchant/'
        : 'http://api.intownlocal.com/IN/customer/';

      // Call the registration API
      const response = await fetch(
        apiEndpoint,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Registration API Status:", response.status);
      console.log("Registration API Response:", result);

      if (response.ok) {
        // Extract ID from response
        const responseId = result.id || result.body?.id || null;
        console.log('Registration ID:', responseId);
        
        if (result.statusCode === "CONFLICT" || result.statusCodeValue === 409) {
          alert(result.body || 'Phone number already exists.');
          return;
        } else if (responseId) {
          // Registration successful with ID
          setRegistrationId(responseId);
          
          // Extract userType and currentTownId from registration response
          const responseUserType = result.userType || result.body?.userType;
          const responseCurrentTownId = responseId;
          
          console.log('Response userType:', responseUserType);
          console.log('Response currentTownId:', responseCurrentTownId);
          
          // Upload images if there are any (for both merchant and customer registration)
          if (type === 'merchant' && formData.uploadedImages.length > 0) {
            try {
              const uploadResults = await uploadImages(formData.uploadedImages, responseUserType, responseCurrentTownId);
              console.log('Upload results:', uploadResults);
              
              // Extract successful uploads
              const uploadedImageUrls = uploadResults
                .filter(result => result.status === 'Success')
                .map(result => result.url);
              
              // Check if any uploads failed
              const failedUploads = uploadResults.filter(result => result.status === 'Failed');
              if (failedUploads.length > 0) {
                console.warn('Some images failed to upload:', failedUploads);
                alert(`${failedUploads.length} image(s) failed to upload. The registration was successful with ${uploadedImageUrls.length} successful uploads.`);
              }
              
              console.log('Uploaded URLs:', uploadedImageUrls);
            } catch (uploadError) {
              console.error('Image upload error:', uploadError);
              alert(`Registration successful but image upload failed: ${uploadError.message}`);
            }
          } else if (type === 'customer' && formData.customerImage.length > 0) {
            try {
              const uploadResults = await uploadImages(formData.customerImage, responseUserType, responseCurrentTownId);
              console.log('Customer upload results:', uploadResults);
              
              // Extract successful uploads
              const uploadedImageUrls = uploadResults
                .filter(result => result.status === 'Success')
                .map(result => result.url);
              
              // Check if any uploads failed
              const failedUploads = uploadResults.filter(result => result.status === 'Failed');
              if (failedUploads.length > 0) {
                console.warn('Some customer images failed to upload:', failedUploads);
                alert(`${failedUploads.length} image(s) failed to upload. The registration was successful with ${uploadedImageUrls.length} successful uploads.`);
              }
              
              console.log('Customer uploaded URLs:', uploadedImageUrls);
            } catch (uploadError) {
              console.error('Customer image upload error:', uploadError);
              alert(`Registration successful but image upload failed: ${uploadError.message}`);
            }
          }
          
          // Show success modal for both merchant and customer
          setShowSuccessModal(true);
        } else {
          throw new Error('Registration completed but no ID returned');
        }
      } else {
        let errorMessage = 'Registration failed';
        try {
          errorMessage = result.message || result.error || `Server error: ${response.status}`;
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
          errorMessage = `Server error: ${response.status} - ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      // Merchant fields
      businessName: '',
      contactName: '',
      businessCategory: '',
      businessDescription: '',
      yearsInBusiness: '',
      branches: '',
      email: '',
      phone: '',
      pincode: '',
      businessLocation: '',
      businessAddress: '',
      businessLat: null,
      businessLng: null,
      address: '',
      introducedBy: '',
      uploadedImages: [],
      // Customer fields
      customerLocation: '',
      customerAddress: '',
      customerLat: null,
      customerLng: null,
      customerImage: [],
      agreeTerms: false
    });
    setErrors({});
    setIsLocationPickerOpen(false);
    setIsProductsOpen(false);
    setCategorySearch('');
    setShowAllCategories(false);
    setSelectedCategoryId(null);
    setProducts([]);
    setSelectedProductIds([]);
    setHasOtherProducts(false);
    setOtherProducts('');
    setShowSuccessModal(false);
    setSelectedPlanId('LAUNCH');
    setPaymentCompleted(false);
    setIsPaying(false);
    setPaymentError('');
    setPaymentDetails(null);
    onClose();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setRegistrationId(null); // Reset registration ID
    handleClose(); // This will close the main modal and reset form
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">
              {type === 'merchant' ? 'Merchant Registration' : 'Customer Registration'}
            </h2>
            <button className="modal-close" onClick={handleClose}>
              ×
            </button>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            {type === 'customer' && (
              <>
                <div className="form-group">
                  <label htmlFor="contactName">Contact Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={errors.contactName ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.contactName && <span className="error-message">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="customerLocation">Select Customer Location *</label>
                  <div className="location-input-container">
                    <input
                      type="text"
                      id="customerLocation"
                      name="customerLocation"
                      value={formData.customerLocation}
                      readOnly
                      className={`location-input ${errors.customerLocation ? 'error' : ''} ${getFieldValidationClass('customerLocation', formData.customerLocation)}`}
                      placeholder="Click to select your location on map"
                      onClick={() => openLocationPicker('customer')}
                    />
                    <button
                      type="button"
                      className="location-picker-btn"
                      onClick={() => openLocationPicker('customer')}
                    >
                      🗺️
                    </button>
                  </div>
                  {errors.customerLocation && <span className="error-message">{errors.customerLocation}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${errors.email ? 'error' : ''} ${getFieldValidationClass('email', formData.email)}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${errors.phone ? 'error' : ''} ${getFieldValidationClass('phone', formData.phone)}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`${errors.pincode ? 'error' : ''} ${getFieldValidationClass('pincode', formData.pincode)}`}
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerImageUpload">Upload Images</label>
                  <div className={`image-upload-container ${getFieldValidationClass('customerImage', formData.customerImage)}`}>
                    <input
                      type="file"
                      id="customerImageUpload"
                      name="customerImageUpload"
                      onChange={handleCustomerImageUpload}
                      accept="image/jpeg,image/jpg"
                      multiple
                      className="image-upload-input"
                    />
                    <label htmlFor="customerImageUpload" className="image-upload-label">
                      <span className="upload-icon">📷</span>
                      <span className="upload-text">Click to upload images</span>
                      <span className="upload-hint">(JPG images only)</span>
                    </label>
                  </div>
                  
                  {formData.customerImage.length > 0 && (
                    <div className="uploaded-images">
                      {formData.customerImage.map((file, index) => (
                        <div key={index} className="image-preview">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index + 1}`}
                            className="preview-image"
                          />
                          <button 
                            type="button" 
                            className="remove-image"
                            onClick={() => removeCustomerImage(index)}
                          >
                            ×
                          </button>
                          <span className="image-name">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="introducedBy">Referred By <small>(phone number only)</small></label>
                  <input
                    type="tel"
                    id="introducedBy"
                    name="introducedBy"
                    value={formData.introducedBy}
                    onChange={handleInputChange}
                    className={getFieldValidationClass('introducedBy', formData.introducedBy)}
                    placeholder="Enter referrer's 10-digit mobile number"
                    inputMode="numeric"
                    maxLength="10"
                  />
                </div>
              </>
            )}

            {type === 'merchant' && (
              <>
                <div className="form-group">
                  <label htmlFor="businessName">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={`${errors.businessName ? 'error' : ''} ${getFieldValidationClass('businessName', formData.businessName)}`}
                  placeholder="Enter your business name"
                />
                  {errors.businessName && <span className="error-message">{errors.businessName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactName">Contact Name *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`${errors.contactName ? 'error' : ''} ${getFieldValidationClass('contactName', formData.contactName)}`}
                  placeholder="Enter contact person name"
                />
                  {errors.contactName && <span className="error-message">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="businessCategory">Business Category *</label>
                  <input
                    type="search"
                    id="businessCategory"
                    value={categorySearch}
                    onChange={(event) => {
                      setCategorySearch(event.target.value);
                      setShowAllCategories(false);
                    }}
                    className={errors.businessCategory ? 'error' : ''}
                    placeholder="Search categories..."
                    autoComplete="off"
                  />
                  {errors.businessCategory && <span className="error-message">{errors.businessCategory}</span>}
                  {isCategoriesLoading && <span className="category-status">Loading categories...</span>}
                  {categoryLoadError && <span className="error-message">{categoryLoadError}</span>}
                  {!isCategoriesLoading && !categoryLoadError && (
                    <>
                      <div className="category-grid">
                        {visibleCategories.map(category => (
                          <button
                            type="button"
                            className={`category-card ${selectedCategoryId === category.id ? 'category-card-selected' : ''}`}
                            key={category.id}
                            onClick={() => selectCategory(category)}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                      {!visibleCategories.length && (
                        <span className="category-status">No categories found.</span>
                      )}
                      {filteredCategories.length > 9 && (
                        <button
                          type="button"
                          className="show-categories-button"
                          onClick={() => setShowAllCategories(prev => !prev)}
                        >
                          {showAllCategories ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {selectedCategoryId && (
                  <div className="merchant-products-section">
                    <button
                      type="button"
                      className="select-products-button"
                      onClick={() => setIsProductsOpen(true)}
                    >
                      {selectedProductIds.length ? 'Edit Products' : 'Select Products'}
                      {selectedProductIds.length > 0 && <span>{selectedProductIds.length}</span>}
                    </button>

                    {selectedProductIds.length > 0 && (
                      <div className="selected-products">
                        <p>Selected Products</p>
                        <div className="selected-product-list">
                          {availableProducts
                            .filter(product => selectedProductIds.includes(product.id))
                            .map(product => (
                              <button
                                type="button"
                                className="selected-product-chip"
                                key={product.id}
                                onClick={() => removeSelectedProduct(product.id)}
                                aria-label={`Remove ${product.name}`}
                              >
                                {product.name}<span aria-hidden="true">×</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="businessDescription">Description of Business *</label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  className={`${errors.businessDescription ? 'error' : ''} ${getFieldValidationClass('businessDescription', formData.businessDescription)}`}
                  rows="4"
                  placeholder="Describe your business in detail..."
                />
                  {errors.businessDescription && <span className="error-message">{errors.businessDescription}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="yearsInBusiness">Years into Business *</label>
                <input
                  type="text"
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  className={`${errors.yearsInBusiness ? 'error' : ''} ${getFieldValidationClass('yearsInBusiness', formData.yearsInBusiness)}`}
                  placeholder="Enter years in business (e.g., 5 years)"
                />
                  {errors.yearsInBusiness && <span className="error-message">{errors.yearsInBusiness}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="branches">Branches of Business *</label>
                <input
                  type="text"
                  id="branches"
                  name="branches"
                  value={formData.branches}
                  onChange={handleInputChange}
                  className={`${errors.branches ? 'error' : ''} ${getFieldValidationClass('branches', formData.branches)}`}
                  placeholder="Enter number of branches (e.g., 3 branches)"
                />
                  {errors.branches && <span className="error-message">{errors.branches}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${errors.email ? 'error' : ''} ${getFieldValidationClass('email', formData.email)}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${errors.phone ? 'error' : ''} ${getFieldValidationClass('phone', formData.phone)}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`${errors.pincode ? 'error' : ''} ${getFieldValidationClass('pincode', formData.pincode)}`}
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="businessLocation">Select Business Location *</label>
                  <div className="location-input-container">
                    <input
                      type="text"
                      id="businessLocation"
                      name="businessLocation"
                      value={formData.businessLocation}
                      readOnly
                      className={`location-input ${errors.businessLocation ? 'error' : ''} ${getFieldValidationClass('businessLocation', formData.businessLocation)}`}
                      placeholder="Click to select your business location on map"
                      onClick={() => openLocationPicker('merchant')}
                    />
                    <button
                      type="button"
                      className="location-picker-btn"
                      onClick={() => openLocationPicker('merchant')}
                    >
                      🗺️
                    </button>
                  </div>
                  {errors.businessLocation && <span className="error-message">{errors.businessLocation}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`${errors.address ? 'error' : ''} ${getFieldValidationClass('address', formData.address)}`}
                    rows="3"
                    placeholder="Enter complete business address..."
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="introducedBy">Introduced By</label>
                  <input
                    type="text"
                    id="introducedBy"
                    name="introducedBy"
                    value={formData.introducedBy}
                    onChange={handleInputChange}
                    className={`${errors.introducedBy ? 'error' : ''} ${getFieldValidationClass('introducedBy', formData.introducedBy)}`}
                    placeholder="How did you hear about InTown?"
                  />
                  {errors.introducedBy && <span className="error-message">{errors.introducedBy}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="imageUpload">Upload Multi Image</label>
                  <div className={`image-upload-container ${getFieldValidationClass('uploadedImages', formData.uploadedImages)}`}>
                    <input
                      type="file"
                      id="imageUpload"
                      name="imageUpload"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/jpeg,image/jpg"
                      className="image-upload-input"
                    />
                    <label htmlFor="imageUpload" className="image-upload-label">
                      <span className="upload-icon">📷</span>
                      <span className="upload-text">Click to upload images</span>
                      <span className="upload-hint">(Multiple JPG images allowed)</span>
                    </label>
                  </div>
                  
                  {formData.uploadedImages.length > 0 && (
                    <div className="uploaded-images">
                      {formData.uploadedImages.map((file, index) => (
                        <div key={index} className="image-preview">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index + 1}`}
                            className="preview-image"
                          />
                          <button 
                            type="button" 
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                          <span className="image-name">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="growth-pack" data-testid="merchant-growth-pack">
                  <div className="growth-pack-header">
                    <span className="growth-pack-rocket" aria-hidden="true">🚀</span>
                    <h3>Merchant Growth Pack</h3>
                  </div>
                  <p className="growth-pack-subtitle">
                    Choose the pack that fits your business. Both are one-time — no monthly fees.
                  </p>

                  <div className="growth-plans">
                    {GROWTH_PACK_PLANS.map(plan => {
                      const isSelected = selectedPlanId === plan.id;
                      return (
                        <button
                          type="button"
                          key={plan.id}
                          className={`plan-card ${isSelected ? 'plan-card-selected' : ''} ${paymentCompleted ? 'plan-card-disabled' : ''}`}
                          onClick={() => !paymentCompleted && setSelectedPlanId(plan.id)}
                          disabled={paymentCompleted}
                          data-testid={`plan-card-${plan.id.toLowerCase()}`}
                        >
                          {plan.recommended && (
                            <span className="plan-recommended-badge">★ RECOMMENDED</span>
                          )}
                          <div className="plan-header-row">
                            <span className={`plan-radio ${isSelected ? 'plan-radio-on' : ''}`}>
                              {isSelected && <span className="plan-radio-inner" />}
                            </span>
                            <span className="plan-name">{plan.name}</span>
                          </div>
                          <div className="plan-price-row">
                            <span className="plan-currency">₹</span>
                            <span className="plan-price">{plan.basePrice}</span>
                            <span className="plan-price-suffix">+ GST</span>
                          </div>
                          <div className="plan-price-final">
                            You pay ₹{(plan.basePrice * GST_RATE).toFixed(2)}
                          </div>
                          <div className="plan-divider" />
                          <ul className="plan-features">
                            {plan.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className={`plan-feature ${feature.included ? 'included' : 'excluded'}`}
                              >
                                <span className="plan-feature-icon" aria-hidden="true">
                                  {feature.included ? '✓' : '✕'}
                                </span>
                                <span className="plan-feature-label">{feature.label}</span>
                              </li>
                            ))}
                          </ul>
                          {isSelected && !paymentCompleted && (
                            <span className="plan-selected-tag">✓ Selected</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="joining-fee-card" data-testid="merchant-joining-fee-card">
                    {!paymentCompleted ? (
                      <button
                        type="button"
                        className={`pay-fee-btn ${(!canInitiatePayment || isPaying) ? 'pay-fee-btn-disabled' : ''}`}
                        onClick={handlePayJoiningFee}
                        disabled={!canInitiatePayment || isPaying}
                        data-testid="pay-joining-fee-btn"
                      >
                        <span aria-hidden="true">🔒</span>
                        {isPaying
                          ? 'Processing…'
                          : `Pay ${selectedPlan.name} ₹${selectedPlan.basePrice}/- + GST`}
                      </button>
                    ) : (
                      <div className="payment-received-banner" data-testid="payment-received-banner">
                        <span aria-hidden="true">✅</span>
                        {selectedPlan.name} pack activated — payment received successfully
                      </div>
                    )}

                    {!!paymentError && !paymentCompleted && (
                      <div className="payment-error-banner" data-testid="payment-error-banner">
                        <span aria-hidden="true">⚠️</span>
                        {paymentError}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}


            <div className={`form-group checkbox-group ${getFieldValidationClass('agreeTerms', formData.agreeTerms)} ${type === 'merchant' && !paymentCompleted ? 'checkbox-group-locked' : ''}`}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  disabled={type === 'merchant' && !paymentCompleted}
                  data-testid="agree-terms-checkbox"
                />
                <span className="checkmark"></span>
                I agree to the Terms & Conditions below.
              </label>
              {type === 'merchant' && !paymentCompleted && (
                <span className="terms-lock-hint" data-testid="terms-lock-hint">
                  Complete the joining fee payment to enable this checkbox.
                </span>
              )}
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
            </div>

            <div className="terms-text">
              <p>
                {type === 'merchant' 
                  ? "Stores joining our platform must be legally registered and agree to provide exclusive discounts to customers. They must maintain accurate pricing, ensure smooth transactions, and honor all agreed discounts. Stores may participate in platform promotions while adhering to branding guidelines. Compliance with consumer laws is mandatory, and fraudulent practices will lead to immediate removal. Either party can terminate the partnership with prior notice, ensuring all obligations are settled before exit. Customer complaints must be addressed promptly, and confidential data must be protected in line with privacy regulations."
                  : "By registering, you agree to our terms of service and privacy policy. We will use your information to provide you with exclusive offers and updates from local merchants. You can unsubscribe at any time."
                }
              </p>
            </div>

            <div className="form-actions">
              <motion.button
                type="button"
                className="btn-secondary"
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className={`btn-primary ${!isFormValid() ? 'btn-disabled' : ''}`}
                disabled={isSubmitting || !isFormValid()}
                whileHover={isFormValid() ? { scale: 1.05 } : {}}
                whileTap={isFormValid() ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? 'Registering...' : `Register ${type === 'merchant' ? 'Merchant' : 'Customer'}`}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {isProductsOpen && type === 'merchant' && (
          <div className="product-picker-overlay" onClick={() => setIsProductsOpen(false)}>
            <div className="product-picker" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Select products">
              <div className="product-picker-header">
                <h3>Select Products ({formData.businessCategory})</h3>
                <button type="button" onClick={() => setIsProductsOpen(false)} aria-label="Close product selection">×</button>
              </div>

              {isProductsLoading ? (
                <p className="category-status">Loading products...</p>
              ) : (
                <div className="product-picker-list">
                  {availableProducts.map(product => (
                    <label className="product-option" key={product.id}>
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => toggleProduct(product.id)}
                      />
                      <span>{product.name}</span>
                    </label>
                  ))}
                  {!availableProducts.length && <p className="category-status">No products are available for this category.</p>}
                </div>
              )}

              <label className="other-products-toggle">
                <input
                  type="checkbox"
                  checked={hasOtherProducts}
                  onChange={(event) => {
                    setHasOtherProducts(event.target.checked);
                    if (!event.target.checked) {
                      setOtherProducts('');
                      setSelectedProductIds(prev => prev.filter(id => !String(id).startsWith('custom-')));
                    }
                  }}
                />
                Add other products
              </label>
              {hasOtherProducts && (
                <input
                  className="other-products-input"
                  type="text"
                  value={otherProducts}
                  onChange={(event) => {
                    setOtherProducts(event.target.value);
                    setSelectedProductIds(prev => prev.filter(id => !String(id).startsWith('custom-')));
                  }}
                  placeholder="Enter products separated by commas"
                />
              )}

              <div className="product-picker-actions">
                <button type="button" className="product-cancel" onClick={() => setIsProductsOpen(false)}>Cancel</button>
                <button type="button" className="product-confirm" onClick={() => setIsProductsOpen(false)}>OK</button>
              </div>
            </div>
          </div>
        )}

        {/* Location Picker */}
        <LocationPicker
          isOpen={isLocationPickerOpen}
          onClose={() => setIsLocationPickerOpen(false)}
          onLocationSelect={handleLocationSelect}
          currentLocation={locationPickerType === 'customer' ? formData.customerAddress : formData.businessAddress}
          currentCoordinates={locationPickerType === 'customer'
            ? { lat: formData.customerLat, lng: formData.customerLng }
            : { lat: formData.businessLat, lng: formData.businessLng }}
        />

        {/* Success Modal */}
        {showSuccessModal && (
          <motion.div 
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSuccessModalClose}
          >
            <motion.div 
              className="success-modal-container"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="success-modal-content">
                <h3 className="success-title">Registration Successful!</h3>
                <p className="success-message">
                  Your {type === 'merchant' ? 'merchant' : 'customer'} registration is successfully completed. Welcome to InTown!
                </p>
                {registrationId && (
                  <div className="registration-id-display">
                    <p className="id-label">Your Registration ID:</p>
                    <p className="id-value">{registrationId}</p>
                  </div>
                )}
                <button 
                  className="success-ok-button"
                  onClick={handleSuccessModalClose}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
