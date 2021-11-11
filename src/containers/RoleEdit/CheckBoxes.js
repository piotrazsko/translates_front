import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './style.scss';
import { ROLES_NAMES } from 'config/roles';
class CheckBoxes extends Component {
    state = {};

    render() {
        const { data, changeListener = () => {}, disabled = false } = this.props;
        // const state = {...this.state};

        const keys = Object.keys(data).sort();
        return (
            <table className={styles.table}>
                <tr>
                    <th>Name</th>
                    <th>Read</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                {keys.map(item => (
                    <tr key={item}>
                        <td>{ROLES_NAMES[item]}</td>
                        <td>
                            <Checkbox
                                onChange={ev => changeListener(ev, item)}
                                value="R"
                                disabled={disabled}
                                checked={data[item].indexOf('R') !== -1}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </td>
                        <td>
                            <Checkbox
                                onChange={ev => changeListener(ev, item)}
                                value="C"
                                disabled={disabled}
                                checked={data[item].indexOf('C') !== -1}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </td>
                        <td>
                            <Checkbox
                                onChange={ev => changeListener(ev, item)}
                                value="U"
                                disabled={disabled}
                                checked={data[item].indexOf('U') !== -1}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </td>
                        <td>
                            <Checkbox
                                onChange={ev => changeListener(ev, item)}
                                value="D"
                                disabled={disabled}
                                checked={data[item].indexOf('D') !== -1}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </table>
        );
    }
}
CheckBoxes.propTypes = {
    data: PropTypes.object,
    changeListener: PropTypes.func,
    disabled: PropTypes.bool,
};

export default CheckBoxes;
