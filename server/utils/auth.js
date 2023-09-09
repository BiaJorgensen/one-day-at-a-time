const jwt = require('jsonwebtoken');

const secret = process.env.REACT_APP_SECRET;
const expiration = process.env.REACT_APP_EXPIRATION;

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ _id, firstName, lastName, email }) {
    const payload = { _id, firstName, lastName, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
}