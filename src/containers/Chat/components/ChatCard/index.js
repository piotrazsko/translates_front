import React from 'react';
import PropTypes from 'prop-types';
import MessageCard from '../MessageCard';
import get from 'lodash/get';
import style from './style.scss';

const ChatBox = ({ messages = [], currentUser }) => {
    const handleClick = () => {};
    const [lastMessage, setLastMessage] = React.useState(messages[messages.length - 1]);
    React.useEffect(() => {
        if (messages.length > 0) {
            const elem = document.querySelector(`#message_${lastMessage && lastMessage.id}`);
            if (elem) {
                setTimeout(() => {
                    elem.scrollIntoView({ block: 'center' });
                }, 500);
            }
        }
    }, [lastMessage]);
    React.useEffect(() => {
        const message = messages[messages.length - 1];
        if ((message && get(lastMessage, 'id') !== message.id) || !lastMessage) {
            setLastMessage(messages[messages.length - 1]);
        }
    }, [messages]);
    return (
        <div>
            <div className={style.chatContainer} onClick={handleClick}>
                {messages.map(item => (
                    <MessageCard
                        id={'message_' + item.id}
                        currentUserId={currentUser.id}
                        key={item.id}
                        message={item}
                    />
                ))}
            </div>
        </div>
    );
};

ChatBox.propTypes = {
    messages: PropTypes.array.isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.number,
    }).isRequired,
};

export default ChatBox;
