var NavBar = require('../controllers/NavBar');

var noAuthLinks = [
  {path: '/login', label: 'Login'},
  {path: '/about', label: 'About'}
];

var authLinks = [
  {path: '/dashboard', label: 'Dashboard'},
  {path: '/account', label: 'Account'}
];

module.exports = function(activePath) {
  return NavBar({
    activePath: activePath,
    noAuthLinks: noAuthLinks,
    authLinks: authLinks
  });
};
