import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Badge } from '@material-ui/core';
import get from 'lodash/get';
import ChatListItem from '../ChatListItem';

import style from './style.scss';

const ChatList = ({ chatList = [], setActiveChat, activeChat }) => {
    return (
        <React.Fragment>
            <div className={style.chatListContainer}>
                {chatList.length > 0 ? (
                    chatList.map(item => {
                        return (
                            <ChatListItem
                                data={item}
                                key={item.id}
                                setActiveChat={setActiveChat}
                                isActive={item.id == activeChat}
                            />
                        );
                    })
                ) : (
                    <div className={style.placeholder}>{'Чатов не найдено'}</div>
                )}
            </div>
        </React.Fragment>
    );
};

//
ChatList.propTypes = {
    chatList: PropTypes.array.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    getChatsListRequest: PropTypes.func.isRequired,
    activeChat: PropTypes.number,
};

export default ChatList;
