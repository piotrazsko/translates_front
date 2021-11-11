import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSalonData,
    getSalonSelector,
    getSalonInfoSelector,
    getSalonLocationSelector,
} from 'modules/salon';
import { myPermissionsSelector } from 'modules/roles';
import { checkUserMaster } from 'modules/currentUser';
import { getLocalizationSelector } from 'modules/localization';
import * as helpers from 'helpers';
import style from './style.scss';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import Navbar from '../Header';
import MobileScreen from '../MobileScreen';
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
const LayoutEmpty = ({
    myPermissionsSelector,
    children,
    viewPort,
    userIsMaster,
    currentUserData,
    currentLocalization,
    classes = {},
    ...rest
}) => {
    const { isMobile } = viewPort;
    const dispatch = useDispatch();
    const { title = '', avatar } = useSelector(getSalonSelector);
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
        currentLocalization,
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
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);
    return !isMobile ? (
        <div>
            {(!roleKey || permissions.read) &&
            (rest.route.isPrivate === false || rest.route.isPrivate === rest.route.userIsAuth) // we can have some problems with hide
                ? React.createElement(children, restWithPermissons)
                : null}
        </div>
    ) : (
        <MobileScreen />
    );
};

LayoutEmpty.propTypes = {
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
    userIsMaster: checkUserMaster(state),
    currentLocalization: getLocalizationSelector(state),
});
export default connect(mapStateToProps)(LayoutEmpty);
