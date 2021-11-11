import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Select } from 'components';
import { PAYMENTS_TYPE } from 'constants/finance';
import { useSelector } from 'react-redux';
import { getCurrencySelector } from 'modules/localization';
import { getSalonSelector } from 'modules/salon';
import { Popup } from 'components';
import style from './style.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    right: {
        marginLeft: 0,
        'border-top-left-radius': 0,
        'border-bottom-left-radius': 0,
    },
    left: {
        'border-top-right-radius': 0,
        'border-bottom-right-radius': 0,
        marginRight: 0,
    },
}));

// <ButtonGroup
// color="primary"
// variant="contained"
// aria-label="outlined primary button group"
// >
// <Button>Доход</Button>
// <Button>Расход</Button>
// </ButtonGroup>

const PopupCustom = ({ data, onChange, title, ...props }) => {
    const classes = useStyles();
    const { amount, payment_type, payment_purpose_id, description, utc_date } = data;
    const { id, currency_id } = useSelector(getSalonSelector);
    const currency = useSelector(getCurrencySelector);

    const currencyCurrent = React.useMemo(() => {
        return (currency.find(i => i.id == currency_id) || {}).badge;
    }, [currency_id, currency]);

    return (
        <Popup
            title={title}
            showClear
            className={style.popupContainer}
            childrenContainerClassName={style.childrenContainer}
            {...props}
        >
            <div className={style.container}>
                <div className={style.formItem}>
                    <div>
                        <Button
                            variant={payment_type == 'income' ? 'contained' : 'outlined'}
                            color="primary"
                            classes={{ root: classes.left }}
                            onClick={() => {
                                onChange({ ...data, payment_type: 'income' });
                            }}
                        >
                            Доход
                        </Button>
                        <Button
                            onClick={() => {
                                onChange({ ...data, payment_type: 'expenses' });
                            }}
                            variant={payment_type !== 'income' ? 'contained' : 'outlined'}
                            color="primary"
                            classes={{ root: classes.right }}
                        >
                            Расход
                        </Button>
                    </div>
                </div>
                <div className={style.formItem}>
                    <FormControl>
                        <InputLabel htmlFor="standard-adornment-weight">Сумма</InputLabel>
                        <Input
                            id="standard-adornment-weight"
                            value={amount}
                            onChange={ev => {
                                onChange({
                                    ...data,
                                    amount: ev.target.value.replace(/[^0-9.]/g, ''),
                                });
                            }}
                            endAdornment={
                                <InputAdornment position="end">{currencyCurrent}</InputAdornment>
                            }
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </div>
                <div className={style.formItem}>
                    <Select
                        value={payment_purpose_id}
                        variant={'standart'}
                        options={PAYMENTS_TYPE.map(i => ({ label: i.label, value: i.id }))}
                        placeholder={'Тип'}
                        onChange={ev => {
                            onChange({ ...data, payment_purpose_id: ev.target.value });
                        }}
                    />
                </div>
                <div className={style.formItem}>
                    <TextField
                        value={description}
                        id="filled-multiline-static"
                        label="Комментарий"
                        multiline
                        onChange={ev => onChange({ ...data, description: ev.target.value })}
                        rowsMax={4}
                        defaultValue=""
                    />
                </div>
            </div>
        </Popup>
    );
};

PopupCustom.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};
PopupCustom.defaultProps = {
    data: {},
};

export default PopupCustom;
