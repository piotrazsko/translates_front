import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';

import style from './style.scss';
const color = ' #fa835f';
const useStyles = makeStyles(theme => ({
    iconRoot: {
        fontSize: 20,
    },
}));

const EditCart = ({ children, onClick, title, showEdit = true }) => {
    const classes = useStyles();
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.title}>{title}</div>
                {showEdit && (
                    <IconButton size="small" onClick={onClick}>
                        <EditOutlinedIcon classes={{ root: classes.iconRoot }} htmlColor={color} />
                    </IconButton>
                )}
            </div>
            <div className={style.children}>{children}</div>
        </div>
    );
};

EditCart.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    title: PropTypes.string,
    showEdit: PropTypes.bool,
};

export default EditCart;
