import get from 'lodash/get';
import { createAction } from 'redux-actions';
import * as api_helpers from 'api';
import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import history from 'store/history';
import { getCookiesSelector } from 'modules/cookies';
const modules = 'auth';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

export const GET_PAYMENTS_REQUEST = `${modules}/GET_PAYMENTS_REQUEST`;
export const ADD_PAYMENTS_REQUEST = `${modules}/ADD_PAYMENTS_REQUEST`;

export const getPaymentsAction = actionCreator(GET_PAYMENTS_REQUEST);
export const addPaymentsAction = actionCreator(ADD_PAYMENTS_REQUEST);
const apiRoutes = new ApiRoutes();
apiRoutes.add(
    GET_PAYMENTS_REQUEST,
    ({ salon_id, from, to, master_ids, skills, services, mode = 'all', payment_purpose_ids }) => {
        return {
            url: `/api/v2/salons/${salon_id}/statistics/payment/transactions`,
            method: 'GET',
            params: {
                from,
                to,
                master_ids,
                mode,
                skills,
                services,
                payment_purpose_ids,
            },
        };
    }
);
apiRoutes.add(ADD_PAYMENTS_REQUEST, ({ salon_id, ...data }) => {
    return {
        url: `/api/v2/salons/${salon_id}/payment`,
        method: 'POST',
        data,
    };
});

export const getPaymentsSelector = apiSelector(GET_PAYMENTS_REQUEST);
