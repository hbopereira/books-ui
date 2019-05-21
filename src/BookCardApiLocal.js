import React from 'react';
import axios from 'axios'
import fetch from 'isomorphic-fetch';
import {Table, Button, FormGroup, Modal, ModalHeader, ModalFooter, Label, ModalBody, InputGroup, InputGroupAddon,Input} from 'reactstrap'
import ReactDOM from "react-dom"; 



class BookCardApiLocal extends React.Component {

    constructor() {
        super();

        this.state = {
            books:[],
            editBookData:{
               id: '',
               title: '',
               image: ''
            },
            modal: false
          };
          
 
          this.toggle = this.toggle.bind(this);
        }
      
        toggle() {
          this.setState({
            modal: ! this.state.modal
          });
        }
    

    handleSubmit(event) {
        
        const book = {
          id: this.props.id
        };
    
        axios('http://localhost:8080/api/books',{
            method: 'DELETE',
            data : book,
            headers: {
             // 'Authorization': `bearer ${token}`,
             'Content-Type': 'application/json'
           }
        })
    }

    updateBook(){
      axios('http://localhost:8080/api/books/' ,{
        method: 'PUT',
        data :  this.state.editBookData,
        headers: {
         // 'Authorization': `bearer ${token}`,
         'Content-Type': 'application/json'
       }
     }).then(() =>{
       this.refreshBooks();

       this.setState({
         modal: false
       })
     })

    }
    

    editBook(id, title,image){
       this.setState({
           editBookData: {id, title, image}, modal: ! this.state.modal
       })
    }

    refreshBooks(){
      axios.get('http://localhost:8080/api/books/listAll').then((Response) => {
        this.setState({
            books: Response.data
        })
      })
    }

    render(){
       
        return(
        <>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle}>Editar Livro</ModalHeader>
          <ModalBody>
           <FormGroup>
              <Label for="title">Titulo</Label>
              <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                  let { editBookData } = this.state;
                  editBookData.title = e.target.value;
                  this.setState({
                      editBookData
                  })
              }} />
          </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Editar</Button>{' '}
            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancelar</Button>
          </ModalFooter>
        </Modal>

          <div className="card-container">
            <img src={this.props.image} alt=""/>
            <div className="desc">
              <h2 >{this.props.title}</h2>
              <h3>{this.props.author}</h3>
              <p>{this.props.published}</p>
              <Button className="btn btn-primary" onClick={this.editBook.bind(this, this.props.id, this.props.title, this.props.image)}
              >Editar</Button>
              <Button type="submit" color="danger"   onClick={() => {
            if (window.confirm("Tem certeza que deseja excluir este item?")) {
                this.handleSubmit();
            }
          }}>Excluir</Button>
            </div>
           </div>
         </>

           
        )
    }

}



export default BookCardApiLocal;

