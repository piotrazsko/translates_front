import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { checkIsLikeFilter } from 'helpers';
import styles from './style.scss';

const FiltersChips = ({ filters, onDelete, columns = [] }) => {
    const keys = Object.keys(filters);
    return (
        <div className={styles.chipsContainer}>
            {keys.map(item => {
                let text = filters[item];
                text = checkIsLikeFilter(text) ? `${text.slice(1, text.length - 1)},Like` : text;
                let filterName = columns.find(i => i.id === item);
                filterName =
                    filterName && typeof filterName.label !== 'undefined' ? filterName.label : item;
                return (
                    <Chip
                        className={styles.chips}
                        key={item + '_key'}
                        label={`${filterName} - ${text}`}
                        onDelete={() => onDelete(item)}
                    />
                );
            })}
        </div>
    );
};

FiltersChips.propTypes = {
    filters: PropTypes.object,
    onDelete: PropTypes.func,
    columns: PropTypes.array,
};
FiltersChips.defaultProps = {
    filters: {},
};

export default FiltersChips;
