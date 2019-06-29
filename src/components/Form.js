/**
 * Form component
 */
import React from "react";

import { ApolloContext } from "react-apollo";
import { gql } from "apollo-boost";

export default (props) => {

    const {
        isAdmin = false,
        token = '',
        task = {},
        onSubmited,
    } = props;

    const [ inProgress, setInProgress ] = React.useState(false);
    const form   = React.createRef();
    const name   = React.createRef();
    const email  = React.createRef();
    const text   = React.createRef();
    const status = React.createRef();

    const effect = React.useEffect(function () {
        name.current.value  = task.name  || '';
        email.current.value = task.email || '';
        text.current.value  = task.text  || '';
        if (status.current) status.current.checked = !!task.status;
    }, [task]);
    
    const catchError = error => {
        setInProgress(false);
        alert("* ERROR! " + error.toString());
    };

    const client = (React.useContext(ApolloContext)).client;
    const createNewTask  = event => {
        event.preventDefault();
        setInProgress(true);
        client
            .mutate({
                mutation: gql`
                  mutation (
                    $text:  String!,
                    $email: Email!,
                    $name:  String,
                  )
                  {
                    taskNew(text: $text, email: $email, name: $name)
                  }`,
                variables: {
                    text:  text.current.value,
                    email: email.current.value,
                    name:  name.current.value,
                }
            })
            .then(result => {
                const newId = result.data.task_new;
                if (typeof onSubmited === "function") onSubmited(newId);
                setInProgress(false);
            })
            .catch( catchError );
    };

    const saveExistedTask  = event => {
        event.preventDefault();
        setInProgress(true);
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
                    text:   text.current.value,
                    status: status.current ? !!status.current.checked : false,
                }
            })
            .then(result => {
                const isChanged = result.data.task_edit;
                if (isChanged && typeof onSubmited === "function") onSubmited(task.id);
                setInProgress(false);
            })
            .catch( catchError );
    };

    return (
        <div className="card-body bg-light">
            <form ref={form} align="left">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlInput1">Your name</label>
                    <div className="col-sm-10">
                        <input ref={name} disabled={inProgress || task.id} type="text" className="form-control"
                           placeholder="Your name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlInput1">Email address</label>
                    <div className="col-sm-10">
                        <input ref={email} disabled={inProgress || task.id} type="email" className="form-control"
                           placeholder="name@example.com"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlTextarea1">Text</label>
                    <div className="col-sm-10">
                        <textarea ref={text} disabled={inProgress} className="form-control" rows="3"></textarea>
                    </div>
                </div>
                {isAdmin ?
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="exampleFormControlInput1">Status</label>
                        <div className="col-sm-10">
                            <div className="form-group form-check" align="left">
                                <input ref={status} disabled={inProgress} type="checkbox" className="form-check-input"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Done</label>
                            </div>
                        </div>
                    </div>
                : null }

                { !task.id ?
                    <button className="btn btn-primary" onClick={ createNewTask }>Create</button>
                    :
                    <button className="btn btn-warning" onClick={ saveExistedTask }>Commit</button>
                }

            </form>
        </div>
    );

}