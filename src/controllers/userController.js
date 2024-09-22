const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        //check if all fields are provided
        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please fill all fields'});
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({token: generateToken(user._id)});
    } catch(error) {
        res.status(500).json({error: 'Server error'});
    }
}

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        res.json({token: generateToken(user._id)});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
};