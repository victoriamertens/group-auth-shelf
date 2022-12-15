import React from 'react';
import { useState } from 'react';

function ShelfPage() {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  function addItem() {
    event.preventDefault();
    console.log('in add item');
  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={addItem}>
        <input
          onChange={(event) => {
            setDescription(event.target.value);
            console.log(description);
          }}
          placeholder="Description"
          type="text"
        ></input>
        <input type="text" placeholder="Image URL"></input>
        <button>Submit</button>
      </form>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
