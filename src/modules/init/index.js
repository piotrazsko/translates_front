import get from 'lodash/get';
import { createAction } from 'redux-actions';
import { all, put, select, call, takeLatest, delay } from 'redux-saga/effects';
import * as api_helpers from 'react_redux_api';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'init';

export const INIT_DATA = `${modules}/INIT_DATA`;
export const RE_INIT_DATA = `${modules}/RE_INIT_DATA`;

export const initDataAction = createAction(INIT_DATA);
export const reInitDataAction = createAction(RE_INIT_DATA);

const initDataSaga = function* () {
    yield delay(100);
    yield put(initDataAction());
};

export const isRehydrated = (state) => state._persist.rehydrated;

export const initModuleSaga = function* (dispatch) {
    yield all([
        takeLatest(['persist/PERSIST'], initDataSaga, dispatch),
        // takeLatest([INIT_DATA], getWorkingTimeSaga, dispatch),
        // takeLatest([SAVE_CREDENTIALS], redirectToInitSaga, dispatch),
    ]);
};
//selectors
