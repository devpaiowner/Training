import React from "react";

import MoneyInput from "@/components/form/MoneyInput";
import moment from "moment";
import Link from "next/link";
import NoDataAvailable from "./noDataAvailable";
import { useTranslation } from "react-i18next";

interface IProps {
  upcomingPaymentList: any;
}
export default function UpComingPayment(props: IProps) {
  const { t } = useTranslation("common");
  return (
    <aside className="Upcoming-side mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="card-title text-black mb-2">{t("upcoming_payments")}</h5>
        {props?.upcomingPaymentList?.length > 0 && (
          <Link href="/loan-application" className="btn btn-white">
            {t("view_more")}
          </Link>
        )}
      </div>
      <div className="table-responsive upcom-table">
        <table className="table">
          <tbody>
            {props?.upcomingPaymentList?.length > 0 ? (
              props?.upcomingPaymentList?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "40px" }}>
                      <Link
                        href={`/loan-application/${item.application_id}/add-payment/`}
                        className="d-flex align-items-center"
                      >
                        <span className="icon-right-up_arrow ti-lg me-3">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </span>
                      </Link>
                    </td>
                    <td style={{ width: "40%" }}>
                      <p>
                        {/* <small> */}
                        {item?.application_number}
                        {/* </small> */}
                        <Link
                          href={`/loan-application/${item.application_id}/add-payment/`}
                          className="d-flex align-items-center"
                        >
                          {item?.loan_application?.application_type === "micro"
                            ? t("micro_line_of_credit")
                            : t("revolving_line_of_credit")}
                        </Link>
                      </p>
                    </td>
                    <td style={{ width: "30%" }}>
                      <p className="ms-auto">
                        <small>
                          {t("amount_payable")}</small>
                        <MoneyInput data={Number(item?.amount).toFixed(2)} />
                      </p>
                    </td>
                    <td style={{ width: "30%" }}>
                      {" "}
                      <p className="ms-auto">
                        <small>{t("date")}</small>
                        {moment(item?.due_date).format("DD/MM/YYYY")}
                      </p>{" "}
                    </td>
                  </tr>
                );
              })
            ) : (
              <NoDataAvailable />
            )}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
