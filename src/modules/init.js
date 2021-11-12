import * as api_helpers from 'api';
import { call, put, all, takeLatest, select } from 'redux-saga/effects';

const modules = 'init';
const {
    helpers: { actionCreator, apiSelector },
} = api_helpers;

export const INIT_DATA = `${modules}/INIT_DATA`;
export const LAYOUT_RENDERED = `${modules}/LAYOUT_RENDERED`;
export const INIT_DATA_CLEAR_FORCE = `${modules}/INIT_DATA_CLEAR_FORCE`;

export const initDataAction = actionCreator(INIT_DATA);
export const layoutRenderedAction = actionCreator(LAYOUT_RENDERED);
export const clearForce = actionCreator(INIT_DATA_CLEAR_FORCE);

export const usersRoutes = {};

//....saga...
function* initActions(action) {}

function* reloadSaga(action) {
    yield put(initDataAction());
}
export function* initSaga() {
    yield all([
        takeLatest(INIT_DATA, initActions),
        yield takeLatest(INIT_DATA_CLEAR_FORCE, reloadSaga),
    ]);
}
