import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'components';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from '../../components/DatePicker';
import Select from '../Finance/components/Select';
import { getSalonSelector } from 'modules/salon';
import { getMastersRequest, getSalonMastersSelector } from 'modules/masters';
import {
    getPaymentsRequest,
    getTopMasterRequest,
    paymentsSelector,
    topMastersSelector,
    getTopServicesRequest,
    topServicesSelector,
    getEventsRequest,
    getClientsRequest,
    eventsSelector,
    clientsSelector,
} from 'modules/statistics';
import TopServices from '../Home/components/TopServices';
import TopMastersCard from '../Home/components/TopMastersCard';
import Clients from './components/Clients';
import Orders from './components/Orders';
import { getCurrencySelector } from 'modules/localization';
import style from './style.scss';

const Analitics = ({ history }) => {
    const currency = useSelector(getCurrencySelector);
    const dispatch = useDispatch();
    const topMasters = useSelector(topMastersSelector);
    const topServices = useSelector(topServicesSelector);
    const eventsData = useSelector(eventsSelector);
    const clientsData = useSelector(clientsSelector);
    const [date, setDate] = React.useState({
        from: moment().startOf('month'),
        to: moment(),
    });
    const { id, currency_id, services = [], skills = [], ...salon } = useSelector(getSalonSelector);
    const mastersArr = useSelector(getSalonMastersSelector);
    const currencyCurrent = currency.find(i => i.id == currency_id) || {};
    const [master, setMaster] = React.useState(false);
    React.useEffect(() => {
        if (id) {
            dispatch(
                getTopMasterRequest({
                    id,
                    from: date.from.format('YYYY-MM-DD HH:mm:ss'),
                    to: date.to.format('YYYY-MM-DD HH:mm:ss'),
                })
            );
            dispatch(getMastersRequest({ id }));
            dispatch(
                getTopServicesRequest({
                    id,
                    from: date.from.format('YYYY-MM-DD HH:mm:ss'),
                    to: date.to.format('YYYY-MM-DD HH:mm:ss'),
                    master_id: get(master, 'id'),
                })
            );
            dispatch(
                getEventsRequest({
                    id,
                    from: date.from.format('YYYY-MM-DD HH:mm:ss'),
                    to: date.to.format('YYYY-MM-DD HH:mm:ss'),
                    master_id: get(master, 'id'),
                })
            );
            dispatch(
                getClientsRequest({
                    id,
                    from: date.from.format('YYYY-MM-DD HH:mm:ss'),
                    to: date.to.format('YYYY-MM-DD HH:mm:ss'),
                })
            );
        }
    }, [id, date, master]);
    const { masters, services: servicesFull } = React.useMemo(() => {
        return {
            masters: [
                ...mastersArr
                    .filter(i => i.status == 'confirmed')
                    .map(i => ({
                        label: `${i.first_name} ${i.last_name}`,
                        value: false,
                        id: i.id,
                    })),
            ],
            services: [
                ...skills.map(i => ({
                    label: i.title,
                    value: false,
                    id: i.id,
                    isCustom: false,
                })),
                ...services.map(i => ({
                    label: i.title,
                    value: false,
                    id: i.id,
                    isCustom: true,
                })),
            ],
        };
    }, [services, skills, mastersArr]);

    return (
        <Skeleton
            backgroundColor="#fffaf6"
            textError=""
            onNext={false}
            title="Аналитика"
            subTitle=""
            bottomPositionButtons={false}
        >
            <Grid container spacing={3} className={style.container}>
                <Grid item xs={12} className={style.filterContainer}>
                    <DatePicker
                        onChange={data => {
                            setDate({
                                from: moment(data[0].startDate),
                                to: moment(data[0].endDate),
                            });
                        }}
                        date={date}
                        variant="outlined"
                    />
                    <Select
                        placeholder="Все сотрудники"
                        value={master}
                        variant={'outlined'}
                        onChange={setMaster}
                        options={[...masters]}
                    />
                </Grid>
                <Grid container spacing={3} className={style.container}>
                    <Grid item md={6}>
                        <Orders data={eventsData} />
                    </Grid>
                    {!master && (
                        <Grid item md={6}>
                            <Clients data={clientsData} />
                        </Grid>
                    )}
                    <Grid item md={6}>
                        <TopServices
                            title={'Популярные услуги'}
                            showHead={false}
                            topServices={topServices}
                        />
                    </Grid>
                    {!master && (
                        <Grid item md={6}>
                            <TopMastersCard
                                topMasters={topMasters}
                                currencyCurrent={currencyCurrent}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

Analitics.propTypes = {
    history: PropTypes.object,
};

export default Analitics;
