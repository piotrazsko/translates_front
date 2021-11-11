import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AddDataButton } from 'components';
import Button from '@material-ui/core/Button';
import style from './style.scss';

const AddButton = ({ variant, onClick, disabled, titleButton, titleLine, textError = '' }) => {
    return variant !== 'button' ? (
        <div className={style.buttonContainer}>
            <AddDataButton onClick={onClick} title={titleLine} helperText={textError} />
        </div>
    ) : (
        <div className={style.buttonContainer}>
            <Button
                size="small"
                disabled={disabled}
                variant="contained"
                color="primary"
                fullWidth={false}
                onClick={onClick}
                helperText={textError}
            >
                {titleButton}
            </Button>
        </div>
    );
};

AddButton.defaultProps = {
    variant: 'button',
    disabled: false,
    titleButton: 'Изменить',
};
AddButton.propTypes = {
    variant: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    titleButton: PropTypes.string,
    titleLine: PropTypes.bool,
};

export default AddButton;
