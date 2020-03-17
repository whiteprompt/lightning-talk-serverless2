const crypto = require('crypto');
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};


module.exports = {
  getSalt(length=32) {
    return crypto
      .randomBytes(Math.ceil(length/2))
      .toString('hex')
      .slice(0, length);
  },
  sha512,
  saltHashPassword(password) {
    const salt = process.env.SALT;
    if (!salt) {
      throw Error('SALT is not set');
    }

    return sha512(password, salt);
  },
  logError(error) {
    console.log("ERROR ==================================================");
    console.log(error);
    console.log("========================================================\n\n\n");
  }
};
