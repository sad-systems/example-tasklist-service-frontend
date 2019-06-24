/**
 * Header component
 */
import React from "react";
import IconPerson from "../icons/IconPerson";

import { ApolloContext } from "react-apollo";
import { gql } from "apollo-boost";

export default (props) => {

    const { onLogin, isAdmin } = props;
    const [ inProgress, setInProgress ] = React.useState(false);
    const user = React.createRef();
    const pass = React.createRef();
    const form = React.createRef();

    const client = (React.useContext(ApolloContext)).client;
    const login  = () => {
        const sourceForm = form.current;
        setInProgress(true);
        client
            .query({
                query: gql`
                  {
                     access(user:"${user.current.value}" pass:"${pass.current.value}")
                  }`
            })
            .then(result => {
                setInProgress(false);
                sourceForm.reset();
                if (typeof onLogin === "function") onLogin(result.data.access);
            });
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand">Task list</span>
            <form ref={form} className="form-inline">
                <IconPerson fill={ isAdmin ? "#0a0" : "inherit" } style={{margin: "0.5em"}}/>
                <input ref={user} disabled={inProgress} className="form-control mr-sm-2" type="text" placeholder="User" aria-label="User"/>
                <input ref={pass} disabled={inProgress} className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password"/>
                    <button disabled={inProgress} className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={ login }>Sign in</button>
            </form>
        </nav>
    );

}