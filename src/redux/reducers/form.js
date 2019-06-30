/**
 * Reducer to create/update the task
 */

import {handleActions} from "redux-actions";

import ACTIONS   from "../action-types";

export default handleActions({
    [ACTIONS.FORM_POPUP]: (state, action) => {
        return {
            ...state,
            isVisible: !!action.payload,
        };
    },
    [ACTIONS.FORM_FILL]: (state, action) => {
        return {
            ...state,
            data: { ...state.data, ...action.payload },
        };
    },
    [ACTIONS.FORM_SUBMIT]: (state, action) => {
        return {
            ...state,
            result:     null,
            inProgress: true,
            error:      null,
        };
    },
    [ACTIONS.FORM_SUBMITED]: (state, action) => {
        return {
            ...state,
            result:     action.payload,
            inProgress: false,
        };
    },
    [ACTIONS.FORM_ERROR]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            error:      action.payload
        };
    },
}, {/* Init values */});