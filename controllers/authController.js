const Auth = require('../auth');

class AuthController {
  static async auth(event) {
    let token;
    let statusCode;
    let body;
    const {user, password} = JSON.parse(event.body);

    try {
      if (await Auth.credentialsAreValid(user, password)) {
        token = await Auth.sign({user, password});
        statusCode = 200;
        body = JSON.stringify({ok: true, token});
      }
    } catch (e) {
      statusCode = 404;
      body = JSON.stringify({ok: false, error: e}, null, 2)
    }

    return {statusCode, body};
  }

}

module.exports.AuthController = AuthController;
