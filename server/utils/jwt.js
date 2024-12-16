const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const expiresIn = process.env.JWT_EXPIRES_IN

exports.sign = (payload) => {
    return jwt.sign(payload, secretKey, {expiresIn})
}

exports.verify = (token) => {
    try{
        return jwt.verify(token, secretKey)
    }catch(e) {
        return false
    }
}