import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import {
    getCompaniesRequest,
    getOrganizationRequest,
    companiesSelector,
    organizationSelector,
} from 'modules/register_payments';
import { getSalonSelector } from 'modules/salon';

import { Calendar, AutocompleteSelect } from 'components';
import { Button } from '@material-ui/core';
import PlainField from '../common/PlainField';

import style from '../../style.scss';

function getRequiredFields(isBel) {
    return isBel
        ? ['short_name', 'unp', 'legal_address']
        : [
              'short_name',
              'inn',
              'okved',
              'ogrn',
              'registration_authority',
              'registration_date',
              'legal_address',
              'authorized_capital',
          ];
}

const Organization = ({ step, saveStepData, savedStepData, handleNext, isBel }) => {
    const dispatch = useDispatch();
    const { id } = useSelector(getSalonSelector);
    const autocompleteList = useSelector(companiesSelector);
    const organizationDetails = useSelector(organizationSelector);
    const [stepData, setStepData] = useState({});
    const [errorsData, setErrorsData] = useState({});
    const [valueToAutoComplete, setValueToAutocomplete] = useState({});
    const [validationOnType, setValidationOnType] = useState(false);
    const {
        short_name,
        inn,
        kpp,
        okved,
        ogrn,
        registration_date,
        legal_address,
        registration_authority,
        authorized_capital,
        unp,
    } = stepData;
    const hasStepData = Object.keys(stepData).length > 0;
    const isFullFieldsetVisible =
        Object.keys(organizationDetails).length > 0 || hasStepData || isBel;

    const onStepFieldChange = field => e => {
        const { value } = e.target;
        setStepData({ ...stepData, [field]: value });
    };

    const onDateFieldChange = field => value => {
        setStepData({ ...stepData, [field]: value });
    };

    const validateFields = () => {
        const errorFields = getRequiredFields(isBel).filter(field => {
            const value = stepData[field];
            return !value;
        });
        if (isEmpty(errorFields)) {
            setErrorsData({});
            return true;
        }

        const errorsData = errorFields.reduce((data, field) => {
            return { ...data, [field]: 'Поле обязательно для заполнения' };
        }, {});

        setErrorsData(errorsData);
        return false;
    };

    const onNextClick = () => {
        const isValid = validateFields();
        if (isValid) {
            saveStepData(step, stepData);
            handleNext();
        } else {
            setValidationOnType(true);
        }
    };

    React.useEffect(() => {
        if (validationOnType) {
            validateFields();
        }
    }, [stepData, validationOnType]);

    const options = React.useMemo(() => {
        return autocompleteList.map(i => ({ value: i.title, label: i.title, id: i.inn }));
    }, [autocompleteList]);
    React.useEffect(() => {
        if (savedStepData && savedStepData.inn && !isBel) {
            setStepData(savedStepData);
            setValueToAutocomplete(options.find(i => savedStepData.inn === i.id));
            return;
        } else if (savedStepData && isBel) {
            setStepData(savedStepData);
            return;
        }
    }, [savedStepData, isBel]);

    React.useEffect(() => {
        if (organizationDetails) {
            // eslint-disable-next-line no-unused-vars
            const { management, ...requiredOrganizationDetails } = organizationDetails;
            setStepData({ ...savedStepData, ...requiredOrganizationDetails });
            return;
        }
    }, [organizationDetails]);

    const validDate = moment(registration_date).isValid();

    const onChange = (data, value) => {
        setValueToAutocomplete(value);
        if (value && value.id) {
            const inn = value.id;
            if (inn) {
                dispatch(
                    getOrganizationRequest({
                        id,
                        inn,
                    })
                );
            }
        }
    };
    const onChangeText = ev => {
        clearTimeout(onChangeText.timer);
        let value = ev.target.value.trim();
        onChangeText.timer = setTimeout(function() {
            dispatch(getCompaniesRequest({ title: value }));
        }, 500);
    };
    return (
        <>
            <p className={style.stepDescription}>
                Заполните информацию о Вашей организации, чтобы мы смогли сформировать Договор, по
                которому Вы сможете безналично оплачивать услуги FeelQueen.
            </p>
            {!isBel ? (
                <>
                    <p className={style.stepDescription}>
                        Введите название, а затем выберите вашу организацию из списка. Мы
                        автоматически подставим информацию из открытых источников для ускорения
                        процесса.
                    </p>

                    <div className={style.fieldWrapper}>
                        <span className={style.fieldTitle}>Название организации</span>
                        <AutocompleteSelect
                            options={options}
                            value={valueToAutoComplete}
                            onChange={(event, newInputValue) => {
                                onChange(event, newInputValue);
                            }}
                            textFieldProps={{
                                required: true,
                                // label: 'Название организации',
                                placeholder: 'Название организации',
                                name: 'organizatin',
                                margin: 'normal',
                                helperText: '',
                                autoComplete: 'off',
                                onChange: onChangeText,
                            }}
                        />
                    </div>
                </>
            ) : null}
            {isFullFieldsetVisible ? (
                <>
                    <PlainField
                        label={isBel ? 'Название компании' : 'Сокращенное наименование'}
                        value={short_name}
                        onChange={onStepFieldChange('short_name')}
                        placeholder={isBel ? 'Полное название организации' : undefined}
                        error={errorsData.short_name}
                    />
                    {!isBel ? (
                        <>
                            <PlainField
                                label={'ИНН'}
                                value={inn}
                                onChange={onStepFieldChange('inn')}
                                error={errorsData.inn}
                            />
                            <PlainField
                                label={'КПП'}
                                value={kpp}
                                onChange={onStepFieldChange('kpp')}
                                error={errorsData.kpp}
                            />
                            <PlainField
                                label={'ОКВЭД'}
                                value={okved}
                                onChange={onStepFieldChange('okved')}
                                error={errorsData.okved}
                            />
                            <PlainField
                                label={'ОГРН'}
                                value={ogrn}
                                onChange={onStepFieldChange('ogrn')}
                                error={errorsData.ogrn}
                            />
                            <PlainField
                                label={'Орган государственной регистрации'}
                                value={registration_authority}
                                onChange={onStepFieldChange('registration_authority')}
                                error={errorsData.registration_authority}
                            />

                            <div className={style.fieldWrapper}>
                                <span className={style.fieldTitle}>Дата регистрации</span>
                                <Calendar
                                    date={validDate ? moment(registration_date).toDate() : null}
                                    onChange={onDateFieldChange('registration_date')}
                                    variant="outlined"
                                    showMonthAndYearPickers
                                >
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        value={
                                            validDate
                                                ? moment(registration_date).format('DD MMMM YYYY')
                                                : null
                                        }
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CalendarTodayIcon htmlColor={'##fa835f'} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={
                                            !validDate ? (
                                                <Typography color="error">
                                                    Проверьте дату регистрации
                                                </Typography>
                                            ) : (
                                                ''
                                            )
                                        }
                                    />
                                </Calendar>
                            </div>
                        </>
                    ) : null}
                    {isBel ? (
                        <PlainField
                            label={'УНП'}
                            value={unp}
                            onChange={onStepFieldChange('unp')}
                            error={errorsData.unp}
                            placeholder={'УНП организации'}
                        />
                    ) : null}
                    <PlainField
                        label={'Юридический адрес'}
                        value={legal_address}
                        onChange={onStepFieldChange('legal_address')}
                        error={errorsData.legal_address}
                        placeholder={'Юридический адрес организации'}
                    />
                    {!isBel ? (
                        <PlainField
                            label={'Сведения об уставном капитале'}
                            value={authorized_capital}
                            onChange={onStepFieldChange('authorized_capital')}
                            placeholder={'Размер, ₽'}
                            type={'number'}
                            error={errorsData.authorized_capital}
                        />
                    ) : null}
                </>
            ) : null}
            <div className={style.buttonWrapper}>
                <Button variant="contained" color="primary" onClick={onNextClick} size="large">
                    Далее
                </Button>
            </div>
        </>
    );
};

export default Organization;

Organization.propTypes = {
    step: PropTypes.number,
    saveStepData: PropTypes.func,
    savedStepData: PropTypes.object,
    handleNext: PropTypes.func,
    isBel: PropTypes.bool,
};
