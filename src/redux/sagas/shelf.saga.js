import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* getShelfItems() {
  const shelfItems = yield axios.get('/api/shelf');
  console.log('shelf.saga', shelfItems.data)
  yield put({ type: 'SET_SHELF', payload: shelfItems.data });
}

function* addShelfItem(action) {
  console.log('in saga, shelf item to be added:', action);
  yield axios.post('/api/shelf', action.payload);
  yield put({ type: 'GET_SHELF' });
}

function* shelfSaga() {
  yield takeEvery('GET_SHELF', getShelfItems);
  yield takeEvery('ADD_SHELF_ITEM', addShelfItem);
}

export default shelfSaga;
