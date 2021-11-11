/* global Proxy, global*/
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { get } from 'lodash';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Edit, Visibility } from '@material-ui/icons';
import TableHeadCustom from './TableHead';
import TableToolbarCustom from './TableToolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createLikeString } from 'helpers';
import history from 'store/history';

import { getFirstPartBeforePointFromString, addFiltersToUrl } from 'helpers';
import style from './style.scss';
//HACK for wrap react components and save values for sort  we createproxy wrapper, that save value
export function addValueToReactComponent(component, value) {
    return new Proxy(<>{component}</>, {
        get(target, prop) {
            if (prop === 'value') {
                return value;
            } else {
                return target[prop];
            }
        },
    });
}

function desc(a, b, orderBy) {
    const a1 =
        React.isValidElement(a[orderBy]) && typeof a[orderBy].value !== 'undefined'
            ? a[orderBy].value
            : get(a, orderBy);
    const b1 =
        React.isValidElement(b[orderBy]) && typeof b[orderBy].value !== 'undefined'
            ? b[orderBy].value
            : get(b, orderBy);
    if (b1 < a1) {
        return -1;
    }
    if (b1 > a1) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp, enableSorting) {
    if (!enableSorting) {
        return array;
    }
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = () => {
    return {
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    };
};

class TableCustom extends Component {
    constructor(props) {
        super(props);
        const state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            page: 0,
            dense: false,
            perPage: 10,
        };
        const { filter } = props;
        this.state =
            typeof filter === 'object' && Object.keys(filter).length > 0
                ? { ...state, ...{ filter: { ...filter } } }
                : { ...state };
    }

    handleRequestSort = (event, property) => {
        const { orderBy, order } = this.state;
        const isDesc = orderBy === property && order === 'desc';
        this.setState({
            order: isDesc ? 'asc' : 'desc',
            orderBy: property,
        });
    };

    handleSelectAllClick = event => {
        const { rows } = this.props;

        if (event.target.checked) {
            const proxyRows = this.getProxyRows(rows);
            const newSelecteds = proxyRows.map(n => n.id);
            this.setState({ selected: newSelecteds });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClickEdit = (id, row) => {
        const { editClickCallback } = this.props;
        editClickCallback(id, row);
    };

    handleClick = (event, name) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ perPage: event.target.value, page: 0 });
    };

    handleChangeDense = event => {
        this.setState({ dense: event.target.checked });
    };
    handleDelete = () => {
        const { deleteAction, removeFromArray } = this.props;
        if (removeFromArray) {
            deleteAction(this.state.selected);
        } else {
            this.state.selected.forEach((item, index) => {
                deleteAction(item, {
                    onSuccess: () => {
                        // if (index === this.state.selected.length - 1) {
                        const { updateListenerCallback, fullIdPath } = this.props;
                        const { dense, selected, orderBy, ...state } = this.state;
                        updateListenerCallback({
                            orderBy: !fullIdPath
                                ? getFirstPartBeforePointFromString(orderBy)
                                : orderBy,
                            ...state,
                        });
                        this.setState({ selected: [] });
                        // }
                    },
                });
            });
        }
    };
    componentDidUpdate(prevProps, prevState) {
        const { updateListenerCallback, fullIdPath } = this.props;
        const { dense, selected, orderBy, ...state } = this.state;
        // need update list ufter change parameters of list without selected v and  dense
        if (
            prevState !== this.state &&
            prevState.selected.length === selected.length &&
            dense == prevState.dense
        ) {
            updateListenerCallback({
                orderBy: !fullIdPath ? getFirstPartBeforePointFromString(orderBy) : orderBy,
                ...state,
            });
        }
    }

    componentDidMount() {
        const { updateListenerCallback } = this.props;
        const { ...state } = this.state;
        updateListenerCallback(state);
    }

    changeUrlWithFilters = filter => {
        const { useFiltersInUrl = true } = this.props;
        if (useFiltersInUrl) {
            history.push(addFiltersToUrl(global.location.pathname, filter));
        }
    };
    removeFilter = key => {
        const state = { ...this.state };
        const { filter } = state;
        const newFilter = { ...filter };
        delete newFilter[key];
        state.filter = newFilter;
        this.changeUrlWithFilters(newFilter);
        this.setState(state);
    };

    filterListener = filters => {
        const { filter = {} } = this.state;
        const { fullIdPath } = this.props;
        filters.forEach(item => {
            const str = `${item.text}`;
            const key = !fullIdPath
                ? getFirstPartBeforePointFromString(item.selectedValue)
                : item.selectedValue;
            if (str.length > 0) {
                filter[key] = !item.like ? str : createLikeString(str);
            }
        });
        this.changeUrlWithFilters(filter);
        this.setState({ filter, page: 0 });
    };
    getProxyRows = rows => {
        const { headRows } = this.props;
        return rows.map(item => {
            return new Proxy(item, {
                get(target, prop) {
                    const newKey = headRows.find(item => item.isId);
                    return prop === 'id' && newKey ? target[newKey.id] : target[prop];
                },
            });
        });
    };
    render() {
        const {
            classes,
            headRows,
            rows = [],
            tableTitle = '',
            size,
            editEnable = true,
            permissions,
            addButtonListener,
            fullIdPath,
            showEditHead,
            enableSorting
        } = this.props;
        const { order, orderBy, selected, page, dense, perPage, filter } = this.state;

        const isSelected = item => {
            return selected.indexOf(item) !== -1;
        };

        const emptyRows = perPage - rows.length;
        const proxiRows = this.getProxyRows(rows);
        const headerRowKeys = headRows.map(item => item.id);

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <TableToolbarCustom
                            tableTitle={tableTitle}
                            numSelected={selected.length}
                            columns={headRows}
                            filters={filter}
                            deleteChipsHandler={this.removeFilter}
                            filterChange={this.filterListener}
                            deleteHanlder={this.handleDelete}
                            permissions={permissions}
                            fullIdPath={fullIdPath}
                        />
                        <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <TableHeadCustom
                                    headRows={headRows}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={proxiRows.length}
                                    editEnable={
                                        (!!permissions && permissions.update && editEnable) ||
                                        showEditHead
                                    }
                                    fullIdPath={fullIdPath}
                                />
                                <TableBody>
                                    {stableSort(proxiRows, getSorting(order, orderBy), enableSorting).map(
                                        (row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={'key_' + row.name + `${index}`}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            onClick={event =>
                                                                this.handleClick(event, row.id)
                                                            }
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    {editEnable ? (
                                                        <TableCell padding="checkbox">
                                                            <IconButton
                                                                aria-label="Edit"
                                                                classes={{
                                                                    root: style.root,
                                                                }}
                                                                onClick={ev => {
                                                                    this.handleClickEdit(
                                                                        row.id,
                                                                        row,
                                                                        ev
                                                                    );
                                                                }}
                                                            >
                                                                {permissions.update ? (
                                                                    <Edit />
                                                                ) : (
                                                                    <Visibility />
                                                                )}{' '}
                                                            </IconButton>
                                                        </TableCell>
                                                    ) : null}

                                                    {headerRowKeys.map((item, i) => {
                                                        return i === 0 ? (
                                                            <TableCell
                                                                component="th"
                                                                key={`index_${i}${index}`}
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {get(row, item.trim(), null)}
                                                            </TableCell>
                                                        ) : (
                                                            <TableCell
                                                                key={`index_${i}${index}`}
                                                                align={
                                                                    headRows[i].numeric
                                                                        ? 'right'
                                                                        : 'left'
                                                                }
                                                            >
                                                                {get(row, item.trim(), null)}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        }
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell
                                                colSpan={
                                                    headerRowKeys.length + editEnable &&
                                                    permissions.update
                                                        ? 2
                                                        : 1
                                                }
                                            />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 75, 100]}
                            component="div"
                            count={size}
                            rowsPerPage={perPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={this.handleChangeDense} />}
                        label="Dense padding"
                    />
                </div>
                <div className={style.addButtonContainer}>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        disabled={!permissions.create}
                        onClick={addButtonListener}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            </React.Fragment>
        );
    }
}
TableCustom.defaultProps = {
    deleteAction: data => console.log(data),
    addButtonListener: data => console.log(data),
    useFiltersInUrl: true,
    showEditHead: true,
};

TableCustom.defaultProps = {
    fullIdPath: false,
    removeFromArray: false,
    enableSorting: true,
};
TableCustom.propTypes = {
    showEditHead: PropTypes.bool,
    headRows: PropTypes.array.isRequired,
    useFiltersInUrl: PropTypes.bool,
    rows: PropTypes.array.isRequired,
    tableTitle: PropTypes.string,
    updateListenerCallback: PropTypes.func,
    size: PropTypes.number.isRequired,
    deleteAction: PropTypes.func,
    editEnable: PropTypes.bool,
    editClickCallback: PropTypes.func,
    classes: PropTypes.object,
    removeFromArray: PropTypes.bool,
    filter: PropTypes.object,
    enableSorting: PropTypes.bool,
    permissions: PropTypes.shape({
        create: PropTypes.bool,
        update: PropTypes.bool,
        read: PropTypes.bool,
        delete: PropTypes.bool,
    }),
    addButtonListener: PropTypes.func,
    fullIdPath: PropTypes.bool,
    // edit
};

export default withStyles(styles)(TableCustom);
