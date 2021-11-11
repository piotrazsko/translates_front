import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
const color = '#fa835f';

const SkillItem = ({ onClick, title, helperText = '' }) => {
    return (
        <React.Fragment>
            <div className={style.item} onClick={onClick}>
                <div className={style.titleContainer}>
                    <div className={style.title}> {title}</div>
                </div>

                <div className={style.inputs}>
                    <IconButton size="small">
                        <AddIcon htmlColor={color} />
                    </IconButton>
                </div>
            </div>
            <FormHelperText id="component-error-text-test">{helperText}</FormHelperText>
        </React.Fragment>
    );
};

SkillItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    helperText: PropTypes.string,
};

export default SkillItem;
