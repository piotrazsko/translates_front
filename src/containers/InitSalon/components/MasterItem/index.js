import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import style from './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Chip from '@material-ui/core/Chip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { RatingLocation } from 'components';
const color = '#fa835f';

const useStyles = makeStyles(theme => ({
    chipRoot: {
        border: 'none',
        minWidth: 125,
        justifyContent: 'flex-start',
    },
    chipIcon: {
        color: '#428c4f',
    },
}));

const MasterItem = ({ onDelete, onEdit, data, showEdit = true, showDelete = true }) => {
    const {
        first_name,
        user_rating,
        master_feedbacks_count,
        last_name,
        avatar,
        price,
        id,
        city,
        status,
    } = data;
    const classes = useStyles();
    console.log(data);
    return (
        !!data && (
            <div className={style.item} key={id}>
                <div className={style.titleContainer}>
                    <Avatar alt="Remy Sharp" src={avatar}>
                        {`${first_name[0]}${last_name[0]}`}
                    </Avatar>
                    <div className={style.title}> {`${first_name} ${last_name}`}</div>
                </div>
                {status === 'pending' ? (
                    <Chip
                        classes={{ root: classes.chipRoot }}
                        variant="outlined"
                        label="Приглашен"
                        color="primary"
                        size="small"
                        icon={<ErrorOutlineIcon />}
                    />
                ) : (
                    <Chip
                        classes={{ root: classes.chipRoot, icon: classes.chipIcon }}
                        variant="outlined"
                        label="Принято"
                        color="default"
                        size="small"
                        icon={<CheckCircleOutlineOutlinedIcon />}
                    />
                )}

                <RatingLocation
                    city={city}
                    master_feedbacks_count={master_feedbacks_count}
                    user_rating={user_rating}
                />
                <div className={style.inputs}>
                    {showEdit && (
                        <IconButton size="small" onClick={onEdit}>
                            <CreateOutlinedIcon className={style.icon} htmlColor={color} />
                        </IconButton>
                    )}
                    {showDelete && (
                        <IconButton size="small" onClick={onDelete}>
                            <DeleteOutlineOutlinedIcon className={style.icon} htmlColor={color} />
                        </IconButton>
                    )}
                </div>
            </div>
        )
    );
};

MasterItem.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default MasterItem;
