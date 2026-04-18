const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for the latest sensor data
let sensorData = {
    tempC: 0,
    voltage: 0,
    corrected: 0,
    status: "Waiting for data..."
};

// Endpoint to receive data from ESP32
app.post('/api/data', (req, res) => {
    const { tempC, voltage, corrected, status } = req.body;
    console.log('Raw body:', req.body); // Debug log

    if (tempC !== undefined && voltage !== undefined) {
        sensorData = {
            tempC: parseFloat(tempC),
            voltage: parseFloat(voltage),
            corrected: parseFloat(corrected),
            status: status || calculateStatus(parseFloat(corrected))
        };
        console.log('Received data:', sensorData);
        res.status(200).json({ message: 'Data received successfully' });
    } else {
        res.status(400).json({ message: 'Invalid data format' });
    }
});

// Endpoint for the frontend to get the latest data
app.get('/api/data', (req, res) => {
    console.log('Serving data to frontend:', sensorData); // Debug log
    res.json(sensorData);
});

// Helper to calculate status if not provided
function calculateStatus(corrected) {
    if (corrected < 0.4) return "Normal";
    if (corrected <= 0.8) return "Mild dehydration";
    return "High kidney strain";
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
