import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import get from 'lodash/get';
import moment from 'moment';
import PhoneIcon from '@material-ui/icons/Phone';
import Badge from '@material-ui/core/Badge';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const ChatListItem = ({ data, setActiveChat, isActive = false }) => {
    const { id, companion, last_message } = data;
    const { name, id: companionId, phone } = companion || {};
    const { text, is_read, sender_id } = last_message || {};
    const isNotReaded = !is_read && sender_id === companionId;
    const lastVisitDate = React.useMemo(() => {
        if (companion) {
            const date = moment(companion.last_visited_at).toDate();
            return Date.now() - date.valueOf() < 1000 * 60 * 60 * 24 * 2
                ? `Был в сети: ${moment(
                      date.valueOf() - date.getTimezoneOffset() * 60000
                  ).fromNow()}`
                : `Был в сети: ${moment(date.valueOf() - date.getTimezoneOffset() * 60000).format(
                      'HH:mm DD.MM.YYYY'
                  )}`;
        } else {
            return '';
        }
    }, [companion]);
    return (
        <div
            className={[style.container, isActive ? style.activeCard : ''].join(' ')}
            onClick={() => {
                setActiveChat(id);
            }}
        >
            <Badge variant="dot" invisible={!isNotReaded} color="primary">
                <Avatar src={get(data, 'companion.avatar')} />
            </Badge>
            <div className={style.infoContainer}>
                <div className={style.name}>{`${name}`}</div>
                <div className={style.phone}>
                    <PhoneIcon className={style.phoneIcon} />
                    {`+${phone}`}
                </div>
                <div className={style.lastVisit}>{lastVisitDate}</div>
                <div className={style.lastMessage}>{text}</div>
            </div>
        </div>
    );
};

ChatListItem.propTypes = {
    data: PropTypes.object,
    setActiveChat: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
};

export default ChatListItem;
