import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { showPopupAction } from 'modules/popups';
import { getSalonSelector } from 'modules/salon';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPaymentsDocsRequest } from '../../../../modules/register_payments';
import style from '../../style.scss';
import { useFormHook } from '../common/formHook';
import Uploader from '../common/Uploader';

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
    },
}));


const Copies = ({
    step,
    saveStepData,
    savedStepData,
    handleNext,
    handleBack,
    history,
    isBel,
}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useSelector(getSalonSelector);
    
    const showPopup = useCallback(() => {
        dispatch(showPopupAction({
            title: 'Поздравляем, Вы справились!',
            message: 'Проверка Ваших документов займет несколько дней, мы свяжемся с Вами по завершению процесса или если у нас возникнут вопросы.',
            style: {
                maxWidth: 700,
            },
            onClick: () => {
                history.push('/payments');
                return true;
            },
            showCancel: false,
            submitButtonText: 'Окей, мне все понятно',
            childrenContainerClassName: classes.popupText,
        }));
    });
    
    const uploadFile = (type, file) => new window.Promise(resolve => {
        var fd = new FormData();
        fd.append("file", file);
        fd.append("type", type);
        
        dispatch(
            uploadPaymentsDocsRequest(
                { id, data: fd },
                { onSuccess: () => resolve() }
            )
        );
    });

    const onSaveSuccess = async () => {
        const filesTypes = Object.keys(formData); // 0 => 3
        await window.Promise.all(
            filesTypes.map(type => uploadFile(type, formData[type]))
        )
        showPopup();
        handleNext();
    }
    
    const { formData, onFileFieldChange, onSave } = useFormHook({
        formId: step,
        saveFormData: saveStepData,
        initFormData: savedStepData,
        onSaveSuccess: onSaveSuccess,
    });
    
    const handleBackClick = () => {
        saveStepData(step, formData); // presave to outer scope not to loose user filled data;
        handleBack();
    }
    
    return (
        <>
            <p className={style.stepDescription}>
                Загрузите скан подписанного договора в форму ниже, чтобы мы могли формировать счета и акты за оказанные услуги.
                Оригинал отправьте по почте на наш адрес, указанный в договоре.
            </p>
            <div className={style.fieldWrapper}>
                <span className={style.uploadFieldTitle}>Договор оказания услуг</span>
                <Uploader value={formData.salon_contract} onChange={onFileFieldChange('salon_contract')}/>
            </div>
            {!isBel && (
                <>
                    <p className={style.stepDescription}>
                    Загрузите сканы подписанных анкет эквайринг-партнёра, чтобы принимать онлайн-платежи от клиентов.
                    Оплатите счёт на подключение. Оригиналы отправьте по почте. 
                    </p>
                    <div className={style.fieldWrapper}>
                        <span className={style.uploadFieldTitle}>Анкета для подключения 1</span>
                        <Uploader value={formData.salon_online_payment_20_form} onChange={onFileFieldChange('salon_online_payment_20_form')}/>
                    </div>
                    <div className={style.fieldWrapper}>
                        <span className={style.uploadFieldTitle}>Анкета для подключения 2</span>
                        <Uploader value={formData.salon_online_payment_5_form} onChange={onFileFieldChange('salon_online_payment_5_form')}/>
                    </div>
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

Copies.propTypes = {
    step: PropTypes.number,
    saveStepData: PropTypes.func,
    savedStepData: PropTypes.object,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    history: PropTypes.object,
}

export default Copies;
