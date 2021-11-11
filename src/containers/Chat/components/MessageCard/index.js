import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './message.scss';
import { ShowImage } from 'components';

const MessageCard = ({ message, currentUserId, id }) => {
    const handleClick = () => {};
    const isCurrentUser = currentUserId === message.senderId;
    const date = moment(message.date).toDate();
    const isImage = message.type == 'image';
    const imageSrc = message.imageData;
    const [showImage, setShowImage] = React.useState(false);
    const dateFull = moment(date.valueOf() - date.getTimezoneOffset() * 60000);
    const datePrepared = dateFull.format('DD MMMM YYYY');
    const showDate = MessageCard.datePrepared !== datePrepared;
    MessageCard.datePrepared = datePrepared;
    return (
        <React.Fragment>
            <div id={id} className={style.myDate}>
                {showDate && datePrepared}
            </div>
            <div
                className={[style.container, isCurrentUser ? style.myMessage : ''].join(' ')}
                onClick={handleClick}
            >
                {!isImage ? (
                    message.text
                ) : (
                    <img
                        onClick={() => {
                            //     setShowImage(!showImage);
                        }}
                        className={style.img}
                        alt="img"
                        src={imageSrc}
                    />
                )}
                <div className={[style.time, isCurrentUser ? style.myTime : ''].join(' ')}>
                    {dateFull.format('HH:mm')}
                </div>
            </div>

            {showImage && (
                <ShowImage
                    images={[{ path: imageSrc }]}
                    hideImage={() => setShowImage(!showImage)}
                />
            )}
        </React.Fragment>
    );
};

MessageCard.propTypes = {
    currentUserId: PropTypes.object,
    message: PropTypes.shape({
        text: PropTypes.string,
        type: PropTypes.string.isRequired,
        senderId: PropTypes.number,
        date: PropTypes.string,
        imageData: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
};

export default MessageCard;
