require('dotenv').config();
var jwt = require('jsonwebtoken');

const tokenCheck = async (req, res, next) => {
    try {
        const userDetails = await jwt.verify(req.headers.authorization, process.env.SESSION_SECRET)

        console.log('Token', userDetails.user.id, '~ ID', req.params.steamid)
        
        if (userDetails && (userDetails.user.id === req.params.steamid)) {
            return next()
        }

        return res.redirect('/')
    } catch (err) {
        console.log('incorrect token')
        return res.redirect('/')
    }
}

module.exports = tokenCheck;