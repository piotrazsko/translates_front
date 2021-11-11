import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import Popup from '../Popup';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { crop as styles, sliderStyles, canvasStyles } from './styles';
import style from './style.scss';

class Crop extends Component {
    editor = React.createRef();
    state = { scale: 1 };
    maxScale = 2;
    minScale = 0.3;
    onCrop = () => {
        const { onSubmitCallback } = this.props;
        const canvas = this.editor.getImage();
        const img = new Image();
        img.src = canvas.toDataURL('image/jpeg', 1);
        img.onload = () => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            img.width = 1028;
            img.height = 1028;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            onSubmitCallback(canvas.toDataURL('image/jpeg', 1));
        };
    };
    onCancelCkick = () => {
        const { onCancellCallback = () => {} } = this.props;
        onCancellCallback();
    };

    onChangeScale = scale => {
        this.setState({
            scale:
                scale < this.maxScale
                    ? scale > this.minScale
                        ? scale
                        : this.minScale
                    : this.maxScale,
        });
    };

    getEditor = editor => {
        this.editor = editor;
    };
    render() {
        const {
            classes,
            classNames,

            isDisabledZoomOut,

            isDisabledZoomIn,
            image,
            styleCrop,
        } = this.props;

        const { scale } = this.state;
        return (
            <Popup
                align="left"
                onSubmit={this.onCrop}
                showPopup
                popupBackgroundsProps={{ onClick: () => {} }}
                onCancel={this.onCancelCkick}
                classes={{
                    root: [style.container, classNames.popupRoot].join(' '),
                    dataContainer: [style.dataContainer, classNames.dataContainer].join(' '),
                    buttonContainer: style.buttonContainer,
                }}
            >
                <div className={style.cropContainer}>
                    <div className={classes.avatarContent}>
                        {image && (
                            <AvatarEditor
                                image={image.src}
                                ref={this.getEditor}
                                width={514}
                                height={514}
                                border={[126, 15]}
                                color={[255, 255, 255, 0.6]}
                                scale={scale}
                                rotate={0}
                                style={{ ...canvasStyles, ...styleCrop }}
                                disableDrop
                            />
                        )}
                        <div className={classes.zoomContainer}>
                            <IconButton
                                aria-label="уменьшить изображение"
                                onClick={() => {
                                    this.onChangeScale(scale - 0.05);
                                }}
                                disabled={isDisabledZoomOut}
                                className={classes.zoomButton}
                            >
                                <Icon data-nosnippet className={classes.zoomIcon}>
                                    zoom_out
                                </Icon>
                            </IconButton>

                            <IconButton
                                aria-label="увеличить изображение"
                                onClick={() => {
                                    this.onChangeScale(scale + 0.05);
                                }}
                                disabled={isDisabledZoomIn}
                                className={classes.zoomButton}
                            >
                                <Icon data-nosnippet className={classes.zoomIcon}>
                                    zoom_in
                                </Icon>
                            </IconButton>
                        </div>
                        <div className={style.hint}>
                            <div className={classes.avatarHintIconContainer}>
                                <Icon data-nosnippet className={classes.avatarHintIcon}>
                                    open_with
                                </Icon>
                            </div>
                            <div className={classes.avatarDescription}>
                                Двигайте фото, чтобы поменять положение кадра
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
}

Crop.propTypes = {
    isDisabledZoomOut: PropTypes.bool.isRequired,
    onCancellCallback: PropTypes.bool.isRequired,
    isDisabledZoomIn: PropTypes.bool.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onSubmitCallback: PropTypes.func.isRequired,
    styleCrop: PropTypes.object,
    classNames: PropTypes.shape({
        popupRoot: PropTypes.string,
        dataContainer: PropTypes.string,
    }),
    classes: PropTypes.shape({
        cancelButton: PropTypes.string.isRequired,
        acceptButton: PropTypes.string.isRequired,
        paper: PropTypes.string.isRequired,
        clear: PropTypes.string.isRequired,
        actions: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        zoomHint: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        zoomContainer: PropTypes.string.isRequired,
        zoomButton: PropTypes.string.isRequired,
        zoomIcon: PropTypes.string.isRequired,
        avatarContent: PropTypes.string.isRequired,
        avatarHintIcon: PropTypes.string.isRequired,
        avatarDescription: PropTypes.string.isRequired,
        avatarHintIconContainer: PropTypes.string.isRequired,
    }).isRequired,
};
Crop.defaultProps = {
    classNames: {
        popupRoot: '',
        dataContainer: '',
    },
    styleCrop: {},
    isOpenDialog: true,
    closeDialog: () => {},
    fullScreen: true,
    title: '',
    onCrop: () => {},
    onHintMouseOut: () => {},
    onHintMouseOver: () => {},
    hintClasses: '',
    onZoomOut: () => {},
    isDisabledZoomOut: false,
    onZoomIn: () => {},
    isDisabledZoomIn: false,
    scale: 1,
    onChangeScale: () => {},
};

export default withStyles(styles)(Crop);
