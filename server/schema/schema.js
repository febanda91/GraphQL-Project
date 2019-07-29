const graphql = require ('graphql')
const _ = require('lodash')




//The way to define object types in GraphQL 
//This extracts the GraphQLObjectType variable from the graphql package 
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql


//dummy data 
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id:'1'},
    {name: 'The Final Empire', genre: 'Fantasy', id:'2'},
    {name: 'The Long Earth',  genre: 'Sci-Fi', id:'3'}
]


//Define our first object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    //multiple types that have reference to one another so "fields" needs to be a function 
    //need to use GraphQLString, can't use regular string 
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})


//Define our Root Query (how we initially jump into the graph)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //when someone querys the BookType, then we expect them to pass in an id property 
            args: {id: {type: GraphQLString}}, 
            resolve(parent,args){
             //code to get data from db / other source 
             return _.find(books, {id:args.id})

            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})