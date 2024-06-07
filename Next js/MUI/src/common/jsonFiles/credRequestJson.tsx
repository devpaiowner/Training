export const creditFormFirst = [
  {
    name: "purpose",
    placeHolder: "Choose Purpose",
    label: "What is the purpose for this financing?",
    disable: true,
    getValue: (store: any, t: Function) => store.purpose || store.purpose_other,
  },
  {
    name: "principal",
    placeHolder: "Enter Amount",
    label: "What is the exact amount needed?",
    inputType: "amount",
    disable: true,
  },

  {
    name: "total_monthly_income",
    placeHolder: "Type Amount",
    label: "What is your total income before taxes?",
    inputType: "amount",
    disable: true,
  },

  {
    name: "tenure",
    placeHolder: "Choose Number of Days",
    label: "How long would it take you to pay this amount back?",
    disable: true,
  },
  {
    name: "repayment_method",
    placeHolder: "Choose Method",
    label: "What method of repayment would you like to use?",
    disable: true,
    getValue: (store: any, t: Function) =>
      t(store.repayment_method || "mobile_transfer"),
  },
  {
    name: "account_name",
    label: "Account Name",
    disable: true,
    hideIfEmpty: true,
  },
  {
    name: "mobile",
    label: "Mobile Number",
    disable: true,
    hideIfEmpty: true,
  },
  {
    name: "account_number",
    label: "Account Number",
    disable: true,
    hideIfEmpty: true,
  },
  {
    name: "bank_name",
    label: "Bank Name",
    disable: true,
    hideIfEmpty: true,
  },
  {
    name: "bank_branch_code",
    label: "Branch Bank Code",
    disable: true,
    hideIfEmpty: true,
  },
];

export const supplierDetails = [
  {
    name: "supplier_business_name",
    label: "Business Name",
    disable: true,
  },
  {
    name: "supplier_address",
    label: "Business Address",
    disable: true,
  },
  {
    name: "supplier_director_name",
    label: "Director Name",
    disable: true,
  },
  {
    name: "supplier_email",
    label: "Email ID",
    disable: true,
  },
  {
    name: "supplier_mobile",
    label: "Phone Number",
    disable: true,
  },
];

export const supplierPaymentDetails = [
  {
    name: "supplier_account_name",
    label: "Account Name",
    disable: true,
  },
  {
    name: "supplier_mobile",
    label: "Mobile Number",
    disable: true,
  },
  {
    name: "supplier_account_number",
    label: "Account Number",
    disable: true,
  },
  {
    name: "supplier_bank_name",
    label: "Bank Name",
    disable: true,
  },
  {
    name: "supplier_bank_branch_code",
    label: "Branch Bank Code",
    disable: true,
  },
];
