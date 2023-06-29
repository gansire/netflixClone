const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const verify = require('../verifyToken');

//UPDATE
router.put('/:id',verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJs.AES.encrypt( req.body.password, process.env.SECRET_KEY).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.json(updatedUser)
        } catch (error) {
            res.json(error);
        }
    } else{
        res.json("You can update only yout account!")
    }
})

//DELETE
router.delete('/:id',verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
       
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json("User has been deleted...")
        } catch (error) {
            res.json(error);
        }
    } else{
        res.json("You can delete only yout account!")
    }
})

//GET
router.get('/find/:id',verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...info } = user._doc;
        res.json(info)
    } catch (error) {
        res.json(error);
    }
})

//GET ALL
router.get('/',verify, async (req, res) => {
    console.log(req)
    const query = req.query.new; 
    if(req.user.isAdmin){
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(2) : await User.find();
            res.json(users)
        } catch (error) {
            res.json(error);
        }
    } else{
        res.json("You are not allowed to see all users!")
    }
})

//GET USER STATS
router.get('/stats', async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    try {
        const data = await User.aggregate([
            {
                $project:{
                    month:{$month: "$createdAt"}
                }
            },{
                $group:{
                    _id: "$month",
                    total: {$sum:1}
                }
            }
        ])
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;