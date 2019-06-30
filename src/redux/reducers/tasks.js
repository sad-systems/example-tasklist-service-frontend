/**
 * Reducer to manipulate the task list
 */

import {handleActions} from "redux-actions";

import ACTIONS from "../action-types";

export default handleActions({
    [ACTIONS.TASKS_FETCH]: (state, action) => {
        return {
            ...state,
            inProgress: true,
            error:      null,
        };
    },
    [ACTIONS.TASKS_FETCHED]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            list:       action.payload.list,
            totalCount: action.payload.totalCount,
        };
    },
    [ACTIONS.TASKS_ERROR]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            error:      action.payload
        };
    },
    [ACTIONS.TASKS_CHANGE_OFFSET]: (state, action) => {
        return {
            ...state,
            offset: action.payload,
        };
    },
    [ACTIONS.TASKS_CHANGE_ORDER]: (state, action) => {
        return {
            ...state,
            order: { ...state.order, ...action.payload },
        };
    },
}, {/* Init values */});