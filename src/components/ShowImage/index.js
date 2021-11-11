import React from 'react';
import PropTypes from 'prop-types';
import { PopupBackground } from 'feelqueen_components';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles.scss';
class ShowImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { showdImage: 0, anchorEl: null };
    }
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    clickClose = () => {
        const { hideImage } = this.props;
        if (typeof hideImage !== 'undefined') {
            this.setState({ showdImage: 0 });
            hideImage();
        }
    };
    clickLeft = () => {
        const { showdImage } = this.state;
        let { images } = this.props;
        if (!Array.isArray(images)) {
            images = Object.keys(images)
                .map(function(key) {
                    if (!isNaN(parseInt(key))) {
                        return images[key];
                    }
                })
                .filter((item) => typeof item !== 'undefined');
        }
        if (typeof images[showdImage - 1] !== 'undefined' && showdImage > 0) {
            this.setState({ showdImage: showdImage - 1 });
        } else {
            this.setState({ showdImage: images.length - 1 });
        }
    };
    clickRight = () => {
        const { showdImage } = this.state;
        const { images } = this.props;
        if (typeof images[showdImage + 1] !== 'undefined') {
            this.setState({ showdImage: showdImage + 1 });
        } else {
            this.setState({ showdImage: 0 });
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { showdImage } = prevState;
        const { images } = nextProps;
        if (images !== null) {
            return {
                ...prevState,
                showdImage: !images && !images[showdImage] ? 0 : showdImage,
            };
        } else {
            return prevState;
        }
    }
    render() {
        let { images, menu, children, hideImage, clickMore } = this.props;

        const { showdImage, anchorEl } = this.state;
        if (!Array.isArray(images)) {
            images = images ? images : [];
            images = Object.keys(images)
                .map(function(key) {
                    if (!isNaN(parseInt(key))) {
                        return images[key];
                    }
                })
                .filter((item) => typeof item !== 'undefined');
        }
        const points = images.map((item, index) => (
            <Icon
                className={
                    index === showdImage ? styles.boldPointer : styles.pointer
                }
                key={item}
            >
                fiber_manual_record
            </Icon>
        ));
        const menuItems = menu.map((item) => (
            <MenuItem
                key={item.showImageText}
                onClick={(ev) => {
                    item.onClick(ev);
                    this.handleClose();
                }}
            >
                {item.text}
            </MenuItem>
        ));
        return images.length > 0 ? (
            <PopupBackground onClick={this.clickClose} visible={hideImage}>
                <div className={styles.container}>
                    <div className={styles.showImage}>
                        <div
                            className={[
                                styles.controlls,
                                typeof clickMore === 'function'
                                    ? styles.backgroundLine
                                    : '',
                            ].join(' ')}
                            style={{ position: 'absolute' }}
                        >
                            {typeof clickMore === 'function' ? (
                                <React.Fragment>
                                    <div
                                        aria-owns={
                                            anchorEl ? 'simple-menu' : null
                                        }
                                        aria-haspopup="true"
                                        onClick={(ev) => {
                                            clickMore();
                                            this.handleClick(ev);
                                        }}
                                        className={styles.more}
                                    >
                                        <Icon>more_vert</Icon>
                                    </div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        {menuItems}
                                    </Menu>
                                </React.Fragment>
                            ) : null}
                            {typeof hideImage === 'function' ? (
                                <div
                                    onClick={this.clickClose}
                                    className={styles.close}
                                >
                                    <Icon>clear</Icon>
                                </div>
                            ) : null}
                        </div>
                        <div
                            className={styles.imageContainer}
                            style={{
                                backgroundImage: `url(${images[showdImage] &&
                                    images[showdImage].path})`,
                            }}
                        >
                            {images.length > 1 && (
                                <React.Fragment>
                                    <div
                                        className={styles.buttonArrow}
                                        onClick={this.clickLeft}
                                    >
                                        <Icon>keyboard_arrow_left</Icon>
                                    </div>
                                    <div
                                        className={styles.buttonArrow}
                                        onClick={this.clickRight}
                                    >
                                        <Icon>keyboard_arrow_right</Icon>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>

                    {children && (
                        <div className={styles.childrenContainer}>
                            <div className={styles.pointerContainer}>
                                {images.length > 1 && points}
                            </div>
                            {children}
                        </div>
                    )}
                </div>
            </PopupBackground>
        ) : null;
    }
}

ShowImage.propTypes = {
    images: PropTypes.object,
    hideImage: PropTypes.func,
    clickMore: PropTypes.func,
    children: PropTypes.any,
    menu: PropTypes.array,
};
ShowImage.defaultProps = {
    menu: [],
    images: [''],
};

export default ShowImage;
