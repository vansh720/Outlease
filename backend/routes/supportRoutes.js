import express from "express";
import transporter from "../configs/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: `"Outlease Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Support Message 📩",
      html: `
        <h2>New Support Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false });
  }
});

export default router;