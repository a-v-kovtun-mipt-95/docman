import { Button, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { NumberFieldComponent, SelectComponent, TextFieldComponent } from '../core/components/InputFieldComponents';
import { User, UserStatus } from '../model/useUserModel';
import { UserService, useUserService } from '../service/useUserService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function UserComponent() {
  const service: UserService = useUserService();
  const user: User = service.getUser();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}><InputLabel id="status-label">{service.getError()}</InputLabel></Grid>
        <Grid item xs={12}><InputLabel id="status-label">{service.getMessage()}</InputLabel></Grid>
        <Grid item xs={12}><TextFieldComponent id="id" label="Id" model={user.id} disabled={true} /></Grid>
        <Grid item xs={12}><TextFieldComponent id="email" label="Email" model={user.email} /></Grid>
        <Grid item xs={12}>
          <InputLabel id="status-label">Status</InputLabel>
          <SelectComponent
            labelId="status-label"
            id="status"
            model={user.status}
          />
        </Grid>
        <Grid item xs={12}><TextFieldComponent id="created" label="Created" model={user.created} disabled={true} /></Grid>
        <Grid item xs={12}><NumberFieldComponent id="version" label="Version" model={user.version} disabled={true} /></Grid>
        <Grid item xs={12}>
          <Button className={classes.button} variant="contained" color="primary" onClick={service.add}>Add</Button>
          <Button className={classes.button} variant="contained" onClick={service.update} disabled={!user.id.getValue()}>Update</Button>
          <Button className={classes.button} variant="contained" onClick={service.delete} disabled={!user.id.getValue()}>Delete</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserComponent;
