const User = require('../Models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
};

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body;

    console.log('Register data:', name, email, password, mobile);
    if (!name || !email || !password || !mobile) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        name,
        email,
        password: hashPassword,
        mobile,
    });

    await newUser.save();

    const token = generateToken(newUser);
    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
        success: true,
        message: "Registration successful",
        token
    });
});

const LoginUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    if (!identifier || !password) {
        return res.json({ error: 'All fields are required' })
    }
    let user;
    if (identifier.includes('@')) {
        user = await User.findOne({ email: identifier })
    } else {
        user = await User.findOne({ mobile: identifier })
    }
    if (!user) {
        return res.json({ error: 'User not Found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.json({ error: 'Invalid Password' })
    }

    const token = generateToken(user);
    user.token = token;

    await user.save();
    return res.json({ success: true, message: 'Successfully Logged In', token });

})

module.exports = { RegisterUser, LoginUser }