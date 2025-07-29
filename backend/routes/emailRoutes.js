const express = require('express');
const router = express.Router();

// @route    POST /api/send-email
// @desc     Send an email
// @access   Public (or secure this later with auth middleware)
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Validation
    if (!to || !subject || !text) {
      return res.status(400).json({ message: "❌ Missing required fields" });
    }

    // Call reusable service
    const success = await sendEmail(to, subject, text);

    if (success) {
      return res.status(200).json({ message: "✅ Email sent successfully" });
    } else {
      return res.status(500).json({ message: "❌ Failed to send email" });
    }

  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "❌ Internal server error" });
  }
});

module.exports = router;
