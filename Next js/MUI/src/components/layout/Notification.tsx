import React, { useState } from "react";
import Link from "next/link";

import useStore, { IStore } from "@/common/zustand/store";

export default function Notification() {
    const [notification, setNotification] = useState<Boolean>(false);
    const { storeData, setStoreData, setDataError, setNewError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
            setNewError: state.setNewError,
        })
    );
    return (
        <li
            className="nav-item dropdown-notifications
navbar-dropdown dropdown me-3 me-xl-1"
        >
            <Link
                className="nav-link dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                onClick={() => setNotification(!notification)}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/notificationbell.png`}
                    alt=""
                />
                <span className="badge bg-danger rounded-pill badge-notifications">
                    {storeData?.notificationList?.length ?? 0}
                </span>
            </Link>
            {storeData?.notificationList?.length > 0 && (
                <ul
                    className={
                        notification
                            ? "dropdown-menu dropdown-menu-end py-0 show"
                            : "dropdown-menu dropdown-menu-end py-0"
                    }
                    data-bs-popper={notification && "static"}
                >
                    {storeData?.notificationList?.length > 0 &&
                        storeData?.notificationList?.map((item, index) => {
                            return (
                                <>
                                    {" "}
                                    <li
                                        className="dropdown-menu-header
                  border-bottom"
                                    >
                                        <div
                                            className="dropdown-header d-flex
                    align-items-center py-3"
                                        >
                                            <h5
                                                className="text-body mb-0
                      me-auto"
                                            >
                                                Notification
                                            </h5>
                                            <Link
                                                href="#"
                                                className="dropdown-notifications-all
                      text-body"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Mark all as read"
                                            >
                                                <i
                                                    className="ti ti-mail-opened
                        fs-4"
                                                ></i>
                                            </Link>
                                        </div>
                                    </li>
                                    <li
                                        className="dropdown-notifications-list
                  scrollable-container"
                                        style={{ overflow: "auto" }}
                                    >
                                        <ul
                                            className="list-group
                    list-group-flush"
                                        >
                                            <li
                                                className="list-group-item
                      list-group-item-action
                      dropdown-notifications-item
                      marked-as-read"
                                            >
                                                <div className="d-flex">
                                                    <div
                                                        className="flex-shrink-0
                          me-3"
                                                    >
                                                        <div className="avatar">
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/5.png`}
                                                                className="h-auto
                              rounded-circle"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">
                                                            {item?.subject}
                                                        </h6>
                                                        <p className="mb-0">
                                                            {item?.body}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>{" "}
                                </>
                            );
                        })}

                    <li
                        className="dropdown-menu-footer
    border-top"
                    >
                        <Link
                            href="/notification"
                            className="btn btn-blue w-100"
                        >
                            Read All Notification
                        </Link>
                    </li>
                </ul>
            )}
        </li>
    );
}
