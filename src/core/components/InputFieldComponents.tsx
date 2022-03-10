import { TextFieldProps, TextField, SelectProps, Select, MenuItem } from "@material-ui/core";
import React from "react";
import { InputModel, SelectModel } from "../models/InputModels";

export type TextFieldComponentProps = TextFieldProps & { model: InputModel<string> };
export type NumberFieldComponentProps = TextFieldProps & { model: InputModel<number> };
export type SelectComponentProps = SelectProps & { model: SelectModel<string> };

export function TextFieldComponent(props: TextFieldComponentProps) {
    const { model, ...restProps } = props;
    return (
        <TextField
            value={model.getValue()}
            onChange={(event) => model.setValue(event.target.value)}
            {...restProps}
        />);
}

export function NumberFieldComponent(props: NumberFieldComponentProps) {
    const { model, ...restProps } = props;
    return (
        <TextField
            value={model.getValue()}
            onChange={(event) => model.setValue(parseInt(event.target.value))}
            {...restProps}
        />);
}

export function SelectComponent(props: SelectComponentProps) {
    const { model, ...restProps } = props;
    return (
        <Select
            value={model.getValue()}
            onChange={(event) => model.setValue(event.target.value as string)}
            {...restProps}
        >
            {model.getItems().map((item) => <MenuItem value={item.value}>{item.label}</MenuItem>)}
        </Select>);
}