import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { useSelector, useDispatch } from 'react-redux';
import { myPermissionsSelector } from 'modules/roles';

import * as helpers from 'helpers';
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import logo from 'assets/img/logo.svg';
import Header from '../Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar';
import { layoutRenderedAction } from 'modules/init';
// import * as helpers from 'helpers';

// import theme from './theme.js';

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

const getPageHeight = () => {
    let body = document.body,
        html = document.documentElement;

    return (
        Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        ) - body.offsetHeight
    );
};
export const useAutoScrollToTop = rest => {
    const {
        match: { url },
        autoScrollToTop = true,
    } = rest;
    // HACK:  scroll new page  to top after change url
    React.useEffect(() => {
        if (autoScrollToTop) {
            scrollToTop();
        }
    }, [url]);
};
const Layout = ({
    myPermissionsSelector,
    children,
    viewPort,
    currentLocalization,
    classes,
    ...rest
}) => {
    const dispatch = useDispatch();
    const {
        history,
        match: { path },
        route: { roleKey, showHeader = true, showFooter = true, showScrollToTop = false },
        location: { pathname, search },
    } = rest;
    const permissions = helpers.permissionCheck(myPermissionsSelector[roleKey]);

    const [isEndOfPage, setEndOfPage] = React.useState(false);
    const [showScollButton, switchScrollButton] = React.useState(false);
    useAutoScrollToTop(rest);
    const restWithPermissons = {
        permissions,
        viewPort,
        isEndOfPage,
        ...rest,
    };

    React.useEffect(() => {
        let timer;
        const listener = () => {
            clearTimeout(timer);
            timer = setTimeout(function() {
                const scrollMaxY = getPageHeight() - 100;
                if (Math.round(window.scrollY) > scrollMaxY) {
                    setEndOfPage(true);
                } else {
                    setEndOfPage(false);
                }
                if (showScrollToTop) {
                    if (Math.round(window.scrollY) > 150) {
                        switchScrollButton(true);
                    } else {
                        switchScrollButton(false);
                    }
                }
            }, 100);
        };
        window.addEventListener('scroll', listener);
        dispatch(layoutRenderedAction());
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);
    return (
        <div className={classes.wrapper}>
            <Sidebar
                title={'text'}
                routes={[]}
                logoText={'test_text'.toUpperCase()}
                logo={logo}
                image={null}
                onAvatarMenuClick={data => {}}
                {...restWithPermissons}
            />
            <div className={classes.mainPanel}>
                {showHeader && <Header path={path} routes={[]} {...restWithPermissons} />}
                <div className={classes.content}>
                    {(!roleKey || permissions.read) &&
                    rest.route.isPrivate === rest.route.userIsAuth // we can have some problems with hide
                        ? React.createElement(children, restWithPermissons)
                        : null}
                </div>
                {showFooter && <Footer />}
            </div>
        </div>
    );
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    viewPort: PropTypes.shape({ isMobile: PropTypes.bool.isRequired }).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    myPermissionsSelector: PropTypes.object,
    userIsMaster: PropTypes.bool.isRequired,
    currentUserData: PropTypes.object.isRequired,
    currentLocalization: PropTypes.string,
};

const mapStateToProps = state => ({
    myPermissionsSelector: myPermissionsSelector(state),
});
export default connect(mapStateToProps)(withStyles(dashboardStyle)(Layout));
