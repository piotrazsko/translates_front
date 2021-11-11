import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { InfoCard, NumberFormat } from 'components';
import { DownloadLink } from 'feelqueen_components';
import style from './style.scss';

const Docs = ({ data }) => {
    return (
        <InfoCard title="Счета и акты" minHeight="377px" showMenu={false}>
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
                            <th className={style.tableHead} scope="col" />
                            <th className={style.tableHead} scope="col" />
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
                                    <DownloadLink
                                        align="left"
                                        href={i.bill_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Счет
                                    </DownloadLink>
                                </td>
                                <td className={style.tableCell}>
                                    <DownloadLink
                                        align="left"
                                        href={i.act_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {' '}
                                        Акт
                                    </DownloadLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Grid>
        </InfoCard>
    );
};

Docs.propTypes = {
    data: PropTypes.object,
};
Docs.defaultProps = { data: [] };

export default Docs;
