import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LocationPicker.css';

const LocationPicker = ({ isOpen, onClose, onLocationSelect, currentLocation = '', currentCoordinates = null }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const checkGoogleMaps = () => {
      if (window.google?.maps?.Map && window.google?.maps?.places) {
        setIsMapsReady(true);
        return true;
      }
      return false;
    };

    if (checkGoogleMaps()) return undefined;
    const timer = window.setInterval(() => {
      if (checkGoogleMaps()) window.clearInterval(timer);
    }, 250);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isMapsReady && !map) initializeMap();
  }, [isOpen, isMapsReady, map]);

  useEffect(() => {
    if (map && isOpen) {
      if (currentCoordinates?.lat != null && currentCoordinates?.lng != null) {
        setMapLocation(currentCoordinates.lat, currentCoordinates.lng, currentLocation);
      } else {
        getCurrentLocation();
      }
    }
  }, [map, isOpen]);

  const setMapLocation = (lat, lng, address = '') => {
    if (!map || !window.google) return;

    map.setCenter({ lat, lng });
    map.setZoom(15);
    if (markerRef.current) markerRef.current.setMap(null);

    const nextMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      title: 'Selected location'
    });
    nextMarker.addListener('dragend', (event) => {
      const nextLat = event.latLng.lat();
      const nextLng = event.latLng.lng();
      setCoordinates({ lat: nextLat, lng: nextLng });
      getAddressFromCoordinates(nextLat, nextLng);
    });
    markerRef.current = nextMarker;
    setCoordinates({ lat, lng });
    if (address) {
      setSelectedLocation(address);
    } else {
      getAddressFromCoordinates(lat, lng);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          if (map) setMapLocation(lat, lng);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // If geolocation fails, use default location (Delhi, India)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google || map) return;

    const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi, India

    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: defaultCenter,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(googleMap);

    // Add click listener to map
    googleMap.addListener('click', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      if (markerRef.current) markerRef.current.setMap(null);
      const newMarker = new window.google.maps.Marker({ position: { lat, lng }, map: googleMap, draggable: true });
      newMarker.addListener('dragend', (dragEvent) => {
        const nextLat = dragEvent.latLng.lat();
        const nextLng = dragEvent.latLng.lng();
        setCoordinates({ lat: nextLat, lng: nextLng });
        getAddressFromCoordinates(nextLat, nextLng);
      });
      markerRef.current = newMarker;
      setCoordinates({ lat, lng });
      getAddressFromCoordinates(lat, lng);
    });

    // Initialize search box
    if (searchRef.current) {
      const searchBox = new window.google.maps.places.SearchBox(searchRef.current);
      
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        
        if (places.length === 0) return;

        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        if (markerRef.current) markerRef.current.setMap(null);
        const newMarker = new window.google.maps.Marker({ position: { lat, lng }, map: googleMap, draggable: true });
        newMarker.addListener('dragend', (dragEvent) => {
          const nextLat = dragEvent.latLng.lat();
          const nextLng = dragEvent.latLng.lng();
          setCoordinates({ lat: nextLat, lng: nextLng });
          getAddressFromCoordinates(nextLat, nextLng);
        });
        markerRef.current = newMarker;
        setCoordinates({ lat, lng });
        setSelectedLocation(place.formatted_address || 'Selected location');
        googleMap.setCenter({ lat, lng });
        googleMap.setZoom(15);
      });
    }
  };

  const getAddressFromCoordinates = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setSelectedLocation(results[0].formatted_address);
      }
    });
  };

  const handleConfirmLocation = () => {
    if (coordinates.lat != null && coordinates.lng != null && selectedLocation) {
      const locationData = {
        address: selectedLocation,
        lat: coordinates.lat,
        lng: coordinates.lng,
        displayText: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
      };
      
      onLocationSelect(locationData);
      handleClose();
    }
  };

  const handleClose = () => {
    if (markerRef.current) markerRef.current.setMap(null);
    markerRef.current = null;
    setMap(null);
    setIsMapsReady(false);
    setSelectedLocation('');
    setCoordinates({ lat: null, lng: null });
    setSearchInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="location-picker-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div 
          className="location-picker-modal"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="location-picker-header">
            <h3 className="location-picker-title">Select Your Location</h3>
            <button className="location-picker-close" onClick={handleClose}>
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
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="button"
                className="current-location-btn"
                onClick={getCurrentLocation}
                title="Use current location"
              >
                <span className="white-styled-icon">⌖</span>
              </button>
            </div>

            <div className="map-container">
              {isMapsReady ? (
                <div ref={mapRef} className="google-map" />
              ) : (
                <div className="map-loading-message">Loading Google Maps...</div>
              )}
            </div>

            <div className="location-info">
              {selectedLocation && (
                <div className="selected-location">
                  <h4>Selected Location:</h4>
                  <p>{selectedLocation}</p>
                  {coordinates.lat && coordinates.lng && (
                    <p className="coordinates">
                      Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  )}
                </div>
              )}
              
              <div className="location-instructions">
                <p><span className="instruction-icon">⌖</span> Click on the map or search for your location</p>
                <p><span className="instruction-icon">◉</span> Drag the marker to fine-tune your selection</p>
              </div>
            </div>

            <div className="location-picker-actions">
              <motion.button
                className="location-cancel-btn"
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                className="location-confirm-btn"
                onClick={handleConfirmLocation}
                disabled={!coordinates.lat || !coordinates.lng || !selectedLocation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
