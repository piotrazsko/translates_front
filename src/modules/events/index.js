import * as apiHelpers from 'api';
import moment from 'moment';
import get from 'lodash/get';
import { showSuccess } from 'modules/notifications';
import { CONFIRMED_STATUS, FINISHED_STATUS, CANCELLED_STATUS_BY_MASTER } from 'constants/events';
import { all, call, takeLatest, take, put, select, delay } from 'redux-saga/effects';
const modules = 'events';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const GET_EVENTS_HISTORY_REQUEST = `${modules}/GET_EVENTS_HISTORY_REQUEST`;
export const GET_EVENT_REQUEST = `${modules}/GET_EVENT_REQUEST`;
export const CREATE_EVENT_REQUEST = `${modules}/CREATE_EVENT_REQUEST`;
export const CREATE_EVENT_SUCCESS = `${modules}/CREATE_EVENT_SUCCESS`;
export const UPDATE_EVENT_REQUEST = `${modules}/UPDATE_EVENT_REQUEST`;
export const UPDATE_EVENT_SUCCESS = `${modules}/UPDATE_EVENT_SUCCESS`;

export const getEventsHistoryRequest = actionCreator(GET_EVENTS_HISTORY_REQUEST);
export const getEventRequest = actionCreator(GET_EVENT_REQUEST);
export const updateEventRequest = actionCreator(UPDATE_EVENT_REQUEST);
export const createEventRequest = actionCreator(CREATE_EVENT_REQUEST);

apiRoutes.add(
    GET_EVENTS_HISTORY_REQUEST,
    ({ id, statuses, fromDate, toDate, master_ids, offset, limit, client_ids }) => {
        return {
            url: `api/v2/salons/${id}/events`,
            method: 'get',
            params: { statuses, fromDate, toDate, master_ids, offset, limit, client_ids },
        };
    }
);
apiRoutes.add(UPDATE_EVENT_REQUEST, ({ id, showLoader = true, event_id, ...data }) => {
    return {
        // /v2/salons/{salon_id}/events/{event_id}
        url: `api/v2/salons/${id}/events/${event_id}`,
        method: 'patch',
        data: data,
        showLoaderFlag: showLoader,
    };
});
apiRoutes.add(GET_EVENT_REQUEST, ({ id, event_id }) => {
    return {
        url: `api/v2/salons/${id}/events/${event_id}`,
        method: 'get',
        // params: { statuses },
    };
});

apiRoutes.add(CREATE_EVENT_REQUEST, ({ clinet_id, ...data }) => {
    return {
        url: `api/v2/users/${clinet_id}/events`,
        method: 'post',
        data: { ...data },
    };
});

const reloadEventSaga = function*(action) {
    const { type, payload } = action;
    const status = get(payload, 'status_id');
    yield delay(200);
    switch (true) {
        case status == CONFIRMED_STATUS && type == UPDATE_EVENT_SUCCESS:
            yield put(showSuccess({ message: 'Запись изменена!' }));
            break;
        case status == FINISHED_STATUS && type == UPDATE_EVENT_SUCCESS:
            yield put(showSuccess({ message: 'Запись завершена!' }));
            break;
        case status == CANCELLED_STATUS_BY_MASTER && type == UPDATE_EVENT_SUCCESS:
            yield put(showSuccess({ message: 'Запись отменена!' }));
            break;
        case type == CREATE_EVENT_SUCCESS:
            yield put(
                showSuccess({
                    message: `Запись успешно создана!`,
                })
            );
            break;
        default:
            break;
    }
};
export function* eventsSaga() {
    yield all([takeLatest([UPDATE_EVENT_SUCCESS, CREATE_EVENT_SUCCESS], reloadEventSaga)]);
}

export const getEventsHistorySelector = apiSelector(GET_EVENTS_HISTORY_REQUEST);
export const getEventSelector = apiSelector(GET_EVENT_REQUEST);
