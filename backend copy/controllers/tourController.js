const Tour = require('../models/Tour')

//create new tour

const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save()
        res.status(200).json({ success: true, message: 'successfully created', data: savedTour })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create tour. Try again' })
    }
}

//update tour 
const updateTour = async (req, res) => {
    const id = req.params.id

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set:req.body,
        },{new:true})
        res.status(200).json({ success:true ,message:'Successfully Updated' , data:updatedTour })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update tour. Try again' })

    }
}

//delete tour 
const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Tour Deleted successfully"})
    } catch (error) {
        rs.status(500).json({
            success:false , message:"Failed to Delete tour. Try again"
        })
    }
}

//getsingle tour 
const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({success:true,message:'Tour get Successfully' , data:tour})
    } catch (error) {
        res.status(404).json({success:false , message:"not Found"})
    }
}

//getAll tour 
const getAllTour = async (req, res) => {
     const page = parseInt (req.query.page);
    //  console.log(page);
    try {
        const tours = await Tour.find().populate('reviews') 
        .skip(page * 8)
        .limit(8);

        res.status(200).json({success:true,count:tours.length,message:'Tours get Successfully' , data:tours})
    } catch (error) {
        res.status(404).json({success:false , message:"not Found"})
    }
}

//get tour by search

const getTourBySearch = async (req,res)=>{
    const city = new  RegExp(req.query.city , 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        const tours = await Tour.find({city ,  distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({  success:true,message:'successfull',data:tours  })
    } catch (error) {
        res.status(404).json({  success:false,message:'not found' })
        
    }
}


//get Featured tour 
const getFeaturedTour = async (req, res) => {
   
   try {
       const tours = await Tour.find({featured:true}).populate('reviews').limit(8);

       res.status(200).json({success:true, message:'  Successfully' , data:tours})
   } catch (error) {
       res.status(404).json({success:false , message:"not Found"})
   }
}

//get tour counts
const getTourCount = async(req,res)=>{
    try{
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({success:true, message:'  Successfully' , data:tourCount})
    }
    catch(error){
        res.status(404).json({success:false , message:"failed to fetch"})

    }
}

module.exports = {createTour, updateTour, deleteTour, getSingleTour, getAllTour ,getTourBySearch ,getFeaturedTour , getTourCount} 