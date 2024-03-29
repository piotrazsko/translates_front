import * as api_helpers from 'react_redux_api';

import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { GET_CURRENT_USER_SUCCESS } from 'modules/auth';

const modules = 'plans';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_PLANS_REQUEST = `${modules}/GET_PLANS_REQUEST`;
export const GET_PLAN_BY_ID_REQUEST = `${modules}/GET_PLAN_BY_ID_REQUEST`;
export const UPDATE_USER_PLAN_REQUEST = `${modules}/UPDATE_USER_PLAN_REQUEST`;

export const getPlansRequest = actionCreator(GET_PLANS_REQUEST);
export const getPlanByIdRequest = actionCreator(GET_PLAN_BY_ID_REQUEST);
export const updateUserPlanRequest = actionCreator(UPDATE_USER_PLAN_REQUEST);

apiRoutes.add(GET_PLANS_REQUEST, () => ({
    url: `/plans`,
    method: 'get',
}));

apiRoutes.add(GET_PLAN_BY_ID_REQUEST, ({ planId } = {}) => ({
    url: `/plans/${planId}`,
    method: 'get',
}));

apiRoutes.add(UPDATE_USER_PLAN_REQUEST, ({ planId } = {}) => ({
    url: `/plans`,
    method: 'PATCH',
    data: { planId },
}));

export const getPlansSelector = apiSelector(GET_PLANS_REQUEST);
export const getPlanByIdSelector = apiSelector(GET_PLAN_BY_ID_REQUEST);

function* getCurrentPlanSaga(action) {
    const {
        response: {
            data: { plan },
        },
    } = action;
    yield put(getPlanByIdRequest({ planId: plan }));
}

export function* plansSaga(dispatch) {
    yield all([takeEvery([GET_CURRENT_USER_SUCCESS], getCurrentPlanSaga)]);
}

// takeEvery([GET_CURRENT_USER_SUCCESS], gotUserDataSuccessSaga),
