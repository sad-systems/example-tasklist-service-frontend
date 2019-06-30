/**
 * Reducer to authenticate
 */

import {handleActions} from "redux-actions";

import ACTIONS from "../action-types";

export default handleActions({
    [ACTIONS.AUTH_LOGIN]: (state, action) => {
        return {
            ...state,
            inProgress: true,
            error:      null,
        };
    },
    [ACTIONS.AUTH_SUCCESS]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            token:      action.payload.token,
            isAdmin:  !!action.payload.token,
        };
    },
    [ACTIONS.AUTH_ERROR]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            token:      null,
            isAdmin:    false,
            error:      action.payload
        };
    },
}, {/* Init values */});