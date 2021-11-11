import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from 'components/CommonControlls';
import style from './style.scss';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    right: {
        width: '32%',
        marginLeft: 0,
        // borderRasius: 6,
        'border-top-left-radius': 0,
        'border-bottom-left-radius': 0,
    },
    center: {
        width: '32%',
        // borderRasius: 6,
        'border-top-left-radius': 0,
        'border-bottom-left-radius': 0,
        'border-top-right-radius': 0,
        'border-bottom-right-radius': 0,
        marginLeft: 0,
        marginRight: 0,
    },
    left: {
        width: '32%',
        // borderRasius: 6,
        'border-top-right-radius': 0,
        'border-bottom-right-radius': 0,
        marginRight: 0,
    },
    input: { marginTop: 40 },
}));

const SelectUserType = ({
    firstName,
    lastName,
    email,
    setEmail,
    userType,
    setFirstName,
    setLastName,
    setuserType,
    confitmPolicy,
    setConfirmPolicy,
}) => {
    const classes = useStyles();

    const [selectedType, setType] = React.useState(0);
    return (
        <div className={style.container}>
            <div className={style.title}>Войти как:</div>
            <div className={style.buttons}>
                <Button
                    onClick={() => {
                        setuserType(2);
                    }}
                    variant={userType == 2 ? 'contained' : 'outlined'}
                    color="primary"
                    classes={{ root: classes.left }}
                >
                    Администратор
                </Button>
                <Button
                    onClick={() => {
                        setuserType(1);
                    }}
                    variant={userType == 1 ? 'contained' : 'outlined'}
                    color="primary"
                    classes={{ root: classes.center }}
                >
                    Мастер
                </Button>
                <Button
                    variant={userType == '0' ? 'contained' : 'outlined'}
                    color="primary"
                    classes={{ root: classes.right }}
                    onClick={() => {
                        setuserType(0);
                    }}
                >
                    Клиент
                </Button>
            </div>
            <TextField
                required
                classes={{ root: classes.input }}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                fullWidth
                value={firstName}
                placeholder=""
                label={'Имя'}
                onChange={ev => {
                    setFirstName(ev.target.value);
                }}
            />
            <TextField
                required
                classes={{ root: classes.input }}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                fullWidth
                label={'Фамилия'}
                placeholder=""
                value={lastName}
                onChange={ev => {
                    setLastName(ev.target.value);
                }}
            />
            <TextField
                required
                classes={{ root: classes.input }}
                InputLabelProps={{ shrink: true }}
                autoComplete="off"
                fullWidth
                label={'Email'}
                type={'email'}
                placeholder=""
                value={email}
                onChange={ev => {
                    setEmail(ev.target.value);
                }}
            />
            <div className={style.policyContainer}>
                <Checkbox
                    color="primary"
                    onChange={() => setConfirmPolicy(!confitmPolicy)}
                    checked={confitmPolicy}
                    title={
                        <span className={style.policy}>
                            Я соглашаюсь с{' '}
                            <a
                                className={style.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://info.feelqueen.by/terms"
                            >
                                политикой использования
                            </a>{' '}
                            и{' '}
                            <a
                                className={style.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://info.feelqueen.by/privacy"
                            >
                                политикой безопасности данных
                            </a>
                        </span>
                    }
                />
            </div>
        </div>
    );
};

SelectUserType.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setuserType: PropTypes.func.isRequired,
    confitmPolicy: PropTypes.bool,
    setConfirmPolicy: PropTypes.func.isRequired,
};

export default SelectUserType;
