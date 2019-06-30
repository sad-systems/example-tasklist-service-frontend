/**
 * Action block component
 */
import React from "react";

import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container/Container";

import { connect } from 'react-redux';
import {actionNewTask} from "../redux/actions/form";

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
    actionNewTask
};

export default connect (mapStateToProps, mapDispatchToProps) ( props => (
    <Container align="right">
        <Button  variant="contained" color="primary" onClick={ () => props.actionNewTask() }>New task</Button>
    </Container>
));
