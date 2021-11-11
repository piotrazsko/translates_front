import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { Popup as PopupBackground, PhoneInput } from 'components';
import Typography from '@material-ui/core/Typography';

import style from './style.scss';

const Popup = ({ onSubmit, onCancel, onClose, showPopup, countryCode }) => {
    const [phone, setPhone] = React.useState('');
    const [name, setName] = React.useState('');
    const [textError, setErrorText] = React.useState('');
    const [textInfo, setInfoText] = React.useState('');
    return (
        <PopupBackground
            onSubmit={() => {
                switch (true) {
                    case phone.length < 6:
                        setErrorText('Введите телефон');
                        return;
                    case name.length < 1:
                        setErrorText('Введите имя клиента');
                        return;
                    default: {
                        onSubmit({ phone: phone.replace(/[^0-9.]/g, ''), name });
                        return;
                    }
                }
            }}
            onCancel={() => {
                onCancel();
            }}
            textError={textError}
            textInfo={textInfo}
            showCancel={false}
            showPopup={showPopup}
            visible
            submitButtonText="Добавить"
            childrenContainerClassName={style.dataContainer}
            popupBackgroundsProps={{ onClick: onClose, childrenClassName: style.container }}
        >
            <div className={style.topBlock}>
                <div className={style.closeButtonContainer}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </div>
                <Typography variant={'h4'}>Добавление клиента</Typography>
                <div>
                    <PhoneInput
                        label="Номер телефона"
                        value={phone}
                        onChange={setPhone}
                        countryCode={countryCode}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Имя"
                        placeholder={'Имя'}
                        required
                        value={name}
                        onChange={ev => {
                            setName(ev.target.value);
                        }}
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
            </div>
        </PopupBackground>
    );
};

Popup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    showPopup: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    countryCode: PropTypes.string.isRequired,
};

export default Popup;
