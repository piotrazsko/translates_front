import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
const TimeInput = ({
    defaultValue = 0,
    value = 0,
    step = 15,
    max = Infinity,
    min = 0,
    onChange = () => {},
    className,
    classes = {
        buttons: '',
        upButton: '',
        downButton: '',
        root: '',
        value: '',
    },
    valuePrepare = (value) =>
        `${Math.floor(value / 60)}ч:${value % 60 || '00'}м`,
}) => {
    const [time, setValue] = React.useState(defaultValue || value);
    React.useEffect(() => {
        onChange(time);
    }, [time]);
    React.useEffect(() => {
        setValue(value);
    }, [value]);
    const increaseListener = () => {
        setValue(time + step);
    };
    const decreaceListener = () => {
        setValue(time - step);
    };
    return (
        <div className={[style.container, className, classes.root].join(' ')}>
            <div
                className={style.buttonContainer}
                onClick={time - step >= min && decreaceListener}
            >
                <Remove
                    className={[
                        time - step >= min
                            ? style.activeButton
                            : style.disabledButton,

                        classes.buttons,
                        classes.upButton,
                    ].join(' ')}
                />
            </div>
            <div className={[style.valueContainer, classes.value].join(' ')}>
                {valuePrepare(time)}
            </div>
            <div
                className={style.buttonContainer}
                onClick={time + step <= max && increaseListener}
            >
                <Add
                    className={[
                        time + step <= max
                            ? style.activeButton
                            : style.disabledButton,
                        classes.buttons,
                        classes.downButton,
                    ].join(' ')}
                />
            </div>
            <input type="hidden" value={time} />
        </div>
    );
};

TimeInput.propTypes = {
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    valuePrepare: PropTypes.func,
    className: PropTypes.string,
    classes: PropTypes.shape({
        buttons: PropTypes.string,
        upButton: PropTypes.string,
        downButton: PropTypes.string,
        root: PropTypes.string,
        value: PropTypes.string,
    }),
};
export default TimeInput;
