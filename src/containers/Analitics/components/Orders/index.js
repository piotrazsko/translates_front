import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';
import { InfoCard, InfoCardLine } from 'components';
import style from './style.scss';

const Orders = ({ data }) => {
    const {
        avg_occupancy,
        cancelled_events_count,
        completed_events_count,
        events_count,
        partner_problem_events_count,
        users_created_events_count,
    } = data;
    return (
        <InfoCard title="Записи" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                <InfoCardLine title={'Всего'} value={events_count} />
                <InfoCardLine title={'Завершенных'} value={completed_events_count} />
                <InfoCardLine title={'Создано клиентами'} value={users_created_events_count} />
                <InfoCardLine title={'Отмененных'} value={cancelled_events_count} />
                <InfoCardLine title={'Клиентов не пришло'} value={partner_problem_events_count} />
                <InfoCardLine
                    title={'Средняя заполняемость'}
                    value={((avg_occupancy || 0) * 100).toFixed(1) + '%'}
                />
            </Grid>
        </InfoCard>
    );
};

Orders.propTypes = {
    topServices: PropTypes.object,
    currencyCurrent: PropTypes.object,
};
Orders.defaultProps = {
    topServices: [],
};

export default Orders;
