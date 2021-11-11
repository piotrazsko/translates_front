import React from 'react';
import PropTypes from 'prop-types';
import { PhoneInput } from 'components';
import Grid from '@material-ui/core/Grid';
const Phone = ({ phone, setPhone, countryCode }) => {
    return (
        <Grid container>
            <PhoneInput
                label=""
                margin="normal"
                fullWidth
                countryCode={countryCode}
                value={phone}
                onChange={setPhone}
            />
        </Grid>
    );
};

Phone.propTypes = {
    countryCode: PropTypes.string,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
};

export default Phone;
