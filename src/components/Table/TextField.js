import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldDefault from '@material-ui/core/TextField';

class TextField extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        onChangeListener: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = { text: props.defaultValue };
    }
    onChange = ev => {
        this.setState({ text: ev.target.value });
    };

    onBlur = () => {
        const { onChangeListener } = this.props;
        onChangeListener(this.state.text);
    };
    render() {
        const { text } = this.state;

        return (
            <TextFieldDefault
                {...this.props}
                onBlur={this.onBlur}
                name="test"
                value={text}
                onChange={this.onChange}
            />
        );
    }
}

export default TextField;
