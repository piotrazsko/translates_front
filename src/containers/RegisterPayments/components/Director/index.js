import { Button, makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';
import React, { useCallback } from 'react';
import Calendar from '../../../../components/DatePicker/Calendar';
import style from '../../style.scss';
import PlainField from '../common/PlainField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useFormHook } from '../common/formHook';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
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
            border: '2px solid #FA835F'
        }
    },
    arrow: {
        marginRight: 13,
    },
    date: {
        minWidth: 340,
    }
}));

const Director = ({
    step,
    saveStepData,
    savedStepData,
    handleNext,
    handleBack,
    isBel,
}) => {
    const classes = useStyles();
    const getRequiredFields = useCallback(() => isBel
        ? [
            'manager_name',
            'manager_post',
            'manager_company_docs',
        ]
        : [
            'manager_name',
            'manager_post',
            'manager_company_docs',
            'manager_birthday',
            'manager_docs_type',
            'manager_docs_series',
            'manager_docs_number',
            'manager_docs_date',
            'manager_docs_organ',
            'manager_code',
            'manager_address',
        ]
    , [isBel])

    const { formData, errorsData, onFormFieldChange, onDateFieldChange, onSave } = useFormHook({
        formId: step,
        saveFormData: saveStepData,
        initFormData: savedStepData,
        getRequiredFields: getRequiredFields,
        onSaveSuccess: handleNext,
    })

    const handleBackClick = () => {
        saveStepData(step, formData); // presave to outer scope not to loose user filled data;
        handleBack();
    }

    const { 
        manager_name,
        manager_post,
        manager_company_docs,
        manager_birthday,
        manager_docs_type,
        manager_docs_series,
        manager_docs_number,
        manager_docs_date,
        manager_docs_organ,
        manager_code,
        manager_address,
     } = formData;

    return (
        <>
            <p className={style.stepDescription}>
                Заполните информацию о руководителе организации, кто будет подписывать документы
            </p>

            <PlainField
                label='Фамилия Имя Отчество'
                placeholder='Введите ФИО'
                value={manager_name}
                onChange={onFormFieldChange('manager_name')}
                error={errorsData.manager_name}
            />
            <PlainField
                label='Должность'
                placeholder='Введите должность руководителя'
                value={manager_post}
                onChange={onFormFieldChange('manager_post')}
                error={errorsData.manager_post}
            />
            <PlainField
                label='Действует на основании'
                placeholder='Вид документа'
                value={manager_company_docs}
                onChange={onFormFieldChange('manager_company_docs')}
                error={errorsData.manager_company_docs}
            />
            {!isBel && (
                <>
                    <div className={style.fieldWrapper}>
                        <span className={style.fieldTitle}>Дата рождения</span>
                        <Calendar
                            date={manager_birthday ? new Date(manager_birthday): undefined}
                            onChange={onDateFieldChange('manager_birthday')}
                            variant='outlined'
                            showMonthAndYearPickers
                        >
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                value={manager_birthday ? moment(manager_birthday).format('DD MMMM YYYY') : undefined}
                                placeholder='Выберите дату'
                                margin='normal'
                                error={!!errorsData.manager_birthday}
                                label={errorsData.manager_birthday}
                                className={classes.date}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <CalendarTodayIcon htmlColor={'#fa835f'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Calendar>
                    </div>
                    <PlainField
                        label='Вид документа, удостоверяющего личность'
                        placeholder='Документ'
                        value={manager_docs_type}
                        onChange={onFormFieldChange('manager_docs_type')}
                        error={errorsData.manager_docs_type}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder='Серия'
                        value={manager_docs_series}
                        onChange={onFormFieldChange('manager_docs_series')}
                        error={errorsData.manager_docs_series}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder='Номер'
                        value={manager_docs_number}
                        onChange={onFormFieldChange('manager_docs_number')}
                        error={errorsData.manager_docs_number}
                        type={'number'}
                        margin={'small'}
                    />
                    <div className={classNames(style.fieldWrapper, style.small)}>
                        <Calendar
                            date={manager_docs_date ? new Date(manager_docs_date): undefined}
                            onChange={onDateFieldChange('manager_docs_date')}
                            variant='outlined'
                            showMonthAndYearPickers
                        >
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                value={manager_docs_date ? moment(manager_docs_date).format('DD MMMM YYYY') : undefined}
                                placeholder='Дата выдачи'
                                margin='normal'
                                error={!!errorsData.manager_docs_date}
                                label={errorsData.manager_docs_date}
                                className={classes.date}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <CalendarTodayIcon htmlColor={'#fa835f'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Calendar>
                    </div>
                    <PlainField
                        placeholder='Орган, выдавший документы'
                        value={manager_docs_organ}
                        onChange={onFormFieldChange('manager_docs_organ')}
                        error={errorsData.manager_docs_organ}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder='Код подразделения'
                        value={manager_code}
                        onChange={onFormFieldChange('manager_code')}
                        error={errorsData.manager_code}
                        margin={'small'}
                    />
                    <PlainField
                        placeholder='Адрес регистрации'
                        value={manager_address}
                        onChange={onFormFieldChange('manager_address')}
                        error={errorsData.manager_address}
                    />
                </>
            )}
                
            <Button
                variant='outlined'
                color='primary'
                onClick={handleBackClick}
                className={classes.backButton}
                size='large'
            >
                <ArrowBackIcon className={classes.arrow}/>
                Назад
            </Button>
            <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={onSave}
                size='large'
            >
                Далее
            </Button>
        </>
    );
};


export default Director;
