const Auth = require('../auth');
const {logError} = require('../utils');

module.exports = {
  async auth(event) {
    let statusCode, body;
    const {user, password} = JSON.parse(event.body);
    let token;

    try {
      if (await Auth.credentialsAreValid(user, password)) {
        token = await Auth.sign({user, password});
        statusCode = 200;
        body = JSON.stringify({ok: true, token});
      }
    } catch(e) {
      logError(e);
      statusCode = 401;
      body = JSON.stringify({ok: false, error: e}, null, 2);
    }

    return { statusCode, body };
  }
};
