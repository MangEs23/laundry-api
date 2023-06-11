require('dotenv').config()
const jwt = require('jsonwebtoken');

const authorizeJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers["x-access-token"];
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authorizeJWT;