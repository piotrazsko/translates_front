import { ROLES_KEYS } from 'config/roles';
import {
    Home,
    RolesList,
    RoleEdit,
    AuthNew,
    Masters,
    Clients,
    ClientDetail,
    LayoutEmpty,
} from 'containers';

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
        path: '/roles-list',
        exact: true,
        component: RolesList,
        isPrivate: true,
        header: true,
        roleKey: ROLES_KEYS.roles,
    },
    {
        path: '/role/:id',
        exact: true,
        component: RoleEdit,
        isPrivate: true,
        header: true,
        roleKey: ROLES_KEYS.roles,
    },
    {
        path: '/create-role',
        exact: true,
        component: RoleEdit,
        isPrivate: true,
        header: true,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
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
        path: '/masters',
        exact: true,
        component: Masters,
        isPrivate: true,
        header: true,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
        showHeader: true,
    },
    {
        path: '/clients',
        exact: true,
        component: Clients,
        isPrivate: true,
        header: true,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
        showHeader: true,
    },
    {
        path: '/clients/:id?',
        exact: true,
        component: ClientDetail,
        isPrivate: true,
        showHeader: false,
        showFooter: false,
        isAdd: true,
        roleKey: ROLES_KEYS.roles,
    },
];
export default [].concat(mainRoutes);
