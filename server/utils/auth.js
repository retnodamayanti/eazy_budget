const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  getUserFromToken: function (token) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch {
      return null;
    }
  }
};
