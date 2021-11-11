import * as apiHelpers from 'api';
const modules = 'register_payments';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

export const GET_COMPANIES_REQUEST = `${modules}/GET_COMPANIES_REQUEST`;
export const getCompaniesRequest = actionCreator(GET_COMPANIES_REQUEST);

export const GET_UPLOADED_DOCUMENT_REQUEST = `${modules}/GET_UPLOADED_DOCUMENT_REQUEST`;
export const getUploadedDataRequest = actionCreator(GET_UPLOADED_DOCUMENT_REQUEST);

export const GET_ORGANIZATION_REQUEST = `${modules}/GET_ORGANIZATION_REQUEST`;
export const getOrganizationRequest = actionCreator(GET_ORGANIZATION_REQUEST);

export const SEND_PAYMENTS_DATA_REQUEST = `${modules}/SEND_PAYMENTS_DATA_REQUEST`;
export const savePaymentsDataRequest = actionCreator(SEND_PAYMENTS_DATA_REQUEST);

const apiRoutes = new ApiRoutes();

export const GET_PAYMENTS_DOCS_REQUEST = `${modules}/GET_PAYMENTS_DOCS_REQUEST`;
export const getPaymentsDocsRequest = actionCreator(GET_PAYMENTS_DOCS_REQUEST, {
    responseDataPrepare: data => {
        const processedData = data.data.reduce((acc, item) => {
            acc[item.type] = item.path;
            return acc;
        }, {});
        return {
            data: processedData,
        };
    },
});

export const UPLOAD_PAYMENTS_DOCS_REQUEST = `${modules}/UPLOAD_PAYMENTS_DOCS_REQUEST`;
export const uploadPaymentsDocsRequest = actionCreator(UPLOAD_PAYMENTS_DOCS_REQUEST);

apiRoutes.add(UPLOAD_PAYMENTS_DOCS_REQUEST, ({ id, data }) => {
    return {
        url: `api/v2/salons/${id}/cloudpayments/docs/upload`,
        method: 'post',
        data,
    };
});

apiRoutes.add(GET_COMPANIES_REQUEST, data => {
    return {
        url: `api/v2/companies`,
        method: 'GET',
        params: data,
    };
});
apiRoutes.add(GET_UPLOADED_DOCUMENT_REQUEST, ({ id }) => {
    return {
        url: `/api/v2/salons/${id}/cloudpayments/params`,
        method: 'GET',
    };
});

apiRoutes.add(GET_ORGANIZATION_REQUEST, ({ id, ...data }) => {
    return {
        url: `api/v2/salons/${id}/organization`,
        method: 'GET',
        params: data,
    };
});

apiRoutes.add(SEND_PAYMENTS_DATA_REQUEST, ({ id, data }) => {
    return {
        url: `api/v2/salons/${id}/cloudpayments/docs`,
        method: 'post',
        data: data,
    };
});

apiRoutes.add(GET_PAYMENTS_DOCS_REQUEST, ({ id, type }) => {
    return {
        url: `api/v2/salons/${id}/cloudpayments/docs`,
        method: 'get',
        params: {
            type: type,
        },
    };
});

export const companiesSelector = apiSelector(GET_COMPANIES_REQUEST);
export const organizationSelector = apiSelector(GET_ORGANIZATION_REQUEST);
export const paymentsDocsSelector = apiSelector(GET_PAYMENTS_DOCS_REQUEST);
export const getUploadedDocsSelector = apiSelector(GET_UPLOADED_DOCUMENT_REQUEST);
