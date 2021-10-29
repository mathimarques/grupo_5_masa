function authMiddleware(req, res, next) {
    if (req.session.userToLog != undefined) {
      next();
    } else {
      res.send("Esta página es solo para usuarios");
    }
  }
  
  module.exports = authMiddleware;