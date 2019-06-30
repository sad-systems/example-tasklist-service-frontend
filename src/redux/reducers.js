/**
 * Root block of reducers
 */

import app   from "./reducers/app";
import auth  from "./reducers/auth";
import tasks from "./reducers/tasks";
import form  from "./reducers/form";

export default {
    app:   app,
    auth:  auth,
    tasks: tasks,
    form:  form,
};