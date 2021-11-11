import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { getSalonSelector } from 'modules/salon';
import { getCurrencySelector } from 'modules/localization';
import { showPopupAction } from 'modules/popups';
import {
    getPaymentDataRequst,
    getOrderRequst,
    getBalanceRequest,
    getPaymentsRequest,
    getBalanceSelector,
    getPaymentsHistorySelector,
    getOrdersSelector,
    getPaymentDataSelector,
    setPaymentRequest,
} from 'modules/payments';
import { showSuccess } from 'modules/notifications';

export const useHooks = ({ history }) => {
    const currency = useSelector(getCurrencySelector);
    const { id, ...salon } = useSelector(getSalonSelector);

    const dispatch = useDispatch();
    React.useEffect(() => {
        if (id) {
            dispatch(getPaymentsRequest({ id }));
            dispatch(getOrderRequst({ id }));
            dispatch(getBalanceRequest({ id }));
            dispatch(getPaymentDataRequst({ id }));
        }
    }, [id]);
    const onClickPayment = () => {
        dispatch(
            showPopupAction({
                title: 'Оплата комисии',
                message: `Вы можете оплатить комиссию, сформировав счёт по текущее число.
Он будет доступен в секции “Счета и Акты"`,
                onClick: () => {
                    dispatch(
                        setPaymentRequest(
                            { id },
                            {
                                onSuccess: () => {
                                    dispatch(showSuccess({ message: 'Успешно' }));
                                    dispatch(getPaymentsRequest({ id }));
                                    dispatch(getOrderRequst({ id }));
                                    dispatch(getBalanceRequest({ id }));
                                    dispatch(getPaymentDataRequst({ id }));
                                },
                            }
                        )
                    );
                    return true;
                },
                showClear: true,
                align: 'right',
                submitButtonText: 'Сформировать акт и счет',
                showCancel: false,
                // confirmButtonProps: { size: 'small' },
            })
        );
    };
    const balance = useSelector(getBalanceSelector);
    const paymentsHistory = useSelector(getPaymentsHistorySelector);
    const orders = useSelector(getOrdersSelector);
    const paymentsData = useSelector(getPaymentDataSelector);
    return { balance, paymentsHistory, orders, paymentsData, onClickPayment };
};
