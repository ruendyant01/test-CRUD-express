const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || "kfljalfjaskdf"

const makeToken = (data) => {
    return jsonwebtoken.sign(data,secret)
}

const checkToken = (token) => {
    return jsonwebtoken.verify(token,secret)
}

module.exports = {checkToken, makeToken}