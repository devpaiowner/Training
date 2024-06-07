export const handledueDate = (item: any, status: string) => {
  if (status !== "pending" && status !== "rejected") {
    const dueDate = item?.emi_schedules?.filter((item) => {
      if (item.status === "pending") {
        return item.due_date;
      }
    });
    return dueDate;
  } else {
    return [];
  }
};

// handle status
export const handleStatus = (status) => {
  let classN = "",
    text = "";
  switch (status) {
    case "pending":
      classN = "bg-info text-center d-block";
      text = "Pending";
      break;
    case "under_review":
      classN = "bg-warning text-center d-block";
      text = "Under Review";
      break;
    case "approved":
      classN = "bg-success text-center d-block";
      text = "Approved";
      break;
    case "documents_missing":
      classN = "bg-dark text-center d-block";
      text = "Update Required";
      break;
    case "disbursement_pending":
      classN = "bg-grey text-center d-block";
      text = "Disbursement Pending";
      break;
    case "disbursed":
      classN = "bg-blue text-center d-block";
      text = "Disbursed";
      break;
    case "rejected":
      classN = "bg-danger text-center d-block";
      text = "Rejected";
      break;

    default:
      break;
  }
  return <span className={classN}>{text}</span>;
};

// amount payble calculation.
export const amountPayablecal = (item: any) => {
  const payable = item?.emi_schedules?.reduce((acc, obj) => {
    return (
      parseFloat(acc) +
      parseFloat(obj.amount) +
      parseFloat(obj.late_payment_penalty)
    );
  }, 0);
  return payable ?? 0;
};
