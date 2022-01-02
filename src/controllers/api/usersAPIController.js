const db = require("../../database/models");

const usersAPIController = {
  list: (req, res) => {
    // Busco en db todos los usuarios
    db.User.findAll({
      include: ["role"],
    }).then((users) => {
      // Genero un array con todos los usuarios; buena practica.
      let usersArray = users.map((user) => {
        return user.dataValues;
      });
      // Recorro el array de usuarios para eliminar datos que no queremos mostrar en el endpoint
      usersArray.forEach((user) => {
        delete user.username;
        delete user.address;
        delete user.password;
        delete user.image;
        delete user.id_role;
        delete user.role;
        user.detailURL = `http//localhost:3000/api/users/${user.id}`;
      });

      // Respuesta de la api
      return res.status(200).json({
        meta: {
          total: users.length,
          status: 200,
          url: "api/users",
        },
        data: usersArray,
      });
    });
  },

  detail: (req, res) => {
    db.User.findByPk(req.params.id, {
      include: ["role"],
    }).then((user) => {
      // Genero un nuevo objeto como buena practica para luego eliminar los campos que no necesito
      let userArray = user.dataValues;
      delete userArray.password;
      delete userArray.id_role;
      delete userArray.role;

      // Respuesta de la api
      return res.status(200).json({
        meta: {
          status: 200,
          url: "api/users/" + req.params.id,
        },
        data: userArray,
        linkImg: `http//localhost:3000/img/${userArray.image}`,
      });
    });
  },
};

module.exports = usersAPIController;
