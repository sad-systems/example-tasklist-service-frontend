/**
 * Table component
 */
import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Pagination from "./Pagination";

import { connect } from 'react-redux';
import { actionEditTask } from "../redux/actions/form";
import { actionChangeOrder, actionChangeOffset } from "../redux/actions/tasks";

const mapStateToProps = (state, ownProps) => ({
    isAdmin:    state.auth.isAdmin,
    inProgress: state.tasks.inProgress,
    error:      state.tasks.error,
    tasks:      state.tasks.list,
    order:      state.tasks.order,
    offset:     state.tasks.offset,
    limit:      state.tasks.limit,
    totalCount: state.tasks.totalCount,
});

const mapDispatchToProps = {
    actionEditTask,
    actionChangeOrder,
    actionChangeOffset,
};

export default connect (mapStateToProps, mapDispatchToProps) ( props => {

    const {
        isAdmin    = false,
        inProgress = false,
        error      = null,
        order      = {},
        tasks      = [],
        offset     = 0,
        limit      = 0,
        totalCount = 0,
    } = props;

    const handleEdit             = index  => props.actionEditTask(index);
    const handleOrderBy          = key    => event => props.actionChangeOrder(key);
    const handlePaginationChange = offset => props.actionChangeOffset(offset);
    const getOrderSymbol         = value  => value ? ( value > 1 ? "▲" : "▼" ) : "";

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell><Button onClick={ handleOrderBy("name") } >{getOrderSymbol(order.name)} Name</Button></TableCell>
                        <TableCell><Button onClick={ handleOrderBy("email") }>{getOrderSymbol(order.email)} E-mail</Button></TableCell>
                        <TableCell>Text</TableCell>
                        <TableCell><Button onClick={ handleOrderBy("status") }>{getOrderSymbol(order.status)} Status</Button></TableCell>
                        { isAdmin ? <TableCell>Action</TableCell> : null }
                    </TableRow>
                </TableHead>
                <TableBody>
                { tasks.map(({ id, name, email, text, status }, index) => (
                    <TableRow key={id}>
                        <TableCell scope="row">{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{text}</TableCell>
                        <TableCell>{status ? 'Done' : ''}</TableCell>
                        { isAdmin ? <TableCell><Button onClick={ () => { handleEdit(index) } } variant="contained" color="primary">Edit</Button></TableCell> : null }
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            { inProgress ? <LinearProgress/> : null }
            { error      ? <div>Error</div>  : null }
            <Pagination total={totalCount} limit={limit} offset={offset} onChange={ handlePaginationChange } />
        </React.Fragment>
    );

});