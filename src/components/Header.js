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

import { connect } from 'react-redux';
import { actionLogin } from "../redux/actions/auth";

const mapStateToProps = (state, ownProps) => ({
    inProgress: state.auth.inProgress,
    isAdmin:    state.auth.isAdmin,
    error:      state.auth.error,
});

const mapDispatchToProps = {
    actionLogin
};

export default connect (mapStateToProps, mapDispatchToProps) ( props => {

    const { isAdmin, inProgress } = props;
    const initState               = { user: "", pass: "" };
    const [ state, setState ]     = React.useState(initState);

    const handleChange = name => event => setState({ ...state, [name]: event.target.value });
    const login        = ()   => { props.actionLogin(state.user, state.pass); };
    React.useEffect( () => { if (!inProgress) setState(initState); }, [inProgress] ); // <--- Reset form on finished

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
                        disabled={inProgress}
                        value={state.user}
                        onChange={ handleChange("user") }
                        className={classes.textField}
                    />
                    <TextField
                        label="Password"
                        margin="dense"
                        variant="outlined"
                        type="password"
                        disabled={inProgress}
                        value={state.pass}
                        onChange={ handleChange("pass") }
                        className={classes.textField}
                    />
                    <Button disabled={inProgress} onClick={ login } variant="contained" color="primary">Sign in</Button>
                </form>
            </Toolbar>
        </AppBar>
    );

});