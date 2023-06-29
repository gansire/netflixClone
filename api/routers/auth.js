const router = require('express').Router();
const User = require('../models/User.js');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
    console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt( req.body.password, process.env.SECRET_KEY).toString()
    })
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.json(error);
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    console.log("caiu aqui ")
    try {
        const user = await User.findOne( {email: req.body.email} );
        !user && res.json('Wrong password or username !')

        const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
        
        originalPassword !== req.body.password && res.json('Wrong password or username !');

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, { expiresIn: "5d"})

        const {password, ...info } = user._doc;
        res.json({...info, accessToken})

    } catch (error) {
        res.json(error);
    }
})

module.exports = router;