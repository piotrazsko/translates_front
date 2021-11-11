import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getSalonSelector } from 'modules/salon';
import { getMastersRequest, getSalonMastersSelector } from 'modules/masters';
import { getPaymentsRequest, paymentsSelector } from 'modules/statistics';
import { getPaymentsAction, getPaymentsSelector, addPaymentsAction } from 'modules/finance';
import { getCurrencySelector } from 'modules/localization';
import {
    getClientsRequest,
    getClientsSelector,
    createClientRequest,
    deleteClientRequest,
} from 'modules/clients';

export const useHooks = () => {
    const dispatch = useDispatch();
    const { id, currency_id, services = [], skills = [], ...salon } = useSelector(getSalonSelector);
    const mastersArr = useSelector(getSalonMastersSelector);
    const currency = useSelector(getCurrencySelector);
    const payments = useSelector(paymentsSelector);
    const finance = useSelector(getPaymentsSelector);
    const [date, setDate] = React.useState({ from: undefined, to: undefined });
    const [dateFree, setDateFree] = React.useState({ from: undefined, to: undefined });
    const [summ, setSumm] = React.useState({ from: undefined, to: undefined });
    const [numVisits, setNumVisits] = React.useState({ from: undefined, to: undefined });
    const [skill, setSkill] = React.useState();
    const [master, setMaster] = React.useState();
    const clients = useSelector(getClientsSelector);

    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
        }
    }, [id]);
    console.log(date);
    // .startOf('day')
    // .format('YYYY-MM-DD HH:mm:ss'),
    React.useEffect(() => {
        if (id) {
            dispatch(
                getClientsRequest({
                    id,
                    limit: 100,
                    offset: 0,
                    countEventsFrom: numVisits.from,
                    countEventsTo: numVisits.to,
                    amountTo: summ.to,
                    amountFrom: summ.from,
                    lastVisitDateFrom: date.from
                        ? date.from.startOf('day').format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    lastVisitDateTo: date.to
                        ? date.to.endOf('day').format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    dateAbsenceFrom: dateFree.from ? dateFree.from.format() : undefined,
                    dateAbsenceTo: dateFree.to ? dateFree.to.format() : undefined,
                    master_id: master ? master.id : null,
                })
            );
        }
    }, [id, date, dateFree, summ, numVisits, skill, master]);

    const [search, setSearch] = React.useState();
    const filtredClients = React.useMemo(() => {
        return !search
            ? clients
            : clients.filter(item => {
                  return (
                      `${item.first_name} ${item.last_name}`
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) !== -1 ||
                      ('+' + item.phone).indexOf(search.toLowerCase()) !== -1
                  );
              });
    }, [clients, search]);
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
    return {
        date,
        setDate,
        services,
        setSkill,
        setMaster,
        master,
        skill,
        masters,
        dateFree,
        setDateFree,
        summ,
        setSumm,
        numVisits,
        setNumVisits,
        id,
        clients,
        search,
        setSearch,
        filtredClients,
    };
};
