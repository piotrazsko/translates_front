import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import CheckboxDefault from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
    colorSecondary: {
        // color: '#000 !important',
        // fontWeight: 'bold !important',
    },
    disabled: {
        color: 'rgba(0, 0, 0, 0.38) !important',
    },
}));

const Checkbox = ({ disabled, checked, onChange, title }) => {
    const classes = useStyles();
    return (
        <FormControlLabel
            classes={{
                label: classes.colorSecondary,
                disabled: classes.disabled,
            }}
            disabled={disabled}
            onChange={onChange}
            control={
                <CheckboxDefault
                    classes={{
                        colorSecondary: classes.colorSecondary,
                        checked: classes.colorSecondary,
                        disabled: classes.disabled,
                    }}
                    color="primary"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
            }
            label={title}
        />
    );
};
Checkbox.propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    title: PropTypes.string,
};
export default Checkbox;
