// backend/controllers/profileController.js
const db = require('../config/db');   // PostgreSQL connection pool

// ------------------  GET /profile/me  ------------------
exports.getProfile = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [req.user.id]
    );
    return res.json(rows[0] || {});          // empty object if no profile yet
  } catch (err) {
    return res.status(500).json({ msg: 'DB error', error: err.message });
  }
};

// ------------------  PUT /profile/me  ------------------
exports.updateProfile = async (req, res) => {
  const { full_name, phone, dob, address, medical_notes } = req.body;

  try {
    const { rows } = await db.query(
      `
        INSERT INTO profiles (user_id, full_name, phone, dob, address, medical_notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id)
        DO UPDATE SET
          full_name      = $2,
          phone          = $3,
          dob            = $4,
          address        = $5,
          medical_notes  = $6,
          updated_at     = NOW()
        RETURNING *;
      `,
      [req.user.id, full_name, phone, dob, address, medical_notes]
    );

    return res.json(rows[0]);                  // send saved/updated row
  } catch (err) {
    return res.status(500).json({ msg: 'DB error', error: err.message });
  }
};
