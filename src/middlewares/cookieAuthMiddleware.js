// Requerimos modulos necesarios
const path = require('path');
const fs = require('fs');
const { equal } = require('assert');
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

// Function para 
function cookieAuthMiddleware(req, res, next) {
  let userToLog;
  if(req.cookies.remember != undefined && req.session.userToLog == undefined){

    if(errors.isEmpty()){
      for(let i=0; i<users.length; i++){
        if(users[i].username == req.cookies.remember){
          userToLog = users[i];
        }
      }
    }

    req.session.userToLog = userToLog;
  }

    next();
  }
  module.exports = cookieAuthMiddleware;