import * as apiHelpers from 'api';
import moment from 'moment';
import { showSuccess } from 'modules/notifications';
// import { createAction } from 'redux-actions';
import { all, call, takeLatest, take, put, select, delay } from 'redux-saga/effects';
const modules = 'upload_crm';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const SET_UPLOAD_CRM_REQUEST = `${modules}/SET_UPLOAD_CRM_REQUEST`;
export const SET_SYNC_CRM_YCLIENT_REQUEST = `${modules}/SET_SYNC_CRM_YCLIENT_REQUEST`;
export const SET_SYNC_CRM_YCLIENT_SUCCESS = `${modules}/SET_SYNC_CRM_YCLIENT_SUCCESS`;

export const setUploadCrmRequest = actionCreator(SET_UPLOAD_CRM_REQUEST);
export const setAuthYclientsRequest = actionCreator(SET_SYNC_CRM_YCLIENT_REQUEST);

apiRoutes.add(SET_UPLOAD_CRM_REQUEST, ({ id, data }) => {
    return {
        url: `api/v2/salons/${id}/export`,
        method: 'post',
        data,
    };
});
apiRoutes.add(SET_SYNC_CRM_YCLIENT_REQUEST, ({ id, data }) => {
    return {
        url: `/api/v2/salons/${id}/sync`,
        method: 'post',
        data,
    };
});
const syncSagaSuccess = function*() {
    yield put(
        showSuccess({
            message:
                'Процесс синхронизации запущен. Пожалуйста подождите, мы переносим Ваши данные',
        })
    );
};

export const syncSaga = function*(dispatch) {
    yield all([takeLatest([SET_SYNC_CRM_YCLIENT_SUCCESS], syncSagaSuccess, dispatch)]);
};
