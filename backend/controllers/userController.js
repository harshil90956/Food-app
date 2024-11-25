import userModel from "../models/useModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from "validator";

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d' // Short-lived token
    });
};

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d' // Long-lived token
    });
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Generate tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // Store refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Send response with tokens
        console.log(accessToken)
        console.log(refreshToken)
        res.status(201).json({ success: true, message: "User registered successfully", accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email:email });
        console.log(user);
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // Store refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Send tokens to the client
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// Exporting the functions
export { loginUser, registerUser };