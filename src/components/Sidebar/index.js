import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import { makeStyles } from '@material-ui/core/styles';

import { getSidebarConfig } from 'modules/sidebar';
import { useSelector } from 'react-redux';
import AdminNavbarLinks from '../../containers/Header/AdminNavbarLinks';
import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle';
import style from './style.scss';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    menuLastItem: {
        color: 'red',
    },
}));

const Sidebar = ({ ...props }) => {
    const classesSidebar = useStyles();
    function activeRoute(routeName, path) {
        return path.indexOf(routeName) !== -1
            ? routeName == '/' && path.length > 1
                ? false
                : true
            : false;
    }
    const {
        classes,
        title,
        image,
        logoText,
        onAvatarMenuClick = () => {},
        match: { path },
    } = props;
    // console.log(path);
    const items = useSelector(getSidebarConfig);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = data => {
        onAvatarMenuClick(data);
        setAnchorEl(null);
    };
    let links = (
        <List className={classes.list}>
            {items.map((prop, key) => {
                let activePro = ' ';
                let listItemClasses;
                const isActive = activeRoute(prop.to, path);
                listItemClasses = isActive ? style.selectedItem : style.unselectedItem;
                const whiteFontClasses = activeRoute(prop.to, path) ? style.iconSelected : '';
                return (
                    <NavLink
                        to={prop.to}
                        className={activePro + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classNames(classes.itemLink, listItemClasses)}>
                            {typeof prop.icon === 'string' ? (
                                <Icon
                                    className={classNames(classes.itemIcon, whiteFontClasses, {
                                        [classes.itemIconRTL]: props.rtlActive,
                                    })}
                                >
                                    {prop.icon}
                                </Icon>
                            ) : (
                                <prop.icon
                                    htmlColor={isActive ? '#fa835f' : '#767676'}
                                    className={classNames(classes.itemIcon, whiteFontClasses, {
                                        [classes.itemIconRTL]: props.rtlActive,
                                    })}
                                />
                            )}
                            <ListItemText
                                primary={prop.title}
                                secondary={
                                    Boolean(prop.badge) && (
                                        <div className={style.secondary}>
                                            <div className={style.badge}>{prop.badge || ''}</div>
                                        </div>
                                    )
                                }
                                className={classNames(classes.itemText, style.item)}
                                disableTypography
                            />
                            <div className={style.borderAcrive} />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );

    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={props.rtlActive ? 'left' : 'right'}
                    open={props.open}
                    classes={{
                        paper: classNames(classes.drawerPaper, {
                            [classes.drawerPaperRTL]: props.rtlActive,
                        }),
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Avatar src={image} className={style.avatar} size="large">
                        {logoText}
                    </Avatar>

                    <div>{title}</div>
                    <div className={classes.sidebarWrapper}>
                        <AdminNavbarLinks userLogout={props.userLogout} />
                        {links}
                    </div>
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="right"
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper),
                    }}
                >
                    <div className={style.salonData}>
                        <Avatar
                            src={image}
                            className={style.avatar}
                            size="large"
                            onClick={handleClick}
                        >
                            {logoText}
                        </Avatar>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(0);
                                }}
                            >
                                Редактировать профиль
                            </MenuItem>

                            <MenuItem
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(1);
                                }}
                            >
                                Техническая поддержка
                            </MenuItem>
                            <MenuItem
                                classes={{ root: classesSidebar.menuLastItem }}
                                onClick={ev => {
                                    ev.stopPropagation();
                                    handleClose(2);
                                }}
                            >
                                Выйти
                            </MenuItem>
                        </Menu>
                        <div className={style.title}>{title}</div>
                    </div>
                    <div className={classes.sidebarWrapper}>{links}</div>
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    onAvatarMenuClick: PropTypes.func,
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool,
    userLogout: PropTypes.func.isRequired,
    color: PropTypes.string,
    match: PropTypes.shape({ path: PropTypes.string }),
};

export default withStyles(sidebarStyle)(Sidebar);
