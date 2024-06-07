import React from "react";

export default function NoDataAvailable() {
    return (
        <tr>
            <td
                colSpan={3}
                rowSpan={8}
                className="text-center"
                style={{
                    height: "300px",
                    paddingTop: "20%",
                }}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/no-data.svg`}
                    alt=""
                />

                <p className="mt-1 text-muted">No Data Available </p>
            </td>
        </tr>
    );
}
