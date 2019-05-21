import React, { Component } from 'react';
import Header from './Header';
import request from 'superagent';
import axios from 'axios'
import BookList from './BookList';
import BookListFromApiLocal from './BookListFromApiLocal';
import ReactDOM from "react-dom";
import {Button, FormGroup, FormControl} from 'reactstrap'


class Books extends Component {
  constructor(props){
      super(props);

      this.textInput = React.createRef();
      this.textInputApi = React.createRef();


      this.state = {
          books: [],
          booksapi: [],
          value: ''
      }
  }

  searchBookFromAPIGoogle = e => {
      e.preventDefault();
      const valueInput = this.textInput.current.value;
      axios
        .get("http://localhost:8080/api/books/json" ,{
             params: {
                 descricao: `${valueInput}`
             }
          })
          .then((data) => {
              console.log(data);
              this.setState({books: [...data.data.items]})
          })

  }

  searchBookFromApiRestLocal = e => {
    e.preventDefault();
    const valueInputApi = this.textInputApi.current.value;
    axios
      .get("http://localhost:8080/api/books" ,{
        params: {
            searchTerm: `${valueInputApi}`
        }
        })
        .then((data) => {
            console.log(data);
            this.setState({booksapi: [...data.data.content]})
        })

}

  
  handleSearch = (e) => {
      console.log(e.target.value);
      this.setState({ searchField: e.target.value })
  }

  render(){
   return (
   <div>
     <br/>
     <div className="row">
       <div className="col-md-6">
          <form onSubmit={this.searchBookFromAPIGoogle}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="Pesquisar google books" ref={this.textInput} />
              <br/>
              <Button color="info">Pesquisar</Button>
            </div>
          </form>
       </div>
       <div className="col-md-6">
          <form onSubmit={this.searchBookFromApiRestLocal}>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="Pesquisar favoritos" ref={this.textInputApi}/>
              <br/>
              <Button color="info">Pesquisar</Button>
            </div>
          </form>
       </div>
     </div>

     <div className="row">
        <div className="col-md-6">
          <BookList books={this.state.books}/>
        </div>
        <div className="col-md-6">
          <BookListFromApiLocal booksapi={this.state.booksapi}></BookListFromApiLocal>
        </div>
     </div>
  
   </div>
   );
  }
}

export default Books;
