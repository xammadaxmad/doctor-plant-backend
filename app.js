const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const loggerMiddleware = require("./middleware/loggerMiddleware")
const path = require('path');
require('dotenv').config();
 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use(loggerMiddleware.logCalls)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const userRoutes = require('./routes/userRoutes');

app.get('/api/',function(req, res){
    res.json({"status":"success","message":"Plant doctor backend is up"});
})
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/user', userRoutes);
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
    console.log(`Server is running on http://localhost:${PORT}`);
});
