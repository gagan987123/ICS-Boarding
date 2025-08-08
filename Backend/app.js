const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { ensureAuthenticated } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(cors({
    origin: ['http://localhost:5174', 'https://login.microsoftonline.com'],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.options('*', cors());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        sameSite: 'lax', 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000, 
        path: '/' 
    },
    name: 'connect.sid' 
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
app.get('/', (req, res) => {
  console.log('🏠 Home page accessed - Session user:', req.session.user ? 'Logged in' : 'Not logged in');
  if (req.session.user) {
    console.log('📊 Session User Data:', JSON.stringify(req.session.user.account, null, 2));
  }
  
  res.json({ 
    status: 'success',
    message: 'Microsoft SSO Backend API',
    isAuthenticated: !!req.session.user
  });
});

app.use('/', authRoutes);     
app.use('/api', userRoutes);  
app.use('/api', apiRoutes);   

app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(500).json({
    status: 'error',
    message: 'An internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'The requested resource could not be found.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Microsoft SSO App running on http://localhost:${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Tenant ID: ${process.env.TENANT_ID}`);
  console.log(`✅ Using MSAL Node for Azure AD authentication`);
  console.log(`📁 Structured MVC Architecture`);
});

module.exports = app;
