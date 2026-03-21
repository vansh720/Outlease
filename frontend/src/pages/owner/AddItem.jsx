import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

import {MapContainer,TileLayer,Marker,Popup,useMapEvents} from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: markerIcon2x,
iconUrl: markerIcon,
shadowUrl: markerShadow
});

// Component to detect map clicks
function MapClickHandler({ setCoordinates }) {
useMapEvents({
click(e) {
const { lat, lng } = e.latlng;
setCoordinates([lat, lng]);
}
});
return null;
}

const AddItem = () => {
const { axios, currency } = useAppContext();

const [image, setImage] = useState(null);
const [coordinates, setCoordinates] = useState(null);

const [item, setItem] = useState({
brand: "",
model: "",
year: 0,
pricePerMonth: 0,
category: "",
description: ""
});

const [isLoading, setIsLoading] = useState(false);

const onSubmitHandler = async (e) => {
e.preventDefault();
if (isLoading) return;
if (!coordinates) {
  toast.error("Please select item location on the map");
  return;
}

setIsLoading(true);

try {
  const formData = new FormData();

  const itemData = {
    ...item,
    location: {
      type: "Point",
      coordinates: [coordinates[1], coordinates[0]] // [lng, lat]
    }
  };

  formData.append("image", image);
  formData.append("itemData", JSON.stringify(itemData));

  const { data } = await axios.post("/api/owner/add-item", formData);

  if (data.success) {
    toast.success(data.message);

    setImage(null);
    setCoordinates(null);

    setItem({
      brand: "",
      model: "",
      year: 0,
      pricePerMonth: 0,
      category: "",
      description: ""
    });

  } else {
    toast.error(data.message);
  }

} catch (error) {
  toast.error(error.message);
} finally {
  setIsLoading(false);
}
};

return ( <div className="px-4 py-10 md:px-10 flex-1">
  <Title
    title="Add New Item"
    subTitle="Fill details to list your item for rent."
  />

  <form
    onSubmit={onSubmitHandler}
    className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
  >

    {/* Image Upload */}
    <div className="flex items-center gap-2 w-full">
      <label htmlFor="item-image">
        <img
          src={image ? URL.createObjectURL(image) : assets.upload_icon}
          className="h-14 rounded cursor-pointer"
        />
        <input
          type="file"
          id="item-image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <p>Upload a picture of your item</p>
    </div>

    {/* Brand & Model */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


      <div className="flex flex-col">
        <label>Item Name</label>
        <input
          type="text"
          required
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.itemName}
          onChange={(e) =>
            setItem({ ...item, itemName: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label>Brand</label>
        <input
          type="text"
          required
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.brand}
          onChange={(e) =>
            setItem({ ...item, brand: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label>Model</label>
        <input
          type="text"
          required
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.model}
          onChange={(e) =>
            setItem({ ...item, model: e.target.value })
          }
        />
      </div>

    </div>

    {/* Year Price Category */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="flex flex-col">
        <label>Year</label>
        <input
          type="number"
          required
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.year}
          onChange={(e) =>
            setItem({ ...item, year: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label>Monthly Price ({currency})</label>
        <input
          type="number"
          required
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.pricePerMonth}
          onChange={(e) =>
            setItem({ ...item, pricePerMonth: e.target.value })
          }
        />
      </div>

      <div className="flex flex-col">
        <label>Category</label>
        <select
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.category}
          onChange={(e) =>
            setItem({ ...item, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Cooking appliances">Cooking Appliances</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Photography">Photography</option>
          <option value="Camping">Camping</option>
          <option value="Tools">Tools</option>
          <option value="Party Supplies">Party Supplies</option>
        </select>
      </div>

    </div>

    {/* Map Location */}
    <div className="flex flex-col gap-2">
      <label>Select Item Location</label>

      <MapContainer
        center={[30.7046, 76.7179]}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler setCoordinates={setCoordinates} />

        {coordinates && (
          <Marker position={coordinates}>
            <Popup>
              Selected Location <br />
              Lat: {coordinates[0]} <br />
              Lng: {coordinates[1]}
            </Popup>
          </Marker>
        )}

      </MapContainer>

      <div className="flex flex-col">
        <label>Location Name</label>
        <select
          className="px-3 py-2 mt-1 border rounded-md"
          value={item.locationName}
          onChange={(e) =>
            setItem({ ...item, locationName: e.target.value })
          }
        >
          <option value="">Select Location</option>
          <option value="Mohali">Mohali</option>
          <option value="Chandigrah">Chandigarh</option>
          <option value="Panchkula">Panchkula</option>
          <option value="Zirakpur">Zirakpur</option>
        </select>
      </div>

    </div>

    {/* Description */}
    <div className="flex flex-col">
      <label>Description</label>
      <textarea
        rows={5}
        required
        className="px-3 py-2 mt-1 border rounded-md"
        value={item.description}
        placeholder="Add your Description"
        onChange={(e) =>
          setItem({ ...item, description: e.target.value })
        }
      />
    </div>

    {/* Submit */}
    <button
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md w-max"
    >
      <img src={assets.tick_icon} />
      {isLoading ? "Listing..." : "List Your Item"}
    </button>

  </form>
</div>

);
};

export default AddItem;
