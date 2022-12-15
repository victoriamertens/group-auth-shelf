import { useDispatch } from 'react-redux';

function ShelfItem(props) {
  let item = props.item;
  let dispatch = useDispatch();
  console.log('ShelfPage.js', item.description);
  console.log('This is the data:', item);
  function deleteItem() {
    console.log('Delete:', item.id);
    dispatch({ type: 'DELETE_ITEM', payload: props.item });
  }
  if (props.delete) {
    return (
      <div>
        <p>{item.description}</p>
        <img src={item.image_url}></img>
        <button onClick={deleteItem}>Delete</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>{item.description}</p>
        <img src={item.image_url}></img>
      </div>
    );
  }
}

export default ShelfItem;
