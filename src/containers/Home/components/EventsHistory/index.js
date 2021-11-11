import React from 'react';
import PropTypes from 'prop-types';
import { NumberFormat } from 'components';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import InfoCard from '../../../../components/InfoCard';
import EventLine from '../EventLine';
import { Calendar } from 'assets/img/svg/prepared';
import style from './style.scss';

const EventsHistory = ({ events, currencyCurrent, onClick = () => {} }) => {
    const sortedEvents = React.useMemo(() => {
        return [...events].sort((a, b) => {
            return (
                -moment(a.updated_at)
                    .toDate()
                    .valueOf() +
                moment(b.updated_at)
                    .toDate()
                    .valueOf()
            );
        });
    }, [events]);
    return (
        <InfoCard title="Недавние" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                {events.length == 0 ? (
                    <div className={style.containerEmpty}>
                        <Calendar />
                        <span className={style.title}>У вас нет истории записей </span>
                        {/*<span className={style.text}>Создайте парочку </span>*/}
                    </div>
                ) : (
                    <div className={style.eventsContainer}>
                        {sortedEvents.map(i => (
                            <EventLine
                                key={i.id}
                                data={i}
                                currencyCurrent={currencyCurrent}
                                onClick={() => onClick(i.id)}
                            />
                        ))}
                    </div>
                )}
            </Grid>
        </InfoCard>
    );
};

EventsHistory.propTypes = {
    events: PropTypes.array,
    currencyCurrent: PropTypes.object,
};

export default EventsHistory;
