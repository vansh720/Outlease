import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import Loading from "./Loading";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/nitems/nearby?lng=${lng}&lat=${lat}`
          );

          console.log("ITEMS:", res.data);
          setItems(res.data);
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

  const getRoute = async (start, end) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/route?startLat=${start[0]}&startLng=${start[1]}&endLat=${end[0]}&endLng=${end[1]}`
      );

      if (!res.data.routes || res.data.routes.length === 0) {
        console.log("No route found");
        return;
      }

      const coords = res.data.routes[0].geometry.coordinates;

      // convert [lng, lat] → [lat, lng]
      const formatted = coords.map((c) => [c[1], c[0]]);

      setRoute(formatted);

      // 🔥 optional: distance + time
      const distance = res.data.routes[0].distance / 1000;
      const duration = res.data.routes[0].duration / 60;

      console.log("Distance:", distance.toFixed(2), "km");
      console.log("Time:", duration.toFixed(1), "mins");

    } catch (err) {
      console.log("Route error:", err.message);

      setRoute([start, end]);
    }
  };

  if (loading) return <Loading />;
  if (!userLocation)
    return <div>Please enable location services to see nearby items.</div>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 className="text-center bg-green-700 text-white font-bold">Items Available for Rent within 10 km</h2>

      <MapContainer
        center={userLocation}
        zoom={12}
        style={{ height: "80%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapClickHandler setSelectedLocation={setSelectedLocation} />

        <Circle
          center={userLocation}
          pathOptions={{ fillColor: "blue", color: "blue" }}
          radius={10000}
        />

        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>

        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>
              Selected Location <br />
              Lat: {selectedLocation[0]} <br />
              Lng: {selectedLocation[1]}
            </Popup>
          </Marker>
        )}

        {items.map((item) => {
          if (!item.location || !item.location.coordinates) return null;

          const itemLat = item.location.coordinates[1];
          const itemLng = item.location.coordinates[0];

          return (
            <Marker
              key={item._id}
              position={[itemLat, itemLng]}
              eventHandlers={{
                click: () => {
                  const coords = [itemLat, itemLng];
                  setSelectedItem(coords);
                  getRoute(userLocation, coords);
                },
              }}
            >
              <Popup>
                <b>{item.itemName}</b> <br />
                💰 ₹{item.pricePerMonth}/month <br />
                📍 {item.locationName}
              </Popup>
            </Marker>
          );
        })}

        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{ color: "green", weight: 5 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default RentalMap;