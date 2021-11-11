import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { getViewport as viewPortSelector } from 'modules/viewport';
import { setUserLogout } from 'modules/auth';
import { myPermissionsSelector } from 'modules/roles';
import PerfectScrollbar from 'perfect-scrollbar';
import withStyles from '@material-ui/core/styles/withStyles';
import Navbar from 'components/Navbars';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar';
import * as helpers from 'helpers';
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/logo.svg';

let ps;

class Layout extends React.Component {
    state = {
        image: image,
        color: 'blue',
        fixedClasses: 'dropdown show',
        mobileOpen: false,
    };
    mainPanel = React.createRef();
    handleImageClick = image => {
        this.setState({ image: image });
    };
    handleColorClick = color => {
        this.setState({ color: color });
    };
    handleFixedClick = () => {
        if (this.state.fixedClasses === 'dropdown') {
            this.setState({ fixedClasses: 'dropdown show' });
        } else {
            this.setState({ fixedClasses: 'dropdown' });
        }
    };
    handleDrawerToggle = () => {
        const { mobileOpen } = this.state;
        this.setState({ mobileOpen: !mobileOpen });
    };
    getRoute() {
        return window.location.pathname !== '/admin/maps';
    }
    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };
    componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.mainPanel.current);
        }
        window.addEventListener('resize', this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.mainPanel.current.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
        }
        window.removeEventListener('resize', this.resizeFunction);
    }
    render() {
        const {
            myPermissionsSelector,
            classes,
            viewPort,
            children,
            userIsAuth,
            ...rest
        } = this.props;
        const {
            route: { roleKey },
        } = rest;
        const permissions = helpers.permissionCheck(myPermissionsSelector[roleKey]);
        const restWithPermissons = {
            permissions,
            viewPort,
            ...rest,
        };
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={[]}
                    logoText={''}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...restWithPermissons}
                />
                <div className={classes.mainPanel} ref={this.mainPanel}>
                    <Navbar
                        routes={[]}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...restWithPermissons}
                    />
                    <div className={classes.content}>
                        {(!roleKey || permissions.read) &&
                        rest.route.isPrivate === rest.route.userIsAuth // we can have some problems with hide
                            ? React.createElement(children, restWithPermissons)
                            : null}
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    myPermissionsSelector: PropTypes.object,
    viewPort: PropTypes.shape({ isMobile: PropTypes.bool.isRequired }).isRequired,
};

const mapStateToProps = state => ({
    myPermissionsSelector: myPermissionsSelector(state),
    viewPort: viewPortSelector(state),
});

const mapDispatchToProps = dispatch => ({
    userLogout: bindActionCreators(setUserLogout, dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(dashboardStyle)(Layout));
