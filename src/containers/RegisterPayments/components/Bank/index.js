import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import style from '../../style.scss';
import { useFormHook } from '../common/formHook';
import PlainField from '../common/PlainField';

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

const Bank = ({ step, saveStepData, savedStepData, handleNext, handleBack, sendForm, isBel }) => {
    const classes = useStyles();

    const onSaveSuccess = stepData => {
        sendForm(stepData, () => {
            handleNext();
        });
    };

    const getRequiredFields = useCallback(
        () =>
            isBel
                ? ['bank_account', 'bank_name', 'bank_bik']
                : ['bank_account', 'bank_name', 'bank_bik', 'bank_correspondent_account'],
        [isBel]
    );

    const { formData, errorsData, onFormFieldChange, onSave } = useFormHook({
        formId: step,
        saveFormData: saveStepData,
        initFormData: savedStepData,
        getRequiredFields: getRequiredFields,
        onSaveSuccess: onSaveSuccess,
    });

    const handleBackClick = () => {
        saveStepData(step, formData); // presave to outer scope not to loose user filled data;
        handleBack();
    };

    const { bank_account, bank_name, bank_bik, bank_correspondent_account } = formData;

    return (
        <>
            <p className={style.stepDescription}>
                Заполните банковские реквизиты вашей организации, с которых будет производиться
                оплата за услуги FeelQueen
            </p>

            <PlainField
                label="Расчетный счет"
                placeholder="Расчетный счет организации"
                value={bank_account}
                onChange={onFormFieldChange('bank_account')}
                error={errorsData.bank_account}
            />
            <PlainField
                label="Наименование банка"
                placeholder="Например АО “Альфа-банк”"
                value={bank_name}
                onChange={onFormFieldChange('bank_name')}
                error={errorsData.bank_name}
            />
            <PlainField
                label="БИК банка"
                placeholder="БИК банка"
                value={bank_bik}
                onChange={onFormFieldChange('bank_bik')}
                error={errorsData.bank_bik}
            />
            {!isBel && (
                <PlainField
                    label="Корреспондентский счет"
                    placeholder="Корреспондентский счет организации"
                    value={bank_correspondent_account}
                    onChange={onFormFieldChange('bank_correspondent_account')}
                    error={errorsData.bank_correspondent_account}
                />
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

Bank.propTypes = {
    step: PropTypes.number,
    saveStepData: PropTypes.func,
    savedStepData: PropTypes.object,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    sendForm: PropTypes.func,
};

export default Bank;
