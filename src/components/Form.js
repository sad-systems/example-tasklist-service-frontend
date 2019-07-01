/**
 * Form component
 *
 * @class Form
 * @namespace components
 */
import React from "react";

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

import { connect } from 'react-redux';
import { actionCommitExistedTask, actionSaveNewTask, actionCloseForm, actionFormInput } from "../redux/actions/form";

const mapStateToProps = (state, ownProps) => ({
    /**
     * @property isAdmin
     * @type     boolean
     * @default  false
     */
    isAdmin:    state.auth.isAdmin,

    /**
     * @property isVisible
     * @type     boolean
     * @default  false
     */
    isVisible:  state.form.isVisible,

    /**
     * @property inProgress
     * @type     boolean
     * @default  false
     */
    inProgress: state.form.inProgress,

    /**
     * @property error
     * @type     string
     * @default  null
     */
    error:      state.form.error,

    /**
     * Not used yet
     * @beta
     *
     * @property result
     * @type     Object
     * @default  {}
     */
    result:     state.form.result,

    /**
     * Contains the task object
     *
     * @property task
     * @type     Object
     * @default  {}
     */
    task:       state.form.data,
});

const mapDispatchToProps = {
    /**
     * Execute the same action
     *
     * @method actionCommitExistedTask
     */
    actionCommitExistedTask,
    /**
     * Execute the same action
     *
     * @method actionSaveNewTask
     */
    actionSaveNewTask,
    /**
     * Execute the same action
     *
     * @method actionCloseForm
     */
    actionCloseForm,
    /**
     * Execute the same action
     *
     * @method actionFormInput
     */
    actionFormInput,
};

export default connect (mapStateToProps, mapDispatchToProps) ( props => {

    const {
        isAdmin    = false,
        isVisible  = false,
        inProgress = false,
        task = {},
    } = props;

    const handleChange = name => event => {
        props.actionFormInput({ [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
    };

    const createNewTask  = event => {
        event.preventDefault();
        props.actionSaveNewTask(task);
    };

    const saveExistedTask  = event => {
        event.preventDefault();
        props.actionCommitExistedTask(task);
    };

    const handleCancel = event => {
        event.preventDefault();
        props.actionCloseForm();
    };

    return (
        <Dialog open={isVisible} onClose={ handleCancel }>
            <form align="left">
                <DialogTitle>{task.id ? "Edit the task" : "New task"}</DialogTitle>
                <DialogContent>

                    <TextField
                        disabled={inProgress || !!task.id}
                        value={task.name}
                        onChange={ handleChange("name") }
                        type="text"
                        label="Your name"
                        margin="dense"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        disabled={inProgress || !!task.id}
                        value={task.email}
                        onChange={ handleChange("email") }
                        type="email"
                        label="Email address"
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        disabled={inProgress}
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
                                        disabled={inProgress}
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

});