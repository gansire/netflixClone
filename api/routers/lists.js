const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

//CREATE
router.post('/',verify, async (req, res) => {
    if(req.user.isAdmin){
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();
            res.json(savedList)
        } catch (error) {
            res.json(error);   
        }
    } else{
        res.json("You are not allowed !");
    }
})

//DELETE
router.delete('/:id',verify, async (req, res) => {
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id)
            res.json("The list has been deleted...")
        } catch (error) {
            res.json(error);   
        }
    } else{
        res.json("You are not allowed !");
    }
})

//GET
router.get('/',verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {
                        $sample: {size: 10}
                    },
                    {
                        $match: {type: typeQuery, genre: genreQuery}
                    }
                ])
            } else{
                list = await List.aggregate([
                    {
                        $sample: {size: 10}
                    },
                    {
                        $match: {type: typeQuery}
                    }
                ])
            }
        } else{
            list = await List.aggregate([
                {
                    $sample: {size: 10}
                }
            ])
        }
        res.json(list);
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;