import React from "react";

import MoneyInput from "@/components/form/MoneyInput";
import moment from "moment";
import Link from "next/link";
import NoDataAvailable from "./noDataAvailable";
import { useTranslation } from "react-i18next";

interface Iprops {
  overduePaymentList?: any;
  overdue?: any;
  name?: string;
}

export default function OverDuePayment(props: Iprops) {
  const { t } = useTranslation("common");
  return (
    <aside className="overdue-side mt-4 pb-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="card-title text-black mb-2">{t("overdue_payments")}</h5>
        {props?.overduePaymentList?.length > 0 && (
          <Link className="btn btn-white" href="/loan-application">
            {t("view_more")}
          </Link>
        )}
      </div>

      {props?.overduePaymentList?.length > 0 && (
        <div className="d-flex align-items-center mb-4">
          <span className="icon-overdue display-3 me-2">
            <span className="path1"></span>
            <span className="path2"></span>
            <span className="path3"></span>
            <span className="path4"></span>
            <span className="path5"></span>
            <span className="path6"></span>
            <span className="path7"></span>
          </span>
          <p className="p-2 mb-0 flex-grow-1">
            {t("total_overdue_amount")}
            <br />
            <strong className="text-blue display-2">
              <MoneyInput
                data={Number(props?.overdue?.totalOverDueAmount).toFixed(2)}
              />
            </strong>
          </p>
          <span className="overdue-count">
            {props?.overdue?.totalOverDueCount}
          </span>
        </div>
      )}
      <div className="table-responsive upcom-table">
        <table className="table">
          <tbody>
            {props?.overduePaymentList?.length > 0 ? (
              props?.overduePaymentList?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="d-flex align-items-center">
                      <span className="icon-error ti-lg me-3">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <p>
                        {/* <small> */}
                        {item?.application_number}
                        {/* </small> */}
                        {item?.description}
                      </p>
                    </td>

                    <td style={{ width: "30%" }}>
                      <p className="ms-auto">
                        <small>{t("amount_payable")}</small>
                        <MoneyInput data={item?.amount} />
                      </p>
                    </td>

                    <td style={{ width: "30%" }}>
                      <p className="ms-auto">
                        <small className="text-danger">
                          {moment(item?.due_date).format("DD/MM/YYYY")}
                        </small>
                        <Link
                          href={`/loan-application/${item.loan_application?.id}/add-payment`}
                          className="btn btn-lblue btn-sm"
                        >
                          {t("make_payment")}
                        </Link>
                      </p>
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
