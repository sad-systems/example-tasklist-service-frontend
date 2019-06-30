/**
 * Initial redux object
 */
export default {
    app: {
        databaseClient: null,
    },
    auth: {
        token:      "",
        isAdmin:    false,
        inProgress: false,
        error:      null,
    },
    tasks: {
        totalCount: 0,
        list:       [],
        offset:     0,
        limit:      3,
        order: {
            name:   0, // 0 - none, 1 - DESC, 2 - ASC
            email:  0,
            status: 0,
        },
        inProgress: false,
        error:      null,
    },
    form: {
        data: {
            id:     null,
            name:   "",
            email:  "",
            text:   "",
            status: false,
        },
        isVisible:  false,
        result:     null,
        inProgress: false,
        error:      null,
    },
};