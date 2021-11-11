import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { InfoCard, NumberFormat } from 'components';
import { getTextByPayment } from 'constants/events';
import style from './style.scss';

const PaymentsHistory = ({ data }) => {
    return (
        <InfoCard title="История платежей" minHeight="377px" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style.tableHead} scope="col">
                                Дата
                            </th>
                            <th className={style.tableHead} scope="col">
                                Сумма
                            </th>
                            <th className={style.tableHead} scope="col">
                                Способ оплаты
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i, index) => (
                            <tr key={index}>
                                <td className={style.tableCell}>
                                    {moment(i.date).format('DD MMM YYYY')}
                                </td>
                                <td className={style.tableCellSumm}>
                                    <NumberFormat value={i.amount} />
                                </td>
                                <td className={style.tableCell}>
                                    {getTextByPayment(i.payment_type_id)}{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Grid>
        </InfoCard>
    );
};

PaymentsHistory.propTypes = {
    data: PropTypes.object,
};
PaymentsHistory.defaultProps = { data: [] };

export default PaymentsHistory;
