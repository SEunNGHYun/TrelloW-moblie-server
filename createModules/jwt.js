const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/secret_key');

module.exports = {
  makeToken: function (data) {
    const token = jwt.sign({
      id: data.id
    }, secretKey, { expiresIn: 3600 * 96 * 24 });
    return token;
  },
  verify: function (token) {
    console.log('토큰', token);
    return jwt.verify(token, secretKey);
  }
};