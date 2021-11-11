/* global google , Promise*/
import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteSelect from '../../AutocompleateSelect';
import { getCitiesByCountry, getCodesByCountryName } from 'config/countries';

const service = new google.maps.places.AutocompleteService();

const CityAutoCompleate = ({
    onChange,
    value = '',
    name = '',
    label = 'Город',
    placeholder = 'Например, Москва',
    country,
    required,
    helperText,
}) => {
    const [city, setCity] = React.useState(value);
    const [cities, setCities] = React.useState(getCitiesByCountry(country));
    React.useEffect(() => {
        setCity(value);
    }, [value]);
    React.useEffect(() => {
        onChange(city);
    }, [city]);

    const getCitiesOption = event => {
        if (event.length > 1) {
            let arr = cities;
            return new Promise(resolve => {
                service.getPlacePredictions(
                    {
                        input: event,
                        componentRestrictions: {
                            country: [...getCodesByCountryName(country)],
                        },
                        types: ['(cities)'],
                    },
                    (predictions, status) => {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            arr = predictions.map(item => {
                                return {
                                    label: item.structured_formatting.main_text,
                                    value: item.structured_formatting.main_text,
                                };
                            });
                        }

                        resolve({ options: arr });
                    }
                );
            });
        } else {
            return Promise.resolve({
                options: cities,
            });
        }
    };

    React.useEffect(() => {
        setCities(getCitiesByCountry(country));
    }, [country]);
    React.useEffect(() => {
        let arr = getCitiesOption(city);
        arr.then(data => {
            setCities(data.options);
        });
    }, [city]);

    return (
        <AutocompleteSelect
            options={cities}
            inputValue={city}
            onInputChange={(event, newInputValue) => {
                setCity(newInputValue);
            }}
            textFieldProps={{
                required,
                helperText,
                label,
                placeholder,
                name: name,
                margin: 'normal',
            }}
        />
    );
};

CityAutoCompleate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    helperText: -PropTypes.string,
    country: PropTypes.string,
};
CityAutoCompleate.defaultProps = {
    onChange: () => {},
};

export default CityAutoCompleate;
