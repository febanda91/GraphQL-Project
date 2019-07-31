import React from 'react'
import {Component} from 'react'
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
 



class BookList extends Component{
    displayBooks(){
        var data = this.props.data
        if(data.loading){
            return(<div>Loading books...</div>)
        }else{
            return data.books.map(book => {
                return(<li key={book.id}>{book.name}</li>)
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="book-list">
                    {this.displayBooks()}

                </ul>
            </div>
        )
    }
}


//use graphql to bind the getBooksQuery to the BookList component 
export default graphql(getBooksQuery)(BookList)