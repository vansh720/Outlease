import express from 'express';
import Item from '../models/Item.js'; 

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({ error: "Location coordinates are required." });
    }

    const nearbyItems = await Item.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000 // 10 km
        }
      }
    });

    res.json(nearbyItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;