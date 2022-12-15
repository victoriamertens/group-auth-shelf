import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* getShelfItems() {
  const shelfItems = yield axios.get('/api/shelf');
  yield put({ type: 'SET-SHELF', payload: shelfItems });
}

function* shelfSaga() {
  yield takeEvery('GET_SHELF', getShelfItems);
}

export default shelfSaga;
