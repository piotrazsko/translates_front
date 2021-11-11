import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { RatingLocation, Dropzone } from 'components';
import { Phone, Location } from 'assets/img/svg/prepared';

import style from './style.scss';

const color = ' #fa835f';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    large: {
        backgroundColor: color,
        color: '#fff',
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

const ProfileData = ({ name, feedback_count, rating, location, avatar, phone, setAvatar }) => {
    const { city } = location;
    const classes = useStyles();
    const onDrop = data => {
        setAvatar(data);
    };
    return (
        <div className={classes.root}>
            <div className={style.infoContainer}>
                <Dropzone onDrop={onDrop}>
                    <Avatar src={avatar} className={classes.large}>
                        <AddPhotoAlternateIcon />
                    </Avatar>
                </Dropzone>
                <div className={style.info}>
                    <div className={style.name}>{name}</div>
                    <div className={style.phone}>
                        <Phone className={style.icon} htmlColor={color} /> +{phone}
                    </div>
                    <div>
                        <RatingLocation
                            user_rating={rating}
                            master_feedbacks_count={feedback_count}
                            city={city}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileData.propTypes = {
    name: PropTypes.string,
    feedback_count: PropTypes.number,
    rating: PropTypes.number,
    location: PropTypes.shape({ city: PropTypes.string }),
    avatar: PropTypes.string,
    phone: PropTypes.string,
    setAvatar: PropTypes.func.isRequired,
};
ProfileData.defaultProps = {
    location: { city: '' },
    name: '',
    setAvatar: () => {},
};

export default ProfileData;
