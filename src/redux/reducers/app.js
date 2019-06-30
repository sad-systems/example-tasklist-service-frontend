/**
 * Reducer for application global settings
 */

import {handleActions} from "redux-actions";

import ACTIONS from "../action-types";

export default handleActions({
    [ACTIONS.APP_SET_DATABASE_CLIENT]: (state, action) => {
        return {
            ...state,
            databaseClient: action.payload,
        };
    },
}, {/* Init values */});