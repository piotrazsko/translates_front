/* global google */
import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteSelect from '../../AutocompleateSelect';
const service = new google.maps.places.AutocompleteService();

const loadOptions = ({ value, city, setSuggestions }) => {
    if (value.length > 2 && service && city) {
        service.getPlacePredictions(
            {
                input: `${city} ${value}`,
                // componentRestrictions: { country: countryCode },
                types: ['geocode'],
            },
            (predictions, status) => {
                let address = [];
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    address = predictions.map(item => {
                        return {
                            label: item.structured_formatting.main_text,
                        };
                    });
                }
                setSuggestions(address.map(i => ({ ...i, value: i.label })));
            }
        );
    } else {
        setSuggestions([]);
    }
};

const AddressAutoCompleate = ({
    onChange,
    city,
    value = '',
    name = '',
    label = 'Город',
    placeholder = 'Например, Москва',
    required,
    helperText,
}) => {
    const [address, setAddress] = React.useState(value);

    const [suggestions, setSuggestions] = React.useState([]);
    React.useEffect(() => {
        setAddress(value);
    }, [value]);

    React.useEffect(() => {
        onChange(address);
        loadOptions({ value: address, city, setSuggestions });
    }, [address]);

    return (
        <AutocompleteSelect
            options={suggestions}
            inputValue={address}
            onInputChange={(event, newInputValue) => {
                setAddress(newInputValue);
            }}
            freeSolo
            textFieldProps={{
                required,
                label,
                placeholder,
                name: name,
                margin: 'normal',
                helperText,
                autoComplete: 'off',
            }}
        />
    );
};

AddressAutoCompleate.defaultProps = {
    onChange: () => {},
};
AddressAutoCompleate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    city: PropTypes.string,
    required: PropTypes.bool,
    helperText: PropTypes.string,
};

export default AddressAutoCompleate;
