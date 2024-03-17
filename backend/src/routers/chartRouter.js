import express from 'express';
import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

const router = express.Router();

// Dummy food order data
const dailyOrders = [
    { date: '2024-03-01', totalOrders: 10, mostOrderedFood: 'Pizza' },
    { date: '2024-03-02', totalOrders: 15, mostOrderedFood: 'Burger' },
    // Add more data for other days
];

// Endpoint to generate and send the chart
router.get('/generate-chart', async (req, res) => {
    try {
        // Extract labels (dates + food names) and data (total orders)
        const labels = dailyOrders.map(order => `${order.date}: ${order.mostOrderedFood}`);
        const totalOrders = dailyOrders.map(order => order.totalOrders);

        // Create canvas
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Create chart
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Orders',
                    data: totalOrders,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Ensure y-axis starts at zero
                    }
                }
            }
        });

        // Convert chart to base64 image
        const chartImageUrl = chart.toBase64Image();

        // Send chart image
        res.send(`<img src="${chartImageUrl}" alt="Chart">`);
    } catch (error) {
        console.error('Error generating chart:', error);
        res.status(500).send('Error generating chart');
    }
});

// module.exports = router;
export default router;