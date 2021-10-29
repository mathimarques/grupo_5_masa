function authMiddleware(req, res, next) {
  // Página disponibles solo para usuarios logueados
  if (req.session.userToLog != undefined) {
    next();
  } else {
    let mensaje = "usuarios administradores, por favor realice log-in para ingresar...";
    res.render("authError", { mensaje });
  }
}

module.exports = authMiddleware;
