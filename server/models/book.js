const mongoose = require('mongoose')
const schema = mongoose.Schema 

const bookSchema = new schema({
    name:String,
    genre: String,
    authorid: String 
})


//We're making a model called 'Book' and that model will have objects inside of it that will look like the bookSchema

module.exports = mongoose.model('Book', bookSchema)