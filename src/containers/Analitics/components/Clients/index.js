import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { InfoCard, InfoCardLine } from 'components';
import style from './style.scss';

const Clients = ({ data }) => {
    const {
        clients_count,
        new_events_clients_count,
        events_clients_count,
        retention,
        repeated_events_clients_count,
    } = data;
    return (
        <InfoCard title="Клиенты" minHeight="377px" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                <InfoCardLine title={'Добавленные'} value={clients_count} />
                <InfoCardLine title={'Записавшиеся'} value={events_clients_count} />
                <InfoCardLine title={'Новых записавшихся'} value={new_events_clients_count} />
                <InfoCardLine title={'С повторной записью'} value={repeated_events_clients_count} />
                <InfoCardLine
                    title={'Месячная возвращаемость'}
                    value={((retention || 0) * 100).toFixed(1) + '%'}
                />
                <InfoCardLine title={''} value={''} />
            </Grid>
        </InfoCard>
    );
};

Clients.propTypes = {
    data: PropTypes.object,
};
Clients.defaultProps = {};

export default Clients;
