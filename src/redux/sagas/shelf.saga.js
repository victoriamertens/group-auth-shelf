import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

function* getShelfItems() {
  const shelfItems = yield axios.get('/api/shelf');
  yield put({ type: 'SET-SHELF', payload: shelfItems });
}

// calls post route and send payload to route
function* postShelfItem(action){
  yield axios.post('/api/shelf', action.payload);
  //refreshes shelf
  put({type: 'GET_SHELF'});
}

// deletes item by req.params.id
function* deleteShelfItem(action){
  yield axios.delete('/api/shelf/'+action.payload.id);
  //refreshes shelf
  put({type: 'GET_SHELF'});
}

function* updateItem(action){
  // req.params.id = id & all other updates will be in req.body
  yield axios.put('/api/shelf/'+action.payload.id, action.payload);
    //refreshes shelf
  put({type: 'GET_SHELF'});
}

function* countItems(action){
  const count = yield axios.get('/api/shelf/count');
  console.log('Count needs a store!!!:',count);
}

function* getAnItem(action){
  const item = axios.get('/api/shelf/'+action.payload.id);
  yield put({ type: 'SET-SHELF', payload: item});
}

function* getMyShelf(action){
  const myShelfItems = yield axios.get('/api/shelf/userId');
  yield put({ type: 'SET-SHELF', payload: myShelfItems });
}

function* shelfSaga() {
  yield takeEvery('GET_SHELF', getShelfItems);
  yield takeEvery('POST_ITEM', postShelfItem);
  yield takeEvery('DELETE_ITEM', deleteShelfItem);
  yield takeEvery('UPDATE_ITEM', updateItem);
  yield takeEvery('GET_COUNT', countItems);
  yield takeEvery('GET_ITEM_BY_ID', getAnItem);
  yield takeEvery('GET_MY_SHELF', getMyShelf);
}

export default shelfSaga;
