import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import { RatingLocation } from 'components';

import style from './style.scss';

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
    menuLastItem: {
        color: 'red',
    },
}));

const ClientItem = ({ data, onClose, onClick }) => {
    const {
        first_name,
        rating,
        feedback_count,
        last_name,
        user_events_count,
        avatar,
        phone,
        last_event_date,
        id,
    } = data;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (ev, data) => {
        onClose(data);
        ev.stopPropagation();
        setAnchorEl(null);
    };
    return (
        !!data && (
            <div className={style.item} onClick={onClick} key={id}>
                <div className={style.titleContainer}>
                    <Avatar alt="Remy Sharp" src={avatar}>
                        {`${first_name[0]}${last_name ? last_name[0] : ''}`}
                    </Avatar>
                    <div className={style.title}>
                        <div>{`${first_name} ${last_name ? last_name : ''}`}</div>
                        {phone && <div className={style.phone}>+{phone}</div>}
                    </div>
                </div>

                <div className={style.additionalInfo}>
                    <RatingLocation user_rating={rating} master_feedbacks_count={feedback_count} />
                    <span className={style.visits}>
                        Визиты:<span className={style.visitCount}>{user_events_count}</span>
                    </span>

                    {last_event_date && (
                        <span className={style.lastVisit}>
                            Последний:
                            <span className={style.visitCount}>
                                {moment(last_event_date).format('DD MMMM YYYY')}
                            </span>
                        </span>
                    )}
                </div>
                <div className={style.inputs}>
                    <IconButton
                        size="small"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreHorizIcon htmlColor={color} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={ev => handleClose(ev, 0)}>Новая запись</MenuItem>
                        <MenuItem onClick={ev => handleClose(ev, 1)}>Детали клиента</MenuItem>
                        <MenuItem
                            classes={{ root: classes.menuLastItem }}
                            onClick={ev => handleClose(ev, 3)}
                        >
                            Удалить клиента из салона
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    );
};

ClientItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

ClientItem.defaultProps = {
    onClick: () => {},
};
export default ClientItem;
