const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

require("dotenv").config();

const passport = require('./config/passport');

const authRoutes = require('./routes/auth');
const { verifyToken } = require('./Middleware/verifyToken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-default-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust for your frontend
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to ICS-Onboard Backend API",
    endpoints: {
      login: "/auth/google",
      user: "/auth/user",
      logout: "/auth/logout",
      dashboard: "/dashboard"
    }
  });
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "🎉 Welcome to your dashboard!",
    user: req.user
  });
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "👤 User Profile",
    user: req.user
  });
});



app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Google OAuth: http://localhost:${PORT}/auth/google`);
  console.log(`🏠 Dashboard: http://localhost:${PORT}/dashboard`);
});
