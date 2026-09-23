const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================
// LOGIN
// =========================
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Convert password to string
        const loginPassword = String(password);

        // Find user
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Email is not registered, please register"
            });
        }

        // Check password
        const checkedPassword = await bcryptjs.compare(
            loginPassword,
            existingUser.password
        );

        if (!checkedPassword) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// =========================
// REGISTER
// =========================
async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        // Check input
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Name, email, password and role are required"
            });
        }

        // Convert password to string
        const registerPassword = String(password);

        // Check role
        const allowedRoles = ["student", "instructor", "admin"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const encryptedPassword = await bcryptjs.hash(
            registerPassword,
            10
        );

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword,
            role
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    login,
    register
};