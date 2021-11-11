import * as apiHelpers from 'api';
import moment from 'moment';
// import get from 'lodash/get';
import { showSuccess } from 'modules/notifications';
import { CONFIRMED_STATUS, FINISHED_STATUS, CANCELLED_STATUS_BY_MASTER } from 'constants/events';
import { all, call, takeLatest, take, put, select, delay } from 'redux-saga/effects';
const modules = 'payments';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

export const GET_PAYMENTS_HISTORY_REQUEST = `${modules}/GET_PAYMENTS_HISTORY_REQUEST`;

export const GET_BALANCE_REQUEST = `${modules}/GET_BALANCE_REQUEST`;
export const GET_ORDERS_REQUEST = `${modules}/GET_ORDERS_REQUEST`;
export const GET_PAYMENTDATA_REQUEST = `${modules}/GET_PAYMENTDATA_REQUEST`;
export const SET_PAYMENT_REQUEST = `${modules}/SET_PAYMENT_REQUEST`;

export const getPaymentDataRequst = actionCreator(GET_PAYMENTDATA_REQUEST);
export const getOrderRequst = actionCreator(GET_ORDERS_REQUEST);
export const getBalanceRequest = actionCreator(GET_BALANCE_REQUEST);
export const getPaymentsRequest = actionCreator(GET_PAYMENTS_HISTORY_REQUEST);
export const setPaymentRequest = actionCreator(SET_PAYMENT_REQUEST);

const apiRoutes = new ApiRoutes();
//
// Баланс - api/v2/salons/1/balance
// Счета и акты - api/v2/salons/1/bills
// История платежей - api/v2/salons/1/purchases
// Платежные данные - api/v2/salons/1/legal

apiRoutes.add(GET_PAYMENTDATA_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/legal`,
        method: 'GET',
    };
});

apiRoutes.add(GET_ORDERS_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/bills`,
        method: 'GET',
    };
});
apiRoutes.add(GET_BALANCE_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/balance`,
        method: 'GET',
    };
});
apiRoutes.add(GET_PAYMENTS_HISTORY_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/purchases`,
        method: 'GET',
    };
});
apiRoutes.add(SET_PAYMENT_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/bills`,
        method: 'POST',
    };
});

export const getBalanceSelector = apiSelector(GET_BALANCE_REQUEST);
export const getPaymentsHistorySelector = apiSelector(GET_PAYMENTS_HISTORY_REQUEST);
export const getOrdersSelector = apiSelector(GET_ORDERS_REQUEST);
export const getPaymentDataSelector = apiSelector(GET_PAYMENTDATA_REQUEST);
