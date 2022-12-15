import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ShelfForm() {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  function addItem() {
    event.preventDefault();
    console.log('in add item');
    dispatch({ type: 'ADD_SHELF_ITEM', payload: { description, url } });
  }
  return (
    <form onSubmit={addItem}>
      <input
        onChange={(event) => {
          setDescription(event.target.value);
          console.log(description);
        }}
        type="text"
        placeholder="Description"
      ></input>
      <input
        onChange={(event) => setUrl(event.target.value)}
        type="text"
        placeholder="Image-URL"
      ></input>
      <button>Submit</button>
    </form>
  );
}

export default ShelfForm;
