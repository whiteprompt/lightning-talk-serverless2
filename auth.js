const JWT = require('jsonwebtoken');
const {AUTH_SECRET, ADMIN_USER, ADMIN_PASSWORD} = process.env;

module.exports = {
  verify(token) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, AUTH_SECRET, (error, decoded) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(decoded);
        }
      });
    });
  },

  sign(data) {
    return new Promise((resolve, reject) => {
      JWT.sign(data, AUTH_SECRET, {algorithm: 'HS256'}, (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      });
    });
  },

  credentialsAreValid(user, password) {
    const requiredUser = ADMIN_USER;
    const requiredPassword = ADMIN_PASSWORD;
    return new Promise((resolve, reject) => {
      if (user === requiredUser && password === requiredPassword) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  },

  getToken(event)  {
    return event.headers.Authorization.split('Bearer ')[1]
  }
};
