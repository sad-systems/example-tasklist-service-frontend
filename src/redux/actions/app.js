/**
 * Actions to change application settings
 */

import ACTIONS from "../action-types";

/**
 * Setups a client to communicate with a database server
 *
 * @param {Object} client
 *
 * @return {{type: string, payload: *}}
 */
export const actionSetDatabaseClient = client => ({ type: ACTIONS.APP_SET_DATABASE_CLIENT, payload: client });