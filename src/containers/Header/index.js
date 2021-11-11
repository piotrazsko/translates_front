import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import { HelpIcon } from 'feelqueen_components';
// import {}
import AdminNavbarLinks from './AdminNavbarLinks';

import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import headerStyle from 'assets/jss/material-dashboard-react/components/headerStyle';
import { switchOnTutorialAction } from 'modules/tutorials';
import style from './style.scss';

function Header({ showHelpButton = true, ...props }) {
    const dispatch = useDispatch();

    function makeBrand() {
        var name;
        props.routes.map(prop => {
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                name = props.rtlActive ? prop.rtlName : prop.name;
            }
            return null;
        });
        return name;
    }
    const { classes, color, path } = props;
    const appBarClasses = classNames({
        [' ' + classes[color]]: color,
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button color="transparent" href="#" className={classes.title}>
                        {makeBrand()}
                    </Button>
                </div>
                {/*<Hidden smDown implementation="css">
                    <AdminNavbarLinks userLogout={props.userLogout} />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>*/}
                {showHelpButton && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            dispatch(switchOnTutorialAction());
                        }}
                        className={style.buttonWithIcon}
                    >
                        <HelpIcon width="20" />
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf(PropTypes.object),
    userLogout: PropTypes.func.isRequired,
    showHelpButton: PropTypes.bool,
};

export default withStyles(headerStyle)(Header);
