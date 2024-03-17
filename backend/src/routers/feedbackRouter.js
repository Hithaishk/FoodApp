import express from 'express';
import multer  from 'multer';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set upload destination folder

// Endpoint for submitting feedback and uploading files
router.post('/submit-feedback', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'textFile', maxCount: 1 }]), (req, res) => {
    // Extract feedback rating from request body
    const feedbackRating = req.body.rating;

    // Extract uploaded image file
    const imageFile = req.files['image'][0];

    // Extract uploaded text file
    const textFile = req.files['textFile'][0];

    // Read text file contents
    fs.readFile(textFile.path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading text file:', err);
            return res.status(500).send('Error reading text file');
        }

        // Parse text file contents (assuming it contains JSON data)
        let textFileData;
        try {
            textFileData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing text file data:', parseErr);
            return res.status(400).send('Invalid text file format');
        }

        // Store feedback data (e.g., in a database)
        const feedbackData = {
            rating: feedbackRating,
            image: imageFile,
            textFile: textFileData
        };

        // Here, you would typically save the feedbackData to your database
        // For demonstration purposes, we're just sending back the received data
        res.json(feedbackData);
    });
});

// module.exports = router;
export default router;