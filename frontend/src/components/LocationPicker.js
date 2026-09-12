// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./LocationPicker.css";

// const LocationPicker = ({
//   isOpen,
//   onClose,
//   onLocationSelect,
//   currentLocation = "",
//   currentCoordinates = null,
// }) => {
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerInstance = useRef(null);
//   const autocompleteRef = useRef(null);
//   const autocompleteListenerRef = useRef(null);

//   const [searchValue, setSearchValue] = useState(currentLocation);
//   const [selectedLocation, setSelectedLocation] = useState(currentLocation);
//   const [coordinates, setCoordinates] = useState(null);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [mapLoading, setMapLoading] = useState(false);
//   const [locationError, setLocationError] = useState("");

//   const hasValidCoordinates = (coords) => {
//     return (
//       coords &&
//       Number.isFinite(Number(coords.lat)) &&
//       Number.isFinite(Number(coords.lng))
//     );
//   };

//   const getAddressFromCoordinates = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
//         {
          
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Unable to fetch address");
//       }

//       const data = await response.json();

//       return data.display_name || "Selected location";
//     } catch (error) {
//       console.error("Reverse geocoding error:", error);
//       return "Selected location";
//     }
//   };

//   const createMarker = (position) => {
//     if (!mapInstance.current || !window.google?.maps) {
//       return;
//     }

//     if (markerInstance.current) {
//       markerInstance.current.setMap(null);
//       markerInstance.current = null;
//     }

//     const marker = new window.google.maps.Marker({
//       position,
//       map: mapInstance.current,
//       draggable: true,
//       title: "Selected location",
//       animation: window.google.maps.Animation.DROP,
//     });

//     marker.addListener("dragend", async (event) => {
//       if (!event.latLng) return;

//       const lat = event.latLng.lat();
//       const lng = event.latLng.lng();

//       await selectCoordinates(lat, lng);
//     });

//     markerInstance.current = marker;
//   };

//   const selectCoordinates = async (lat, lng, address = "") => {
//     const nextCoordinates = {
//       lat: Number(lat),
//       lng: Number(lng),
//     };

//     if (
//       !Number.isFinite(nextCoordinates.lat) ||
//       !Number.isFinite(nextCoordinates.lng)
//     ) {
//       return;
//     }

//     setLocationError("");
//     setCoordinates(nextCoordinates);

//     let finalAddress = address;

//     if (!finalAddress) {
//       finalAddress = await getAddressFromCoordinates(
//         nextCoordinates.lat,
//         nextCoordinates.lng
//       );
//     }

//     setSelectedLocation(finalAddress);
//     setSearchValue(finalAddress);

//     if (mapInstance.current) {
//       mapInstance.current.panTo(nextCoordinates);
//       mapInstance.current.setZoom(17);
//     }

//     createMarker(nextCoordinates);
//   };

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError(
//         "Your browser does not support location services."
//       );
//       return;
//     }

//     setLocationLoading(true);
//     setLocationError("");

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;

//           await selectCoordinates(lat, lng);
//         } catch (error) {
//           console.error("Current location error:", error);
//           setLocationError(
//             "Unable to read your current location."
//           );
//         } finally {
//           setLocationLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error);

//         setLocationLoading(false);

//         if (error.code === error.PERMISSION_DENIED) {
//           setLocationError(
//             "Please allow location permission in your browser."
//           );
//         } else if (error.code === error.POSITION_UNAVAILABLE) {
//           setLocationError(
//             "Your current location is unavailable."
//           );
//         } else if (error.code === error.TIMEOUT) {
//           setLocationError(
//             "Location request timed out. Please try again."
//           );
//         } else {
//           setLocationError(
//             "Unable to get your current location."
//           );
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0,
//       }
//     );
//   };

//   const initializeAutocomplete = () => {
//     if (
//       !window.google?.maps?.places ||
//       autocompleteRef.current
//     ) {
//       return;
//     }

//     const input = document.getElementById(
//       "customer-location-search"
//     );

//     if (!input) return;

//     autocompleteRef.current =
//       new window.google.maps.places.Autocomplete(input, {
//         componentRestrictions: {
//           country: "in",
//         },
//         fields: [
//           "formatted_address",
//           "geometry",
//           "name",
//         ],
//         types: ["geocode"],
//       });

//     autocompleteListenerRef.current =
//       autocompleteRef.current.addListener(
//         "place_changed",
//         async () => {
//           const place =
//             autocompleteRef.current.getPlace();

//           if (
//             !place ||
//             !place.geometry ||
//             !place.geometry.location
//           ) {
//             return;
//           }

//           const lat =
//             place.geometry.location.lat();

//           const lng =
//             place.geometry.location.lng();

//           const address =
//             place.formatted_address ||
//             place.name ||
//             "Selected location";

//           await selectCoordinates(
//             lat,
//             lng,
//             address
//           );
//         }
//       );
//   };

//   const initializeMap = (initialCoordinates) => {
//     if (
//       !mapRef.current ||
//       !window.google?.maps ||
//       !initialCoordinates ||
//       mapInstance.current
//     ) {
//       return false;
//     }

//     const position = {
//       lat: Number(initialCoordinates.lat),
//       lng: Number(initialCoordinates.lng),
//     };

//     if (
//       !Number.isFinite(position.lat) ||
//       !Number.isFinite(position.lng)
//     ) {
//       return false;
//     }

//     setMapLoading(true);

//     mapInstance.current =
//       new window.google.maps.Map(
//         mapRef.current,
//         {
//           center: position,
//           zoom: 17,
//           mapTypeControl: false,
//           streetViewControl: false,
//           fullscreenControl: true,
//           zoomControl: true,
//           clickableIcons: false,
//           gestureHandling: "greedy",
//           mapTypeId: "roadmap",
//         }
//       );

//     createMarker(position);

//     mapInstance.current.addListener(
//       "click",
//       async (event) => {
//         if (!event.latLng) return;

//         const lat = event.latLng.lat();
//         const lng = event.latLng.lng();

//         await selectCoordinates(lat, lng);
//       }
//     );

//     setMapLoaded(true);
//     setMapLoading(false);

//     setTimeout(() => {
//       initializeAutocomplete();
//     }, 200);

//     return true;
//   };

//   useEffect(() => {
//     if (!isOpen) return;

//     setSearchValue(currentLocation || "");
//     setSelectedLocation(currentLocation || "");
//     setLocationError("");
//     setMapLoaded(false);
//     setMapLoading(false);

//     if (hasValidCoordinates(currentCoordinates)) {
//       const existingCoordinates = {
//         lat: Number(currentCoordinates.lat),
//         lng: Number(currentCoordinates.lng),
//       };

//       setCoordinates(existingCoordinates);

//       return;
//     }

//     setCoordinates(null);
//     getCurrentLocation();
//   }, [isOpen]);

//   useEffect(() => {
//     if (!isOpen || !coordinates) return;

//     if (!mapRef.current) return;

//     let interval = null;

//     const tryInitialize = () => {
//       if (
//         window.google?.maps &&
//         coordinates &&
//         mapRef.current
//       ) {
//         initializeMap(coordinates);

//         if (interval) {
//           clearInterval(interval);
//           interval = null;
//         }

//         return true;
//       }

//       return false;
//     };

//     if (!tryInitialize()) {
//       interval = setInterval(() => {
//         tryInitialize();
//       }, 300);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isOpen, coordinates]);

//   useEffect(() => {
//     if (
//       coordinates &&
//       mapInstance.current &&
//       markerInstance.current
//     ) {
//       const position = {
//         lat: Number(coordinates.lat),
//         lng: Number(coordinates.lng),
//       };

//       markerInstance.current.setPosition(position);
//       mapInstance.current.panTo(position);
//     }
//   }, [coordinates]);

//   useEffect(() => {
//     if (!isOpen) {
//       if (autocompleteListenerRef.current) {
//         window.google?.maps?.event?.removeListener(
//           autocompleteListenerRef.current
//         );
//       }

//       if (markerInstance.current) {
//         markerInstance.current.setMap(null);
//       }

//       mapInstance.current = null;
//       markerInstance.current = null;
//       autocompleteRef.current = null;
//       autocompleteListenerRef.current = null;

//       setCoordinates(null);
//       setMapLoaded(false);
//       setMapLoading(false);
//       setLocationLoading(false);
//       setLocationError("");
//     }
//   }, [isOpen]);

//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleClear = (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     setSearchValue("");
//     setSelectedLocation("");
//     setLocationError("");
//   };

//   const handleConfirm = (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     if (!coordinates) {
//       setLocationError(
//         "Please select your location first."
//       );
//       return;
//     }

//     const lat = Number(coordinates.lat);
//     const lng = Number(coordinates.lng);

//     if (
//       !Number.isFinite(lat) ||
//       !Number.isFinite(lng)
//     ) {
//       setLocationError(
//         "Please select a valid location."
//       );
//       return;
//     }

//     const address =
//       selectedLocation ||
//       searchValue ||
//       "Selected location";

//     onLocationSelect({
//       address,
//       displayText: address,
//       lat,
//       lng,
//     });

//     onClose();
//   };

//   const handleClose = (event) => {
//     if (event) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="location-picker-overlay"
//           onClick={handleClose}
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//           }}
//           transition={{
//             duration: 0.25,
//           }}
//         >
//           <motion.div
//             className="location-picker-modal"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//             initial={{
//               opacity: 0,
//               y: 35,
//               scale: 0.97,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//               scale: 1,
//             }}
//             exit={{
//               opacity: 0,
//               y: 25,
//               scale: 0.97,
//             }}
//             transition={{
//               duration: 0.35,
//               ease: "easeOut",
//             }}
//           >
//             <motion.div
//               className="location-picker-header"
//               initial={{
//                 opacity: 0,
//                 y: -15,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: 0.08,
//                 duration: 0.3,
//               }}
//             >
//               <div className="location-header-content">
//                 <span className="location-picker-label">
//                   LOCATION
//                 </span>

//                 <h2>Select Your Location</h2>

//                 <p>
//                   Search your location or use your
//                   current location.
//                 </p>
//               </div>

//               <motion.button
//                 type="button"
//                 className="location-close-btn"
//                 onClick={handleClose}
//                 aria-label="Close location picker"
//                 whileHover={{
//                   scale: 1.08,
//                   rotate: 90,
//                 }}
//                 whileTap={{
//                   scale: 0.92,
//                 }}
//               >
//                 ×
//               </motion.button>
//             </motion.div>

//             <motion.div
//               className="location-search-area"
//               initial={{
//                 opacity: 0,
//                 y: 15,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: 0.14,
//                 duration: 0.3,
//               }}
//             >
//               <div className="location-search-box">
//                 <span className="location-search-icon">
//                   🔍
//                 </span>

//                 <input
//                   id="customer-location-search"
//                   type="text"
//                   value={searchValue}
//                   onChange={handleSearchChange}
//                   placeholder="Search your location"
//                   autoComplete="off"
//                 />

//                 {searchValue && (
//                   <motion.button
//                     type="button"
//                     className="location-clear-btn"
//                     onClick={handleClear}
//                     aria-label="Clear location"
//                     initial={{
//                       opacity: 0,
//                       scale: 0.7,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                     }}
//                     whileHover={{
//                       scale: 1.08,
//                     }}
//                     whileTap={{
//                       scale: 0.9,
//                     }}
//                   >
//                     ×
//                   </motion.button>
//                 )}
//               </div>

//               <motion.button
//                 type="button"
//                 className="current-location-btn"
//                 onClick={getCurrentLocation}
//                 disabled={locationLoading}
//                 whileHover={{
//                   scale: 1.01,
//                 }}
//                 whileTap={{
//                   scale: 0.98,
//                 }}
//               >
//                 <span className="current-location-icon">
//                   {locationLoading ? (
//                     <motion.span
//                       className="location-spinner"
//                       animate={{
//                         rotate: 360,
//                       }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     />
//                   ) : (
//                     "⌾"
//                   )}
//                 </span>

//                 <span>
//                   {locationLoading
//                     ? "Getting Location..."
//                     : "Use Current Location"}
//                 </span>
//               </motion.button>
//             </motion.div>

//             <AnimatePresence>
//               {locationError && (
//                 <motion.div
//                   className="location-error"
//                   initial={{
//                     opacity: 0,
//                     y: -8,
//                     height: 0,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                     height: "auto",
//                   }}
//                   exit={{
//                     opacity: 0,
//                     y: -8,
//                     height: 0,
//                   }}
//                   transition={{
//                     duration: 0.25,
//                   }}
//                 >
//                   <span className="error-icon">
//                     !
//                   </span>

//                   <span>
//                     {locationError}
//                   </span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.div
//               className="location-map-wrapper"
//               initial={{
//                 opacity: 0,
//                 scale: 0.98,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               transition={{
//                 delay: 0.2,
//                 duration: 0.35,
//               }}
//             >
//               <div
//                 ref={mapRef}
//                 className="location-map"
//               />

//               <AnimatePresence>
//                 {(!coordinates ||
//                   !mapLoaded ||
//                   mapLoading) && (
//                   <motion.div
//                     className="map-loading"
//                     initial={{
//                       opacity: 0,
//                     }}
//                     animate={{
//                       opacity: 1,
//                     }}
//                     exit={{
//                       opacity: 0,
//                     }}
//                   >
//                     <motion.div
//                       className="map-loading-spinner"
//                       animate={{
//                         rotate: 360,
//                       }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     />

//                     <span>
//                       {locationLoading
//                         ? "Getting your real location..."
//                         : "Loading map..."}
//                     </span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <AnimatePresence>
//                 {coordinates && mapLoaded && (
//                   <motion.div
//                     className="map-instruction"
//                     initial={{
//                       opacity: 0,
//                       y: 8,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       y: 8,
//                     }}
//                     transition={{
//                       duration: 0.25,
//                     }}
//                   >
//                     <span>⌖</span>
//                     Move the marker or tap on the map
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             <motion.div
//               className="selected-location-box"
//               initial={{
//                 opacity: 0,
//                 y: 12,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: 0.25,
//                 duration: 0.3,
//               }}
//             >
//               <motion.div
//                 className="selected-location-icon"
//                 animate={
//                   coordinates
//                     ? {
//                         scale: [1, 1.08, 1],
//                       }
//                     : {}
//                 }
//                 transition={{
//                   duration: 0.5,
//                 }}
//               >
//                 📍
//               </motion.div>

//               <div className="selected-location-content">
//                 <span className="selected-location-title">
//                   Selected Location
//                 </span>

//                 <p>
//                   {selectedLocation ||
//                     searchValue ||
//                     "Select a location on the map"}
//                 </p>
//               </div>

//               <AnimatePresence>
//                 {coordinates && (
//                   <motion.div
//                     className="location-status"
//                     initial={{
//                       opacity: 0,
//                       scale: 0.8,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       scale: 0.8,
//                     }}
//                   >
//                     <motion.span
//                       animate={{
//                         scale: [1, 1.25, 1],
//                       }}
//                       transition={{
//                         duration: 1.2,
//                         repeat: Infinity,
//                       }}
//                     />

//                     Ready
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             <motion.div
//               className="location-picker-footer"
//               initial={{
//                 opacity: 0,
//                 y: 15,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: 0.3,
//                 duration: 0.3,
//               }}
//             >
//               <motion.button
//                 type="button"
//                 className="location-cancel-btn"
//                 onClick={handleClose}
//                 whileHover={{
//                   scale: 1.02,
//                 }}
//                 whileTap={{
//                   scale: 0.97,
//                 }}
//               >
//                 Cancel
//               </motion.button>

//               <motion.button
//                 type="button"
//                 className="location-confirm-btn"
//                 onClick={handleConfirm}
//                 disabled={!coordinates}
//                 whileHover={
//                   coordinates
//                     ? {
//                         scale: 1.02,
//                       }
//                     : {}
//                 }
//                 whileTap={
//                   coordinates
//                     ? {
//                         scale: 0.97,
//                       }
//                     : {}
//                 }
//               >
//                 <span>
//                   Confirm Location
//                 </span>

//                 <span className="confirm-arrow">
//                   →
//                 </span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LocationPicker;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LocationPicker.css';

const LocationPicker = ({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation = '',
  currentCoordinates = null,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [map, setMap] = useState(null);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const markerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const geocoderRef = useRef(null);

  // Check Google Maps
  useEffect(() => {
    if (!isOpen) return;

    const checkGoogleMaps = () => {
      if (
        window.google &&
        window.google.maps &&
        window.google.maps.Map &&
        window.google.maps.Geocoder &&
        window.google.maps.places
      ) {
        setIsMapsReady(true);
        return true;
      }

      return false;
    };

    if (checkGoogleMaps()) return;

    const timer = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Initialize map
  useEffect(() => {
    if (!isOpen || !isMapsReady || map) return;

    initializeMap();
  }, [isOpen, isMapsReady, map]);

  // Set initial/current location after map is ready
  useEffect(() => {
    if (!map || !isOpen) return;

    if (
      currentCoordinates &&
      currentCoordinates.lat != null &&
      currentCoordinates.lng != null
    ) {
      setMapLocation(
        Number(currentCoordinates.lat),
        Number(currentCoordinates.lng),
        currentLocation
      );
    } else {
      getCurrentLocation();
    }
  }, [map, isOpen]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);

  const updateMarker = useCallback(
    (lat, lng, address = '') => {
      if (!map || !window.google?.maps) return;

      const position = {
        lat: Number(lat),
        lng: Number(lng),
      };

      // Remove old marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }

      const marker = new window.google.maps.Marker({
        position,
        map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        title: 'Selected location',
      });

      marker.addListener('dragend', (event) => {
        if (!event.latLng) return;

        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();

        setCoordinates({
          lat: newLat,
          lng: newLng,
        });

        getAddressFromCoordinates(newLat, newLng);
      });

      markerRef.current = marker;

      setCoordinates({
        lat: position.lat,
        lng: position.lng,
      });

      map.panTo(position);
      map.setZoom(16);

      if (address) {
        setSelectedLocation(address);
        setSearchInput(address);
      } else {
        getAddressFromCoordinates(position.lat, position.lng);
      }
    },
    [map]
  );

  const setMapLocation = (lat, lng, address = '') => {
    if (
      lat == null ||
      lng == null ||
      Number.isNaN(Number(lat)) ||
      Number.isNaN(Number(lng))
    ) {
      return;
    }

    updateMarker(
      Number(lat),
      Number(lng),
      address
    );
  };

  // Current browser location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Location is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log('Current Location:', {
          latitude: lat,
          longitude: lng,
        });

        if (map) {
          updateMarker(lat, lng);
        }
      },
      (error) => {
        console.log('Geolocation error:', error);

        let message = 'Unable to get your current location.';

        if (error.code === error.PERMISSION_DENIED) {
          message =
            'Location permission is blocked. Please allow location access in your browser settings and try again.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message =
            'Your location is currently unavailable. Please try again.';
        } else if (error.code === error.TIMEOUT) {
          message =
            'Location request timed out. Please try again.';
        }

        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  const initializeMap = () => {
    if (
      !mapRef.current ||
      !window.google?.maps ||
      map
    ) {
      return;
    }

    // Hyderabad as fallback
    const defaultCenter = {
      lat: 17.385044,
      lng: 78.486671,
    };

    const googleMap = new window.google.maps.Map(
      mapRef.current,
      {
        center: defaultCenter,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        gestureHandling: 'greedy',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ],
      }
    );

    geocoderRef.current =
      new window.google.maps.Geocoder();

    // Map click
    googleMap.addListener('click', (event) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      updateMarker(lat, lng);
    });

    // Search box
    if (searchRef.current) {
      const searchBox =
        new window.google.maps.places.SearchBox(
          searchRef.current
        );

      searchBoxRef.current = searchBox;

      googleMap.addListener(
        'bounds_changed',
        () => {
          searchBox.setBounds(
            googleMap.getBounds()
          );
        }
      );

      searchBox.addListener(
        'places_changed',
        () => {
          const places = searchBox.getPlaces();

          if (!places || places.length === 0) {
            return;
          }

          const place = places[0];

          if (
            !place.geometry ||
            !place.geometry.location
          ) {
            alert(
              'Location details not available for this search.'
            );
            return;
          }

          const lat =
            place.geometry.location.lat();

          const lng =
            place.geometry.location.lng();

          const address =
            place.formatted_address ||
            place.name ||
            '';

          updateMarker(
            lat,
            lng,
            address
          );
        }
      );
    }

    setMap(googleMap);
  };

  // Reverse geocoding
  const getAddressFromCoordinates = (
    lat,
    lng
  ) => {
    if (
      !window.google?.maps ||
      lat == null ||
      lng == null
    ) {
      return;
    }

    const geocoder =
      geocoderRef.current ||
      new window.google.maps.Geocoder();

    geocoderRef.current = geocoder;

    geocoder.geocode(
      {
        location: {
          lat: Number(lat),
          lng: Number(lng),
        },
      },
      (results, status) => {
        if (
          status === 'OK' &&
          results &&
          results.length > 0
        ) {
          const address =
            results[0].formatted_address;

          setSelectedLocation(address);
          setSearchInput(address);
        } else {
          console.log(
            'Geocoder failed:',
            status
          );

          setSelectedLocation(
            `Location selected (${Number(lat).toFixed(
              6
            )}, ${Number(lng).toFixed(6)})`
          );
        }
      }
    );
  };

  const handleConfirmLocation = () => {
    if (
      coordinates.lat == null ||
      coordinates.lng == null
    ) {
      alert('Please select a location on the map.');
      return;
    }

    if (!selectedLocation) {
      getAddressFromCoordinates(
        coordinates.lat,
        coordinates.lng
      );

      alert(
        'Please wait while the address is loading.'
      );

      return;
    }

    const locationData = {
      address: selectedLocation,
      lat: Number(coordinates.lat),
      lng: Number(coordinates.lng),
      latitude: Number(coordinates.lat),
      longitude: Number(coordinates.lng),
      displayText: `${Number(
        coordinates.lat
      ).toFixed(6)}, ${Number(
        coordinates.lng
      ).toFixed(6)}`,
    };

    console.log(
      'Selected Location:',
      locationData
    );

    onLocationSelect(locationData);

    handleClose();
  };

  const handleClose = () => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }

    setMap(null);
    setIsMapsReady(false);

    setSelectedLocation('');
    setCoordinates({
      lat: null,
      lng: null,
    });

    setSearchInput('');

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="location-picker-overlay"
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
          className="location-picker-modal"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 50,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <div className="location-picker-header">
            <h3 className="location-picker-title">
              Select Your Location
            </h3>

            <button
              type="button"
              className="location-picker-close"
              onClick={handleClose}
            >
              ×
            </button>
          </div>

          <div className="location-picker-content">
            <div className="location-search-container">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for a location..."
                className="location-search-input"
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="current-location-btn"
                onClick={getCurrentLocation}
                title="Use current location"
              >
                <span className="white-styled-icon">
                  ⌖
                </span>
              </button>
            </div>

            <div className="map-container">
              {isMapsReady ? (
                <div
                  ref={mapRef}
                  className="google-map"
                />
              ) : (
                <div className="map-loading-message">
                  Loading Google Maps...
                </div>
              )}
            </div>

            <div className="location-info">
              {selectedLocation && (
                <div className="selected-location">
                  <h4>
                    Selected Location:
                  </h4>

                  <p>
                    {selectedLocation}
                  </p>

                  {coordinates.lat != null &&
                    coordinates.lng != null && (
                      <p className="coordinates">
                        Coordinates:{' '}
                        {Number(
                          coordinates.lat
                        ).toFixed(6)}
                        ,{' '}
                        {Number(
                          coordinates.lng
                        ).toFixed(6)}
                      </p>
                    )}
                </div>
              )}

              <div className="location-instructions">
                <p>
                  <span className="instruction-icon">
                    ⌖
                  </span>{' '}
                  Click on the map or search
                  for your location
                </p>

                <p>
                  <span className="instruction-icon">
                    ◉
                  </span>{' '}
                  Drag the marker to
                  fine-tune your selection
                </p>
              </div>
            </div>

            <div className="location-picker-actions">
              <motion.button
                type="button"
                className="location-cancel-btn"
                onClick={handleClose}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="button"
                className="location-confirm-btn"
                onClick={
                  handleConfirmLocation
                }
                disabled={
                  coordinates.lat == null ||
                  coordinates.lng == null ||
                  !selectedLocation
                }
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Confirm Location
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationPicker;