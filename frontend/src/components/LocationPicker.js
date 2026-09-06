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

const LocationPicker = ({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation = "",
  currentCoordinates = null,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const autocompleteRef = useRef(null);
  const autocompleteListenerRef = useRef(null);

  const [searchValue, setSearchValue] = useState(currentLocation);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [coordinates, setCoordinates] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const hasValidCoordinates = (coords) => {
    return (
      coords &&
      Number.isFinite(Number(coords.lat)) &&
      Number.isFinite(Number(coords.lng))
    );
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch address");
      }

      const data = await response.json();

      return data.display_name || "Selected location";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Selected location";
    }
  };

  const createMarker = (position) => {
    if (!mapInstance.current || !window.google?.maps) {
      return;
    }

    if (markerInstance.current) {
      markerInstance.current.setMap(null);
      markerInstance.current = null;
    }

    const marker = new window.google.maps.Marker({
      position,
      map: mapInstance.current,
      draggable: true,
      title: "Selected location",
      animation: window.google.maps.Animation.DROP,
    });

    marker.addListener("dragend", async (event) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      await selectCoordinates(lat, lng);
    });

    markerInstance.current = marker;
  };

  const selectCoordinates = async (lat, lng, address = "") => {
    const nextCoordinates = {
      lat: Number(lat),
      lng: Number(lng),
    };

    if (
      !Number.isFinite(nextCoordinates.lat) ||
      !Number.isFinite(nextCoordinates.lng)
    ) {
      return;
    }

    setLocationError("");
    setCoordinates(nextCoordinates);

    let finalAddress = address;

    if (!finalAddress) {
      finalAddress = await getAddressFromCoordinates(
        nextCoordinates.lat,
        nextCoordinates.lng
      );
    }

    setSelectedLocation(finalAddress);
    setSearchValue(finalAddress);

    if (mapInstance.current) {
      mapInstance.current.panTo(nextCoordinates);
      mapInstance.current.setZoom(17);
    }

    createMarker(nextCoordinates);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location services."
      );
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          await selectCoordinates(lat, lng);
        } catch (error) {
          console.error("Current location error:", error);
          setLocationError(
            "Unable to read your current location."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "Please allow location permission in your browser."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "Your current location is unavailable."
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to get your current location."
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

  const initializeAutocomplete = () => {
    if (
      !window.google?.maps?.places ||
      autocompleteRef.current
    ) {
      return;
    }

    const input = document.getElementById(
      "customer-location-search"
    );

    if (!input) return;

    autocompleteRef.current =
      new window.google.maps.places.Autocomplete(input, {
        componentRestrictions: {
          country: "in",
        },
        fields: [
          "formatted_address",
          "geometry",
          "name",
        ],
        types: ["geocode"],
      });

    autocompleteListenerRef.current =
      autocompleteRef.current.addListener(
        "place_changed",
        async () => {
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
            "Selected location";

          await selectCoordinates(
            lat,
            lng,
            address
          );
        }
      );
  };

  const initializeMap = (initialCoordinates) => {
    if (
      !mapRef.current ||
      !window.google?.maps ||
      !initialCoordinates ||
      mapInstance.current
    ) {
      return false;
    }

    const position = {
      lat: Number(initialCoordinates.lat),
      lng: Number(initialCoordinates.lng),
    };

    if (
      !Number.isFinite(position.lat) ||
      !Number.isFinite(position.lng)
    ) {
      return false;
    }

    setMapLoading(true);

    mapInstance.current =
      new window.google.maps.Map(
        mapRef.current,
        {
          center: position,
          zoom: 17,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          clickableIcons: false,
          gestureHandling: "greedy",
          mapTypeId: "roadmap",
        }
      );

    createMarker(position);

    mapInstance.current.addListener(
      "click",
      async (event) => {
        if (!event.latLng) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        await selectCoordinates(lat, lng);
      }
    );

    setMapLoaded(true);
    setMapLoading(false);

    setTimeout(() => {
      initializeAutocomplete();
    }, 200);

    return true;
  };

  useEffect(() => {
    if (!isOpen) return;

    setSearchValue(currentLocation || "");
    setSelectedLocation(currentLocation || "");
    setLocationError("");
    setMapLoaded(false);
    setMapLoading(false);

    if (hasValidCoordinates(currentCoordinates)) {
      const existingCoordinates = {
        lat: Number(currentCoordinates.lat),
        lng: Number(currentCoordinates.lng),
      };

      setCoordinates(existingCoordinates);

      return;
    }

    setCoordinates(null);
    getCurrentLocation();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !coordinates) return;

    if (!mapRef.current) return;

    let interval = null;

    const tryInitialize = () => {
      if (
        window.google?.maps &&
        coordinates &&
        mapRef.current
      ) {
        initializeMap(coordinates);

        if (interval) {
          clearInterval(interval);
          interval = null;
        }

        return true;
      }

      return false;
    };

    if (!tryInitialize()) {
      interval = setInterval(() => {
        tryInitialize();
      }, 300);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOpen, coordinates]);

  useEffect(() => {
    if (
      coordinates &&
      mapInstance.current &&
      markerInstance.current
    ) {
      const position = {
        lat: Number(coordinates.lat),
        lng: Number(coordinates.lng),
      };

      markerInstance.current.setPosition(position);
      mapInstance.current.panTo(position);
    }
  }, [coordinates]);

  useEffect(() => {
    if (!isOpen) {
      if (autocompleteListenerRef.current) {
        window.google?.maps?.event?.removeListener(
          autocompleteListenerRef.current
        );
      }

      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }

      mapInstance.current = null;
      markerInstance.current = null;
      autocompleteRef.current = null;
      autocompleteListenerRef.current = null;

      setCoordinates(null);
      setMapLoaded(false);
      setMapLoading(false);
      setLocationLoading(false);
      setLocationError("");
    }
  }, [isOpen]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSearchValue("");
    setSelectedLocation("");
    setLocationError("");
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!coordinates) {
      setLocationError(
        "Please select your location first."
      );
      return;
    }

    const lat = Number(coordinates.lat);
    const lng = Number(coordinates.lng);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      setLocationError(
        "Please select a valid location."
      );
      return;
    }

    const address =
      selectedLocation ||
      searchValue ||
      "Selected location";

    onLocationSelect({
      address,
      displayText: address,
      lat,
      lng,
    });

    onClose();
  };

  const handleClose = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    onClose();
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
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="location-picker-header">
          <div className="location-header-content">
            <span className="location-picker-label">
              LOCATION
            </span>

            <h2>Select Your Location</h2>

            <p>
              Search your location or use your
              current location.
            </p>
          </div>

          <button
            type="button"
            className="location-close-btn"
            onClick={handleClose}
            aria-label="Close location picker"
          >
            ×
          </button>
        </div>

        <div className="location-search-area">
          <div className="location-search-box">
            <span className="location-search-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path d="M16.5 16.5L21 21" />
              </svg>
            </span>

            <input
              id="customer-location-search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search your location"
              autoComplete="off"
            />

            {searchValue && (
              <button
                type="button"
                className="location-clear-btn"
                onClick={handleClear}
                aria-label="Clear location"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className="current-location-btn"
            onClick={getCurrentLocation}
            disabled={locationLoading}
          >
            <span className="current-location-icon">
              {locationLoading ? (
                <span className="location-spinner" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                  />
                  <path d="M12 2v3" />
                  <path d="M12 19v3" />
                  <path d="M2 12h3" />
                  <path d="M19 12h3" />
                </svg>
              )}
            </span>

            <span>
              {locationLoading
                ? "Getting Location..."
                : "Use Current Location"}
            </span>
          </button>
        </div>

        {locationError && (
          <div className="location-error">
            <span className="error-icon">!</span>
            <span>{locationError}</span>
          </div>
        )}

        <div className="location-map-wrapper">
          <div
            ref={mapRef}
            className="location-map"
          />

          {(!coordinates ||
            !mapLoaded ||
            mapLoading) && (
            <div className="map-loading">
              <div className="map-loading-spinner" />

              <span>
                {locationLoading
                  ? "Getting your real location..."
                  : "Loading map..."}
              </span>
            </div>
          )}

          {coordinates && mapLoaded && (
            <div className="map-instruction">
              <span>⌖</span>
              Move the marker or tap on the map
            </div>
          )}
        </div>

        <div className="selected-location-box">
          <div className="selected-location-icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
              <circle
                cx="12"
                cy="9"
                r="2.5"
              />
            </svg>
          </div>

          <div className="selected-location-content">
            <span className="selected-location-title">
              Selected Location
            </span>

            <p>
              {selectedLocation ||
                searchValue ||
                "Select a location on the map"}
            </p>
          </div>

          {coordinates && (
            <div className="location-status">
              <span />
              Ready
            </div>
          )}
        </div>

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
            disabled={!coordinates}
          >
            <span>Confirm Location</span>

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;




