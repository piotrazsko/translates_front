import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutoCompleateSelect = ({ options, textFieldProps, label, placeholder, ...props }) => {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={options}
            {...props}
            getOptionLabel={option => option.value}
            renderInput={params => {
                return (
                    <TextField
                        autoComplete="off"
                        label={label}
                        placeholder={placeholder}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        {...textFieldProps}
                        {...params}
                    />
                );
            }}
        />
    );
};

AutoCompleateSelect.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    textFieldProps: PropTypes.object,
};

AutoCompleateSelect.defaultProps = {
    options: [],
    textFieldProps: {
        fullWidth: true,
        label: '',
        placeholder: '',
    },
    label: '',
    placeholder: '',
};
export default AutoCompleateSelect;
