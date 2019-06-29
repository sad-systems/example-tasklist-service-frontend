/**
 * Form component
 */
import React from "react";

import { ApolloContext } from "react-apollo";
import { gql } from "apollo-boost";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

export default (props) => {

    const {
        open = false,
        isAdmin = false,
        token = '',
        task = {},
        onSubmited,
        onCanceled,
        onChange,
    } = props;

    const initState = {
        inProgress: false,
    };
    const [ state, setState ] = React.useState(initState);
    const changeState  = obj  => setState({ ...state, ...obj });
    const handleChange = name => event => {
        if (typeof onChange === "function")
            onChange(name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    
    const catchError = error => {
        changeState({inProgress: false});
        alert("* ERROR! " + error.toString());
    };

    const client = (React.useContext(ApolloContext)).client;
    const createNewTask  = event => {
        event.preventDefault();
        changeState({inProgress: true});
        client
            .mutate({
                mutation: gql`
                  mutation (
                    $text:   String!,
                    $email:  Email!,
                    $name:   String,
                    $status: Boolean,
                  )
                  {
                    taskNew(text: $text, email: $email, name: $name, status: $status)
                  }`,
                variables: {
                    text:   task.text,
                    email:  task.email,
                    name:   task.name,
                    status: !!task.status,
                }
            })
            .then(result => {
                const newId = result.data.taskNew;
                if (typeof onSubmited === "function") onSubmited(newId);
                changeState({inProgress: false});
            })
            .catch( catchError );
    };

    const saveExistedTask  = event => {
        event.preventDefault();
        changeState({inProgress: true});
        client
            .mutate({
                mutation: gql`
                  mutation (
                    $token:  String!,
                    $id:     String!,
                    $text:   String!,
                    $status: Boolean,
                  )
                  {
                    taskEdit(token: $token, id: $id, text: $text, status: $status)
                  }`,
                variables: {
                    token:  token,
                    id:     task.id,
                    text:   task.text,
                    status: !!task.status,
                }
            })
            .then(result => {
                const isChanged = result.data.taskEdit;
                if (isChanged && typeof onSubmited === "function") onSubmited(task.id);
                changeState({inProgress: false});
            })
            .catch( catchError );
    };

    const handleCancel = event => {
        event.preventDefault();
        if (typeof onCanceled === "function") onCanceled();
        changeState({inProgress: false});
    };

    return (
        <Dialog open={open} onClose={ handleCancel }>
            <form align="left">
                <DialogTitle>{task.id ? "Edit the task" : "New task"}</DialogTitle>
                <DialogContent>

                    <TextField
                        disabled={state.inProgress || !!task.id}
                        value={task.name}
                        onChange={ handleChange("name") }
                        type="text"
                        label="Your name"
                        margin="dense"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        disabled={state.inProgress || !!task.id}
                        value={task.email}
                        onChange={ handleChange("email") }
                        type="email"
                        label="Email address"
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        disabled={state.inProgress}
                        value={task.text}
                        onChange={ handleChange("text") }
                        type="text"
                        label="Text"
                        margin="dense"
                        fullWidth
                        multiline
                        rowsMax="4"
                        rows="4"
                        variant="outlined"
                    />
                    { isAdmin ?
                        <FormControl component="fieldset">
                            <FormHelperText>Status</FormHelperText>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={state.inProgress}
                                        checked={task.status}
                                        onChange={ handleChange("status") }
                                        color="primary"
                                    />}
                                label="Done"
                            />
                        </FormControl>
                    : null }

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ handleCancel }>Cancel</Button>
                    { !task.id ?
                        <Button color="primary" variant="outlined" onClick={ createNewTask }>Create</Button>
                        :
                        <Button color="secondary" variant="outlined" onClick={ saveExistedTask }>Commit</Button>
                    }
                </DialogActions>
            </form>
        </Dialog>
    );

}