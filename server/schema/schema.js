const graphql = require ('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')




//The way to define object types in GraphQL 
//This extracts the GraphQLObjectType variable from the graphql package 
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList} = graphql





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
                // return _.find(authors, {id: parent.authorid})
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
                // return _.filter(books, {authorid: parent.id})
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
            //  return _.find(books, {id:args.id})

            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books 
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age 
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid,
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})