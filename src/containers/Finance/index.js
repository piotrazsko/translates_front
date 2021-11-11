import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getSalonSelector } from 'modules/salon';

import { PAYMENTS_TYPE } from 'constants/finance';
import { getTextByPayment } from 'constants/events';
import { getMastersRequest, getSalonMastersSelector } from 'modules/masters';
import { getPaymentsRequest, paymentsSelector } from 'modules/statistics';
import { getPaymentsAction, getPaymentsSelector, addPaymentsAction } from 'modules/finance';
import { getCurrencySelector } from 'modules/localization';
import { Skeleton, NumberFormat } from 'components';

import StatisticsCard from './components/StatiscticsCard';
import FilterBlock from './components/FilterBlock';
import Scale from './components/Scale';
import Popup from './components/Popup';

import style from './style.scss';

const Finance = ({ viewPort: { isDesktop }, viewPort }) => {
    const { id, currency_id, services = [], skills = [], ...salon } = useSelector(getSalonSelector);
    const mastersArr = useSelector(getSalonMastersSelector);
    const currency = useSelector(getCurrencySelector);
    const payments = useSelector(paymentsSelector);
    const finance = useSelector(getPaymentsSelector);

    const [sort, setSort] = React.useState(false);

    const financeSorted = React.useMemo(() => {
        const filterPrepare = finance.map(i => ({
            ...i,
            amount: i.type == 'income' ? i.amount : -i.amount,
        }));

        switch (true) {
            case sort === 2:
                return filterPrepare.sort((a, b) => {
                    return (
                        moment(a.date)
                            .toDate()
                            .valueOf() -
                        moment(b.date)
                            .toDate()
                            .valueOf()
                    );
                });
            case sort === 3:
                return filterPrepare.sort((a, b) => {
                    return a.amount - b.amount;
                });
            case sort === 4:
                return filterPrepare.sort((a, b) => {
                    return -a.amount + b.amount;
                });
            default:
                return finance;
        }
    }, [finance, sort]);

    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
        }
    }, [id]);
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

    const dispatch = useDispatch();
    const [date, setDate] = React.useState({
        from: moment().startOf('month'),
        to: moment().endOf('month'),
    });

    const [data, setData] = React.useState({
        amount: '0',
        payment_type: 'income',
        payment_purpose_id: 1,
        description: '',
        utc_date: moment()
            .utc()
            .format('YYYY-MM-DD HH:mm:ss'),
    });
    const currencyCurrent = currency.find(i => i.id == currency_id) || {};
    const [showPopup, setShowPopup] = React.useState(false);
    const [disablePopup, setDisablePopup] = React.useState(false);
    const [master, setMaster] = React.useState(false);
    const [skill, setSkill] = React.useState(false);
    const [payment, setPayment] = React.useState(false);
    console.log(financeSorted);
    const getData = () => {
        dispatch(
            getPaymentsAction({
                salon_id: id,
                from: date.from.format('YYYY-MM-DD'),
                to: date.to.format('YYYY-MM-DD'),
            })
        );
        dispatch(
            getPaymentsRequest({
                id,
                fromDate: date.from.format('YYYY-MM-DD'),
                toDate: date.to.format('YYYY-MM-DD'),
            })
        );
    };
    const addPayment = data => {
        dispatch(
            addPaymentsAction(
                { salon_id: id, ...data },
                {
                    onSuccess: () => {
                        getData();
                        setData({
                            amount: '0',
                            payment_type: 'income',
                            payment_purpose_id: 1,
                            description: '',
                            utc_date: moment()
                                .utc()
                                .format('YYYY-MM-DD HH:mm:ss'),
                        });
                    },
                }
            )
        );
        return true;
    };
    React.useEffect(() => {
        if (id) {
            getData();
        }
    }, [id, date]);
    React.useEffect(() => {
        if (id) {
            dispatch(
                getPaymentsAction({
                    salon_id: id,
                    from: date.from.format('YYYY-MM-DD'),
                    to: date.to.format('YYYY-MM-DD'),
                    master_ids: master ? [master.id] : undefined,
                    payment_purpose_ids: payment ? [payment.id] : undefined,
                    skills: typeof skill == 'object' && !skill.isCustom ? [skill.id] : undefined,
                    services: typeof skill == 'object' && skill.isCustom ? [skill.id] : undefined,
                })
            );
            dispatch(
                getPaymentsRequest({
                    id,
                    payment_purpose_ids: payment ? [payment.id] : undefined,
                    fromDate: date.from.format('YYYY-MM-DD'),
                    toDate: date.to.format('YYYY-MM-DD'),
                    master_ids: master ? [master.id] : undefined,
                    skills: typeof skill == 'object' && !skill.isCustom ? [skill.id] : undefined,
                    services: typeof skill == 'object' && skill.isCustom ? [skill.id] : undefined,
                    // services:
                })
            );
        }
    }, [skill, master, payment]);

    return (
        <Skeleton
            backgroundColor="#fffaf6"
            textError=""
            title="Финансы"
            subTitle=""
            bottomPositionButtons={false}
            nextButtonText="+Доходы/Расходы"
            onNext={() => {
                setData({
                    amount: '0',
                    payment_type: 'income',
                    payment_purpose_id: 1,
                    description: '',
                    utc_date: moment()
                        .utc()
                        .format('YYYY-MM-DD HH:mm:ss'),
                });
                setShowPopup(!showPopup);
            }}
            headerChildren={
                !isDesktop && (
                    <FilterBlock
                        variant="outlined"
                        rightAlign={!isDesktop}
                        setDate={setDate}
                        date={date}
                        skill={skill}
                        services={services}
                        setSkill={setSkill}
                        master={master}
                        setMaster={setMaster}
                        masters={masters}
                        paymentsList={PAYMENTS_TYPE}
                        payment={payment}
                        setPayment={setPayment}
                    />
                )
            }
        >
            <Grid container spacing={3} className={style.container}>
                <Grid item xs={8} md={8} lg={9} xl={9}>
                    <Scale
                        showHeaderInfoCard={false}
                        masters={masters}
                        services={servicesFull}
                        date={date}
                        setDate={setDate}
                        showHeader={isDesktop}
                        title={false}
                        viewPort={viewPort}
                        payments={payments}
                        currencyCurrent={currencyCurrent}
                        setSkill={setSkill}
                        setMaster={setMaster}
                        master={master}
                        skill={skill}
                        paymentsList={PAYMENTS_TYPE}
                        payment={payment}
                        setPayment={setPayment}
                        classes={{ children: style.infoCardChildren, title: style.infoBlockTitle }}
                    />
                </Grid>
                <Grid item xs={4} md={4} lg={3} xl={3}>
                    <StatisticsCard payments={payments} currencyCurrent={currencyCurrent} />
                </Grid>
            </Grid>
            <Grid container spacing={3} className={style.container}>
                <Grid item xs={12}>
                    <table className={style.grid}>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div
                                        className={style.head}
                                        onClick={() => {
                                            sort < 2 ? setSort(2) : setSort(1);
                                        }}
                                    >
                                        Дата{' '}
                                        {sort < 3 ? (
                                            sort != 2 ? (
                                                <KeyboardArrowDownIcon
                                                    className={style.iconHeader}
                                                />
                                            ) : (
                                                <KeyboardArrowUpIcon className={style.iconHeader} />
                                            )
                                        ) : (
                                            false
                                        )}
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className={style.head}>Тип</div>
                                </th>
                                <th scope="col">
                                    <div className={style.head}>Плательщик</div>
                                </th>
                                <th scope="col">
                                    <div className={style.head}>Сотрудник</div>
                                </th>
                                <th scope="col">
                                    <div className={style.head}>Способ оплаты</div>
                                </th>
                                <th scope="col">
                                    <div
                                        className={style.head}
                                        onClick={() => {
                                            sort < 4 ? setSort(4) : setSort(3);
                                        }}
                                    >
                                        Сумма{' '}
                                        {sort > 2 ? (
                                            sort != 3 ? (
                                                <KeyboardArrowDownIcon
                                                    className={style.iconHeader}
                                                />
                                            ) : (
                                                <KeyboardArrowUpIcon className={style.iconHeader} />
                                            )
                                        ) : (
                                            false
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {financeSorted.map(i => (
                                <React.Fragment key={i.id}>
                                    <tr className={style.spacer} />
                                    <tr
                                        onClick={() => {
                                            setData({
                                                amount: i.amount,
                                                payment_type: i.type,
                                                payment_purpose_id: i.payment_purpose_id,
                                                description: i.description,
                                                utc_date: moment(i.date)
                                                    .utc()
                                                    .format('YYYY-MM-DD HH:mm:ss'),
                                            });
                                            setShowPopup(!showPopup);
                                            setDisablePopup(true);
                                        }}
                                        className={style.line}
                                        key={i.id}
                                    >
                                        <td className={style.cell} colSpan={1}>
                                            {moment(i.date).format('DD.MM.YYYY')}
                                        </td>
                                        <td className={style.cell} colSpan={1}>
                                            {get(
                                                PAYMENTS_TYPE.find(
                                                    item => item.id == i.payment_purpose_id
                                                ),
                                                'label',
                                                ''
                                            )}
                                        </td>
                                        <td className={style.cell} colSpan={1}>
                                            {i.payer}
                                        </td>
                                        <td className={style.cell} colSpan={1}>
                                            {i.employee}
                                        </td>
                                        <td className={style.cell} colSpan={1}>
                                            {getTextByPayment(i.payment_type_id)}
                                        </td>
                                        <td className={style.cell} colSpan={1}>
                                            <span
                                                className={
                                                    i.type == 'income'
                                                        ? style.income
                                                        : style.expenses
                                                }
                                            >
                                                <NumberFormat
                                                    currency_id={i.currency_id}
                                                    value={` ${i.type == 'income' ? '+' : '-'}${
                                                        i.amount
                                                    } `}
                                                />
                                            </span>
                                            <br />
                                            {i.fee ? (
                                                <span className={style.commission}>
                                                    Комиссия:{' '}
                                                    <NumberFormat
                                                        currency_id={i.currency_id}
                                                        value={i.fee}
                                                    />
                                                </span>
                                            ) : null}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
            {showPopup && (
                <Popup
                    title={disablePopup ? 'Детали платежа' : 'Добавление платежа'}
                    disableSubmit={disablePopup}
                    disableCancel={disablePopup}
                    disable={disablePopup}
                    submitButtonText={'Добавить'}
                    cancelButtonText={'Очистить'}
                    onChange={data => {
                        if (!disablePopup) {
                            setData({ ...data });
                        }
                    }}
                    onSubmit={() => {
                        if (!disablePopup) {
                            addPayment(data);
                        }
                        setDisablePopup(false);
                        setShowPopup(!showPopup);
                    }}
                    onClear={() => {
                        setDisablePopup(false);
                        setShowPopup(!showPopup);
                    }}
                    onCancel={() => {
                        if (!disablePopup) {
                            setData({
                                amount: '0',
                                payment_type: 'income',
                                payment_purpose_id: 1,
                                description: '',
                                utc_date: moment()
                                    .utc()
                                    .format('YYYY-MM-DD HH:mm:ss'),
                            });
                            // setShowPopup(!showPopup);
                        }
                    }}
                    data={data}
                />
            )}
        </Skeleton>
    );
};

Finance.propTypes = {
    viewPort: PropTypes.object,
};

export default Finance;
