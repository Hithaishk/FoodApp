import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const API_KEY = process.env.Open_Key;
const CITY_NAME = process.env.loc;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

async function getWeatherData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
}

router.get('/', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    if (weatherData) {
      const temperature = weatherData.main.temp;
      res.json({ temperature });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  } catch (error) {
    console.error('Failed to get weather data:', error.message);
    res.status(500).json({ error: 'Failed to get weather data' });
  }
});

export default router;
