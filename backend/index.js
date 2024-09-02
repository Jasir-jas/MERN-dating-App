require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('./config/passport')
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const session = require('express-session')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
const userRoutes = require('./Routes/UserRoutes')
connectDB()

app.use(session({
    secret: process.env.SESSION_SECRET, // Make sure this is set in your .env file
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
};

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/`
}), async (req, res) => {
    try {
        if (req.user) {
            const token = generateToken(req.user);
            res.redirect(`${FRONTEND_URL}/personalDetail?token=${token}`);
        } else {
            res.redirect(`${FRONTEND_URL}/`);
        }
    } catch (error) {
        console.error('Error during authentication callback:', error);
        res.redirect(`${FRONTEND_URL}/`);
    }
});
app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})