const express = require('express');
const profileRouter = express.Router();

const {getProfileData, updateProfile, getPortfolio, sendMessage} = require('../controllers/profileControllers');
const {checkAuthorization} = require('../middlewares/authorizationMiddleware');

// endpoint prefix : /profile

profileRouter.get('/get-data', checkAuthorization, getProfileData);
profileRouter.put('/update-data', checkAuthorization, updateProfile);

profileRouter.get('/get-portfolio/:username', getPortfolio);
profileRouter.post('/send-message', sendMessage);

module.exports = {profileRouter};