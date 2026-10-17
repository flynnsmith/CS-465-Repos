
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.setPassword(req.body.password);
        await user.save();

        return res.status(200).json({
            token: user.generateJWT()
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Registration failed'
        });
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                message: 'Authentication failed'
            });
        }

        if (!user) {
            return res.status(401).json(info);
        }

        return res.status(200).json({
            token: user.generateJWT()
        });
    })(req, res);
};

module.exports = {
    register,
    login
};
