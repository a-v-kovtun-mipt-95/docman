import { GridColumns } from '@material-ui/data-grid';
import React from 'react';
import { TableComponent } from '../core/components/TableComponent';
import { UserListService, useUserListService } from '../service/useUserService';

const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },
];

function UserListComponent() {
    const service: UserListService = useUserListService();
    return <TableComponent model={service.getAllUsers()} columns={columns} />;
}

export default UserListComponent;