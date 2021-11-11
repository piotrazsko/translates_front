import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IconButton } from '@material-ui/core';
import moment from 'moment';
import get from 'lodash/get';
import { Dropzone } from 'components';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatBox from '../ChatCard';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AttachmentIcon from '@material-ui/icons/Attachment';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    rootTextArea: {
        fontSize: '12px !important',
    },
    icon: { height: 20 },
}));

const color = '#FA835F';
const Chat = ({ chatData, sendMessageRequest, chatId, currentUser, getChatByIdRequest }) => {
    const inputEl = React.useRef(null);
    const showLoaders = get(chatData, 'id') != chatId;
    const classes = useStyles();
    const data = chatData;
    React.useEffect(() => {
        if (chatId) {
            getChatByIdRequest(
                { id: chatId, showLoader: true },
                {
                    onSuccess: () => {},
                }
            );
        }
    }, []);

    const [message, changeMessage] = React.useState('');

    const pushEnter = ev => {
        if (ev.which === 13 && ev.ctrlKey) {
            sendMessage();
            ev.preventDefault();
        }
    };
    const sendMessage = () => {
        sendMessageRequest(
            {
                chatId: chatId,
                type: 'message',
                text: message,
            },
            {
                onSuccess: () => {
                    getChatByIdRequest({ id: chatId });
                    changeMessage('');
                },
            }
        );
    };
    const sendImage = image => {
        sendMessageRequest(
            {
                chatId: chatId,
                type: 'image',
                imageData: image,
            },
            {
                onSuccess: () => {
                    getChatByIdRequest({ id: chatId });
                },
            }
        );
    };
    const lastVisit = get(data, 'companion.last_visited_at');
    const { companion } = data;
    const { first_name, last_name } = companion || {};
    const lastVisitDate = React.useMemo(() => {
        if (lastVisit) {
            const date = moment(lastVisit).toDate();
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
    }, [lastVisit]);
    return (
        <div className={style.container}>
            <div className={style.userInfoContainer}>
                <Avatar src={get(data, 'companion.avatar')} />
                <div className={style.infoContainer}>
                    <div className={style.name}>{`${first_name || ''} ${last_name || ''}`}</div>
                    <div className={style.lastVisit}>{lastVisitDate}</div>
                </div>
            </div>
            <div className={style.chatContainer}>
                {showLoaders ? (
                    <div className={style.circle}>
                        <CircularProgress />
                    </div>
                ) : (
                    <ChatBox currentUser={currentUser} messages={get(chatData, 'messages', [])} />
                )}
            </div>
            <div className={style.textSendContainer}>
                <Dropzone className={style.sendIconContainer} onDrop={image => sendImage(image)}>
                    <IconButton>
                        <AttachmentIcon htmlColor={color} />
                    </IconButton>
                </Dropzone>
                <TextField
                    margin="none"
                    className={style.textArea}
                    onKeyPress={pushEnter}
                    id="outlined-multiline-flexible"
                    label=""
                    multiline
                    fullWidth
                    rowsMax="1"
                    InputProps={{ classes: { input: classes.rootTextArea } }}
                    variant="outlined"
                    onChange={ev => changeMessage(ev.target.value)}
                    value={message}
                    placeholder="Введите сообщение"
                />
                <div className={style.sendIconContainer} ref={inputEl}>
                    <IconButton disabled={message.trim().length === 0} onClick={sendMessage}>
                        {/*<SendIcon htmlColor={message.trim().length ? color : undefined} />*/}
                        <SvgIcon
                            classes={{ root: classes.icon }}
                            htmlColor={message.trim().length ? color : '#767676'}
                        >
                            <path d="M24.8946 8.30654L6.22798 0.599876C5.52168 0.307591 4.74643 0.223802 3.99399 0.358426C3.24155 0.493051 2.54344 0.840452 1.9823 1.3595C1.42117 1.87855 1.0205 2.54752 0.827744 3.2872C0.634985 4.02688 0.658202 4.80631 0.894648 5.53321L2.94798 11.9999L0.841315 18.4665C0.598477 19.1963 0.571198 19.9807 0.762747 20.7256C0.954296 21.4705 1.35655 22.1444 1.92131 22.6665C2.6475 23.34 3.59769 23.72 4.58798 23.7332C5.11429 23.7329 5.63536 23.6286 6.12132 23.4265L24.8546 15.7199C25.5842 15.4165 26.2076 14.9038 26.6461 14.2465C27.0846 13.5892 27.3186 12.8167 27.3186 12.0265C27.3186 11.2364 27.0846 10.4639 26.6461 9.80663C26.2076 9.14933 25.5842 8.63663 24.8546 8.33321L24.8946 8.30654ZM5.14798 20.9332C4.91278 21.0302 4.65473 21.0579 4.4043 21.013C4.15387 20.9682 3.92151 20.8525 3.73465 20.6799C3.55863 20.5117 3.43202 20.2985 3.36856 20.0635C3.3051 19.8284 3.30721 19.5805 3.37465 19.3465L5.32131 13.3332H23.628L5.14798 20.9332ZM5.32131 10.6665L3.33465 4.70654C3.26721 4.47261 3.2651 4.22468 3.32856 3.98963C3.39202 3.75459 3.51863 3.54141 3.69465 3.37321C3.82012 3.24158 3.9712 3.13701 4.13859 3.06592C4.30597 2.99484 4.48613 2.95875 4.66798 2.95988C4.84671 2.96022 5.02355 2.99649 5.18798 3.06654L23.628 10.6665H5.32131Z" />
                        </SvgIcon>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

Chat.propTypes = {
    chatData: PropTypes.shape({
        last_name: PropTypes.string,
        first_name: PropTypes.string,
        avatar: PropTypes.string,
    }),
    sendMessageRequest: PropTypes.func.isRequired,
    chatId: PropTypes.number,
    currentUser: PropTypes.object,
    getChatByIdRequest: PropTypes.func.isRequired,
};

export default Chat;
