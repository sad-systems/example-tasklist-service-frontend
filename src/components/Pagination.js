/**
 * Pagination component
 */
import React from "react";

export default (props) => {

    const { total, limit, offset, onChange } = props;

    const pageCount   = limit > 0 ? Math.ceil( total  / limit ) || 1 : 1;
    const currentPage = limit > 0 ? Math.ceil( (offset + 1) / limit ) || 1 : 1;
    let   pages = [];
    for (let i=1; i <= pageCount; i++) pages.push(i);

    const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;
    const prevPage = currentPage > 1         ? currentPage - 1 : currentPage;

    const handleClick = (page) => {
        const offset = (page - 1) * limit;
        if (typeof onChange === "function") onChange(offset);
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" aria-label="Previous" onClick={ () => handleClick(prevPage) }>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                </li>
                {
                    pages.map((number) =>
                        <li key={number} className={"page-item " + (number === currentPage ? "active" : "")}>
                            <button className="page-link" href="#" onClick={ () => handleClick(number) }>{number}</button>
                        </li>)
                }
                <li className="page-item">
                    <button className="page-link" href="#" aria-label="Next" onClick={ () => handleClick(nextPage) }>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );

}