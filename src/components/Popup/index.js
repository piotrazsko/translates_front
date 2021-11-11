import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { PopupBackground } from 'feelqueen_components';
import styles from './style.module.scss';
import Typography from '@material-ui/core/Typography';

const Popup = ({ ...props }) => {
    const {
        align = 'left',
        onSubmit,
        onCancel,
        onClear,
        cancelButtonText,
        submitButtonText,
        showPopup,
        children,
        className,
        disableSubmit = false,
        disableCancel = false,
        classes = {},
        confirmButtonProps = {},
        cancelButtonProps = {},
        style,
        childrenContainerClassName = '',
        showSubmit,
        showCancel,
        showClear = false,
        popupBackgroundsProps,
        message = '',
        textError = '',
        textInfo = '',
        title,
    } = props;
    const handleSubmit = () => {
        onSubmit();
    };
    const handleCancell = () => {
        onCancel();
    };
    return (
        <PopupBackground
            visible={showPopup}
            onClick={handleCancell}
            childrenClassName={styles.background}
            {...popupBackgroundsProps}
        >
            <Grid
                container
                direction="column"
                className={[styles.container, className, classes.root].join(' ')}
                style={{ ...style }}
            >
                {showClear && (
                    <Grid item xs={12} className={styles.clear}>
                        <IconButton size="small" className={style.buttonClear} onClick={onClear}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                )}

                {title && (
                    <Grid item xs={12} className={styles.title}>
                        <Typography variant={'h4'}>{title}</Typography>
                    </Grid>
                )}

                <Grid
                    item
                    className={[
                        styles.dataContainer,
                        classes.dataContainer,
                        childrenContainerClassName,
                    ].join(' ')}
                    xs={12}
                >
                    {children}
                    {message}
                </Grid>
                {(showCancel || showSubmit) && (
                    <Grid
                        item
                        xs={12}
                        className={[
                            align === 'left'
                                ? styles.buttonContainer_left
                                : styles.buttonContainer_right,
                            classes.buttonContainer,
                        ].join(' ')}
                    >
                        {showCancel && (
                            <Button
                                onClick={handleCancell}
                                className={styles.button}
                                disabled={disableCancel}
                                variant="outlined"
                                fontSize={'0.8rem'}
                                color="primary"
                                size="large"
                                {...cancelButtonProps}
                            >
                                {cancelButtonText}
                            </Button>
                        )}
                        {showSubmit && (
                            <Button
                                color="primary"
                                onClick={handleSubmit}
                                disabled={disableSubmit}
                                variant="contained"
                                type="submit"
                                fontSize={'0.8rem'}
                                size="large"
                                {...confirmButtonProps}
                            >
                                {submitButtonText}
                            </Button>
                        )}
                        <span className={styles.textError}> {textError}</span>
                        <span className={styles.textInfo}> {textInfo}</span>
                    </Grid>
                )}
            </Grid>
        </PopupBackground>
    );
};

Popup.propTypes = {
    showPopup: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    cancelButtonText: PropTypes.string,
    submitButtonText: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.shape({
        root: PropTypes.string,
        dataContainer: PropTypes.string,
        buttonContainer: PropTypes.string,
    }),
    confirmButtonClasses: PropTypes.objectOf(PropTypes.object),
    cancelButtonClasses: PropTypes.objectOf(PropTypes.object),
    disableSubmit: PropTypes.bool,
    disableCancel: PropTypes.bool,
    showSubmit: PropTypes.bool,
    showCancel: PropTypes.bool,
    showForce: PropTypes.bool,
    style: PropTypes.object,
    confirmButtonProps: PropTypes.object,
    cancelButtonProps: PropTypes.object,
    childrenContainerClassName: PropTypes.string,
    popupBackgroundsProps: PropTypes.object,
    align: PropTypes.string,
    message: PropTypes.any,
    textError: PropTypes.string,
    textInfo: PropTypes.string,
    showClear: PropTypes.bool,
    onClear: PropTypes.func,
    title: PropTypes.string,
};
Popup.defaultProps = {
    cancelButtonText: 'Отменить',
    submitButtonText: 'Применить',
    onSubmit: () => {},
    onCancel: () => {},
    onClear: () => {},
    showPopup: true,
    disableSubmit: false,
    disableCancel: false,
    showSubmit: true,
    showCancel: true,
    showForce: false,
    align: 'left',
    confirmButtonProps: {},
    cancelButtonProps: {},
    style: {},
};

export default Popup;
