const usersAPIController = {
  list: (req, res) => {
    res.send('Listado de usuarios');
  },
  detail: (req, res) => {
    res.send('Detalle de usuario');
  },
};

module.exports = usersAPIController;
