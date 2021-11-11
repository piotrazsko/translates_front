import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import AutocompleteSelect from '../../AutocompleateSelect';
import { getListMetroRequest, getListMetroSelector } from 'modules/metro';
import get from 'lodash/get';
const MetroAutoCompleate = ({
    onChange,
    city,
    value = '',
    name = '',
    label = 'Метро',
    placeholder = 'Например, Парк Челюскинцев',
    required,
    helperText,
}) => {
    const dispatch = useDispatch();
    const metroList = useSelector(getListMetroSelector);
    React.useEffect(() => {
        if (city) {
            dispatch(getListMetroRequest({ city }));
        }
    }, [city]);
    const metroOptions = React.useMemo(
        () => metroList.map(i => ({ value: i.title, label: i.title, id: i.id })),
        [metroList]
    );

    const [metro, setMetro] = React.useState(value);

    React.useEffect(() => {
        setMetro(metroOptions.find(i => i.id == get(value, 'id')));
    }, [value, metroOptions]);
    React.useEffect(() => {
        if (metro && metro.id !== get(value, 'id')) {
            onChange(metro);
        }
    }, [metro]);

    return (
        <AutocompleteSelect
            options={metroOptions}
            value={metro}
            onChange={(event, newInputValue) => {
                setMetro(newInputValue);
            }}
            disabled={!city || metroOptions.length == 0}
            textFieldProps={{
                required: required,
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

MetroAutoCompleate.defaultProps = {
    onChange: () => {},
};
MetroAutoCompleate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    city: PropTypes.string,
    required: PropTypes.bool,
    helperText: PropTypes.string,
};

export default MetroAutoCompleate;
