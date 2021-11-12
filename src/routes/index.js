import { ROLES_KEYS } from 'config/roles';
import { Home, AuthNew, Translates, Translate, LayoutEmpty } from 'containers';

export const redirectAuthPath = '/auth';

//* layout used for   set layouts for pages
//* if layout ===  false   we use page without layout
//* if layout is  react elemen - we use it
const mainRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
        isPrivate: true,
        showHeader: true,
        header: true,
        // layout: Tutorial,
    },

    {
        path: '/auth/:path?',
        component: AuthNew,
        exact: false,
        isPrivate: false,
        showHeader: false,
        showFooter: false,
        layout: LayoutEmpty,
    },

    {
        path: '/translates',
        exact: true,
        component: Translates,
        isPrivate: true,
        header: true,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
        showHeader: true,
    },
    {
        path: '/translate/:id?',
        exact: true,
        component: Translate,
        isPrivate: true,
        showHeader: false,
        showFooter: false,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
    },
];
export default [].concat(mainRoutes);
