import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';

const ConfirmationDialog = ({
    open_dialog, confirmationFunc, cancelFunc
}) => {
    return (
        <Dialog
            open={open_dialog}
            onClose={cancelFunc}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => cancelFunc()} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => confirmationFunc()} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
ConfirmationDialog.propTypes = {
    open_dialog: PropTypes.bool.isRequired,
    confirmationFunc: PropTypes.func.isRequired,
    cancelFunc: PropTypes.func.isRequired,
};
export default ConfirmationDialog;