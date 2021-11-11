import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import style from './style.scss';
const color = ' #fa835f';
const useStyles = makeStyles(theme => ({
    iconRoot: {
        fontSize: 20,
    },
}));

const InfoCard = ({
    showDivider = true,
    children,
    title,
    menuItems,
    showMenu = true,
    headerContent,
    minHeight,
    className = '',
    showHeader = true,
    classNameChildren,
    classes,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = onClick => {
        if (typeof onClick === 'function') {
            onClick();
        }
        setAnchorEl(null);
    };
    const styles = useStyles();
    return (
        <div className={[style.container, className, classes.root].join(' ')} style={{ minHeight }}>
            {showHeader && (
                <div className={style.header}>
                    {title && <div className={[style.title, classes.title].join(' ')}>{title}</div>}
                    {headerContent}
                    {showMenu && (
                        <IconButton className={style.menu} size="small" onClick={handleClick}>
                            <MoreHorizIcon classes={{ root: styles.iconRoot }} htmlColor={color} />
                        </IconButton>
                    )}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {menuItems.map(i => (
                            <MenuItem
                                key={i.id}
                                classes={i.styles}
                                onClick={() => handleClose(i.onClick)}
                            >
                                {i.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            )}
            {showDivider && <div className={style.divider} />}
            <div className={[classNameChildren || '', classes.children].join(' ')}>{children}</div>
        </div>
    );
};

InfoCard.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    menuItems: PropTypes.array,
    showMenu: PropTypes.bool,
    headerContent: PropTypes.any,
    minHeight: PropTypes.number,
    className: PropTypes.string,
    classNameChildren: PropTypes.string,
    showHeader: PropTypes.bool,
    showDivider: PropTypes.bool,
    classes: PropTypes.shape({
        title: PropTypes.string,
        children: PropTypes.string,
        root: PropTypes.string,
    }),
};
InfoCard.defaultProps = {
    onClose: () => {},
    menuItems: [
        {
            id: 1,
            title: 'test',
            classes: {},
            onClick: () => {
                console.log('1');
            },
        },
    ],
    classes: {
        title: '',
        children: '',
        root: '',
    },
};

export default InfoCard;
