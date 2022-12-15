function ShelfItem({ item }) {
  console.log('ShelfPage.js', item.description);
  console.log(item);
  return (
    <div>
      <p>{item.description}</p>
      <img src={item.image_url}></img>
    </div>
  );
}

export default ShelfItem;
