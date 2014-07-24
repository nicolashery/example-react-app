module.exports = {
  matchedPaths: [
    '/',
    '/login',
    '/about',
    '/dashboard',
    '/account',
    '/404'
  ],
  noAuthPaths: ['/login', '/about'],
  defaultAuthPath: '/dashboard',
  defaultNoAuthPath: '/login',
  notFoundPath: '/404'
};
