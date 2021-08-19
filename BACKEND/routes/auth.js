const router = require('express').Router();

const { register , login , forgotpassword , resetpassword , loginStaff , registerStaff} = require("../controllers/auth");

router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);

//--------------------------Staff Routes------------------------------------------

router.route("/staff-login").post(loginStaff);
router.route("/staff-register").post(registerStaff);

module.exports = router;