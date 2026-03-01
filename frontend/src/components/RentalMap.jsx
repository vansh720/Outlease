import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// 1. Require ki jagah Import ka use karein (Yeh line errors fix kar degi)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 2. Leaflet default icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const RentalMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // User ki location lena
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation([lat, lng]);

        // Backend API call (apna port check kar lena, default 5000)
        try {
          const response = await axios.get(`http://localhost:5000/api/items/nearby?lng=${lng}&lat=${lat}`);
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location access denied:", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div>Map Load ho raha hai...</div>;
  if (!userLocation) return <div>Kripya location services on karein taaki aaspas ke items dikh sakein.</div>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h2>Items Available for Rent within 10 km</h2>
      
      {/* Map setup */}
      <MapContainer center={userLocation} zoom={12} style={{ height: '80%', width: '100%' }}>
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User ka 10km Radius (10000 meters) */}
        <Circle center={userLocation} pathOptions={{ fillColor: 'blue', color: 'blue' }} radius={10000} />
        
        {/* User ki khud ki location pin */}
        <Marker position={userLocation}>
          <Popup>Aapki Location!</Popup>
        </Marker>

        {/* Database se items ke markers */}
        {items.map((item) => {
          // MongoDB se data [Lng, Lat] format mein aata hai
          const itemLat = item.location.coordinates[1];
          const itemLng = item.location.coordinates[0];

          return (
            <Marker key={item._id} position={[itemLat, itemLng]}>
              <Popup>
                <b>{item.itemName}</b> <br />
                Rent: ₹{item.price}/day <br />
                Lender: {item.lenderName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default RentalMap;