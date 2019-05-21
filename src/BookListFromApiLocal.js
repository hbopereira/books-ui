import React from 'react';
import BookCardApiLocal from './BookCardApiLocal'

const BookListFromApiLocal = (props) => {
    return(
        <div className="list">
            {
               props.booksapi.map((book, i) => {
                   return <BookCardApiLocal
                             key={i}
                             id={book.id}
                             image={book.image}
                             title={book.title}
                           />
               })
            }  
        </div>
      )
}

export default BookListFromApiLocal;