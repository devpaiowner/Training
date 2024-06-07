import React, { Fragment } from "react";

interface IProps {
  title?: any;
  subtitle?: any;
}

export default function CreditStatus(props: IProps) {
  const { title, subtitle } = props;
  const num = new Intl.NumberFormat("en-US");
  return (
    <Fragment>
      <div className="credit-amount mb-2">
        <p className="amount-head">{title?.name}</p>
        <p className="amount-value">TZS {num.format(title?.value || 0)}</p>
      </div>
      <div className="noofapplication">
        <p className="application-head">{subtitle?.name}</p>
        <p className="application-count">{num.format(subtitle?.value)}</p>
      </div>
    </Fragment>
  );
}
