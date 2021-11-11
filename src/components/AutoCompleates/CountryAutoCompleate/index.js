import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteSelect from '../../AutocompleateSelect';

const countries = [{ value: 'Беларусь', label: 'Беларусь' }, { value: 'Россия', label: 'Россия' }];

const CountryAutoCompleate = ({
    onChange,
    value = '',
    name = '',
    label = 'Страна',
    placeholder = 'Например, Россия',
    required,
    helperText,
}) => {
    const [country, setCountry] = React.useState(value);
    React.useEffect(() => {
        setCountry(value);
    }, [value]);
    React.useEffect(() => {
        onChange(country);
    }, [country]);

    return (
        <AutocompleteSelect
            options={countries}
            inputValue={country}
            onInputChange={(event, newInputValue) => {
                setCountry(newInputValue);
            }}
            textFieldProps={{
                required,
                helperText,
                label,
                placeholder,
                autoComplete: 'off',
                name: name,
                margin: 'normal',
            }}
        />
    );
};

CountryAutoCompleate.defaultProps = {
    onChange: () => {},
};
CountryAutoCompleate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    helperText: PropTypes.string,
};

export default CountryAutoCompleate;
