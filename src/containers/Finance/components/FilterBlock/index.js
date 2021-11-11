import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';
import { SimpleSelect as Select } from 'feelqueen_components';
import DatePicker from 'components/DatePicker';
// import { Select } from 'components';

import style from './style.scss';

const FilterBlock = ({
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
    rightAlign = false,
    variant,
}) => {
    return (
        <Grid container className={style.filterContainer}>
            <Grid item xs={12} className={style.filter}>
                <DatePicker
                    variant={variant}
                    rightAlign={rightAlign}
                    onChange={data => {
                        setDate({
                            from: moment(data[0].startDate),
                            to: moment(data[0].endDate),
                        });
                    }}
                    date={date}
                />
                <Select
                    variant={variant}
                    placeholder="Все услуги"
                    value={skill}
                    options={[...services]}
                    onChange={setSkill}
                />
                <Select
                    variant={variant}
                    placeholder="Все сотрудники"
                    value={master}
                    onChange={setMaster}
                    options={[...masters]}
                />
                <Select
                    variant={variant}
                    placeholder="Платежи"
                    options={[...paymentsList]}
                    value={payment}
                    onChange={setPayment}
                />
            </Grid>
        </Grid>
    );
};

FilterBlock.propTypes = {
    date: PropTypes.object,
    setDate: PropTypes.func,
    services: PropTypes.array,
    setSkill: PropTypes.func,
    setMaster: PropTypes.func,
    master: PropTypes.object,
    skill: PropTypes.object,
    masters: PropTypes.array,
    paymentsList: PropTypes.array,
    payment: PropTypes.object,
    setPayment: PropTypes.func,
    rightAlign: PropTypes.bool,
    variant: PropTypes.string,
};

export default FilterBlock;
