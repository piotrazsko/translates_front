import React from 'react';
import PropTypes from 'prop-types';
import { NumberFormat } from 'components';

import InfoCard from '../../../../components/InfoCard';

import style from './style.scss';

const StatisticsCard = ({ payments, currencyCurrent }) => {
    return (
        <InfoCard
            title="Статистика"
            classNameChildren={style.classNameChildren}
            className={style.container}
            showDivider={false}
            showMenu={false}
        >
            <div className={style.containerStatistic}>
                <div className={style.statsisticItem}>
                    <span>Доход:</span>
                    <span className={style.incomeText}>
                        <NumberFormat
                            defaultValue={0}
                            value={`${payments.income_amount || '0'} `}
                            displayType={'text'}
                            thousandSeparator={' '}
                            suffix={currencyCurrent.badge || ''}
                        />
                    </span>
                </div>
                <div className={style.statsisticItem}>
                    <span>Расход:</span>
                    <span className={style.expensesText}>
                        <NumberFormat
                            defaultValue={0}
                            value={`${payments.expenses_amount || '0'} `}
                            displayType={'text'}
                            thousandSeparator={' '}
                            suffix={` ${currencyCurrent.badge || ''}`}
                        />
                    </span>
                </div>

                <div className={style.statsisticItem}>
                    <span>Средний чек:</span>
                    <span>
                        <NumberFormat
                            defaultValue={0}
                            value={`${payments.avg_price || 0} `}
                            displayType={'text'}
                            thousandSeparator={' '}
                            suffix={currencyCurrent.badge || ''}
                        />
                    </span>
                </div>

                <div className={style.statsisticItem}>
                    <span>Всего записей:</span>

                    <span>{`${payments.count_events || 0}`}</span>
                </div>
                <div className={style.legend}>
                    <span className={style.legendIncome}>Доход</span>
                    <span className={style.legendExpenses}>Расход</span>
                </div>
            </div>
        </InfoCard>
    );
};

StatisticsCard.propTypes = {
    payments: PropTypes.object,
    currencyCurrent: PropTypes.object,
};

export default StatisticsCard;
