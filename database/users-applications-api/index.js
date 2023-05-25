import express from 'express';

// Initialize server
const app = express();

// Plugin for reading JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import router
import router from './router.js';
router(app);


// Server listens at Port 3001
app.listen(3001, () => { console.log("API listening at port 3001.") });