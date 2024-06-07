import React from "react";
import Pagination from "react-js-pagination";

interface Iprops {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed: number;
    handlePageChange: Function;
}

export default function PaginationComponent(props: Iprops) {
    return (
        <div className="d-flex justify-content-end mt-5">
            <Pagination
                activePage={props?.activePage}
                itemsCountPerPage={props?.itemsCountPerPage}
                totalItemsCount={props?.totalItemsCount}
                pageRangeDisplayed={props?.pageRangeDisplayed}
                itemClass="page-item"
                innerClass="pagination  justify-content-between"
                onChange={props?.handlePageChange}
                linkClass="page-link"
                itemClassFirst="page-item first"
                itemClassPrev="page-item prev"
                itemClassNext="page-item next"
                itemClassLast="page-item last"
                activeClass="page-item active"
                firstPageText="<<"
                prevPageText="<"
                lastPageText=">>"
                nextPageText=">"
            />
        </div>
    );
}
