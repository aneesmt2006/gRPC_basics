const mongoose = require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/gRPC1');
        console.log("database connected for GRPC")
    } catch (error) {
        console.log('error is ',error)
    }
}


module.exports = connectDB