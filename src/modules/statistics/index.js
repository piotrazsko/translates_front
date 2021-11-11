import * as apiHelpers from 'api';
import moment from 'moment';
// import { createAction } from 'redux-actions';
// import { all, call, takeLatest, take, put, select, delay } from 'redux-saga/effects';
const modules = 'statistics';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const GET_PAYMENTS_REQUEST = `${modules}/GET_PAYMENTS_REQUEST`;
export const GET_STATISTICS_DAILY_REQUEST = `${modules}/GET_STATISTICS_DAILY_REQUEST`;
export const GET_TOP_MASTERS_REQUEST = `${modules}/GET_TOP_MASTERS_REQUEST`;
export const GET_TOP_SERVICES_REQUEST = `${modules}/GET_TOP_SERVICES_REQUEST`;
export const GET_EVENTS_REQUEST = `${modules}/GET_EVENTS_REQUEST`;
export const GET_CLIENTS_REQUEST = `${modules}/GET_CLIENTS_REQUEST`;

export const getPaymentsRequest = actionCreator(GET_PAYMENTS_REQUEST);
export const getTopMasterRequest = actionCreator(GET_TOP_MASTERS_REQUEST);
export const getTopServicesRequest = actionCreator(GET_TOP_SERVICES_REQUEST);
export const getEventsRequest = actionCreator(GET_EVENTS_REQUEST);
export const getClientsRequest = actionCreator(GET_CLIENTS_REQUEST);
export const getDailyStatisticRequest = actionCreator(GET_STATISTICS_DAILY_REQUEST);

apiRoutes.add(
    GET_PAYMENTS_REQUEST,
    ({ id, fromDate, toDate, master_ids, payment_purpose_ids, skills, services, mode = 'all' }) => {
        return {
            url: `api/v2/salons/${id}/statistics/payment`,
            method: 'get',
            params: {
                from: fromDate,
                to: toDate,
                master_ids,
                mode,
                skills,
                services, // all|expenses|income
                payment_purpose_ids,
            },
        };
    }
);

apiRoutes.add(GET_TOP_MASTERS_REQUEST, ({ id, mode = 'month' }) => ({
    url: `api/v2/salons/${id}/statistics/top/masters`,
    method: 'get',
    params: { mode },
}));
apiRoutes.add(GET_STATISTICS_DAILY_REQUEST, ({ id, date, showLoaderFlag = false }) => ({
    url: `api/v2/salons/${id}/statistics/daily`,
    method: 'get',
    params: { date },
    showLoaderFlag,
}));
apiRoutes.add(GET_TOP_SERVICES_REQUEST, ({ id, from, to, master_id }) => ({
    url: `api/v2/salons/${id}/statistics/skills`,
    method: 'get',
    params: { from, to, master_id },
}));
apiRoutes.add(GET_CLIENTS_REQUEST, ({ id, from, to, showLoaderFlag = true }) => ({
    url: `api/v2/salons/${id}/statistics/clients`,
    method: 'get',
    params: { from, to },
    showLoaderFlag,
}));
apiRoutes.add(GET_EVENTS_REQUEST, ({ id, from, to, master_id }) => ({
    url: `api/v2/salons/${id}/statistics/events`,
    method: 'get',
    params: { from, to, master_id },
}));

export const paymentsSelector = apiSelector(GET_PAYMENTS_REQUEST, {
    initialData: {
        count_events: 0,
    },
});
export const topMastersSelector = apiSelector(GET_TOP_MASTERS_REQUEST);
export const getDailyStatisticSelector = apiSelector(GET_STATISTICS_DAILY_REQUEST);
export const topServicesSelector = apiSelector(GET_TOP_SERVICES_REQUEST);
export const eventsSelector = apiSelector(GET_EVENTS_REQUEST);
export const clientsSelector = apiSelector(GET_CLIENTS_REQUEST);
