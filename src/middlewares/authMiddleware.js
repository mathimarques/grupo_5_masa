function authMiddleware(req, res, next) {
    // Página disponibles solo para usuarios logueados
    if (req.session.userToLog != undefined) {
      next();
    } else {
      res.send("Esta página es solo para usuarios");
    }
  }
  
  module.exports = authMiddleware;