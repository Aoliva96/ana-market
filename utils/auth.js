// TODO (stretch-goal): Add alert that notifies the user that they must login to view more info, delay 3-5 seconds then redirect (this may involve other files)

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
