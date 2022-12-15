import ShelfForm from '../ShelfForm/ShelfForm.jsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShelfItem from '../ShelfItem/ShelfItem';

function ShelfPage() {
  const dispatch = useDispatch();

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

  return (
    <div className="container">
      <h2>Shelf</h2>
      <ShelfForm />
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
