import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import { DownloadLink } from 'feelqueen_components';
import { getSalonSelector } from 'modules/salon';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsDocsRequest, paymentsDocsSelector } from 'modules/register_payments';
import style from '../../style.scss';
import PropTypes from 'prop-types';

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

const DocumentsSign = ({ handleNext, handleBack, isBel }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useSelector(getSalonSelector);
    const {
        salon_contract,
        salon_online_payment_20_form,
        salon_online_payment_5_form,
        salon_online_payment_invoice,
    } = useSelector(paymentsDocsSelector);

    const handleBackClick = () => {
        handleBack();
    };

    return (
        <>
            <p className={style.stepDescription}>
                Скачайте сформированный договор и подпишите его. *Загрузите копию на следующем шаге
                для проверки
            </p>
            <div className={style.fieldWrapper}>
                <DownloadLink
                    align="right"
                    href={salon_contract}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Договор оказания услуг FeelQueen
                </DownloadLink>
            </div>
            {!isBel && (
                <>
                    <p className={style.stepDescription}>
                        Рекомендуем вам подключить возможности принимать онлайн-платежи от клиентов.
                        Для этого скачайте и подпишите анкеты партнёра. Загрузка копий доступна на
                        следующем шаге. {/*Стоимость подключения - единоразовый платёж 1000р*/}
                    </p>
                    <div className={classNames(style.fieldWrapper, style.link)}>
                        <DownloadLink
                            align="right"
                            href={salon_online_payment_20_form}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Анкета для подключения приёма онлайн-платежей
                        </DownloadLink>
                    </div>
                    <div className={classNames(style.fieldWrapper, style.link)}>
                        <DownloadLink
                            align="right"
                            href={salon_online_payment_5_form}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Анкета для подключения приёма онлайн-платежей 2
                        </DownloadLink>
                    </div>
                    {/*  <div className={classNames(style.fieldWrapper)}>
                        <DownloadLink
                            align="right"
                            href={salon_online_payment_invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Счет на оплату подключения онлайн-платежей
                        </DownloadLink>
                    </div>*/}
                </>
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
                onClick={handleNext}
                size="large"
            >
                Далее
            </Button>
        </>
    );
};

DocumentsSign.propTypes = {
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
};

export default DocumentsSign;
