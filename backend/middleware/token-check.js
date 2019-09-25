require('dotenv').config();
var jwt = require('jsonwebtoken');

const tokenCheck = async (req, res, next) => {

    try {
        const userDetails = await jwt.verify(req.cookies.steamIdAuth, process.env.SESSION_SECRET)
        
        if (userDetails && userDetails.user.id) {
            req.user = userDetails.user
            console.log('Token successful')
            return next()
        }

        return res.redirect('/')
    } catch (err) {
        console.log('Incorrect token', err)
        return res.redirect('/')
    }
}

module.exports = tokenCheck;