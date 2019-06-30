/**
 * Actions to create/update the task
 */

import { gql } from "apollo-boost";

import ACTIONS from "../action-types";
import store from "../store";
import initState from "../initialState";
import { actionFetch } from "./tasks";

/**
 * Opens the form
 *
 * @return {{type: string, payload: boolean}}
 */
export const actionOpenForm = () => ({ type: ACTIONS.FORM_POPUP, payload: true });

/**
 * Closes the form
 *
 * @return {{type: string, payload: boolean}}
 */
export const actionCloseForm = () => ({ type: ACTIONS.FORM_POPUP, payload: false });

/**
 * Async action to fill the form with init data
 *
 * @return {{type: string}}
 */
export const actionNewTask = () => dispatch => {

    dispatch( actionOpenForm() );
    dispatch({
        type:    ACTIONS.FORM_FILL,
        payload: initState.form.data,
    });
};

/**
 * Async action to fill the form with data of an existed task
 *
 * @param {string} id ID of the existed task
 *
 * @return {{type: string, payload}}
 */
export const actionEditTask = id => dispatch => {

    dispatch( actionOpenForm() );

    const tasks = (store.getState()).tasks.list;
    const data  = tasks[id];

    dispatch({
        type:    ACTIONS.FORM_FILL,
        payload: data,
    });
};

/**
 * Changes the form data
 *
 * @param data
 *
 * @return {{type: string, payload: *}}
 */
export const actionFormInput = data => ({ type: ACTIONS.FORM_FILL, payload: data });

/**
 * Async action to save a new task. (with side effect)
 *
 * @return {Function}
 */
export const actionSaveNewTask = (task) => dispatch => {

    dispatch({type: ACTIONS.FORM_SUBMIT});

    const client = (store.getState()).app.databaseClient;

    // --- Side effect:
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
        .then (result => dispatch( actionSubmited(result) ))
        .catch(error  => dispatch( actionError(error) ));

};

/**
 * Async action to save a new task. (with side effect)
 *
 * @return {Function}
 */
export const actionCommitExistedTask = (task) => dispatch => {

    dispatch({type: ACTIONS.FORM_SUBMIT});

    const state  = store.getState();
    const token  = state.auth.token;
    const client = state.app.databaseClient;

    // --- Side effect:
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
        .then (result => dispatch( actionSubmited(result) ))
        .catch(error  => dispatch( actionError(error) ));

};

const actionSubmited = result => dispatch => {

    dispatch( actionCloseForm() );
    dispatch({ type: ACTIONS.FORM_SUBMITED, payload: result.data });
    dispatch( actionFetch(true) );

};

const actionError = error => {
    const text = error.toString();
    console.log(text);
    alert(text);
    return {type: ACTIONS.FORM_ERROR, payload: text };
};