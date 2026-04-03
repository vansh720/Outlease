import Stripe from "stripe";
import Items from "../models/AddItem.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { item, pickupDate, returnDate, pickupLocation } = req.body;

    const itemData = await Items.findById(item);

    // Calculate price
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    const pricePerDay = itemData.pricePerMonth / 30;
    const totalPrice = Math.round(pricePerDay * noOfDays);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: itemData.itemName,
            },
            unit_amount: totalPrice * 100, 
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/item/${item}`,

      metadata: {
        item,
        pickupDate,
        returnDate,
        pickupLocation,
      },
    });

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};