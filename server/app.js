const express = require('express')
const schema = require('./schema/schema')

//express grapql module - allows express to communicate with graphql
const graphqlHTTP = require('express-graphql')

//invoke function to create app 
const app = express()

//middleware 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true 
}))


app.listen(3000, () => {
    console.log('now listening for requests on port 3000')
})