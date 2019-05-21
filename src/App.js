import React, { Component } from 'react';
import Header from './Header';
import Books from './Books';
import PesquisarLivro from './PesquisarLivro'
import firebase from "firebase"
import StyledFirebase from "react-firebaseui/StyledFirebaseAuth"
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter, Route} from 'react-router-dom'
import BookListFromApiLocal from './BookListFromApiLocal'
import ReactDOM from "react-dom";
import {Button} from 'reactstrap'
import './App.css';


firebase.initializeApp({
    apiKey: "AIzaSyCH3s3yIZakI-CWt9YUOYHvHd8h3XdDeCA",
    authDomain: "ui-books-front.firebaseapp.com"
})

class App extends Component {
  state={isSignedIn:false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = ()=>{
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
    })
  }

  render(){
   return (
     <div className="App">
       {this.state.isSignedIn ? (
         <span>
           <div>
              <Header/>
              <Books/>
           </div>
         <Button color="info" onClick={()=>firebase.auth().signOut()}>Sair</Button>
         </span>
       ) : (
         <StyledFirebaseAuth
           uiConfig={this.uiConfig}
           firebaseAuth={firebase.auth()}/>
       )}
     </div>
   );
  }
}

export default App;
