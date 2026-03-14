import React, { useState, useEffect } from "react";
import axios from "axios";
import {MapContainer,TileLayer,Marker,Popup,Circle,useMapEvents,} from "react-leaflet";
import L from "leaflet";

// Fix leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: markerIcon2x,
iconUrl: markerIcon,
shadowUrl: markerShadow,
});

// Component to capture map click
function MapClickHandler({ setSelectedLocation }) {
useMapEvents({
click(e) {
const { lat, lng } = e.latlng;
setSelectedLocation([lat, lng]);
},
});

return null;
}

const RentalMap = () => {
const [userLocation, setUserLocation] = useState(null);
const [items, setItems] = useState([]);
const [selectedLocation, setSelectedLocation] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
navigator.geolocation.getCurrentPosition(
async (position) => {
const lat = position.coords.latitude;
const lng = position.coords.longitude;

    setUserLocation([lat, lng]);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/items/nearby?lng=${lng}&lat=${lat}`
      );
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
)}, []);

if (loading) return <div>Map load ho raha hai...</div>;
if (!userLocation)
return <div>Please enable location services to see nearby items.</div>;

return (
<div style={{ height: "100vh", width: "100%" }}> <h2>Items Available for Rent within 10 km</h2>

  <MapContainer
    center={userLocation}
    zoom={12}
    style={{ height: "80%", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />

    {/* Click handler */}
    <MapClickHandler setSelectedLocation={setSelectedLocation} />

    {/* 10km Radius */}
    <Circle
      center={userLocation}
      pathOptions={{ fillColor: "blue", color: "blue" }}
      radius={10000}
    />

    {/* User location */}
    <Marker position={userLocation}>
      <Popup>Your Location</Popup>
    </Marker>

    {/* Selected location marker */}
    {selectedLocation && (
      <Marker position={selectedLocation}>
        <Popup>
          Selected Location <br />
          Lat: {selectedLocation[0]} <br />
          Lng: {selectedLocation[1]}
        </Popup>
      </Marker>
    )}

    {/* Items from database */}
    {items.map((item) => {
      const itemLat = item.location.coordinates[1];
      const itemLng = item.location.coordinates[0];

      return (
        <Marker key={item._id} position={[itemLat, itemLng]}>
          <Popup>
            <b>{item.brand} {item.model}</b> <br />
            Rent: ₹{item.pricePerMonth}/month <br />
            Category: {item.category}
          </Popup>
        </Marker>
      );
    })}
  </MapContainer>
</div>
);
};

export default RentalMap;
