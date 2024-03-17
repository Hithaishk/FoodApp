import express from 'express';
const router = express.Router();
import path from 'path';

// Serve the HTML file
router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST requests to add new pin locations
router.post('/', (req, res) => {
    const { lat, lng } = req.body;
    // Store the pin location in your database
    console.log('Pin location:', lat, lng);
    res.sendStatus(200);
});



export default router;
