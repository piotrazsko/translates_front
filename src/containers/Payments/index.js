import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'components';
import Grid from '@material-ui/core/Grid';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { useHooks } from './hooks';
import MyPayments from './components/MyPayments';
import Docs from './components/Docs';
import PaymentsData from './components/PaymentsData';
import PaymentsHistory from './components/PaymentsHistory';
import style from './style.scss';

const Analitics = ({ history, currentLocalization }) => {
    const { countryCode } = currentLocalization;
    const { balance, paymentsHistory, orders, paymentsData, onClickPayment } = useHooks({
        history,
    });
    return (
        <Skeleton
            backgroundColor="#fffaf6"
            textError=""
            title="Платежи"
            subTitle=""
            nextButtonText="Размеры комиссий"
            nextButtonProps={{ variant: 'outlined', endIcon: <InfoOutlinedIcon color="primary" /> }}
            onNext={() => {
                history.push('/payments-taxes');
            }}
            bottomPositionButtons={false}
        >
            <Grid container spacing={3} className={style.container}>
                <Grid container spacing={3} className={style.container}>
                    <Grid item md={6}>
                        <MyPayments
                            data={balance}
                            paymentsData={paymentsData}
                            onClick={onClickPayment}
                        />
                    </Grid>

                    <Grid item md={6}>
                        <PaymentsData
                            data={paymentsData}
                            countryCode={countryCode}
                            history={history}
                        />
                    </Grid>

                    <Grid item md={6}>
                        <Docs data={orders} />
                    </Grid>

                    <Grid item md={6}>
                        <PaymentsHistory data={paymentsHistory} />
                    </Grid>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

Analitics.propTypes = {
    history: PropTypes.object,
    currentLocalization: PropTypes.object,
};

export default Analitics;
