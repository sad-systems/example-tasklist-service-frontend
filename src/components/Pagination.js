/**
 * Pagination component
 *
 * @class Pagination
 * @namespace components
 */
import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default (props) => {

    const {
        /**
         * Pagination items total count
         *
         * @property total
         * @type     int
         * @default  0
         */
        total,

        /**
         * Pagination items per page limit
         *
         * @property limit
         * @type     int
         * @default  0
         */
        limit,

        /**
         * Pagination items offset value
         *
         * @property offset
         * @type     int
         * @default  0
         */
        offset,

        /**
         * Callback on pagination offset is changed
         *
         * @property onChange
         * @type function (offset: int)
         */
        onChange
    } = props;

    const pageCount   = limit > 0 ? Math.ceil( total  / limit ) || 1 : 1;
    const currentPage = limit > 0 ? Math.ceil( (offset + 1) / limit ) || 1 : 1;
    let   pages = [];
    for (let i=1; i <= pageCount; i++) pages.push(i);

    const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;
    const prevPage = currentPage > 1         ? currentPage - 1 : currentPage;

    const handleClick = page => event => {
        const offset = (page - 1) * limit;
        if (typeof onChange === "function") onChange(offset);
    };

    const classes = makeStyles(theme => ({
        pagination: {
            display: "block",
            padding: 0,
            "& > li": {
                display: "inline",
            },
        },
    }))();

    return (
        <Container>
        <ul className={classes.pagination}>
            <li>
                <Button variant="contained" aria-label="Previous" onClick={ handleClick(prevPage) }>
                    &laquo;
                </Button>
            </li>
            {
                pages.map((number) =>
                    <li key={number}>
                        <Button { ...(number === currentPage ? { color: "primary", variant: "contained" } : null) } onClick={ handleClick(number) }>{number}</Button>
                    </li>)
            }
            <li>
                <Button variant="contained" aria-label="Next" onClick={ handleClick(nextPage) }>
                    &raquo;
                </Button>
            </li>
        </ul>
        </Container>
    );

}