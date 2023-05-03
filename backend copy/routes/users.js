const express = require('express');
const {createUser  , updateUser  ,deleteUser  ,getSingleUser  ,getAllUser   } = require('./../controllers/UserController')
 
 
const router = express.Router();
const {verifyUser,verifyAdmin} = require('../utils/verifyToken') 

//update new User 
router.put('/:id',verifyUser,updateUser );

//delete new User 
router.delete('/:id',verifyUser,deleteUser );

//getsingle new User 
router.get('/:id',verifyUser,getSingleUser );

//getall new User 
router.get('/',verifyAdmin,getAllUser );

 
 
module.exports = router