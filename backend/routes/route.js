import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.query;

    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Route fetch failed" });
  }
});

export default router;