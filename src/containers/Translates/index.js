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

import style from './style.scss';
const color = '#fa835f';

const Translates = ({ history, match, currentLocalization: { countryCode } }) => {
    const dispatch = useDispatch();

    const [textError, setTextError] = React.useState('');
    const [showPopup, switchPopup] = React.useState(false);

    const deleteTranslate = clientId => {
        dispatch(
            showPopupAction({
                message: 'Вы действительно хотите удалить клиента?',
                onClick: () => {
                    dispatch(() => {});
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
    const [search, setSearch] = React.useState('');
    const translates = [];
    const filtredTranslates = [];

    return (
        <Skeleton
            textError={textError}
            title="Translates"
            subTitle=""
            nextButtonText="+ Translate"
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
            {translates.length > 0 ? (
                <React.Fragment>
                    <Grid item xs={10} md={12}></Grid>
                </React.Fragment>
            ) : (
                <PagePlaceHolder text={`Translates`} onClick={() => switchPopup(!showPopup)} />
            )}
        </Skeleton>
    );
};

Translates.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    currentLocalization: PropTypes.object,
};

export default Translates;
