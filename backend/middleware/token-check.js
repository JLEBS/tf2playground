require('dotenv').config();
var jwt = require('jsonwebtoken');

const tokenCheck = async (req, res, next) => {

    console.log('cookies req', req);
    console.log('COOKIE HERE req', req.cookies);

    try {
        const userDetails = await jwt.verify(req.cookies.steamIdAuth, process.env.SESSION_SECRET)

        console.log('Token is here', userDetails.user.id, '~ ID', req.params.steamid)
        
        if (userDetails && userDetails.user.id) {
            req.user = userDetails.user
            console.log('forwarding')
            return next()
        }

        return res.redirect('/')
    } catch (err) {
        console.log('incorrect token', err)
        return res.redirect('/')
    }
}

module.exports = tokenCheck;