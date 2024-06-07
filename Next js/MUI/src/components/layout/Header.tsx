import React from "react";
import { IoIosSearch } from "react-icons/io";
import InputForm from "../form/inputForm";
import SelectForm from "../form/selectForm";
interface Iprops {
    title?: any;
    filter?: boolean;
    search?: boolean;
    searchPlaceholder?: string;
    date?: boolean;
    datePlaceholder?: string;
    status?: boolean;
    statusPlaceholder?: string;
    searchButton?: boolean;
    downloadButton?: boolean;
    downloadCSV?: string;
    options?: any;
    handleSearch?: Function;
    handleDownload?: Function;
}

export default function Header(props: Iprops) {
    return (
        <>
            <div className="card-header mb-3">
                {props?.title}
                {props?.filter && (
                    <div className="head-search">
                        <form className="d-flex justify-content-between align-items-end">
                            <div className="d-flex head-search-left align-items-center">
                                {props?.search && (
                                    <div className="me-3">
                                        <div className="position-relative search-input">
                                            <span className="input_icon">
                                                <IoIosSearch
                                                    className={"ti ti-search"}
                                                />
                                            </span>
                                            <InputForm
                                                name="searchData"
                                                label="Search"
                                                placeHolder={
                                                    props?.searchPlaceholder
                                                }
                                            />
                                        </div>
                                    </div>
                                )}

                                {props?.date && (
                                    <div className="me-3">
                                        <div className="position-relative">
                                            <InputForm
                                                type="date"
                                                name="searchDate"
                                                class="form-control invoice-edit-input date-picker"
                                                placeHolder="DD/MM/YYYY"
                                                label="Due Date"
                                            />
                                        </div>
                                    </div>
                                )}
                                {props?.status && (
                                    <div className="me-3 w-25">
                                        <label>Status</label>

                                        <SelectForm
                                            name="searchStatus"
                                            options={props?.options}
                                            noneText="Status"
                                        />
                                    </div>
                                )}
                                {props?.searchButton && (
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-blue mb-0 mt-4"
                                            onClick={() => {
                                                props?.handleSearch();
                                            }}
                                        >
                                            Search
                                        </button>
                                    </div>
                                )}
                            </div>
                            {props?.downloadButton && (
                                <div
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title='downloads'
                                    className="icon_button head-search-right"
                                    onClick={() => {
                                        props.handleDownload();
                                    }}
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/download-pdf.png`}
                                        alt="add icon"
                                    />
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
