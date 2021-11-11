/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Snack from '@material-ui/core/SnackbarContent';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import snackbarContentStyle from 'assets/jss/material-dashboard-react/components/snackbarContentStyle';

function SnackbarContent({ ...props }) {
    const { classes, message, color, close, icon, rtlActive } = props;
    var action = [];
    const messageClasses = classNames({
        [classes.iconMessage]: icon !== undefined,
    });
    if (close !== undefined) {
        action = [
            <IconButton
                className={classes.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
            >
                <Close className={classes.close} />
            </IconButton>,
        ];
    }
    return (
        <MuiAlert severity={color}>
            <div>
                {icon !== undefined ? <props.icon className={classes.icon} /> : null}
                <span className={messageClasses}>{message}</span>
            </div>
        </MuiAlert>
    );
}

SnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
    close: PropTypes.bool,
    icon: PropTypes.object,
    rtlActive: PropTypes.bool,
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
