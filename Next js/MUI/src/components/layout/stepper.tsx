import React from "react";

export default function Stepper(props: { step: number }) {
    return (
        <>
            <ul className="border-steps d-flex justify-content-center">
                {new Array(10).fill(0).map((e, i) => {
                    return (
                        <li
                            key={i}
                            className={
                                props.step >= (i + 1) * 10 ? "active" : ""
                            }
                        >
                            {props.step == (i + 1) * 10 ? (
                                <span>{props.step}%</span>
                            ) : (
                                <>&nbsp;</>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
