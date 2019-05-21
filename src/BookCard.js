import React from 'react';
import axios from 'axios'
import fetch from 'isomorphic-fetch';
import ReactDOM from "react-dom";
import {Table, Button} from 'reactstrap'


class BookCard extends React.Component {

      handleSubmit = event => {
        event.preventDefault();
    
        const book = {
          image: this.props.image,
          title: this.props.title,
         // author: this.props.author,
          published: this.props.published
        };
    
        axios('http://localhost:8080/api/books',{
            method: 'POST',
            data : book,
            headers: {
             // 'Authorization': `bearer ${token}`,
             'Content-Type': 'application/json'
           }
         })
      }

    render() {
    return(
        <form onSubmit={this.handleSubmit}>
        <div className="card-container">
           <img src={this.props.image} alt=""/>
           <div className="desc">
             <h2 >{this.props.title}</h2>
             <p>{this.props.published}</p>
             <Button color="primary"  type="submit" color="info"   onClick={() => {
              alert("O livro foi adcionado a sua lista de favoritos!")
              }}>Add Favoritos</Button>
           </div>
        </div>
        </form>
    )
  }
}



export default BookCard;

