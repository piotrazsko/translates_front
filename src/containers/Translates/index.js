import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Skeleton, PagePlaceHolder } from 'components';
import { showPopupAction } from 'modules/popups';
import { getClientsRequest, createClientRequest, deleteClientRequest } from 'modules/clients';
import ClientItem from './components/ClientItem';
import FilterBlock from './components/FilterBlock';
import { useHooks } from './hooks';

import style from './style.scss';
const color = '#fa835f';

const Translates = ({ history, match, currentLocalization: { countryCode } }) => {
    const dispatch = useDispatch();
    const {
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
    } = useHooks();
    const [textError, setTextError] = React.useState('');
    const [showPopup, switchPopup] = React.useState(false);

    const deleteClient = clientId => {
        dispatch(
            showPopupAction({
                message: 'Вы действительно хотите удалить клиента?',
                onClick: () => {
                    dispatch(
                        deleteClientRequest(
                            {
                                id,
                                clientId,
                            },
                            {
                                onSuccess: () => {
                                    dispatch(getClientsRequest({ id, limit: 100, offset: 0 }));
                                },
                            }
                        )
                    );
                    return true;
                },
                onCancel: () => true,
                showCancel: true,
                submitButtonText: 'Ok',
                confirmButtonProps: { size: 'small' },
                cancelButtonProps: { size: 'small' },
            })
        );
    };
    return (
        <Skeleton
            textError={textError}
            title="Клиенты"
            subTitle=""
            nextButtonText="+ Добавить клиента"
            search={search}
            setSearch={setSearch}
            match={match}
            bottomPositionButtons={false}
            headerChildren={
                <TextField
                    className={style.searchInput}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon htmlColor={color} />
                            </InputAdornment>
                        ),
                        endAdornment: search ? (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearch('')} size="small">
                                    <ClearIcon htmlColor={color} />
                                </IconButton>
                            </InputAdornment>
                        ) : (
                            false
                        ),
                    }}
                    required
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                    size="small"
                    variant="outlined"
                    placeholder="Введите имя клиента или телефон"
                />
            }
            onNext={() => {
                switchPopup(!showPopup);
            }}
        >
            <Grid container className={style.gridContainer}>
                <Grid item xs={10} md={12}>
                    <FilterBlock
                        date={date}
                        setDate={setDate}
                        services={services}
                        setSkill={setSkill}
                        setMaster={setMaster}
                        master={master}
                        skill={skill}
                        masters={masters}
                        rightAlign
                        dateFree={dateFree}
                        setDateFree={setDateFree}
                        summ={summ}
                        setSumm={setSumm}
                        numVisits={numVisits}
                        setNumVisits={setNumVisits}
                    />
                </Grid>
                {clients.length > 0 ? (
                    <React.Fragment>
                        <Grid item xs={10} md={12}>
                            {[...filtredClients]
                                .sort((a, b) => {
                                    if (a.first_name < b.first_name) {
                                        return -1;
                                    }
                                    if (a.first_name > b.first_name) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                .map(i => (
                                    <ClientItem
                                        onClick={() => {
                                            history.push('/clients/' + i.id);
                                        }}
                                        key={i.id}
                                        data={i}
                                        onClose={item => {
                                            switch (item) {
                                                case 0:
                                                    history.push('/event/add?client=' + i.id);
                                                    return;
                                                case 1:
                                                    history.push('/clients/' + i.id);
                                                    return;

                                                case 3: {
                                                    deleteClient(i.id);
                                                    return;
                                                }
                                                default:
                                                    return;
                                            }
                                        }}
                                    />
                                ))}
                        </Grid>
                    </React.Fragment>
                ) : (
                    <PagePlaceHolder
                        text={`Здесь будут отображаться ваши клиенты`}
                        onClick={() => switchPopup(!showPopup)}
                    />
                )}
            </Grid>
        </Skeleton>
    );
};

Translates.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    currentLocalization: PropTypes.object,
};

export default Translates;
