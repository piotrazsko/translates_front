import React from 'react';
import style from '../../style.scss';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PlainField = ({label, error, margin, ...inputProps}) => (
    <div className={classNames(style.fieldWrapper, {
        [style.small]: margin === "small",
    })}>
        {label && <span className={style.fieldTitle}>{label}</span>}
        <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
            {...inputProps}
        />
    </div>
)

PlainField.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    margin: PropTypes.string,
}

export default PlainField;
