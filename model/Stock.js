// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let stockModel = mongoose.Schema({
    Name:String,
    Author:String,
    Published:String,
    Description:String,
    Price:Number
},
{
    collection:"Stock"
}
)
module.exports = mongoose.model('Stock', stockModel);
