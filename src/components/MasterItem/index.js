import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import style from './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Rating from '../Rating';
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

const MasterItem = ({ data, onClose, onClick }) => {
    const {
        first_name,
        rating,
        last_name,
        avatar,
        id,
        city,
        status,
        is_master,
        is_admin,
        feedback_count,
    } = data;
    const isAdmin = is_admin;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = data => {
        onClose(data);
        setAnchorEl(null);
    };
    return (
        !!data && (
            <div
                className={style.item}
                key={id}
                onClick={ev => {
                    ev.stopPropagation();
                    onClick(ev);
                }}
            >
                <div className={style.titleContainer}>
                    <Avatar alt="Remy Sharp" src={avatar || ''}>
                        {`${get(first_name, '[0]')}${get(last_name, '[0]')}`}
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
                <div className={style.additionalInfo}>
                    <Rating
                        data={{
                            user_rating: rating,
                            master_feedbacks_count: feedback_count,
                        }}
                    />
                    <span>{isAdmin ? 'Админ' : ''}</span>
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
                        onClose={ev => {
                            handleClose();
                            ev.stopPropagation();
                        }}
                    >
                        {status !== 'pending' && (
                            <MenuItem
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(0);
                                }}
                            >
                                Новая запись
                            </MenuItem>
                        )}
                        {status !== 'pending' && Boolean(is_master) && (
                            <MenuItem
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(1);
                                }}
                            >
                                Управление расписанием
                            </MenuItem>
                        )}
                        {status !== 'pending' && (
                            <MenuItem
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(2);
                                }}
                            >
                                Редактировать профиль
                            </MenuItem>
                        )}
                        <MenuItem
                            classes={{ root: classes.menuLastItem }}
                            onClick={ev => {
                                ev.stopPropagation();
                                handleClose(3);
                            }}
                        >
                            Удалить мастера из салона
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        )
    );
};

MasterItem.propTypes = {
    onClose: PropTypes.func.isRequired,
};
MasterItem.defaultProps = {
    onClick: () => {},
};

export default MasterItem;
