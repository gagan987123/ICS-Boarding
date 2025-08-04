const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    accessType: 'offline', // Request refresh token
    prompt: 'consent',     // Force consent to get refresh token
    scope: ['profile', 'email', 'openid'] // Request ID token
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Extract user information from Google profile + tokens
        const user = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            provider: 'google',
            // Include OAuth tokens
            accessToken: accessToken,
            refreshToken: refreshToken || null,
            idToken: profile.id_token || null, // JWT token with user claims
            tokenExpiry: new Date(Date.now() + 3600000),
            // Additional profile data
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            verified: profile.emails[0]?.verified || false,
            // Raw profile data for debugging
            rawProfile: profile._json
        };

        // Here you would typically save the user + tokens to your database
        // For now, we'll just pass the user object with tokens
        console.log('User authenticated with tokens:', {
            name: user.name,
            email: user.email,
            hasAccessToken: !!user.accessToken,
            hasRefreshToken: !!user.refreshToken
        });
        
        return done(null, user);
    } catch (error) {
        console.error('Authentication error:', error);
        return done(error, null);
    }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
