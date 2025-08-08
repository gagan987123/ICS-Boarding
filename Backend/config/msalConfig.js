require('dotenv').config();

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    authority: 'https://login.microsoftonline.com/common' // Multi-tenant: Any Microsoft account
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        if (!containsPii) {
          console.log(message);
        }
      },
      piiLoggingEnabled: false,
      logLevel: 3, // LogLevel.Info
    }
  }
};

const authConfig = {
  scopes: ['openid', 'profile', 'User.Read'],
  redirectUri: process.env.REDIRECT_URI,
  postLogoutRedirectUri: `http://localhost:${process.env.PORT || 3000}`,
  graphEndpoint: process.env.GRAPH_ENDPOINT || 'https://graph.microsoft.com/v1.0/me'
};

module.exports = {
  msalConfig,
  authConfig
};
