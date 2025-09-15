const mongoose = require('mongoose')

 let  Schema = mongoose.Schema

 const newsSchema = new Schema({
     id:{
        type:String,
        required:true,
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
    postImage:{
        type:String
    }
 })

 module.exports = mongoose.model('News',newsSchema)