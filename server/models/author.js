const mongoose = require('mongoose')
const schema = mongoose.Schema 

const authorSchema = new schema({
    name:String,
    age: Number
  
})


//We're making a model called 'Author' and that model will have objects inside of it that will look like the bookSchema

module.exports = mongoose.model('Author', authorSchema)