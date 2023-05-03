const User = require('../models/User')

//create new User

const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save()
        res.status(200).json({ success: true, message: 'successfully created', data: savedUser })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create User. Try again' })
    }
}

//update User 
const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set:req.body,
        },{new:true})
        res.status(200).json({ success:true ,message:'Successfully Updated' , data:updatedUser })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update User. Try again' })

    }
}

//delete User 
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"User Deleted successfully"})
    } catch (error) {
        rs.status(500).json({
            success:false , message:"Failed to Delete User. Try again"
        })
    }
}

//getsingle User 
const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({success:true,message:'User get Successfully' , data:user})
    } catch (error) {
        res.status(404).json({success:false , message:"not Found"})
    }
}

//getAll User 
const getAllUser = async (req, res) => {
 
    try {
        const users = await User.find({}) 
      

        res.status(200).json({success:true,count:Users.length,message:'Users get Successfully' , data:users})
    } catch (error) {
        res.status(404).json({success:false , message:"not Found"})
    }
}

module.exports = {createUser , updateUser , deleteUser , getSingleUser , getAllUser } 