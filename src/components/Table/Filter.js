import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FilterList, Search } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearAll from '@material-ui/icons/ClearAll';
import Fab from '@material-ui/core/Fab';
import TextField from './TextField';
import style from './style.scss';

const styles = {
    typography: {
        // padding: theme.spacing(2),
    },
};

class Filter extends Component {
    static propTypes = {
        columns: PropTypes.array,
        filter: PropTypes.func,
        classes: PropTypes.object,
    };

    initFilterState = () => {
        const { columns } = this.props;
        return {
            selectedValue: columns[0].id,
            text: '',
            like: true,
        };
    };
    state = {
        anchorEl: null,
        filters: [this.initFilterState()],
    };
    handleChange = (event, index) => {
        const { filters } = this.state;
        filters[index].selectedValue = event.target.value;
        this.setState({ filters: filters });
    };
    setLike = (like, index) => {
        const { filters } = this.state;
        filters[index].like = like;
        this.setState({ filters: filters });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.target });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleFilter = ev => {
        ev.preventDefault();
        const { filter } = this.props;
        filter(this.state.filters);
        this.handleClose();
    };
    setText = (text, index) => {
        const { filters } = this.state;
        filters[index].text = text;
        this.setState({ filters: filters });
    };

    addFilter = () => {
        const { filters } = this.state;
        if (filters.length < 6) {
            filters.push(this.initFilterState());
            this.setState({ filters: filters });
        }
    };
    clearClick = () => {
        this.setState({ filters: [this.initFilterState()] });
    };
    render() {
        const { columns, classes } = this.props;
        const { anchorEl, filters } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const FilterLines = filters.map((item, index) => (
            <div key={'filterLine' + index} className={style.inputs}>
                <div className={style.inputText}>
                    <TextField
                        label="Text"
                        className={classes.textField}
                        margin="normal"
                        name="text"
                        onChangeListener={text => this.setText(text, index)}
                        defaultValue={item.text}
                    />
                </div>
                <div className={style.selectFilter}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-simple">Filter</InputLabel>
                        <Select
                            name="selectedValue"
                            value={item.selectedValue}
                            onChange={ev => this.handleChange(ev, index)}
                        >
                            {columns.map(itemSelect => {
                                // is uset for getting  part of key
                                const key = itemSelect.id;
                                return itemSelect.sort === false ? null : (
                                    <MenuItem key={`key_${key}`} value={key}>
                                        {itemSelect.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={item.like}
                                name="like"
                                onChange={ev => this.setLike(ev.target.checked, index)}
                                value="checkedA"
                                color="primary"
                            />
                        }
                        label="Like"
                    />
                </div>
            </div>
        ));
        return (
            <div>
                <IconButton
                    aria-label="Filter list"
                    aria-describedby={id}
                    onClick={this.handleClick}
                >
                    <FilterList />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <form onSubmit={this.handleFilter}>
                        <div className={style.popoverFilter}>
                            {FilterLines}
                            <Fab
                                color="primary"
                                aria-label="add"
                                className={classes.fab}
                                onClick={this.addFilter}
                                size="small"
                            >
                                <AddIcon />
                            </Fab>
                            <div className={style.findButtonContainer}>
                                <IconButton
                                    color={'primary'}
                                    onClick={this.clearClick}
                                    aria-label="Filter list"
                                >
                                    <ClearAll />
                                </IconButton>
                                <IconButton
                                    color={'primary'}
                                    aria-label="Filter list"
                                    type="submit"
                                >
                                    <Search />
                                </IconButton>
                            </div>
                        </div>
                    </form>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(Filter);
