import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CheckBoxes from './CheckBoxes';
import { FormCore } from 'components';

import {
    getRolesListRequest,
    rolesSelector,
    addRoleRequest,
    updateRoleRequest,
    getmyPermissionsRequest,
} from 'modules/roles';
import { ROLES_NAMES } from 'config/roles';
import style from './style.scss';

const NONE = 'None';

const emptyRole = {};
Object.keys(ROLES_NAMES).forEach(item => {
    emptyRole[item] = 'None';
});

class Role extends React.Component {
    state = { name: '', permissions: emptyRole };

    componentDidMount() {
        const {
            getUsersRolesRequest,
            route: { isAdd },
            match: {
                params: { id },
            },
        } = this.props;

        if (!isAdd) {
            //TODO may be it is wrong (model input data need like with state)
            getUsersRolesRequest('', {
                onSuccess: data => {
                    if (Array.isArray(data.data.items)) {
                        const currentRole = data.data.items.find(item => item.id == id);
                        this.setState({
                            permissions:
                                typeof currentRole === 'undefined'
                                    ? emptyRole
                                    : currentRole.permissions,
                            name: currentRole.name,
                        });
                    }
                },
            });
        }
    }

    handlerCancelButton = () => {
        const { history } = this.props;
        history.push('/roles-list');
    };

    handlerNameChange = ev => {
        this.setState({ name: ev.target.value });
    };

    handleChangePermissions = (ev, key) => {
        const { permissions } = this.state;
        if (ev.target.checked) {
            permissions[key] = typeof permissions[key] === 'undefined' ? '' : permissions[key];
            permissions[key] =
                permissions[key] !== NONE ? permissions[key] + ev.target.value : ev.target.value;
        } else {
            permissions[key] = permissions[key].replace(ev.target.value, '');
            permissions[key] = permissions[key].length === 0 ? NONE : permissions[key];
        }
        this.setState({ permissions });
    };

    handlerSubmit = ev => {
        const {
            history,
            route,
            addRoleRequest,
            updateRoleRequest,
            getmyPermissionsRequest,
            match: {
                params: { id },
            },
        } = this.props;
        const handlerSuccess = () => {
            getmyPermissionsRequest();
            history.push('/roles-list');
        };
        if (route.isAdd) {
            addRoleRequest({ ...this.state }, { onSuccess: handlerSuccess });
        } else {
            updateRoleRequest({ id: id, ...this.state }, { onSuccess: handlerSuccess });
        }
    };

    render() {
        const {
            permissions,
            route: { isAdd },
        } = this.props;
        const { name } = this.state;
        const permissionsData = this.state.permissions;
        return (
            <FormCore
                permissions={permissions}
                handlerCancelButton={this.handlerCancelButton}
                handlerSubmit={this.handlerSubmit}
                title={`Role ${isAdd ? 'creation' : 'editing'}  page`}
                requiredMap={[{ title: 'Name', name: 'name' }]}
            >
                <Grid item xs={12} classes={{ root: style.inputContainer }}>
                    <TextField
                        id="standard-name"
                        variant="outlined"
                        label="Name"
                        margin="normal"
                        onChange={this.handlerNameChange}
                        classes={{ root: style.inputs }}
                        value={name}
                        name="name"
                        required
                        disabled={!permissions.update}
                    />
                    <FormControl variant="filled">
                        <CheckBoxes
                            data={permissionsData}
                            changeListener={this.handleChangePermissions}
                        />
                    </FormControl>
                </Grid>
            </FormCore>
        );
    }
}

Role.propTypes = {
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    addRoleRequest: PropTypes.func.isRequired,
    updateRoleRequest: PropTypes.func.isRequired,
    getmyPermissionsRequest: PropTypes.func.isRequired,
    getUsersRolesRequest: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.shape({
        create: PropTypes.bool,
        update: PropTypes.bool,
        read: PropTypes.bool,
        delete: PropTypes.bool,
    }),
};

const mapStateToProps = state => ({
    usersRoles: rolesSelector(state),
});

const mapDispatchToProps = dispatch => ({
    getUsersRolesRequest: bindActionCreators(getRolesListRequest, dispatch),
    getmyPermissionsRequest: bindActionCreators(getmyPermissionsRequest, dispatch),
    addRoleRequest: bindActionCreators(addRoleRequest, dispatch),
    updateRoleRequest: bindActionCreators(updateRoleRequest, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Role);
