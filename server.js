require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Connect to the database
connectDB();

const app = express();


// middleware
app.use(express.json());

// Define the user and the task routes
app.use('/api/v1/users', userRoutes); // Routes for user registration and login
app.use('/api/v1/tasks', taskRoutes); // Routes for task crud operations

// Error handling for undefined routes
app.use((req, res)=>{
    res.status(404).json({message: 'Route not found'});
})

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});