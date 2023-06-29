const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

//CREATE
router.post('/',verify, async (req, res) => {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
})

//UPDATE
router.put('/:id',verify, async (req, res) => {
    // if(req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, 
                {
                    $set: req.body,

                },
                {
                    new: true
                }
            )
            res.json(updatedMovie)
        } catch (error) {
            res.json(error);   
        }
    // } else{
    //     res.json("You are not allowed !");
    // }
})

//DELETE
router.delete('/:id',verify, async (req, res) => {
    // if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.json("The movie has been deleted...")
        } catch (error) {
            res.json(error);   
        }
    // } else{
    //     res.json("You are not allowed !");
    // }
})

//GET
router.get('/find/:id',verify, async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id)
        res.json(movie)
    } catch (error) {
        res.json(error);   
    }
})

//GET RANDOM
router.get('/random',verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if(type === 'series'){
            movie = await Movie.aggregate([
                {
                    $match: {isSeries:true}
                },
                {
                    $sample: {size:1}
                }
            ]);
        } else{
            movie = await Movie.aggregate([
                {
                    $match: {isSeries:false}
                },
                {
                    $sample: {size:1}
                }
            ])
        }
        res.json(movie)
    } catch (error) {
        res.json(error);   
    }
})

//GET ALL
router.get('/',verify, async (req, res) => {
    // if(req.user.isAdmin){
        try {
            const movies = await Movie.find()
            res.json(movies.reverse())
        } catch (error) {
            res.json(error);   
        }
    // } else{
    //     res.json("You are not allowed !");
    // }
})

module.exports = router;