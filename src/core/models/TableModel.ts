import { useState } from "react";

export interface RowModel {
    id: string;
    [name: string]: undefined | null | string | number | boolean | RowModel | TableModel;
}

export interface TableModel {
    getRows: () => RowModel[];
}
