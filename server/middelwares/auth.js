const jwtHelpers = require('../utils/jwt')

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization
            const check = jwtHelpers.verify(token)
            if (check) {
                req.currentUser = check
                next()
            } else {
                res.json({
                    title: 'Alert',
                    message: 'Token is no longer valid. Login again'
                })
            }

        } else {
            res.status(400).json({
                title: 'Alert',
                message: 'No verification code provided'
            })
        }
    } catch(e) {
        res.status(500).json({
            title: 'Alert',
            message: 'Something is wrong'
        })
    }

}

module.exports = isLoggedIn