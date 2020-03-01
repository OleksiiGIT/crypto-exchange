import {GET_DATA, putData} from "./actions";
import {takeEvery, put, call} from "@redux-saga/core/effects";
import axios from 'axios'

function getData() {
    return axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR')
}

function* workerLoadData() {
    const data = yield call(getData)
    yield put(putData(data.data))
}

export function* watchLoadData() {
    yield takeEvery(GET_DATA, workerLoadData)
}