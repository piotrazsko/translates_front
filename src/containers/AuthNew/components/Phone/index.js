import React from 'react';
import PropTypes from 'prop-types';
import { PhoneInput } from 'components';
import Grid from '@material-ui/core/Grid';
const Phone = ({ phone, setPhone, countryCode }) => {
    return <Grid container></Grid>;
};

Phone.propTypes = {
    countryCode: PropTypes.string,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
};

export default Phone;
