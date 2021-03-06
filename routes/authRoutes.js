// create a router from express. Then create routes for these pages: login, signup and resetpassword
// need to require passport as well to use "isAuthenticated" function, which is used to []
// also need to require the controllers files as we direct all routes to them

const express = require('express')
const router = express.Router()
const passport = require('passport')
const authControllers = require('../controllers/authControllers')

// create function to determine what happens if use navigates to a page that requires log in
function authenticatedUser (req, res, next) {
  // if user is authenticated, then we proceed with the next callback
  if (req.isAuthenticated()) return next()
  // if user is not authenticated, show error message via flash and redirect to login page
  req.flash('errorMessage', 'Log in to access!')
  return res.redirect('/login')
}

// create function to determine what happens if use navigates to a page that requires user to be logged out
function unauthenticatedUser (req, res, next) {
  // if user is NOT authenticated, then we proceed with the next callback
  if (!req.isAuthenticated()) return next()
  // if user is authenticated, show error message via flash and redirect to [?]]
  req.flash('info', 'You are already logged in!')
  // the above flash definition (label = info, message = you are logged in) is PASSED to the session
  return res.redirect('/user/dashboard')
}

// login routes
router.route('/login')
  .get(unauthenticatedUser, authControllers.getLogin)
  .post(authControllers.postLogin)

// signup routes
router.route('/signup')
  .get(unauthenticatedUser, authControllers.getSignup)
  .post(authControllers.postSignup)

// resetpassword routes
router.route("/resetpassword")
  .get(function (req, res) {
    res.send('Please contact site administrator at administrator [at] matchapp.io [this is a dummy email... in case that\'s not obvious]')
  })

// logout route
router.route("/logout")
  .get(authControllers.getLogout)

// export router
module.exports = router
