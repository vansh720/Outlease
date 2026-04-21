import express from 'express';
import Item from '../models/Item.js'; 

const router = express.Router();

router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat } = req.query;

    const nearbyItems = await Item.find({
      owner: { $ne: null },       
      isAvailable: true,         
      isDeleted: { $ne: true },   

      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000
        }
      }
    });

    res.json(nearbyItems);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;