/**
 * Actions to authenticate
 *
 * @class auth
 * @namespace actions
 */

import { gql } from "apollo-boost";

import ACTIONS from "../action-types";
import store from "../store";

/**
 * Async action to authenticate. (with side effect)
 * Obtains the auth token.
 *
 * @method actionLogin
 *
 * @param user
 * @param password
 *
 * @return {Function}
 */
export const actionLogin = (user, password) => dispatch => {

    dispatch({type: ACTIONS.AUTH_LOGIN});

    const client = (store.getState()).app.databaseClient;

    // --- Side effect:
    return client
        .query({
            query: gql`
                  {
                     access(user:"${user}" pass:"${password}")
                  }`
        })
        .then(result => {
            dispatch({type: ACTIONS.AUTH_SUCCESS, payload: { token: result.data.access } });
        })
        .catch(error => {
            dispatch({type: ACTIONS.AUTH_ERROR, payload: error.toString()});
        });

};