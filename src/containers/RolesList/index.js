import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRolesListRequest, deleteRolesRequest, rolesSelector } from 'modules/roles';

const headRows = RolesList => {
    const arr = [
        { id: 'id', numeric: true, disablePadding: true, label: 'id' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    ];
    if (Array.isArray(RolesList) && RolesList.length > 0) {
        const keys = Object.keys(RolesList[0].permissions);
        keys.forEach(item => {
            arr.push({
                id: `permissions.${item}`,
                numeric: false,
                disablePadding: false,
                label: item,
            });
        });
    }
    return arr;
};

class RolesList extends PureComponent {
    addRoleHandler = () => {
        const { history } = this.props;
        history.push('/create-role');
    };
    editRoleHandler = id => {
        const { history } = this.props;
        history.push(`/role/${id}`);
    };
    render() {
        const { RolesList, getRolesListRequest, permissions, deleteRolesRequest } = this.props;
        return (
            <React.Fragment>
                <Table
                    updateListenerCallback={getRolesListRequest}
                    headRows={headRows(RolesList.items)}
                    rows={RolesList.items}
                    size={RolesList.size}
                    permissions={permissions}
                    tableTitle={'Roles list'}
                    editEnable
                    deleteAction={deleteRolesRequest}
                    editClickCallback={this.editRoleHandler}
                    addButtonListener={this.addRoleHandler}
                />
            </React.Fragment>
        );
    }
}

RolesList.propTypes = {
    RolesList: PropTypes.object,
    getRolesListRequest: PropTypes.func,
    deleteRolesRequest: PropTypes.func,
    history: PropTypes.object.isRequired,
    permissions: PropTypes.shape({
        create: PropTypes.bool,
        update: PropTypes.bool,
        read: PropTypes.bool,
        delete: PropTypes.bool,
    }),
};

const mapStateToProps = state => ({
    RolesList: rolesSelector(state),
});

const mapDispatchToProps = dispatch => ({
    getRolesListRequest: bindActionCreators(getRolesListRequest, dispatch),
    deleteRolesRequest: bindActionCreators(deleteRolesRequest, dispatch),
    // deleteUsersRequest: bindActionCreators(deleteUsersRequest, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RolesList);
