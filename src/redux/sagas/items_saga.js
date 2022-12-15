import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* setItems() {}

function* items_saga() {
  yield takeEvery('SET_ITEMS', setItems);
}

export default items_saga;
