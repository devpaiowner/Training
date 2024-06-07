/* eslint-disable @next/next/no-img-element */
import React from "react";
import NavbarBanner from "@/components/layout/NavbarBanner";
export default function AppChat() {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* <SidebarMenu activeClass="dashboard" /> */}
                    <div className="layout-page">
                        <NavbarBanner />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="app-chat card overflow-hidden">
                                    <div className="row g-0">
                                        <div
                                            className="col app-chat-contacts app-sidebar flex-grow-0
          overflow-hidden border-end"
                                            id="app-chat-contacts"
                                        >
                                            <div className="sidebar-header">
                                                <div className="d-flex align-items-center me-3 me-lg-0">
                                                    <div
                                                        className="flex-shrink-0 avatar avatar-online me-3"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay="app-overlay-ex"
                                                        data-target="#app-chat-sidebar-left"
                                                    >
                                                        <img
                                                            className="user-avatar rounded-circle cursor-pointer"
                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                            alt="Avatar"
                                                        />
                                                    </div>
                                                    <div
                                                        className="flex-grow-1 input-group input-group-merge
                rounded-pill"
                                                    >
                                                        <span
                                                            className="input-group-text"
                                                            id="basic-addon-search31"
                                                        >
                                                            <i className="ti ti-search"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control chat-search-input"
                                                            placeholder="Search..."
                                                            aria-label="Search..."
                                                            aria-describedby="basic-addon-search31"
                                                        />
                                                    </div>
                                                </div>
                                                <i
                                                    className="ti ti-x cursor-pointer d-lg-none d-block
              position-absolute mt-2 me-1 top-0 end-0"
                                                    data-overlay
                                                    data-bs-toggle="sidebar"
                                                    data-target="#app-chat-contacts"
                                                ></i>
                                            </div>
                                            <hr className="container-m-nx m-0" />
                                            <div className="sidebar-body">
                                                <div className="chat-contact-list-item-title">
                                                    <h5 className="text-primary mb-0 px-4 pt-3 pb-2">
                                                        Chats
                                                    </h5>
                                                </div>
                                                <ul
                                                    className="list-unstyled chat-contact-list"
                                                    id="chat-list"
                                                >
                                                    <li
                                                        className="chat-contact-list-item chat-list-item-0
                d-none"
                                                    >
                                                        <h6 className="text-muted mb-0">
                                                            No Chats Found
                                                        </h6>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-online">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/13.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Waldemar
                                                                    Mannering
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Refer
                                                                    friends. Get
                                                                    rewards.
                                                                </p>
                                                            </div>
                                                            <small className="text-muted mb-auto">
                                                                5 Minutes
                                                            </small>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item active">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-offline">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Felecia
                                                                    Rower
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    I will
                                                                    purchase it
                                                                    for sure. 👍
                                                                </p>
                                                            </div>
                                                            <small className="text-muted mb-auto">
                                                                30 Minutes
                                                            </small>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-busy">
                                                                <span
                                                                    className="avatar-initial rounded-circle
                      bg-label-success"
                                                                >
                                                                    CM
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Calvin Moore
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    If it takes
                                                                    long you can
                                                                    mail inbox
                                                                    user
                                                                </p>
                                                            </div>
                                                            <small className="text-muted mb-auto">
                                                                1 Day
                                                            </small>
                                                        </a>
                                                    </li>
                                                </ul>

                                                <ul
                                                    className="list-unstyled chat-contact-list mb-0"
                                                    id="contact-list"
                                                >
                                                    <li
                                                        className="chat-contact-list-item
                chat-contact-list-item-title"
                                                    >
                                                        <h5 className="text-primary mb-0">
                                                            Contacts
                                                        </h5>
                                                    </li>
                                                    <li
                                                        className="chat-contact-list-item contact-list-item-0
                d-none"
                                                    >
                                                        <h6 className="text-muted mb-0">
                                                            No Contacts Found
                                                        </h6>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-offline">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/4.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Natalie
                                                                    Maxwell
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    UI/UX
                                                                    Designer
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-busy">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/5.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Jess Cook
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Business
                                                                    Analyst
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span
                                                                    className="avatar-initial rounded-circle
                      bg-label-primary"
                                                                >
                                                                    LM
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Louie Mason
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Resource
                                                                    Manager
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-busy">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/7.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Krystal
                                                                    Norton
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Business
                                                                    Executive
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-offline">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/8.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Stacy
                                                                    Garrison
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Marketing
                                                                    Ninja
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span
                                                                    className="avatar-initial rounded-circle
                      bg-label-success"
                                                                >
                                                                    CM
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Calvin Moore
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    UX Engineer
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-busy">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/10.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Mary Giles
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Account
                                                                    Department
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-offline">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/13.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Waldemar
                                                                    Mannering
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    AWS Support
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span
                                                                    className="avatar-initial rounded-circle
                      bg-label-danger"
                                                                >
                                                                    AJ
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Amy Johnson
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Frontend
                                                                    Developer
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-offline">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    Felecia
                                                                    Rower
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Cloud
                                                                    Engineer
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-busy">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/11.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="chat-contact-name text-truncate m-0">
                                                                    William
                                                                    Stephens
                                                                </h6>
                                                                <p
                                                                    className="chat-contact-status text-muted
                      text-truncate mb-0"
                                                                >
                                                                    Backend
                                                                    Developer
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col app-chat-history bg-body">
                                            <div className="chat-history-wrapper">
                                                <div className="chat-history-header border-bottom">
                                                    <div
                                                        className="d-flex justify-content-between
                align-items-center"
                                                    >
                                                        <div
                                                            className="d-flex overflow-hidden
                  align-items-center"
                                                        >
                                                            <i
                                                                className="ti ti-menu-2 ti-sm cursor-pointer d-lg-none
                    d-block me-2"
                                                                data-bs-toggle="sidebar"
                                                                data-overlay
                                                                data-target="#app-chat-contacts"
                                                            ></i>
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                    data-bs-toggle="sidebar"
                                                                    data-overlay
                                                                    data-target="#app-chat-sidebar-right"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 className="m-0">
                                                                    Felecia
                                                                    Rower
                                                                </h6>
                                                                <small className="user-status text-muted">
                                                                    NextJS
                                                                    developer
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <i
                                                                className="ti ti-phone-call cursor-pointer d-sm-block
                    d-none me-3"
                                                            ></i>
                                                            <i
                                                                className="ti ti-video cursor-pointer d-sm-block
                    d-none me-3"
                                                            ></i>
                                                            <i
                                                                className="ti ti-search cursor-pointer d-sm-block
                    d-none me-3"
                                                            ></i>
                                                            <div className="dropdown">
                                                                <i
                                                                    className="ti ti-dots-vertical cursor-pointer"
                                                                    id="chat-header-actions"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                ></i>
                                                                <div
                                                                    className="dropdown-menu dropdown-menu-end"
                                                                    aria-labelledby="chat-header-actions"
                                                                >
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                    >
                                                                        View
                                                                        Contact
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                    >
                                                                        Mute
                                                                        Notifications
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                    >
                                                                        Block
                                                                        Contact
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                    >
                                                                        Clear
                                                                        Chat
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                    >
                                                                        Report
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-history-body bg-body">
                                                    <ul className="list-unstyled chat-history">
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            How
                                                                            can
                                                                            we
                                                                            help?
                                                                            We
                                                                            are
                                                                            here
                                                                            for
                                                                            you!
                                                                            😄
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i
                                                                            className="ti ti-checks ti-xs me-1
                          text-success"
                                                                        ></i>
                                                                        <small>
                                                                            10:00
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Hey
                                                                            John,
                                                                            I am
                                                                            looking
                                                                            for
                                                                            the
                                                                            best
                                                                            admin
                                                                            template.
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            Could
                                                                            you
                                                                            please
                                                                            help
                                                                            me
                                                                            to
                                                                            find
                                                                            it
                                                                            out?
                                                                            🤔
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            It
                                                                            should
                                                                            be
                                                                            Bootstrap
                                                                            5
                                                                            compatible.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>
                                                                            10:02
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Vuexy
                                                                            has
                                                                            all
                                                                            the
                                                                            components
                                                                            you
                                                                            all
                                                                            ever
                                                                            need
                                                                            in a
                                                                            app.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i
                                                                            className="ti ti-checks ti-xs me-1
                          text-success"
                                                                        ></i>
                                                                        <small>
                                                                            10:03
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Looks
                                                                            clean
                                                                            and
                                                                            fresh
                                                                            UI.
                                                                            😃
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            It
                                                                            is
                                                                            perfect
                                                                            for
                                                                            my
                                                                            next
                                                                            project.
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            How
                                                                            can
                                                                            I
                                                                            purchase
                                                                            it?
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>
                                                                            10:05
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Thanks,
                                                                            you
                                                                            can
                                                                            purchase
                                                                            it.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i
                                                                            className="ti ti-checks ti-xs me-1
                          text-success"
                                                                        ></i>
                                                                        <small>
                                                                            10:06
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            I
                                                                            will
                                                                            purchase
                                                                            it
                                                                            for
                                                                            sure.
                                                                            👍
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            Thanks.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>
                                                                            10:08
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Great,
                                                                            Feel
                                                                            free
                                                                            to
                                                                            get
                                                                            in
                                                                            touch.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i
                                                                            className="ti ti-checks ti-xs me-1
                          text-success"
                                                                        ></i>
                                                                        <small>
                                                                            10:10
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Do
                                                                            you
                                                                            have
                                                                            design
                                                                            files
                                                                            for
                                                                            Vuexy?
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>
                                                                            10:15
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div
                                                                    className="chat-message-wrapper flex-grow-1
                      w-50"
                                                                >
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Yes
                                                                            that
                                                                            is
                                                                            correct
                                                                            documentation
                                                                            file,
                                                                            Design
                                                                            files
                                                                            are
                                                                            included
                                                                            with
                                                                            the
                                                                            template.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="ti ti-checks ti-xs me-1"></i>
                                                                        <small>
                                                                            10:15
                                                                            AM
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-3">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/1.png`}
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="chat-history-footer shadow-sm">
                                                    <form
                                                        className="form-send-message d-flex
                justify-content-between align-items-center"
                                                    >
                                                        <input
                                                            className="form-control message-input border-0 me-3
                  shadow-none"
                                                            placeholder="Type your message here"
                                                        />
                                                        <div
                                                            className="message-actions d-flex
                  align-items-center"
                                                        >
                                                            <i
                                                                className="speech-to-text ti ti-microphone ti-sm
                    cursor-pointer"
                                                            ></i>
                                                            <label
                                                                htmlFor="attach-doc"
                                                                className="form-label mb-0"
                                                            >
                                                                <i className="ti ti-photo ti-sm cursor-pointer mx-3"></i>
                                                                <input
                                                                    type="file"
                                                                    id="attach-doc"
                                                                    hidden
                                                                />
                                                            </label>
                                                            <button className="btn btn-primary d-flex send-msg-btn">
                                                                <i className="ti ti-send me-md-1 me-0"></i>
                                                                <span
                                                                    className="align-middle d-md-inline-block
                      d-none"
                                                                >
                                                                    Send{" "}
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="col app-chat-sidebar-right app-sidebar
          overflow-hidden"
                                            id="app-chat-sidebar-right"
                                        >
                                            <div
                                                className="sidebar-header d-flex flex-column
            justify-content-center align-items-center flex-wrap px-4
            pt-5"
                                            >
                                                <div className="avatar avatar-xl avatar-online">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/avatars/2.png`}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <h6 className="mt-2 mb-0">
                                                    Felecia Rower
                                                </h6>
                                                <span>NextJS Developer</span>
                                                <i
                                                    className="ti ti-x ti-sm cursor-pointer close-sidebar
              d-block"
                                                    data-bs-toggle="sidebar"
                                                    data-overlay
                                                    data-target="#app-chat-sidebar-right"
                                                ></i>
                                            </div>
                                            <div className="sidebar-body px-4 pb-4">
                                                <div className="my-4">
                                                    <p className="text-muted text-uppercase">
                                                        About
                                                    </p>
                                                    <p className="mb-0 mt-3">
                                                        A Next. js developer is
                                                        a software developer who
                                                        uses the Next. js
                                                        framework alongside
                                                        ReactJS to build web
                                                        applications.
                                                    </p>
                                                </div>
                                                <div className="my-4">
                                                    <p className="text-muted text-uppercase">
                                                        Personal Information
                                                    </p>
                                                    <ul className="list-unstyled d-grid gap-2 mt-3">
                                                        <li className="d-flex align-items-center">
                                                            <i className="ti ti-mail"></i>
                                                            <span className="align-middle ms-2">
                                                                josephGreen@email.com
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center">
                                                            <i className="ti ti-phone-call"></i>
                                                            <span className="align-middle ms-2">
                                                                +1(123) 456 -
                                                                7890
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center">
                                                            <i className="ti ti-clock"></i>
                                                            <span className="align-middle ms-2">
                                                                Mon - Fri 10AM -
                                                                8PM
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-muted text-uppercase">
                                                        Options
                                                    </p>
                                                    <ul className="list-unstyled d-grid gap-2 mt-3">
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="ti ti-badge"></i>
                                                            <span className="align-middle ms-2">
                                                                Add Tag
                                                            </span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="ti ti-star"></i>
                                                            <span className="align-middle ms-2">
                                                                Important
                                                                Contact
                                                            </span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="ti ti-photo"></i>
                                                            <span className="align-middle ms-2">
                                                                Shared Media
                                                            </span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="ti ti-trash"></i>
                                                            <span className="align-middle ms-2">
                                                                Delete Contact
                                                            </span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="ti ti-ban"></i>
                                                            <span className="align-middle ms-2">
                                                                Block Contact
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="app-overlay"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div>

                <div className="layout-overlay layout-menu-toggle"></div>

                <div className="drag-target"></div>
            </div>
        </>
    );
}
