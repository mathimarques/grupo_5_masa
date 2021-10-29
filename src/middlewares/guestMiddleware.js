function guestMiddleware(req, res, next) {
    // // Página disponibles solo para usuarios no logueados
    if (req.session.userToLog == undefined) {
      next();
    } else {
        let mensaje = "invitados, por favor realice log-off para ingresar...";
        res.render("authError", { mensaje });
    }
  }
  
  module.exports = guestMiddleware;