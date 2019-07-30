const graphql = require ('graphql')
const _ = require('lodash')




//The way to define object types in GraphQL 
//This extracts the GraphQLObjectType variable from the graphql package 
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList} = graphql


//dummy data 
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id:'1', authorid: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id:'2', authorid: '2'},
    {name: 'The Long Earth',  genre: 'Sci-Fi', id:'3', authorid: '3'},
    {name: 'Cat in the Hat',  genre: 'Fantasy', id:'4', authorid: '2'},
    {name: 'Harry Potter',  genre: 'Fantasy', id:'5', authorid: '3'},
    {name: 'Goosebumps',  genre: 'Fantasy', id:'6', authorid: '3'}
]

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id:'1'},
    {name: 'Brandon Tubbs', age: 42, id:'2'},
    {name: 'Terry Patch', age: 36, id:'3'}
]


//Define our first object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    //wrap fields in a function so that BookType has access to AuthorType and vice versa. Handles async process  
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorid})
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorid: parent.id})
            }
        }
    })
})


//Define our Root Query (how we initially jump into the graph)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //when someone querys the BookType, then we expect them to pass in an id property 
            args: {id: {type: GraphQLID}}, 
            resolve(parent,args){
             //code to get data from db / other source 
             return _.find(books, {id:args.id})

            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books 
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})