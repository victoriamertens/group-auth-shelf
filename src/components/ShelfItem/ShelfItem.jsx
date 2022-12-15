function ShelfItem({item}) {
    console.log('ShelfPage.js', item.description)
    return (
        <div>{item.description}</div>
    )

}

export default ShelfItem;