/**
 * Table component
 */
import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Pagination from "./Pagination";

export default (props) => {

    const {
        offset  = 0,
        limit   = 3,
        isAdmin = false,
        onEdit,
    } = props;

    const [currentOffset, setCurrentOffset] = React.useState(offset);
    const [currentLimit, setCurrentLimit]   = React.useState(limit);
    const [totalCount, setTotalCount]       = React.useState(0);
    const [orderByName, setOrderByName]     = React.useState(0);
    const [orderByEmail, setOrderByEmail]   = React.useState(0);
    const [orderByStatus, setOrderByStatus] = React.useState(0);
    const [tasks, setTasks]                 = React.useState([]);

    const handlePaginationChange = offset => { setCurrentOffset(offset) };
    const handleEdit             = index  => { if (typeof onEdit === 'function') onEdit( tasks[index] ); };
    
    const getOrderValueForQuery = (fieldName, value) => {
        return value ? ( `{ field: ${fieldName}, direction: ${(value === 1 ? 'desc' : 'asc')} }, ` ) : '';
    };
    const orderValueToggle    = value => { return ++value > 2 ? 0 : value; };
    const getOrderSymbol      = value => { return value ? ( value > 1 ? "▲" : "▼" ) : ""; };
    const handleOrderByName   = () => { setOrderByName( orderValueToggle(orderByName) ) };
    const handleOrderByEmail  = () => { setOrderByEmail( orderValueToggle(orderByEmail) ) };
    const handleOrderByStatus = () => { setOrderByStatus( orderValueToggle(orderByStatus) ) };

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col"><button className="btn btn-secobdary" onClick={handleOrderByName}>{getOrderSymbol(orderByName)} Name</button></th>
                        <th scope="col"><button className="btn btn-secobdary" onClick={handleOrderByEmail}>{getOrderSymbol(orderByEmail)} E-mail</button></th>
                        <th scope="col">Text</th>
                        <th scope="col"><button className="btn btn-secobdary" onClick={handleOrderByStatus}>{getOrderSymbol(orderByStatus)} Status</button></th>
                        { isAdmin ? <th scope="col">Action</th> : null }
                    </tr>
                </thead>
                <tbody>
                { tasks.map(({ id, name, email, text, status }, index) => (
                    <tr key={id}>
                        <th scope="row">{id}</th>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{text}</td>
                        <td>{status ? 'Done' : ''}</td>
                        { isAdmin ? <td><button className="btn btn-secobdary" onClick={ () => { handleEdit(index) } }>Edit</button></td> : null }
                    </tr>
                ))} 
                </tbody>
            </table>
            <Query
                query={gql`
                            {
                              tasks(
                                offset:${currentOffset},
                                limit:${currentLimit},
                                order:[
                                  ${getOrderValueForQuery("name", orderByName)}
                                  ${getOrderValueForQuery("email", orderByEmail)}
                                  ${getOrderValueForQuery("status", orderByStatus)}
                                ]
                              ) {
                                id,
                                name,
                                email,
                                text,
                                status
                              },
                              tasks_total
                            }
                        `}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error)   return <div>Error</div>;

                    setTotalCount(data.tasks_total);
                    setTasks(data.tasks);
                    return null;
                }}
            </Query>
            <Pagination total={totalCount} limit={currentLimit} offset={currentOffset} onChange={handlePaginationChange}/>
        </React.Fragment>
    );

}