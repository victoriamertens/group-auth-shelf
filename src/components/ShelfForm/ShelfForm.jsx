import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ShelfForm() {
  const [description, setDescription] = useState('');
  const [image_url, setImage_Url] = useState('');
  const dispatch = useDispatch();

  function addItem() {
    event.preventDefault();
    console.log('in add item');
    dispatch({ type: 'POST_ITEM', payload: { description, image_url } });
    setDescription('');
    setImage_Url('');
  }
  return (
    <form onSubmit={addItem}>
      <div>
        <input
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          type="text"
          placeholder="Description"
          value={description}
        ></input>
        <input
          onChange={(event) => setImage_Url(event.target.value)}
          type="text"
          placeholder="Image-URL"
          value={image_url}
        ></input>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default ShelfForm;
