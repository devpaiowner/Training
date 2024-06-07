import React from "react";

interface Iprops{
    name?:string,
    handleChange?:string,
    spanItem:number
}

export default function RadiomicroForm() {
    return (
        <div className="credit">
            <input
                type="radio"
                name="credit-opt"
                // checked={props?.micro}
                // onClick={() => {
                //     handleChange("micro");
                // }}
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
    );
}
