import React, { useEffect } from "react";
import MicroLineOfCredit from "./microLineOfCredit";
import RevolvingLineOfCredit from "./revolvingLineOfCredit";
interface Iprops {
    micro: boolean;
    setMicro: any;
    revolving: boolean;
    setRevolving: any;
}

export default function SelectMircroRevolving(props: Iprops) {
    const handleChange = (val: string) => {
        if (val === "micro") {
            props?.setMicro(true);
            props?.setRevolving(false);
        } else if (val === "revolving") {
            props?.setMicro(false);
            props?.setRevolving(true);
        }
    };
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center choose-credit">
                <div className="credit">
                    <input
                        type="radio"
                        name="credit-opt"
                        checked={props?.micro}
                        onClick={() => {
                            handleChange("micro");
                        }}
                    />
                    <span className="icon-less-credit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                    </span>
                    <p className="mt-3 mb-0">Less Than TZS 10 M</p>
                </div>
                <div className="credit">
                    <input
                        type="radio"
                        name="credit-opt"
                        checked={props?.revolving}
                        onClick={() => {
                            handleChange("revolving");
                        }}
                    />
                    <span className="icon-more-credit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                        <span className="path6"></span>
                        <span className="path7"></span>
                    </span>
                    <p className="mt-3 mb-0">More Than TZS 10 M</p>
                </div>
            </div>
            {props?.micro && <MicroLineOfCredit />}
            {props?.revolving && <RevolvingLineOfCredit />}
        </>
    );
}
