const express = require('express')
const schema = require('./schema/schema')

//An ORM that helps communicate with the MongoDB Database
const mongoose = require('mongoose')

//express grapql module - allows express to communicate with graphql
const graphqlHTTP = require('express-graphql')

//invoke function to create app 
const app = express()


//allow cross-origin requests 
const cors = require('cors')
app.use(cors())

//connect to MongoDB Atlas Database
mongoose.connect('mongodb+srv://chiquis:test123@cluster0-a3p6u.mongodb.net/test?retryWrites=true&w=majority')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})

//middleware 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true 
}))


app.listen(3000, () => {
    console.log('now listening for requests on port 3000')
})