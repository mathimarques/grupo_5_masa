function guestMiddleware(req, res, next) {
    // // Página disponibles solo para usuarios no logueados
    if (req.session.userToLog == undefined) {
      next();
    } else {
      res.send("Esta página es solo para invitados");
    }
  }
  
  module.exports = guestMiddleware;