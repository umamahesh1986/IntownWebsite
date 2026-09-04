// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './LocationPicker.css';

// const LocationPicker = ({ isOpen, onClose, onLocationSelect, currentLocation = '', currentCoordinates = null }) => {
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
//   const [map, setMap] = useState(null);
//   const [isMapsReady, setIsMapsReady] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const mapRef = useRef(null);
//   const searchRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen) return undefined;

//     const checkGoogleMaps = () => {
//       if (window.google?.maps?.Map && window.google?.maps?.places) {
//         setIsMapsReady(true);
//         return true;
//       }
//       return false;
//     };

//     if (checkGoogleMaps()) return undefined;
//     const timer = window.setInterval(() => {
//       if (checkGoogleMaps()) window.clearInterval(timer);
//     }, 250);

//     return () => window.clearInterval(timer);
//   }, [isOpen]);

//   useEffect(() => {
//     if (isOpen && isMapsReady && !map) initializeMap();
//   }, [isOpen, isMapsReady, map]);

//   useEffect(() => {
//     if (map && isOpen) {
//       if (currentCoordinates?.lat != null && currentCoordinates?.lng != null) {
//         setMapLocation(currentCoordinates.lat, currentCoordinates.lng, currentLocation);
//       } else {
//         getCurrentLocation();
//       }
//     }
//   }, [map, isOpen]);

//   const setMapLocation = (lat, lng, address = '') => {
//     if (!map || !window.google) return;

//     map.setCenter({ lat, lng });
//     map.setZoom(15);
//     if (markerRef.current) markerRef.current.setMap(null);

//     const nextMarker = new window.google.maps.Marker({
//       position: { lat, lng },
//       map,
//       draggable: true,
//       animation: window.google.maps.Animation.DROP,
//       title: 'Selected location'
//     });
//     nextMarker.addListener('dragend', (event) => {
//       const nextLat = event.latLng.lat();
//       const nextLng = event.latLng.lng();
//       setCoordinates({ lat: nextLat, lng: nextLng });
//       getAddressFromCoordinates(nextLat, nextLng);
//     });
//     markerRef.current = nextMarker;
//     setCoordinates({ lat, lng });
//     if (address) {
//       setSelectedLocation(address);
//     } else {
//       getAddressFromCoordinates(lat, lng);
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
          
//           if (map) setMapLocation(lat, lng);
//         },
//         (error) => {
//           console.log('Geolocation error:', error);
//           // If geolocation fails, use default location (Delhi, India)
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 300000
//         }
//       );
//     } else {
//       console.log('Geolocation is not supported by this browser.');
//     }
//   };

//   const initializeMap = () => {
//     if (!mapRef.current || !window.google || map) return;

//     const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi, India

//     const googleMap = new window.google.maps.Map(mapRef.current, {
//       zoom: 10,
//       center: defaultCenter,
//       mapTypeControl: false,
//       streetViewControl: false,
//       fullscreenControl: false,
//       styles: [
//         {
//           featureType: 'poi',
//           elementType: 'labels',
//           stylers: [{ visibility: 'off' }]
//         }
//       ]
//     });

//     setMap(googleMap);

//     // Add click listener to map
//     googleMap.addListener('click', (event) => {
//       const lat = event.latLng.lat();
//       const lng = event.latLng.lng();
      
//       if (markerRef.current) markerRef.current.setMap(null);
//       const newMarker = new window.google.maps.Marker({ position: { lat, lng }, map: googleMap, draggable: true });
//       newMarker.addListener('dragend', (dragEvent) => {
//         const nextLat = dragEvent.latLng.lat();
//         const nextLng = dragEvent.latLng.lng();
//         setCoordinates({ lat: nextLat, lng: nextLng });
//         getAddressFromCoordinates(nextLat, nextLng);
//       });
//       markerRef.current = newMarker;
//       setCoordinates({ lat, lng });
//       getAddressFromCoordinates(lat, lng);
//     });

//     // Initialize search box
//     if (searchRef.current) {
//       const searchBox = new window.google.maps.places.SearchBox(searchRef.current);
      
//       searchBox.addListener('places_changed', () => {
//         const places = searchBox.getPlaces();
        
//         if (places.length === 0) return;

//         const place = places[0];
//         const lat = place.geometry.location.lat();
//         const lng = place.geometry.location.lng();
        
//         if (markerRef.current) markerRef.current.setMap(null);
//         const newMarker = new window.google.maps.Marker({ position: { lat, lng }, map: googleMap, draggable: true });
//         newMarker.addListener('dragend', (dragEvent) => {
//           const nextLat = dragEvent.latLng.lat();
//           const nextLng = dragEvent.latLng.lng();
//           setCoordinates({ lat: nextLat, lng: nextLng });
//           getAddressFromCoordinates(nextLat, nextLng);
//         });
//         markerRef.current = newMarker;
//         setCoordinates({ lat, lng });
//         setSelectedLocation(place.formatted_address || 'Selected location');
//         googleMap.setCenter({ lat, lng });
//         googleMap.setZoom(15);
//       });
//     }
//   };

//   const getAddressFromCoordinates = (lat, lng) => {
//     const geocoder = new window.google.maps.Geocoder();
    
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         setSelectedLocation(results[0].formatted_address);
//       }
//     });
//   };

//   const handleConfirmLocation = () => {
//     if (coordinates.lat != null && coordinates.lng != null && selectedLocation) {
//       const locationData = {
//         address: selectedLocation,
//         lat: coordinates.lat,
//         lng: coordinates.lng,
//         displayText: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
//       };
      
//       onLocationSelect(locationData);
//       handleClose();
//     }
//   };

//   const handleClose = () => {
//     if (markerRef.current) markerRef.current.setMap(null);
//     markerRef.current = null;
//     setMap(null);
//     setIsMapsReady(false);
//     setSelectedLocation('');
//     setCoordinates({ lat: null, lng: null });
//     setSearchInput('');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div 
//         className="location-picker-overlay"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={handleClose}
//       >
//         <motion.div 
//           className="location-picker-modal"
//           initial={{ opacity: 0, scale: 0.8, y: 50 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 50 }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="location-picker-header">
//             <h3 className="location-picker-title">Select Your Location</h3>
//             <button className="location-picker-close" onClick={handleClose}>
//               ×
//             </button>
//           </div>

//           <div className="location-picker-content">
//             <div className="location-search-container">
//               <input
//                 ref={searchRef}
//                 type="text"
//                 placeholder="Search for a location..."
//                 className="location-search-input"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="current-location-btn"
//                 onClick={getCurrentLocation}
//                 title="Use current location"
//               >
//                 <span className="white-styled-icon">⌖</span>
//               </button>
//             </div>

//             <div className="map-container">
//               {isMapsReady ? (
//                 <div ref={mapRef} className="google-map" />
//               ) : (
//                 <div className="map-loading-message">Loading Google Maps...</div>
//               )}
//             </div>

//             <div className="location-info">
//               {selectedLocation && (
//                 <div className="selected-location">
//                   <h4>Selected Location:</h4>
//                   <p>{selectedLocation}</p>
//                   {coordinates.lat && coordinates.lng && (
//                     <p className="coordinates">
//                       Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
//                     </p>
//                   )}
//                 </div>
//               )}
              
//               <div className="location-instructions">
//                 <p><span className="instruction-icon">⌖</span> Click on the map or search for your location</p>
//                 <p><span className="instruction-icon">◉</span> Drag the marker to fine-tune your selection</p>
//               </div>
//             </div>

//             <div className="location-picker-actions">
//               <motion.button
//                 className="location-cancel-btn"
//                 onClick={handleClose}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Cancel
//               </motion.button>
              
//               <motion.button
//                 className="location-confirm-btn"
//                 onClick={handleConfirmLocation}
//                 disabled={!coordinates.lat || !coordinates.lng || !selectedLocation}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Confirm Location
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default LocationPicker;

import React, { useEffect, useRef, useState } from "react";
import "./LocationPicker.css";

const DEFAULT_LOCATION = {
  lat: 17.385044,
  lng: 78.486671,
};

const LocationPicker = ({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
  currentCoordinates,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const autocompleteRef = useRef(null);

  const [searchValue, setSearchValue] = useState(
    currentLocation || ""
  );

  const [selectedLocation, setSelectedLocation] =
    useState(currentLocation || "");

  const [coordinates, setCoordinates] = useState(
    currentCoordinates || DEFAULT_LOCATION
  );

  const [mapLoaded, setMapLoaded] = useState(false);

  /* =========================================
     UPDATE VALUES WHEN MODAL OPENS
  ========================================= */

  useEffect(() => {
    if (!isOpen) return;

    if (currentLocation) {
      setSearchValue(currentLocation);
      setSelectedLocation(currentLocation);
    }

    if (
      currentCoordinates &&
      Number.isFinite(Number(currentCoordinates.lat)) &&
      Number.isFinite(Number(currentCoordinates.lng))
    ) {
      setCoordinates({
        lat: Number(currentCoordinates.lat),
        lng: Number(currentCoordinates.lng),
      });
    }
  }, [
    isOpen,
    currentLocation,
    currentCoordinates,
  ]);

  /* =========================================
     INITIALIZE GOOGLE MAP
  ========================================= */

  useEffect(() => {
    if (!isOpen) return;

    const initializeMap = () => {
      if (
        !window.google ||
        !window.google.maps ||
        !mapRef.current
      ) {
        return;
      }

      const initialPosition = {
        lat: Number(coordinates.lat),
        lng: Number(coordinates.lng),
      };

      mapInstance.current =
        new window.google.maps.Map(
          mapRef.current,
          {
            center: initialPosition,
            zoom: 15,

            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,

            gestureHandling: "greedy",
          }
        );

      markerInstance.current =
        new window.google.maps.Marker({
          position: initialPosition,
          map: mapInstance.current,

          draggable: true,

          title: "Selected Location",
        });

      /* MAP CLICK */

      mapInstance.current.addListener(
        "click",
        (event) => {
          if (
            !event.latLng ||
            !markerInstance.current
          ) {
            return;
          }

          const lat =
            event.latLng.lat();

          const lng =
            event.latLng.lng();

          updateMarkerPosition(
            lat,
            lng,
            `Location: ${lat.toFixed(
              6
            )}, ${lng.toFixed(6)}`
          );
        }
      );

      /* MARKER DRAG */

      markerInstance.current.addListener(
        "dragend",
        (event) => {
          if (!event.latLng) return;

          const lat =
            event.latLng.lat();

          const lng =
            event.latLng.lng();

          updateMarkerPosition(
            lat,
            lng,
            `Location: ${lat.toFixed(
              6
            )}, ${lng.toFixed(6)}`
          );
        }
      );

      setMapLoaded(true);

      initializeAutocomplete();
    };

    const initializeAutocomplete = () => {
      if (
        !window.google ||
        !window.google.maps ||
        !window.google.maps.places
      ) {
        console.warn(
          "Google Places library is not loaded."
        );

        return;
      }

      const input =
        document.getElementById(
          "customer-location-search"
        );

      if (!input) return;

      if (autocompleteRef.current) {
        return;
      }

      autocompleteRef.current =
        new window.google.maps.places.Autocomplete(
          input,
          {
            componentRestrictions: {
              country: "in",
            },

            fields: [
              "formatted_address",
              "geometry",
              "name",
            ],

            types: ["geocode"],
          }
        );

      autocompleteRef.current.addListener(
        "place_changed",
        () => {
          const place =
            autocompleteRef.current.getPlace();

          if (
            !place ||
            !place.geometry ||
            !place.geometry.location
          ) {
            return;
          }

          const lat =
            place.geometry.location.lat();

          const lng =
            place.geometry.location.lng();

          const address =
            place.formatted_address ||
            place.name ||
            `${lat.toFixed(
              6
            )}, ${lng.toFixed(6)}`;

          updateMarkerPosition(
            lat,
            lng,
            address
          );
        }
      );
    };

    const updateMarkerPosition = (
      lat,
      lng,
      address
    ) => {
      const newCoordinates = {
        lat: Number(lat),
        lng: Number(lng),
      };

      setCoordinates(newCoordinates);

      setSelectedLocation(address);

      setSearchValue(address);

      if (markerInstance.current) {
        markerInstance.current.setPosition(
          newCoordinates
        );
      }

      if (mapInstance.current) {
        mapInstance.current.panTo(
          newCoordinates
        );

        mapInstance.current.setZoom(16);
      }
    };

    /* Google script already loaded */

    if (
      window.google &&
      window.google.maps
    ) {
      setTimeout(() => {
        initializeMap();
      }, 100);

      return;
    }

    /* Wait for Google script */

    const interval = setInterval(() => {
      if (
        window.google &&
        window.google.maps
      ) {
        clearInterval(interval);

        initializeMap();
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen]);

  /* =========================================
     CLEANUP WHEN CLOSED
  ========================================= */

  useEffect(() => {
    if (!isOpen) {
      mapInstance.current = null;
      markerInstance.current = null;
      autocompleteRef.current = null;
      setMapLoaded(false);
    }
  }, [isOpen]);

  /* =========================================
     CURRENT LOCATION
  ========================================= */

  const handleCurrentLocation = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!navigator.geolocation) {
      alert(
        "Location is not supported by your browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        const newCoordinates = {
          lat,
          lng,
        };

        setCoordinates(newCoordinates);

        setSelectedLocation(
          `Current Location (${lat.toFixed(
            6
          )}, ${lng.toFixed(6)})`
        );

        setSearchValue(
          `Current Location (${lat.toFixed(
            6
          )}, ${lng.toFixed(6)})`
        );

        if (markerInstance.current) {
          markerInstance.current.setPosition(
            newCoordinates
          );
        }

        if (mapInstance.current) {
          mapInstance.current.panTo(
            newCoordinates
          );

          mapInstance.current.setZoom(17);
        }
      },

      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          alert(
            "Please allow location permission in your browser."
          );
        } else {
          alert(
            "Unable to get your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 0,
      }
    );
  };

  /* =========================================
     SEARCH INPUT
  ========================================= */

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  /* =========================================
     CONFIRM LOCATION
  ========================================= */

  const handleConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const lat = Number(
      coordinates.lat
    );

    const lng = Number(
      coordinates.lng
    );

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      alert(
        "Please select a valid location."
      );

      return;
    }

    const address =
      selectedLocation ||
      searchValue ||
      `Location: ${lat.toFixed(
        6
      )}, ${lng.toFixed(6)}`;

    console.log(
      "FINAL LOCATION:",
      {
        address,
        lat,
        lng,
      }
    );

    onLocationSelect({
      address: address,

      displayText: address,

      lat: lat,

      lng: lng,
    });

    onClose();
  };

  /* =========================================
     CLOSE
  ========================================= */

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    onClose();
  };

  /* =========================================
     CLEAR
  ========================================= */

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchValue("");

    setSelectedLocation("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="location-picker-overlay"
      onClick={handleClose}
    >
      <div
        className="location-picker-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* HEADER */}

        <div className="location-picker-header">
          <div>
            <span className="location-picker-label">
              INTOWN
            </span>

            <h2>
              Select Your Location
            </h2>

            <p>
              Search your location or select
              a point on the map.
            </p>
          </div>

          <button
            type="button"
            className="location-close-btn"
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        {/* SEARCH */}

        <div className="location-search-area">
          <div className="location-search-box">
            <span className="location-search-icon">
              🔍
            </span>

            <input
              id="customer-location-search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onClick={(e) =>
                e.stopPropagation()
              }
              placeholder="Search your location"
              autoComplete="off"
            />

            {searchValue && (
              <button
                type="button"
                className="location-clear-btn"
                onClick={handleClear}
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className="current-location-btn"
            onClick={
              handleCurrentLocation
            }
          >
            <span>📍</span>
            Use Current Location
          </button>
        </div>

        {/* MAP */}

        <div className="location-map-wrapper">
          <div
            ref={mapRef}
            className="location-map"
          />

          {!mapLoaded && (
            <div className="map-loading">
              Loading map...
            </div>
          )}

          <div className="map-instruction">
            Click on the map or drag the marker
            to select your location.
          </div>
        </div>

        {/* SELECTED LOCATION */}

        <div className="selected-location-box">
          <div className="selected-location-icon">
            📍
          </div>

          <div className="selected-location-content">
            <strong>
              Selected Location
            </strong>

            <p>
              {selectedLocation ||
                searchValue ||
                "Select a location on the map"}
            </p>

            <div className="selected-coordinates">
              Latitude:{" "}
              {Number(coordinates.lat).toFixed(
                6
              )}{" "}
              | Longitude:{" "}
              {Number(coordinates.lng).toFixed(
                6
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="location-picker-footer">
          <button
            type="button"
            className="location-cancel-btn"
            onClick={handleClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="location-confirm-btn"
            onClick={handleConfirm}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
