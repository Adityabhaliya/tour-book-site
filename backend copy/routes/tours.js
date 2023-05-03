const express = require('express');
const { verifyAdmin } = require('../utils/verifyToken');
 
const {createTour , updateTour ,deleteTour ,getSingleTour ,getAllTour , getTourBySearch , getFeaturedTour ,getTourCount} = require('./../controllers/tourController')
 
 
const router = express.Router();

//create new tour
router.post('/',verifyAdmin,createTour);

//update new tour
router.put('/:id',verifyAdmin,updateTour);

//delete new tour
router.delete('/:id',verifyAdmin,deleteTour);

//getsingle new tour
router.get('/:id',getSingleTour);

//getall new tour
router.get('/',getAllTour);

//get tour by search
router.get('/search/getTourBySearch',getTourBySearch);

//get tour by search
router.get('/search/getFeaturedTours',getFeaturedTour);

//get tour by search
router.get('/search/getTourCount',getTourCount);
 
module.exports = router