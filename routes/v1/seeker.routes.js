const express = require("express");
const seekerRoutes = express.Router();

const { seekerController } = require("../../controllers");
const { seeker_validate } = require("../../validators");
const { verifyToken } = require("../../middleware");

// Logged In USER
seekerRoutes.get('/dashboard', verifyToken.validateToken, seekerController.dashboard);

module.exports = seekerRoutes;