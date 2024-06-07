import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { FiUserCheck } from "react-icons/fi";
import { useRouter } from "next/router";
import useStore, { IStore } from "@/common/zustand/store";

export default function LanguageMenu() {
    const [lang, setLang] = useState<Boolean>(false);
    const router = useRouter();

    const handleLang = () => {
        setLang(false);
    };

    const { storeData, setStoreData, setDataError } = useStore(
        (state: IStore) => ({
            storeData: state.data,
            setStoreData: state.setData,
            setDataError: state.setDataError,
        })
    );

    return (
        <li className="nav-item  me-2 me-xl-0">
            <span
                onClick={() => setLang(!lang)}
                className="nav-link link-pointer"
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/lang.png`}
                    alt=""
                />
            </span>
            <ul
                className={
                    lang
                        ? "dropdown-menu dropdown-menu-lang show"
                        : "dropdown-menu dropdown-menu-lang"
                }
                data-bs-popper={lang && "static"}
            >
                <li>
                    <Link
                        onClick={() => handleLang()}
                        className="dropdown-item"
                        href=""
                        locale="en"
                    >
                        <span className="align-middle">EN</span>
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => handleLang()}
                        className="dropdown-item"
                        href=""
                        locale="sw"
                    >
                        <span className="align-middle">SW</span>
                    </Link>
                </li>
            </ul>
        </li>
    );
}
