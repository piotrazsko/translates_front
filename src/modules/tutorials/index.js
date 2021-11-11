import * as api_helpers from 'api';
import { all, put, select, call, takeLatest, delay } from 'redux-saga/effects';
import { getSalonIdSelector } from '../currentUser';
import { LAYOUT_RENDERED } from 'modules/init';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
const modules = 'tutorials';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_STEPS_REQUEST = `${modules}/GET_STEPS_REQUEST`;
export const GET_STEPS_SUCCESS = `${modules}/GET_STEPS_SUCCESS`;
export const GET_STEPS_ACTION = `${modules}/GET_STEPS_ACTION`;
export const SET_STEPS_REQUEST = `${modules}/SET_STEPS_REQUEST`;
export const SET_STEPS_SUCCESS = `${modules}/SET_STEPS_SUCCESS`;
export const SWITCH_ON = `${modules}/SWITCH_ON`;
export const SWITCH_OFF = `${modules}/SWITCH_OFF`;
//actions
export const getStepsRequest = actionCreator(GET_STEPS_REQUEST);
export const setSteps = createAction(GET_STEPS_ACTION);
export const switchOnTutorialAction = createAction(SWITCH_ON);
export const switchOffTutorialAction = createAction(SWITCH_OFF);
export const setStepsRequest = actionCreator(SET_STEPS_REQUEST);

export const defaultSteps = {
    data: JSON.stringify({
        popupShowed: false,
        tutorials: [
            { path: '/calendar/edit/:masterId?', finished: false },
            { path: '/finance', finished: false },
            { path: '/calendar', finished: false },
            { path: '/clients', finished: false }, //+
            { path: '/messages/:chatId?', finished: false }, //+
            { path: '/analitics', finished: false }, //+
            { path: '/masters', finished: false }, //+
            { path: '/profile', finished: false }, //+
            { path: '/', finished: false }, //+
        ],
    }),
};

//routes
export const listMetroRoutes = {};

apiRoutes.add(GET_STEPS_REQUEST, ({ id }) => ({
    url: `api/v2/salons/${id}/tutorial`,
    method: 'get',
}));

apiRoutes.add(SET_STEPS_REQUEST, ({ id, data }) => ({
    url: `/api/v2/salons/${id}/tutorial`,
    method: 'put',
    data: data,
}));
const tutorialGetSaga = function*() {
    const id = yield select(getSalonIdSelector);
    if (id) {
        yield put(getStepsRequest({ id }));
    }
};
const tutorialSetSaga = function*(dispatch, action) {
    const id = yield select(getSalonIdSelector);
    if (id) {
        const { payload } = action;
        yield put(setStepsRequest({ id, data: payload }));
    }
};
const tutorialSetDefaultSaga = function*(dispatch, action) {
    const { response } = action;
    const data = JSON.parse(get(response, 'data.data', '{}'));
    const id = yield select(getSalonIdSelector);
    if (id && typeof data.popupShowed === 'undefined') {
        yield put(setStepsRequest({ id, data: { is_enabled: true, ...defaultSteps } }));
    }
};

export const tutorialModuleSaga = function*(dispatch) {
    yield all([
        takeLatest([SET_STEPS_SUCCESS, LAYOUT_RENDERED], tutorialGetSaga, dispatch),
        takeLatest([GET_STEPS_ACTION], tutorialSetSaga, dispatch),
        takeLatest([GET_STEPS_SUCCESS], tutorialSetDefaultSaga, dispatch),
    ]);
};

export function tutorialsReducer(state = false, action) {
    switch (action.type) {
        case SWITCH_ON: {
            return true;
        }
        case SWITCH_OFF: {
            return false;
        }
        default:
            return state;
    }
}

//selectors
export const getTutorialsSelector = apiSelector(GET_STEPS_REQUEST);
export const getTutorialState = state => state.tutorial;
