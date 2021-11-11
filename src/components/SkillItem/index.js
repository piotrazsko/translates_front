import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { NumberFormat } from 'components';
import style from './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {
    Cosmetics,
    MakeUpIcon,
    MassageIcon,
    NailIcon,
    ScissorsIcon,
    SpaIcon,
    Tattoo,
} from '../../assets/img/svg/prepared/services';

const useStyles = makeStyles(theme => ({
    input: {
        fontSize: '12px !important',
    },
}));
const color = '#fa835f';

const SkillItem = ({
    onDelete,
    onEdit,
    data,
    showDuration = true,
    showPrice = true,
    showEdit = true,
    showDelete = true,
    currency_id,
}) => {
    const getIcon = () => {
        switch (data.parent_uid) {
            case 'hair':
                return <ScissorsIcon />;
            case 'massage':
                return <MassageIcon />;
            case 'body':
                return <SpaIcon />;
            case 'nails':
                return <NailIcon />;
            case 'tattoo':
                return <Tattoo />;
            case 'cosmetology':
                return <Cosmetics />;
            case 'face':
                return <MakeUpIcon />;
            default:
                return <Icon />;
        }
    };
    const { title, duration, price, id } = data;
    return (
        !!data && (
            <div className={style.item} key={id}>
                {getIcon()}
                <div className={style.titleContainer}>
                    <div className={style.title}> {title}</div>
                </div>
                <div className={style.price}>
                    {showPrice && (
                        <NumberFormat
                            value={parseFloat(price)}
                            displayType={'text'}
                            thousandSeparator={' '}
                        />
                    )}
                    {showDuration && <span className={style.duration}> / {duration} мин.</span>}
                </div>
                <div className={style.inputs}>
                    {showEdit && (
                        <IconButton size="small" onClick={onEdit}>
                            <CreateOutlinedIcon className={style.icon} htmlColor={color} />
                        </IconButton>
                    )}
                    {showDelete && (
                        <IconButton size="small" onClick={onDelete}>
                            <DeleteOutlineOutlinedIcon className={style.icon} htmlColor={color} />
                        </IconButton>
                    )}
                </div>
            </div>
        )
    );
};

SkillItem.propTypes = {
    onDelete: PropTypes.func.isRequired,
    currency_id: PropTypes.number,
};
SkillItem.defaultProps = {
    data: {},
};
export default SkillItem;
