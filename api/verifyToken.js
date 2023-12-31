const jwt = require("jsonwebtoken")

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split("Bearer ")[1]

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) res.json("Token is not valid!");
            req.user = user;
            next();
        })
    } else{
        return res.json("You are not authenticated")
    }
}

module.exports = verify;