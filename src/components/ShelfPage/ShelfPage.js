import ShelfForm from '../ShelfForm/ShelfForm.jsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShelfItem from '../ShelfItem/ShelfItem';
import { useHistory } from 'react-router-dom';

function ShelfPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const shelf = useSelector((store) => store.shelf);

  console.log('shelfpage', shelf);

  useEffect(() => {
    dispatch({ type: 'GET_SHELF' });
  }, []);

  // if(!shelf.data){
  //   return (
  //     <p>loading</p>
  //   )
  // }

  function myItemsPage() {
    console.log('diverting');
    history.push('/edit');
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <ShelfForm />
      <button onClick={myItemsPage}>Edit My Items</button>
      <div>
        {shelf.map((item) => {
          return <ShelfItem key={item.id} item={item} />;
        })}
      </div>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
