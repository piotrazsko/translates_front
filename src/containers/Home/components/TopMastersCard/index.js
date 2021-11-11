import React from 'react';
import PropTypes from 'prop-types';
import { NumberFormat } from 'components';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import InfoCard from '../../../../components/InfoCard';
import TopMasterCard from '../TopMasterCard';
import { Calculator, Calendar, Cup, Case, Time } from 'assets/img/svg/prepared';
import style from './style.scss';

const TodayEvents = ({ topMasters, currencyCurrent }) => {
    return (
        <InfoCard
            title="Топ сотрудников"
            headerContent={
                <span className={style.headerContent}> {moment().format('MMMM YYYY')}</span>
            }
            showMenu={false}
        >
            <Grid item xs={12} className={style.dataContainerSmall}>
                {topMasters.length == 0 ? (
                    <div className={style.containerEmpty}>
                        <Cup />
                        <span className={style.title}>Ваши сотрудники еще не работали </span>
                        {/*<span className={style.text}>Стоит наказать хотя бы одного</span>*/}
                    </div>
                ) : (
                    <div className={style.servicesContainer}>
                        {topMasters.map(i => (
                            <TopMasterCard key={i.id} data={i} currency={currencyCurrent.badge} />
                        ))}
                    </div>
                )}
            </Grid>
        </InfoCard>
    );
};

TodayEvents.propTypes = {
    topMasters: PropTypes.object,
    currencyCurrent: PropTypes.object,
};

export default TodayEvents;
