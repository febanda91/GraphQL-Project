import React from 'react'
import {Component} from 'react'
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'


//components
import BookDetails from './BookDetails'



class BookList extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected: null 
        }
    }

    displayBooks(){
        var data = this.props.data
        if(data.loading){
            return(<div>Loading books...</div>)
        }else{
            return data.books.map(book => {
                return(<li key={book.id} onClick={(e) => {this.setState({selected: book.id})}}>{book.name}</li>)
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="book-list">
                    {this.displayBooks()}

                </ul>
                <BookDetails bookid={this.state.selected}/>
            </div>
        )
    }
}


//use graphql to bind the getBooksQuery to the BookList component 
export default graphql(getBooksQuery)(BookList)