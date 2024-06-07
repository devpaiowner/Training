import Link from "next/link";
import React from "react";

export default function GiveCredApply() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="card-title text-black mb-2">Credit Request Summary</h5>
      <p>
        <Link href="/credit-request" className="btn btn-white brdr-ylow ms-2">
          View More
        </Link>
      </p>
    </div>
  );
}
