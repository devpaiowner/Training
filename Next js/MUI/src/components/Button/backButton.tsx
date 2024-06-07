import Link from "next/link";
import React from "react";
interface Iprops {
  link?: string;
  class?: string;
  text: string;
  onClick?: any;
}

export default function BackButton(props: Iprops) {
  return (
    <Link
      href={props?.link ?? "/"}
      className={props?.class ?? "btn btn-white me-3"}
      onClick={props.onClick}
    >
      {props?.text}
    </Link>
  );
}
