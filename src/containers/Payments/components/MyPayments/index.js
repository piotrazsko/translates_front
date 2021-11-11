import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { InfoCard, NumberFormat } from 'components';
import style from './style.scss';

const INACTIVE = 'inactive';
const MyPayments = ({ data, paymentsData, onClick }) => {
    const { amount } = data;

    const { document_status } = paymentsData;
    let amountNum = parseFloat(amount);
    amountNum = amountNum > 0 ? amountNum : amountNum;
    return (
        <InfoCard title="Коммисия к оплате" minHeight="377px" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                <div className={style.container}>
                    <div className={style.details}>
                        <div
                            className={style.amount}
                            style={{
                                color:
                                    amountNum > 0 ? '#F60303' : amount == 0 ? '#767676' : '#F60303',
                            }}
                        >
                            <NumberFormat value={`-${amountNum}`} />
                        </div>
                        {document_status === INACTIVE ? (
                            <div
                                className={style.info}
                            >{`Заполните данные организации, чтобы оплачивать комиссию безналичным способом.`}</div>
                        ) : (
                            <>
                                <div
                                    className={style.info}
                                >{`Коммисия FeeLqueen за ${moment().format('MMM YYYY')}`}</div>
                                <div
                                    className={style.info}
                                >{`Счет будет автоматически  выставлен ${moment()
                                    .startOf('month')
                                    .add(1, 'month')
                                    .format('DD MMM YYYY')}`}</div>
                            </>
                        )}
                    </div>
                    <Button
                        onClick={onClick}
                        className={style.button}
                        color="primary"
                        disabled={document_status === INACTIVE || amountNum === 0}
                        variant="contained"
                    >
                        Оплатить
                    </Button>
                </div>
            </Grid>
        </InfoCard>
    );
};

MyPayments.propTypes = {
    data: PropTypes.object,
    paymentsData: PropTypes.object,
    onClick: PropTypes.func,
};
MyPayments.defaultProps = {};

export default MyPayments;
