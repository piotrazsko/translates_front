import config from 'config/sidebar';
import { createAction } from 'redux-actions';
const modules = 'sidebar';

const SET_BADGE = `${modules}/SET_BADGE`;
export const setBadge = createAction(SET_BADGE);

export function sidebarReducer(state = config, action) {
    switch (action.type) {
        case SET_BADGE: {
            const { payload = {} } = action;
            const { id, value } = payload;
            const res = state.map(i => (i.id == id ? { ...i, badge: value } : i));
            return res;
        }
        default:
            return state;
    }
}
export const getSidebarConfig = state => state.sidebar;
