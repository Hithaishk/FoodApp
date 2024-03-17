import request  from 'request';

import express from 'express';
const router = express.Router();

// Function to get weather information from OpenWeatherMap
function getWeather(city, callback) {
    const apiKey =process.env.Open_Key;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            const weatherDescription = data.weather[0].description;
            callback(null, weatherDescription);
        } else {
            callback(error || 'Failed to fetch weather information');
        }
    });
}

// Function to get distance and duration between two locations using OpenStreetMap

function getDistanceDuration(origin, destination, callback) {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=false`;

    request(url, (error, response, body) => {
        if (error) {
            callback(error);
            return;
        }

        if (response.statusCode !== 200) {
            callback(`Failed to fetch distance and duration. Status code: ${response.statusCode}`);
            return;
        }

        try {
            const data = JSON.parse(body);
            console.log("Response from OpenStreetMap API:", data); // Log the response
            if (data.routes && data.routes.length > 0) {
                const distance = data.routes[0].distance;
                const duration = data.routes[0].duration;
                callback(null, { distance, duration });
            } else {
                console.log("No routes found:", data); // Log if no routes found
                callback('No routes found');
            }
        } catch (parseError) {
            callback('Error parsing response from OpenStreetMap API');
        }
    });
}

router.post('/calculate_delivery_time', (req, res) => {
    const { pickupLocation, deliveryLocation, weatherCity } = req.body;

    getWeather(weatherCity, (weatherError, weatherDescription) => {
        if (weatherError) {
            return res.status(500).json({ error: weatherError });
        }

        const pickupCoords = [pickupLocation.longitude, pickupLocation.latitude];
        const deliveryCoords = [deliveryLocation.longitude, deliveryLocation.latitude];

        getDistanceDuration(pickupCoords, deliveryCoords, (distanceDurationError, { distance, duration }) => {
            if (distanceDurationError) {
                return res.status(500).json({ error: distanceDurationError });
            }

            res.json({
                weather: weatherDescription,
                distance,
                duration
            });
        });
    });
});

// module.exports = router;
export default router;