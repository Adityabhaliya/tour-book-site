const express = require('express')
const dotenv = require ('dotenv')
const mongoose = require ('mongoose')
const cors = require ('cors')
const cookieParser = require ('cookie-parser')
const tourRoute = require('./routes/tours')
const userRoute = require('./routes/users') 
const authRoute = require('./routes/auth')
const reviewRoute = require('./routes/reviews')
const bookingRoute = require('./routes/bookings')


dotenv.config()
const app = express()
const port = process.env.PORT || 8000 
const corsOptions = {
    origin:true,
    credentials:true
}

//database connection
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Mongodb Database connection success");
    } catch (error) {
        console.log('Mongodb database connection failed');
    }
} 

//middleware 
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/tours',tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/booking',bookingRoute)

app.listen(port,()=>{
    connect();
    console.log('server listening on port ' ,port);
})