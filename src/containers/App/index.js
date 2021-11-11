import React, { Fragment } from 'react';
import { Routing, Loader } from 'containers';
import routes, { redirectAuthPath } from 'routes';
import { Notifications } from 'components';
import InitData from '../InitData';
import 'feelqueen_components/es/main.css';
import CookieDialog from '../CookiesDialog';
import Popups from 'containers/Popups';

const App = ({ ...props }) => {
    return (
        <Fragment>
            <Notifications>
                <Routing routes={routes} redirectUrl={redirectAuthPath} />
            </Notifications>
            <Loader />
            <InitData />
            <CookieDialog />
            <Popups />
        </Fragment>
    );
};

export default App;
