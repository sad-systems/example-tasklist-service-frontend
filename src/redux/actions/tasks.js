/**
 * Actions to manipulate the task list
 *
 * @class tasks
 * @namespace actions
 */

import { gql } from "apollo-boost";

import ACTIONS from "../action-types";
import store from "../store";

const orderValueToggle = value => ++value > 2 ? 0 : value;

const getOrderValueForQuery = (fieldName, value) => {
    return value ? ( `{ field: ${fieldName}, direction: ${(value === 1 ? 'desc' : 'asc')} }, ` ) : '';
};

/**
 * Async action to fetch task list from server.
 * Obtains the tasks list.
 *
 * @method actionFetch
 * @async
 *
 * @param {boolean} reset
 *
 * @return {Function}
 */
export const actionFetch = (reset = false) => dispatch => {

    const state  = store.getState();
    const client = state.app.databaseClient;
    const tasks  = state.tasks;

    if (reset) {
        const unsubscribe = client.onResetStore( () => { unsubscribe(); dispatch( actionFetch() ); } );
        client.resetStore(); //<--- Clear GraphQL cache
        return;
    }

    dispatch({type: ACTIONS.TASKS_FETCH});

    // --- Side effect:
    client
        .query({
            query:gql`
                {
                  tasks(
                    offset:${tasks.offset},
                    limit:${tasks.limit},
                    order:[
                      ${getOrderValueForQuery("name", tasks.order.name)}
                      ${getOrderValueForQuery("email", tasks.order.email)}
                      ${getOrderValueForQuery("status", tasks.order.status)}
                    ]
                  ) {
                    id,
                    name,
                    email,
                    text,
                    status
                  },
                  tasksTotal
                }
                        `
        })
        .then(result => {
            dispatch({type: ACTIONS.TASKS_FETCHED, payload: { list: result.data.tasks, totalCount: result.data.tasksTotal } });
        })
        .catch(error => {
            dispatch({type: ACTIONS.TASKS_ERROR, payload: error.toString()});
        });

};

/**
 * Async action.
 * Changes the start position and request the new list from server.
 *
 * @method actionChangeOffset
 * @async
 *
 * @param {int} offset  The new start position
 *
 * @return {Function}
 */
export const actionChangeOffset = offset => dispatch => {

    dispatch({ type: ACTIONS.TASKS_CHANGE_OFFSET, payload: offset });
    dispatch( actionFetch() );

};

/**
 * Async action.
 * Changes the order by statement and request the new list from server.
 *
 * @method actionChangeOrder
 * @async
 *
 * @param {string} name The field name to order
 *
 * @return {Function}
 */
export const actionChangeOrder = name => dispatch => {

    const state  = store.getState();
    dispatch({ type: ACTIONS.TASKS_CHANGE_ORDER, payload: { [name]: orderValueToggle( state.tasks.order[name] ) } });
    dispatch( actionFetch() );

};