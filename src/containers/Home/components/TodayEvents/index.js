import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InfoCard from '../../../../components/InfoCard';
import EventLine from '../EventLine';
import { Time } from 'assets/img/svg/prepared';
import style from './style.scss';

const TodayEvents = ({ events, currencyCurrent, onClick }) => {
    return (
        <InfoCard title="Записи сегодня" showMenu={false}>
            <Grid item xs={12} className={style.dataContainerSmall}>
                {events.length === 0 ? (
                    <div className={style.containerEmpty}>
                        <Time />
                        <span className={style.title}>У вас нет записей на сегодня</span>
                        {/*  <span className={style.text}>Запишите людей, ну </span>*/}
                    </div>
                ) : (
                    <div className={style.eventsContainer}>
                        {events.map(i => (
                            <EventLine
                                key={i.id}
                                data={i}
                                onClick={() => onClick(i.id)}
                                currencyCurrent={currencyCurrent}
                            />
                        ))}
                    </div>
                )}
            </Grid>
        </InfoCard>
    );
};

TodayEvents.propTypes = {
    events: PropTypes.object,
    currencyCurrent: PropTypes.object,
};

export default TodayEvents;
