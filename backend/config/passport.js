const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5h'
    });
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value
                    });
                } else {
                    user.googleId = profile.id;
                }
                await user.save();
            }

            const jwtToken = generateToken(user);
            user.token = jwtToken;
            await user.save();

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

// User session save in serialize function
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// After authentication passport will call the deserialization function
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);  // Corrected the method to find user by ID
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
module.exports = passport