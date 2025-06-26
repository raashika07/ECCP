const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount profile routes  🔥
const profileRoutes = require('./routes/profileRoutes');   // backend/routes/profileRoutes.js
app.use('/profile', profileRoutes);                        // now /profile/* works

app.get('/', (_, res) => res.send('Elderly-Care backend running 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
