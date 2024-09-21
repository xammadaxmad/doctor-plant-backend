const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const initializeSwaggerUi = require('./services/swagger');
const customFormat = ':method [:remote-addr :url] [status code - :status] :response-time ms';
const morgan = require('morgan')

const app = express();
const port = 3000;
const PORT = process.env.PORT || 3000;
app.use(morgan(customFormat));
app.use(cors({ origin: '*' }));
// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const userRoutes = require('./routes/userRoutes');

app.get('/api/', function (req, res) {
    res.json({ "status": "success", "message": "Plant doctor backend is up" });
})
app.use(authRoutes);
app.use(historyRoutes);
app.use(userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Backend Server: http://localhost:${PORT}`);
    console.log(`Swagger documentation is running at http://localhost:${PORT}/api/docs`)
});

initializeSwaggerUi(app, PORT)