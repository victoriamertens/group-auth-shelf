import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* getShelfItems() {
  const shelfItems = yield axios.get('/api/shelf');
  console.log('shelf.saga', shelfItems.data)
  yield put({ type: 'SET_SHELF', payload: shelfItems.data });
}

function* shelfSaga() {
  yield takeEvery('GET_SHELF', getShelfItems);
}

export default shelfSaga;
