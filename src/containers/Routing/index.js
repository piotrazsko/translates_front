/**
 *  Routing limit access to containers , if user isn't auth
 *  routes ---  is array with components and path
 *  userIsAuth -  state of user in current moment
 *  notAuthUrl - string with url for redirect if permissions limited
 * @type {[type]}
 */
// TODO: need updaate roting instead of routes  array
import React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { getViewport as viewPortSelector } from 'modules/viewport';

import Layout from 'containers/Layout';
import history from 'store/history';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../ErrorPage';
import { checkUserAuth } from 'modules/auth';
// TODO: need  create not found component and  add to route 404

/**
 * [RenderLayout description]
 * @param {[type]} [layout=Layout] [get layout element for wrap  components in routes]
 * @param {[type]} route           [route data used for check private routes, and redirect]
 * @param {[type]} component       [component for render in route]
 */
const RenderLayout = ({ layout = Layout, viewPort, ...route }, component) => {
    return props => {
        return layout
            ? React.createElement(layout, {
                  ...{ children: component },
                  ...props,
                  viewPort,
                  ...{ route: route },
                  // ...route,
              })
            : React.createElement(component, {
                  ...props,
                  viewPort,
                  ...{ route: route },
              });
    };
};

/**
 * [Routing description]
 * @param {[type]} redirectUrl [use for redirect  if user hasn't permission (not auth)]
 * @param {[type]} userIsAuth  [state user]
 * @param {[type]} routes      [array routes]
 * @param {[type]} props       [another props for  pass to children]
 */
const Routing = ({ redirectUrl, userIsAuth, routes, viewPort }) => {
    return (
        <Router history={history}>
            <Suspense fallback={<div />}>
                <Switch>
                    {routes.map(({ component, ...route }, index) => {
                        return route.isPrivate ? (
                            <PrivateRoute
                                key={`router_key_${index}`}
                                userIsAuth={userIsAuth}
                                redirectUrl={redirectUrl}
                                {...route}
                                render={RenderLayout({ ...route, userIsAuth, viewPort }, component)}
                            />
                        ) : (
                            <Route
                                key={`router_key_${index}`}
                                {...route}
                                render={RenderLayout({ ...route, userIsAuth, viewPort }, component)}
                            />
                        );
                    })}
                    <Route
                        render={RenderLayout(
                            {
                                exact: true,
                                isPrivate: false,
                                userIsAuth,
                                showHeader: false,
                                showFooter: false,
                            },
                            () => (
                                <ErrorPage history={history} />
                            )
                        )}
                    />
                </Switch>
            </Suspense>
        </Router>
    );
};

Routing.propTypes = {
    redirectUrl: PropTypes.string,
    userIsAuth: PropTypes.bool,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            component: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func])
                .isRequired,
            path: PropTypes.string,
            layout: PropTypes.any,
        })
    ),
};
Routing.defaultProps = {
    redirectUrl: '/',
    userIsAuth: true,
    routes: [],
};
const mapStateToprops = state => ({
    userIsAuth: checkUserAuth(state),
    viewPort: viewPortSelector(state),
});
export default connect(mapStateToprops)(Routing);
