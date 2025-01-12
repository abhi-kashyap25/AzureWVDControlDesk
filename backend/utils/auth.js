const jwt = require('jsonwebtoken');
const { DefaultAzureCredential } = require('@azure/identity');
const msal = require('@azure/msal-node');
require('dotenv').config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'your_jwt_secret_key'; // Replace with a secure key
const AZURE_CREDENTIAL = new DefaultAzureCredential();

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Middleware to validate JWT for protected routes.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token is required' });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    req.user = user;
    next();
  });
};

/**
 * Generate a JWT for the authenticated user.
 * @param {Object} user - The user object (e.g., { id, username }).
 * @returns {string} - Signed JWT.
 */
const generateToken = (user) => {
  return jwt.sign(user, TOKEN_SECRET, { expiresIn: '1h' });
};

/**
 * Azure authentication for backend SDK clients.
 * @returns {DefaultAzureCredential} - Azure credential for SDK usage.
 */
const getAzureCredential = () => {
  return AZURE_CREDENTIAL;
};

/**
 * Get Azure AD token for API requests.
 * @returns {Promise<string>} - Azure AD access token.
 */
const getAzureAuthToken = async () => {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ['https://management.azure.com/.default'],
  });
  return result.accessToken;
};

module.exports = {
  authenticateToken,
  generateToken,
  getAzureCredential,
  getAzureAuthToken,
};