// Simple auth middleware stub used during local development.
// Replace with real authentication logic as needed.
module.exports.isveryfieduser = function (req, res, next) {
  // For now, allow all requests through. Attach a dummy user if needed.
  req.user = req.user || { id: 'dev-user', role: 'admin' };
  next();
};

module.exports.isverifieduser = module.exports.isveryfieduser;
