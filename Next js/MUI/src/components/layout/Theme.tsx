"use client";
import { TbMoonStars, TbSunFilled } from "react-icons/tb";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

const Theme = () => {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        setTheme(Cookie.get("theme") === "dark");
    }, []);

    return (
        <>
            <span className="nav-link style-switcher-toggle hide-arrow">
                {theme ? <TbSunFilled size={24} /> : <TbMoonStars size={24} />}
            </span>
        </>
    );
};

export default Theme;
