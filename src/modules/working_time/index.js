import * as apiHelpers from 'api';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest } from 'redux-saga/effects';
import { getSalonIdSelector } from 'modules/currentUser';
import { getSalonInfoRequest } from 'modules/salon';
import { INIT_DATA } from '../init.js';
import { showSuccess } from 'modules/notifications';
const modules = 'working_time';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const GET_WORKING_TIME_REQUEST = `${modules}/GET_WORKING_TIME_REQUEST`;
export const GET_WORK_TIME_REQUEST = `${modules}/GET_WORK_TIME_REQUEST`;
export const GET_WORK_TIME_SUCCESS = `${modules}/GET_WORK_TIME_SUCCESS`;

export const UPDATE_WORK_TIME_REQUEST = `${modules}/UPDATE_WORK_TIME_REQUEST`;
export const UPDATE_WORK_TIME_SUCCESS = `${modules}/UPDATE_WORK_TIME_SUCCESS`;

export const DELETE_WORK_TIME_REQUEST = `${modules}/DELETE_WORK_TIME_REQUEST`;
export const DELETE_WORK_TIME_SUCCESS = `${modules}/DELETE_WORK_TIME_SUCCESS`;

export const getWorkingTimeRequest = actionCreator(GET_WORKING_TIME_REQUEST);
export const getSalonWorkTimeRequest = actionCreator(GET_WORK_TIME_REQUEST);
export const updateSalonWorkTimeRequest = actionCreator(UPDATE_WORK_TIME_REQUEST);
export const deleteWorkTimeRequest = actionCreator(DELETE_WORK_TIME_REQUEST);

apiRoutes.add(GET_WORKING_TIME_REQUEST, ({ id, from, to }) => ({
    url: `/api/v2/salons/${id}/working_time/temporary`,
    method: 'get',
    params: { from, to },
}));

apiRoutes.add(GET_WORK_TIME_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/working_time`,
    method: 'get',
}));
apiRoutes.add(UPDATE_WORK_TIME_REQUEST, ({ id, data }) => ({
    url: `/api/v2/salons/${id}/working_time`,
    method: 'put',
    data,
}));

apiRoutes.add(DELETE_WORK_TIME_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/working_time`,
    method: 'delete',
}));

const reloadTimeSaga = function*(dispatch, action) {
    const { type } = action;
    switch (type) {
        case UPDATE_WORK_TIME_SUCCESS:
            yield put(showSuccess({ message: 'Рабочее время салона установлено' }));
            break;
        case DELETE_WORK_TIME_SUCCESS:
            yield put(
                showSuccess({
                    message: `Рабочее время салона установлено`,
                })
            );
            break;
        default:
            break;
    }
    const id = yield select(getSalonIdSelector);
    yield put(getSalonWorkTimeRequest({ id }));
    yield put(getSalonInfoRequest({ id }));
};

export const workingTimeSaga = function*(dispatch) {
    yield all([
        takeLatest([UPDATE_WORK_TIME_SUCCESS, DELETE_WORK_TIME_SUCCESS], reloadTimeSaga, dispatch),
    ]);
};

export const getWorkingTimeSelector = apiSelector(GET_WORKING_TIME_REQUEST, {});
export const getSalonWorkingTimeSelector = apiSelector(GET_WORK_TIME_REQUEST);
