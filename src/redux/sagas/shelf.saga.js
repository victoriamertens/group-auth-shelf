import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* getShelfItems() {
  const shelfItems = yield axios.get('/api/shelf');
  yield put({ type: 'SET-SHELF', payload: shelfItems });
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
