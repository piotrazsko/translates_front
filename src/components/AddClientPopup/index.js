import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import PopupBackground from 'components/Popup';
import PhoneInput from '../PhoneInput';

import style from './style.scss';
const color = '#fa835f"';
// <div className={style.closeButtonContainer}>
//     <IconButton
//         size="small"
//         onClick={() => {
//             onClose();
//         }}
//     >
//         <ClearIcon />
//     </IconButton>
// </div>

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
            showClear
            onClear={() => {
                onClose();
                return true;
            }}
            showPopup={showPopup}
            visible
            title="Добавление нового клиента"
            submitButtonText="Добавить"
            childrenContainerClassName={style.dataContainer}
            popupBackgroundsProps={{ onClick: onClose, childrenClassName: style.container }}
        >
            <div className={style.topBlock}>
                <div>
                    <PhoneInput
                        countryCode={countryCode}
                        label="Номер телефона"
                        value={phone}
                        onChange={setPhone}
                    />
                </div>
                <div className={style.inputName}>
                    <TextField
                        fullWidth
                        label="Имя"
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
    selectedSkills: PropTypes.array,
    skills: PropTypes.array,
    showPopup: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;
