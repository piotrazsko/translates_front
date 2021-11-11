import { Button, makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import { default as React, useCallback } from 'react';
import Calendar from '../../../../components/DatePicker/Calendar';
import style from '../../style.scss';
import PlainField from '../common/PlainField';
import Switcher from '../common/Switcher';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useFormHook } from '../common/formHook';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const foundersTypes = [
    { label: 'Физ. лицо', value: false },
    { label: 'Юр. лицо', value: true },
];

const getValue = item => item.value;
const getLabel = item => item.label;

const getRequiredFields = formData => {
    return formData.is_juridic_founder
        ? []
        : [
              'name',
              'birthday',
              'passport_series',
              'passport_number',
              'passport_date',
              'passport_authority',
              'code',
          ];
};
const savePreProcessData = ({ is_juridic_founder, ...data }) => {
    return is_juridic_founder
        ? { is_juridic_founder }
        : {
              founders: [data],
          };
};

const formInitialData = {
    is_juridic_founder: false,
};

const preProcessInitData = data => {
    if (!data) {
        return formInitialData;
    }
    return data.is_juridic_founder ? data : data.founders ? data.founders[0] : undefined;
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: '0px 24px 0px 20px',
        minWidth: 128,
        border: '2px solid #FA835F',
        '&:hover': {
            border: '2px solid #FA835F',
        },
    },
    arrow: {
        marginRight: 13,
    },
    date: {
        minWidth: 340,
    },
}));

const Founders = ({ step, saveStepData, savedStepData, handleNext, handleBack }) => {
    const classes = useStyles();

    const preProcessStepInitData = useCallback(
        savedStepData => {
            return preProcessInitData(savedStepData);
        },
        [savedStepData]
    );

    const formInitData = preProcessStepInitData(savedStepData);

    const {
        formData,
        errorsData,
        onFormFieldChange,
        onDateFieldChange,
        onSave,
        onCustomFieldChange,
    } = useFormHook({
        formId: step,
        saveFormData: saveStepData,
        initFormData: formInitData,
        getRequiredFields: getRequiredFields,
        savePreProcess: savePreProcessData,
        onSaveSuccess: handleNext,
    });
    const {
        name,
        birthday,
        passport_series,
        passport_number,
        passport_date,
        passport_authority,
        code,
        is_juridic_founder,
    } = formData;
    const handleBackClick = () => {
        saveStepData(step, is_juridic_founder ? formData : { founders: [formData] }); // presave to outer scope not to loose user filled data;
        handleBack();
    };

    return (
        <>
            <p className={style.stepDescription}>Заполните информацию об учредителе организации</p>
            <div className={style.fieldWrapper}>
                <Switcher
                    values={foundersTypes}
                    value={is_juridic_founder}
                    getValue={getValue}
                    getLabel={getLabel}
                    onChange={onCustomFieldChange('is_juridic_founder')}
                />
            </div>
            {!is_juridic_founder ? (
                <>
                    <PlainField
                        label="Фамилия Имя Отчество"
                        placeholder="Введите ФИО"
                        value={name}
                        onChange={onFormFieldChange('name')}
                        error={errorsData.name}
                    />
                    <div className={style.fieldWrapper}>
                        <span className={style.fieldTitle}>Дата рождения</span>
                        <Calendar
                            date={birthday ? new Date(birthday) : undefined}
                            onChange={onDateFieldChange('birthday')}
                            variant="outlined"
                            showMonthAndYearPickers
                        >
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                value={
                                    birthday ? moment(birthday).format('DD MMMM YYYY') : undefined
                                }
                                placeholder="Выберите дату"
                                margin="normal"
                                error={!!errorsData.birthday}
                                label={errorsData.birthday}
                                className={classes.date}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CalendarTodayIcon htmlColor={'#fa835f'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Calendar>
                    </div>
                    <PlainField
                        label="Паспортные данные"
                        placeholder="Серия паспорта"
                        value={passport_series}
                        onChange={onFormFieldChange('passport_series')}
                        error={errorsData.passport_series}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder="Номер паспорта"
                        value={passport_number}
                        onChange={onFormFieldChange('passport_number')}
                        error={errorsData.passport_number}
                        margin={'small'}
                    />
                    <div className={classNames(style.fieldWrapper, style.small)}>
                        <Calendar
                            date={passport_date ? new Date(passport_date) : undefined}
                            onChange={onDateFieldChange('passport_date')}
                            variant="outlined"
                            showMonthAndYearPickers
                        >
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                value={
                                    passport_date
                                        ? moment(passport_date).format('DD MMMM YYYY')
                                        : undefined
                                }
                                placeholder="Дата выдачи"
                                margin="normal"
                                error={!!errorsData.passport_date}
                                label={errorsData.passport_date}
                                className={classes.date}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CalendarTodayIcon htmlColor={'#fa835f'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Calendar>
                    </div>
                    <PlainField
                        placeholder="Орган, выдавший документы"
                        value={passport_authority}
                        onChange={onFormFieldChange('passport_authority')}
                        error={errorsData.passport_authority}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder="Код подразделения"
                        value={code}
                        onChange={onFormFieldChange('code')}
                        error={errorsData.code}
                    />
                </>
            ) : (
                <p className={style.stepDescription}>
                    Для юридического лица дополнительная информация не требуется.
                </p>
            )}

            <Button
                variant="outlined"
                color="primary"
                onClick={handleBackClick}
                className={classes.backButton}
                size="large"
            >
                <ArrowBackIcon className={classes.arrow} />
                Назад
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onSave}
                size="large"
            >
                Далее
            </Button>
        </>
    );
};

Founders.propTypes = {
    step: PropTypes.number,
    saveStepData: PropTypes.func,
    savedStepData: PropTypes.object,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
};

export default Founders;
