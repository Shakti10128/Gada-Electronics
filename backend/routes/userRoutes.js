const express = require("express");
const { registerUser, login, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/Auth.js');

const Router = express.Router();

Router.route('/registerUser').post(registerUser);

Router.route('/login').post(login);

Router.route('/password/forgot').post(forgotPassword);

Router.route('/password/reset/:token').put(resetPassword);

Router.route('/logout').get(logout);

Router.route('/profile').get(isAuthenticatedUser,getUserDetails);

Router.route('/profile/update-password').put(isAuthenticatedUser,updateUserPassword);

Router.route('/profile/update-profile').put(isAuthenticatedUser,updateUserProfile);

Router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

Router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports = Router;