import React from 'react';
import PropTypes from 'prop-types';
import { PhoneInput as PhoneInputDefault } from 'feelqueen_components';

export default function PhoneInput({ ...props }) {
    return <PhoneInputDefault {...props} />;
}
PhoneInput.defaultProps = {
    inputProps: {},
};
PhoneInput.propTypes = {
    value: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    classNames: PropTypes.shape({
        root: PropTypes.string,
        input: PropTypes.string,
    }),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onlyCountries: PropTypes.arrayOf(PropTypes.string),
};
