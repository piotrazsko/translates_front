import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { Popup as PopupBackground } from 'components';
import Rating from '@material-ui/lab/Rating';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { SkillsSelect, UserInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import style from './style.scss';
const color = '#fa835f';

const useStyles = makeStyles(theme => ({
    icon: {
        margin: '0 10px',
    },
}));

const FeedbackPopup = ({ onClose, onCancel, onSubmit }) => {
    const classes = useStyles();
    const [rating, setRating] = React.useState(0);
    const [feedback, setFeedback] = React.useState();
    const [textError, setTextError] = React.useState();

    return (
        <PopupBackground
            onSubmit={() => {
                switch (true) {
                    case rating < 4 && !feedback && rating > 0:
                        setTextError('Пожалуйста, добавьте текст отзыва');
                        return;
                    case feedback && rating === 0:
                        setTextError('Пожалуйста, поставьте оценку');
                        return;
                    case rating === 0:
                        setTextError(`Пожалуйста, добавьте оценку \nи текст отзыва`);
                        return;
                    default:
                        onSubmit({ rating, feedback });
                        return;
                }
                // if (rating < 4 && !feedback) {
                // } else {
                // }
            }}
            onCancel={() => {
                onCancel();
                setRating(0);
                setFeedback('');
            }}
            onClear={() => {
                onClose();
            }}
            title={'Оцените клиента после услуги'}
            showPopup
            showClear
            visible
            showCancel
            showSubmit
            textError={textError}
            cancelButtonText="Очистить"
            submitButtonText="Добавить"
            childrenContainerClassName={style.dataContainer}
            popupBackgroundsProps={{ onClick: onClose }}
        >
            <div className={style.subtitle}>Поставьте оценку и оставьте комментарий клиенту</div>
            <div className={style.ratingContainer}>
                <Rating
                    classes={{ icon: classes.icon }}
                    size="large"
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </div>
            <div className={style.topBlock}>
                <TextField
                    className={style.searchInput}
                    InputLabelProps={{ shrink: true }}
                    value={feedback}
                    onChange={ev => setFeedback(ev.target.value)}
                    fullWidth
                    size="small"
                    label="Оставьте комментарий"
                    placeholder=""
                />
            </div>
        </PopupBackground>
    );
};

FeedbackPopup.propTypes = {
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
};

FeedbackPopup.defaultProps = {
    onClose: () => {},
    onCancel: () => {},
    onSubmit: () => {},
};
export default FeedbackPopup;
