import { createAction } from 'redux-actions';
import { all, takeEvery, put, select, delay } from 'redux-saga/effects';

const FORCE_CLOSE_TIMEOUT = 30000;
const modules = 'loader';

const SHOW_LOADER = `${modules}/SHOW_LOADER`;
const HIDE_LOADER = `${modules}/HIDE_LOADER`;
const FORCE_HIDE_LOADER = `${modules}/FORCE_HIDE_LOADER`;
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
export const forceHideLoader = createAction(FORCE_HIDE_LOADER);
const initialState = {
    show: false,
    loadersCount: 0,
    lastTimeStamp: 0,
};

export function loaderReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER: {
            let loadersCount = state.loadersCount + 1;
            return {
                ...state,
                ...{ show: true, loadersCount, lastTimeStamp: Date.now() },
            };
        }
        case HIDE_LOADER: {
            let loadersCount = state.loadersCount - 1;
            let show = loadersCount <= 0 ? false : true;
            let lastTimeStamp = show ? state.lastTimeStamp : 0;
            return { ...state, ...{ show: show, loadersCount, lastTimeStamp } };
        }
        case FORCE_HIDE_LOADER:
            return { ...state, ...initialState };

        default:
            return state;
    }
}

export function* loaderHideSaga() {
    yield delay(FORCE_CLOSE_TIMEOUT);
    let statusLoader = yield select(loaderStatusSelectorFull);

    if (
        statusLoader.loadersCount > 0 &&
        Date.now() - statusLoader.lastTimeStamp >= FORCE_CLOSE_TIMEOUT
    ) {
        yield put(forceHideLoader());
    }
}

export function* loaderSaga() {
    yield all([takeEvery(showLoader, loaderHideSaga)]);
}

export const loaderStatusSelector = state => state.loader.show;
export const loaderStatusSelectorFull = state => state.loader;
