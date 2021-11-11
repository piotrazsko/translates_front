import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    getChatsListRequest,
    getChatByIdRequest,
    sendMessageRequest,
    getChatsListSelector,
    getChatByIdSelector,
    startListenChat,
    stopListenChat,
} from 'modules/chat';
import { getSalonSelector } from 'modules/salon';
import { Skeleton } from 'components';
import { currentUserDataSelector } from 'modules/currentUser';
import ChatList from './components/ChatList';
import ChatItem from './components/Chat';
import style from './style.scss';
const color = '#FA835F';

const Chat = ({
    chatList,
    getChatsListRequest,
    salonData,
    chatData,
    getChatByIdRequest,
    sendMessageRequest,
    currentUser,
    match,
    history,
    startListenChat,
    stopListenChat,
    useHistory = true,
}) => {
    const { id } = salonData;
    const chatId = get(match, 'params.chatId');
    const [activeChat, changeActiveChat] = React.useState(chatId || null);
    React.useEffect(() => {
        if (id) {
            getChatsListRequest({ id, limit: 1000 });
        }
    }, [id]);
    React.useEffect(() => {
        if (chatId) {
            changeActiveChat(chatId);
        }
    }, [chatId]);

    React.useEffect(() => {
        return () => {
            stopListenChat();
            // stopListenChat({ id: activeChat });
        };
    }, []);

    React.useEffect(() => {
        if (activeChat) {
            startListenChat({ id: activeChat });
        } else {
            stopListenChat({ id: activeChat });
        }
    }, [activeChat]);

    const setActiveChat = id => {
        if (useHistory) {
            history.push(`/messages/${id}`);
        } else {
            changeActiveChat(id);
        }
    };
    const [search, setSearch] = React.useState();
    const filtredChats = React.useMemo(() => {
        return !search
            ? chatList
            : chatList.filter(item => {
                  return (
                      `${get(item, 'companion.name')}`
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) !== -1 ||
                      ('+' + get(item, 'companion.phone')).indexOf(search.toLowerCase()) !== -1
                  );
              });
    }, [chatList, search]);
    return (
        <Grid container className={style.container}>
            <Grid item xs={5} className={style.chatColumn}>
                <div className={style.title}>
                    <Typography variant="h4">Чаты</Typography>
                    <div className={style.searchContainer}>
                        <TextField
                            fullWidth
                            className={style.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon htmlColor={color} />
                                    </InputAdornment>
                                ),
                                endAdornment: search ? (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setSearch('')} size="small">
                                            <ClearIcon htmlColor={color} />
                                        </IconButton>
                                    </InputAdornment>
                                ) : (
                                    false
                                ),
                            }}
                            required
                            value={search}
                            onChange={ev => setSearch(ev.target.value)}
                            size="small"
                            variant="outlined"
                            placeholder="Введите имя клиента или телефон"
                        />
                    </div>
                </div>
                <ChatList
                    chatList={filtredChats}
                    setActiveChat={setActiveChat}
                    activeChat={activeChat}
                />
            </Grid>
            <Grid item xs={7} className={style.chatColumn}>
                {chatId ? (
                    <ChatItem
                        chatId={activeChat}
                        getChatByIdRequest={getChatByIdRequest}
                        sendMessageRequest={sendMessageRequest}
                        chatData={chatData}
                        currentUser={currentUser}
                    />
                ) : (
                    <div className={style.emptyScreen}>Выберите, кому хотели бы написать</div>
                )}
            </Grid>
        </Grid>
    );
};

Chat.propTypes = {
    chatList: PropTypes.array.isRequired,
    getChatsListRequest: PropTypes.func.isRequired,
    sendMessageRequest: PropTypes.func,
    viewPort: PropTypes.shape({
        isMobile: PropTypes.bool,
    }),
    salonData: PropTypes.object,
    useHistory: PropTypes.bool,
    chatData: PropTypes.object,
    getChatByIdRequest: PropTypes.func.isRequired,
    startListenChat: PropTypes.func.isRequired,
    stopListenChat: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            chatId: PropTypes.any,
        }),
    }).isRequired,
};

const mapDispatchToProps = dispatch => ({
    getChatsListRequest: bindActionCreators(getChatsListRequest, dispatch),
    getChatByIdRequest: bindActionCreators(getChatByIdRequest, dispatch),
    startListenChat: bindActionCreators(startListenChat, dispatch),
    sendMessageRequest: bindActionCreators(sendMessageRequest, dispatch),
    stopListenChat: bindActionCreators(stopListenChat, dispatch),
});
const mapStateToProps = state => ({
    chatList: getChatsListSelector(state),
    chatData: getChatByIdSelector(state),
    currentUser: currentUserDataSelector(state),
    salonData: getSalonSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
