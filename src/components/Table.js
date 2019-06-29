/**
 * Table component
 */
import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Pagination from "./Pagination";

export default (props) => {

    const {
        offset  = 0,
        limit   = 3,
        isAdmin = false,
        onEdit,
    } = props;

    const initState = {
        currentOffset: offset,
        currentLimit:  limit,
        orderByName:   0,
        orderByEmail:  0,
        orderByStatus: 0,
    };
    const [ state, setState ]           = React.useState(initState);
    const [ totalCount, setTotalCount ] = React.useState(0);
    const [ tasks, setTasks ]           = React.useState([]);

    const changeState            = obj => setState({ ...state, ...obj });
    const handlePaginationChange = offset => { changeState({ currentOffset: offset }) };
    const handleEdit             = index  => { if (typeof onEdit === 'function') onEdit( tasks[index] ); };
    
    const getOrderValueForQuery = (fieldName, value) => {
        return value ? ( `{ field: ${fieldName}, direction: ${(value === 1 ? 'desc' : 'asc')} }, ` ) : '';
    };
    const orderValueToggle = value => { return ++value > 2 ? 0 : value; };
    const getOrderSymbol   = value => { return value ? ( value > 1 ? "▲" : "▼" ) : ""; };
    const handleOrderBy    = key   => event => changeState({ [key]: orderValueToggle(state[key]) });

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell><Button onClick={ handleOrderBy("orderByName") }>{getOrderSymbol(state.orderByName)} Name</Button></TableCell>
                        <TableCell><Button onClick={ handleOrderBy("orderByEmail") }>{getOrderSymbol(state.orderByEmail)} E-mail</Button></TableCell>
                        <TableCell>Text</TableCell>
                        <TableCell><Button onClick={ handleOrderBy("orderByStatus") }>{getOrderSymbol(state.orderByStatus)} Status</Button></TableCell>
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
            <Query
                query={gql`
                            {
                              tasks(
                                offset:${state.currentOffset},
                                limit:${state.currentLimit},
                                order:[
                                  ${getOrderValueForQuery("name", state.orderByName)}
                                  ${getOrderValueForQuery("email", state.orderByEmail)}
                                  ${getOrderValueForQuery("status", state.orderByStatus)}
                                ]
                              ) {
                                id,
                                name,
                                email,
                                text,
                                status
                              },
                              tasksTotal
                            }
                        `}
            >
                {({ loading, error, data }) => {
                    if (loading) return <LinearProgress/>;
                    if (error)   return <div>Error</div>;

                    setTotalCount(data.tasksTotal);
                    setTasks(data.tasks);
                    return null;
                }}
            </Query>
            <Pagination total={totalCount} limit={state.currentLimit} offset={state.currentOffset} onChange={ handlePaginationChange }/>
        </React.Fragment>
    );

}