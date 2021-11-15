import get from 'lodash/get';
import { createAction } from 'redux-actions';
import { all, put, select, call, takeLatest } from 'redux-saga/effects';
import * as api_helpers from 'api';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'init';

export const INIT_DATA = `${modules}/INIT_DATA`;
export const RE_INIT_DATA = `${modules}/RE_INIT_DATA`;

export const initDataAction = createAction(INIT_DATA);
export const reInitDataAction = createAction(RE_INIT_DATA);

export const initModuleSaga = function* (dispatch) {
    yield all([
        // takeLatest([SET_USER_LOGOUT], clearCurentUserSaga, dispatch),
        // takeLatest([INIT_DATA], getWorkingTimeSaga, dispatch),
        // takeLatest([SAVE_CREDENTIALS], redirectToInitSaga, dispatch),
    ]);
};
//selectors