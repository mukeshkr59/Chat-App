import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
        //
        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            return res.status(401).json({ success:false, message: 'Not authorized, user not found' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.error('Error in auth middleware:', error.message);
        return res.status(401).json({ success:false, message: 'Not authorized, token failed' });

    }
};

// controller to check if user if authenticated
export const checkAuth = async (req, res) => {
    res.json({ success:true, message: 'User is authenticated', user: req.user });
};