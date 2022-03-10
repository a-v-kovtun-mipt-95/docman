import React from "react";
import { TableModel } from "../models/TableModel";
import { DataGrid, GridColumns } from '@material-ui/data-grid';

export function TableComponent(props: {model: TableModel, columns: GridColumns}){
    const rows = props.model.getRows();
    return <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={props.columns} pageSize={5} checkboxSelection />
    </div>;
}