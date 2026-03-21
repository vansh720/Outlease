import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  lenderName: { type: String, required: true },
  price: { type: Number, required: true },

  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },

  locationName: { type: String, required: true } 

});

itemSchema.index({ location: '2dsphere' });

const Item = mongoose.model('Item', itemSchema);

export default Item;