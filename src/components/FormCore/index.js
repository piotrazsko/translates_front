import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import style from './style.scss';
import Typography from '@material-ui/core/Typography';
import { showWarning } from 'modules/notifications';
const EditFormCore = ({
    permissions,
    handlerSubmit,
    handlerCancelButton,
    children,
    title = '',
    requiredMap,
    showWarning,
    submitText = 'Save',
    cancelText = 'Cancel',
    displayButtons = true
}) => {
    const onSubmit = ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const res = [];
        requiredMap.forEach(item => {
            const itemValue = formData.get(item.name);
            if (!itemValue) {
                res.push(item.title);
            }
        });
        if (res.length > 0) {
            showWarning({ message: `Please choose "${res.join(', ')}"` });
            return;
        }
        // for (var key of formData.keys()) {
        //     const value = formData.get(key);
        //     const requiredItem = requiredMap.find(item => item.name === key);
        //     if (requiredItem && !value) {
        //         return;
        //     }
        // }
        handlerSubmit(ev);
    };
    return (
        <div className={style.container}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} classes={{ root: style.inputContainer }}>
                        {children}
                    </Grid>
                    <Grid item xs={12} style={{display: displayButtons ? 'block' : 'none' }}>
                        <div className={style.buttonsContainer}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handlerCancelButton}
                                className={style.button}
                            >
                                {cancelText}
                            </Button>
                            <Button
                                className={style.button}
                                variant="contained"
                                type="submit"
                                disabled={!permissions.update}
                            >
                                <SaveIcon />
                                {submitText}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
EditFormCore.defaultProps = {
    requiredMap: [],
    submitText: 'Save',
    cancelText: 'Cancel',
    displayButtons: true
};

EditFormCore.propTypes = {
    permissions: PropTypes.shape({
        create: PropTypes.bool,
        update: PropTypes.bool,
        read: PropTypes.bool,
        delete: PropTypes.bool,
    }),
    requiredMap: PropTypes.array,
    title: PropTypes.string,
    handlerSubmit: PropTypes.func.isRequired,
    showWarning: PropTypes.func.isRequired,
    handlerCancelButton: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    displayButtons: true
};

const mapDispatchToProps = dispatch => ({
    showWarning: bindActionCreators(showWarning, dispatch),
});
export default connect(
    null,
    mapDispatchToProps
)(EditFormCore);
