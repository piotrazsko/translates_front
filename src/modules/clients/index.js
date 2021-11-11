import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest, delay } from 'redux-saga/effects';
import { showSuccess } from 'modules/notifications';
const modules = 'clients';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_CLIENTS_REQUEST = `${modules}/GET_CLIENTS_REQUEST`;
export const BLOCK_CLIENTS_REQUEST = `${modules}/BLOCK_CLIENTS_REQUEST`;
export const BLOCK_CLIENTS_SUCCESS = `${modules}/BLOCK_CLIENTS_SUCCESS`;
export const GET_CLIENT_INFO_REQUEST = `${modules}/GET_CLIENT_INFO_REQUEST`;
export const CREATE_CLIENT_REQUEST = `${modules}/CREATE_CLIENT_REQUEST`;
export const CREATE_CLIENT_SUCCESS = `${modules}/CREATE_CLIENT_SUCCESS`;
export const DELETE_CLIENT_REQUEST = `${modules}/DELETE_CLIENT_REQUEST`;
export const DELETE_CLIENT_SUCCESS = `${modules}/DELETE_CLIENT_SUCCESS`;
//actions
export const getClientsRequest = actionCreator(GET_CLIENTS_REQUEST, {});
export const getClientInfoRequest = actionCreator(GET_CLIENT_INFO_REQUEST, {});
export const createClientRequest = actionCreator(CREATE_CLIENT_REQUEST, {});
export const deleteClientRequest = actionCreator(DELETE_CLIENT_REQUEST, {});
export const blockClientRequest = actionCreator(BLOCK_CLIENTS_REQUEST, {});

export const ClientsRoutes = {};
apiRoutes.add(
    GET_CLIENTS_REQUEST,
    ({
        id,
        limit,
        offset,
        countEventsFrom,
        countEventsTo,
        amountTo,
        lastVisitDateFrom,
        lastVisitDateTo,
        dateAbsenceFrom,
        dateAbsenceTo,
        master_id,
        amountFrom,
    }) => ({
        url: `/api/v2/salons/${id}/clients`,
        method: 'get',
        params: {
            limit,
            offset,
            countEventsFrom,
            countEventsTo,
            amountTo,
            lastVisitDateFrom,
            lastVisitDateTo,
            dateAbsenceFrom,
            dateAbsenceTo,
            master_id,
            amountFrom,
        },
        // showLoaderFlag: false,
    })
);

apiRoutes.add(DELETE_CLIENT_REQUEST, ({ id, clientId }) => ({
    url: `/api/v2/salons/${id}/clients/${clientId}`,
    method: 'delete',

    // showLoaderFlag: false,
}));
apiRoutes.add(BLOCK_CLIENTS_REQUEST, ({ id, clientId }) => ({
    url: `/api/v2/salons/${id}/clients/${clientId}/block`,
    method: 'post',

    // showLoaderFlag: false,
}));

apiRoutes.add(GET_CLIENT_INFO_REQUEST, ({ id, user_id }) => ({
    url: `/api/v2/salons/${id}/clients/${user_id}`,
    method: 'get',
}));

apiRoutes.add(CREATE_CLIENT_REQUEST, ({ id, phone, name }) => ({
    url: `/api/v2/salons/${id}/clients`,
    method: 'post',
    params: {
        phone,
        name,
    },
    // showLoaderFlag: false,
}));

//saga
const reloadClientSaga = function*(dispatch, action) {
    const { type } = action;
    yield delay(200);
    switch (type) {
        case DELETE_CLIENT_SUCCESS:
            yield put(showSuccess({ message: 'Клиент удален' }));
            break;
        case CREATE_CLIENT_SUCCESS:
            yield put(
                showSuccess({
                    message: `Клиент добавлен`,
                })
            );
            break;
        case BLOCK_CLIENTS_SUCCESS:
            yield put(
                showSuccess({
                    message: `Клиент заблокирован`,
                })
            );
            break;
        default:
            break;
    }
};

export const clientSaga = function*(dispatch) {
    yield all([
        takeLatest(
            [DELETE_CLIENT_SUCCESS, CREATE_CLIENT_SUCCESS, BLOCK_CLIENTS_SUCCESS],
            reloadClientSaga,
            dispatch
        ),
    ]);
};
//selectors
export const getClientsSelector = apiSelector(GET_CLIENTS_REQUEST);
export const getClientInfoSelector = apiSelector(GET_CLIENT_INFO_REQUEST);
