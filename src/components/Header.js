/**
 * Header component
 */
import React from "react";
import IconPerson from "../icons/IconPerson";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ApolloContext } from "react-apollo";
import { gql } from "apollo-boost";

export default (props) => {

    const { onLogin, isAdmin } = props;
    const client    = (React.useContext(ApolloContext)).client;
    const initState = {
        user: "",
        pass: "",
        inProgress: false
    };
    const [ state, setState ] = React.useState(initState);

    const changeState  = obj  => setState({ ...state, ...obj });
    const handleChange = name => event => setState({ ...state, [name]: event.target.value });
    const login        = ()   => {
        changeState({inProgress:true});
        client
            .query({
                query: gql`
                  {
                     access(user:"${state.user}" pass:"${state.pass}")
                  }`
            })
            .then(result => {
                setState(initState);
                if (typeof onLogin === "function") onLogin(result.data.access);
            })
            .catch(error => {
                setState(initState);
                alert("* ERROR! " + error.toString());
            });
    };

    const classes = makeStyles(theme => ({
        container: {
            display:    "flex",
            alignItems: "center",
            width:      "100%",
        },
        title: {
            flexGrow:  1,
            textAlign: "left",
        },
        textField: {
            marginLeft:  theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }))();

    return (
        <AppBar position="relative">
            <Toolbar>
                <form className={classes.container}>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Task list
                    </Typography>
                    <IconPerson fill={ isAdmin ? "#0f0" : "inherit" }/>
                    <TextField
                        label="User"
                        margin="dense"
                        variant="outlined"
                        disabled={state.inProgress}
                        value={state.user}
                        onChange={ handleChange("user") }
                        className={classes.textField}
                    />
                    <TextField
                        label="Password"
                        margin="dense"
                        variant="outlined"
                        type="password"
                        disabled={state.inProgress}
                        value={state.pass}
                        onChange={ handleChange("pass") }
                        className={classes.textField}
                    />
                    <Button disabled={state.inProgress} onClick={ login } variant="contained" color="primary">Sign in</Button>
                </form>
            </Toolbar>
        </AppBar>
    );

}