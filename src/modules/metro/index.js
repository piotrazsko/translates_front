import * as api_helpers from 'api';
const modules = 'listMetro';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_LIST_METRO_REQUEST = `${modules}/GET_LIST_METRO_REQUEST`;
//actions
export const getListMetroRequest = actionCreator(GET_LIST_METRO_REQUEST, {
    responseDataPrepare: data => {
        data.data = data.data.reduce((acc, item) => {
            return [
                ...acc,
                ...item.metro_stations.map(i => ({
                    ...i,
                    color: item.color,
                })),
            ];
        }, []);
        return data;
    },
});

//routes
export const listMetroRoutes = {};
apiRoutes.add(GET_LIST_METRO_REQUEST, data => ({
    url: `api/v2/metro`,
    method: 'get',
    params: data,
}));

//selectors
export const getListMetroSelector = apiSelector(GET_LIST_METRO_REQUEST);
