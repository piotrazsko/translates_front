import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { getSalonSelector } from 'modules/salon';
import { getCurrencySelector } from 'modules/localization';

const NumberFormatCustom = ({
    inputRef,
    suffix,
    onChange,
    name,
    displayType = 'text',
    ...other
}) => {
    const { id, currency_id } = useSelector(getSalonSelector);
    const currency = useSelector(getCurrencySelector);
    const currencyCurrent = React.useMemo(() => {
        return (currency.find(i => i.id == currency_id) || {}).badge;
    }, [currency_id, currency]);
    return (
        <NumberFormat
            {...other}
            displayType={displayType}
            thousandSeparator={' '}
            suffix={suffix || ` ${currencyCurrent || ''}`}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
        />
    );
};
NumberFormatCustom.defaultProps = {
    onChange: () => {},
};
NumberFormatCustom.propTypes = {
    onChange: PropTypes.func,
    inputRef: PropTypes.func,
    name: PropTypes.string,
    displayType: PropTypes.string,
    suffix: PropTypes.string,
};

export default NumberFormatCustom;
