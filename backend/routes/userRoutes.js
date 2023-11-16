const express = require("express");
const { registerUser, login, logout, forgotPassword, resetPassword } = require("../controllers/userController");

const Router = express.Router();

Router.route('/registerUser').post(registerUser);

Router.route('/login').post(login);

Router.route('/password/forgot').post(forgotPassword);

Router.route('/password/reset/:token').put(resetPassword);

Router.route('/logout').get(logout);

module.exports = Router;