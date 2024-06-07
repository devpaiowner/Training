import Link from "next/link";
import React from "react";
interface Iprops {
    text?: string;
    link?: string;
}
export default function EmptyScreen(props: Iprops) {
    return (
        <tr>
            <td
                rowSpan={10}
                colSpan={10}
                className="empty_inventory_td text-center"
            >
                <Link href={props?.link ?? "/"}>
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/empty-logo.svg`}
                        alt=""
                    />
                </Link>
                <p className="mt-3">
                    {props?.text}
                </p>
            </td>
        </tr>
    );
}
