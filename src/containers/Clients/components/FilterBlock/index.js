import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { SimpleSelect as Select, SimpleInput } from 'feelqueen_components';
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
    rightAlign = false,
    variant = '',
    dateFree,
    setDateFree,
    summ,
    setSumm,
    numVisits,
    setNumVisits,
}) => {
    return (
        <Grid container className={style.filterContainer}>
            <Grid item xs={12} className={style.filter}>
                <Select
                    variant={master ? 'contained' : variant}
                    color="primary"
                    placeholder="Все сотрудники"
                    value={master}
                    onChange={setMaster}
                    options={[...masters]}
                />
                {/*    <Select
                    variant={variant}
                    placeholder="Все услуги"
                    value={skill}
                    options={[...services]}
                    onChange={setSkill}
                />*/}
                <SimpleInput
                    variant={numVisits.from || numVisits.to ? 'contained' : variant}
                    color="primary"
                    placeholder="По кол-ву посещений"
                    imputsProps={{ size: 'small' }}
                    inputStartProps={{ placeholder: '' }}
                    inputEndProps={{ placeholder: '' }}
                    value={numVisits}
                    onChange={summ => {
                        setNumVisits(summ);
                    }}
                />
                <DatePicker
                    rightAlign={rightAlign}
                    onChange={data => {
                        setDate({
                            from: moment(data[0].startDate),
                            to: moment(data[0].endDate),
                        });
                    }}
                    variant={date.from || date.to ? 'contained' : variant}
                    date={date}
                    placeholder={'По дате посещений'}
                    buttonProps={{
                        endIcon: <ExpandMoreIcon color="primary" />,
                        classes: {},
                    }}
                />
                <DatePicker
                    rightAlign={rightAlign}
                    variant={dateFree.from || dateFree.to ? 'contained' : variant}
                    onChange={data => {
                        setDateFree({
                            from: moment(data[0].startDate),
                            to: moment(data[0].endDate),
                        });
                    }}
                    date={dateFree}
                    placeholder={'По дате отсутствия'}
                    buttonProps={{
                        endIcon: <ExpandMoreIcon color="primary" />,
                        classes: {},
                    }}
                />
                <SimpleInput
                    placeholder={<>По сумме за услугу</>}
                    inputsProps={{ type: 'number' }}
                    inputStartProps={{ placeholder: '' }}
                    inputEndProps={{ placeholder: '' }}
                    variant={summ.from || summ.to ? 'contained' : variant}
                    value={summ}
                    onChange={summ => {
                        setSumm(summ);
                    }}
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
    rightAlign: PropTypes.bool,
    variant: PropTypes.string,
    dateFree: PropTypes.object,
    setDateFree: PropTypes.func,
    summ: PropTypes.object,
    setSumm: PropTypes.func,
    numVisits: PropTypes.object,
    setNumVisits: PropTypes.func,
};

export default FilterBlock;
