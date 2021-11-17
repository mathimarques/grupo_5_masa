function guestMiddleware(req, res, next) {
    // // Página disponibles solo para usuarios no logueados
    if (req.session.userToLog == undefined) {
      next();
    } else {
        let mensaje = "Ya estás logueado!";
        res.render("authError", { mensaje, userLogged: req.session.userToLog });
    }
  }
  
  module.exports = guestMiddleware;