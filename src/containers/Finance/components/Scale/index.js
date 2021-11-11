import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';
import Button from '@material-ui/core/Button';
import InfoCard from '../../../../components/InfoCard';
import { Calculator } from 'assets/img/svg/prepared';
import ScaleDefault from '../ScaleDefault';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Select from '../Select';
import DatePicker from '../../../../components/DatePicker';
import FilterBlock from '../FilterBlock';
// import { Select } from 'components';

import style from './style.scss';

const Scale = ({
    currencyCurrent,
    payments,
    viewPort,
    showHeader = false,
    title = 'Финансы',
    date,
    setDate,
    services,
    setSkill,
    setMaster,
    master,
    skill,
    masters = [],
    paymentsList,
    payment,
    setPayment,
    showHeaderInfoCard = true,
    classes = { children: '', root: '', title: '' },
}) => {
    const { count_events, incomes = [], expenses = [] } = payments;

    return (
        <InfoCard
            className={[style.containerInfoCard, classes.root || ''].join(' ')}
            classNameChildren={[
                incomes.length == 0 && expenses.length == 0
                    ? style.emptyScaleContainer
                    : style.classNameChildren,
            ].join(' ')}
            classes={classes}
            showHeader={showHeaderInfoCard}
            showMenu={false}
            showDivider={false}
            headerContent={
                !showHeader && (
                    <span className={style.headerContent}>{moment().format('MMMM YYYY')}</span>
                )
            }
            title={title}
        >
            <Grid container className={style.scaleContainer}>
                {showHeader && (
                    <FilterBlock
                        setDate={setDate}
                        date={date}
                        skill={skill}
                        services={services}
                        setSkill={setSkill}
                        master={master}
                        setMaster={setMaster}
                        masters={masters}
                        paymentsList={paymentsList}
                        payment={payment}
                        setPayment={setPayment}
                    />
                )}
                <Grid item xs={12} className={style.dataContainer}>
                    {incomes.length == 0 && expenses.length == 0 ? (
                        <div className={style.containerEmpty}>
                            <Calculator height={40} width={32} />
                            <span className={style.title}>
                                Вы ничего не заработали за этот месяц
                            </span>
                            <span className={style.text}>
                                Ведите запись клиентов и отслеживайте
                                <br /> финансовую динамику
                            </span>
                        </div>
                    ) : (
                        <ScaleDefault
                            dateRange={date}
                            data={payments}
                            viewPort={viewPort}
                            currency={currencyCurrent.badge}
                        />
                    )}
                </Grid>
            </Grid>
        </InfoCard>
    );
};

Scale.propTypes = {
    currencyCurrent: PropTypes.object,
    payments: PropTypes.object,
    viewPort: PropTypes.object,
    showHeader: PropTypes.bool,
    title: PropTypes.string,
    date: PropTypes.object,
    setDate: PropTypes.func.isRequired,

    services: PropTypes.array,
    setSkill: PropTypes.func,
    setMaster: PropTypes.func,
    master: PropTypes.object,
    skill: PropTypes.object,
    masters: PropTypes.array,
    paymentsList: PropTypes.array,
    payment: PropTypes.object,
    setPayment: PropTypes.func,
    showHeaderInfoCard: PropTypes.bool,
    classes: PropTypes.shape({
        title: PropTypes.string,
        root: PropTypes.string,
        children: PropTypes.string,
    }),
};

export default Scale;
