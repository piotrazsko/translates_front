import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import { InfoCard, InfoCardLine, NumberFormat } from 'components';
import { Calculator, Calendar, Cup, Case, Time } from 'assets/img/svg/prepared';
import style from './style.scss';

const TopServices = ({ topServices, title, showHead = true }) => {
    return (
        <InfoCard
            title={title || 'Топ сервисов'}
            headerContent={
                showHead && (
                    <span className={style.headerContent}>{moment().format('MMMM YYYY')}</span>
                )
            }
            showMenu={false}
        >
            <Grid item xs={12} className={style.dataContainerSmall}>
                {topServices.length === 0 ? (
                    <div className={style.containerEmpty}>
                        <Case />
                        <span className={style.title}>Вы еще не работали в этом месяце </span>
                        {/*<span className={style.text}>Используйте ваши услуги с умом! </span>*/}
                    </div>
                ) : (
                    <div className={style.servicesContainer}>
                        <div className={style.labels}>
                            <span>Услуга</span>
                            <span>Кол-во записей</span>
                        </div>
                        {topServices.map(i => (
                            <InfoCardLine key={i.id} title={i.title} value={i.count} />
                        ))}
                    </div>
                )}
            </Grid>
        </InfoCard>
    );
};

TopServices.propTypes = {
    topServices: PropTypes.object,
    currencyCurrent: PropTypes.object,
};
TopServices.defaultProps = {
    topServices: [],
};

export default TopServices;
