import Nope from "nope-validator";

export default function validation(
  CurrentState: object,
  validation: Array<string>,
  setDataError: Function,
  refList: object
) {
  let validationList = {};
  validation.forEach((field) => {
    if (list?.[field]) {
      validationList[list[field].name] = list[field].validate;
    }
  });
  const Schema = Nope.object().shape(validationList);
  const errors = Schema?.validate(CurrentState) ?? {};
  let errorObj = {};
  Object.keys(errors).map((field) => {
    refList?.[field]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
  Object.keys(validationList).forEach((key) => {
    if (errors[key]) {
      errorObj[key] = errors[key] ?? "";
    }
  });
  setDataError(errorObj);
  return Object.keys(errors).length > 0 ? errorObj : false;
}

export function errorFromServer(
  reasons: Array<{ message?: string; path?: string }>,
  setDataError: Function,
  refList: object
) {
  let validationList = {};
  reasons.forEach((item) => {
    if (item.path) {
      validationList[item.path.split("/")[1]] = item.message;
    }
  });
}

export function resValidation(
  res: Array<object>,
  setDataError: Function,
  refList: object
) {
  let errors = {};
  res?.forEach((field) => {
    const path = field?.["instancePath"].replace("/", "");
    errors[path] = field?.["message"];
  });
  Object.keys(errors).map((field) => {
    refList?.[field]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
  setDataError(errors);
}

const list = {
  principal: {
    name: "principal",
    validate: Nope.number().required("principal"),
    // .lessThan(10000000, "exact_amount_less_then")
    // .greaterThan(0, "principal"),
  },

  total_monthly_income: {
    name: "total_monthly_income",
    validate: Nope.string().required("total_monthly_income"),
  },

  purpose_other: {
    name: "purpose_other",
    validate: Nope.string().required("purpose_other"),
  },

  purpose: {
    name: "purpose",
    validate: Nope.string().required("purpose"),
  },

  tenure: {
    name: "tenure",
    validate: Nope.string().required("tenure"),
  },

  account_name: {
    name: "account_name",
    validate: Nope.string().required("account_name"),
  },

  account_number: {
    name: "account_number",
    validate: Nope.string()
      .required("account_number")
      .regex(/^[a-zA-Z0-9_]*$/, "account_number_alphanumeric")
      .test((a) => a.length > 15 && "account_number_limit"),
  },

  bank_name: {
    name: "bank_name",
    validate: Nope.string().required("bank_name"),
  },

  bank_branch_code: {
    name: "bank_branch_code",
    validate: Nope.string()
      .required("bank_branch_code")
      .regex(/^[a-zA-Z0-9_]*$/, "bank_branch_code_alphanumeric")
      .test((a) => a.length > 15 && "bank_branch_code_limit"),
  },

  repayment_method: {
    name: "repayment_method",
    validate: Nope.string().required("repayment_method"),
  },

  has_alternate_income_source: {
    name: "has_alternate_income_source",
    validate: Nope.string().required("has_alternate_income_source"),
  },

  alternate_income_source_desc: {
    name: "alternate_income_source_desc",
    validate: Nope.string().required("alternate_income_source_desc"),
  },
  has_other_finance_form: {
    name: "has_other_finance_form",
    validate: Nope.string().required("has_other_finance_form"),
  },

  other_finance_form_desc: {
    name: "other_finance_form_desc",
    validate: Nope.string().required("other_finance_form_desc"),
  },

  has_existing_loan: {
    name: "has_existing_loan",
    validate: Nope.string().required("has_existing_loan"),
  },

  existing_loan_type: {
    name: "existing_loan_type",
    validate: Nope.string().required("existing_loan_type"),
  },

  existing_loan_amount: {
    name: "existing_loan_amount",
    validate: Nope.number()
      .required("existing_loan_amount")
      // .lessThan(
      //     10000000,
      //     "Repaying amount should be less then 10 million."
      // )
      .greaterThan(0, "repaying_amount_mandatory"),
  },

  business_name: {
    name: "business_name",
    validate: Nope.string().required("business_name"),
  },

  supplier_address: {
    name: "supplier_address",
    validate: Nope.string().required("supplier_address"),
  },

  email: {
    name: "email",
    validate: Nope.string()
      .required("email")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "valid_email"),
  },

  director_name: {
    name: "director_name",
    validate: Nope.string().required("director_name"),
  },
  supplier_director_name: {
    name: "supplier_director_name",
    validate: Nope.string().required("supplier_director_name"),
  },
  supplier_tin: {
    name: "supplier_tin",
    validate: Nope.string()
      .required("supplier_tin")
      .regex(/^([0-9]+]*)$/, "tin_numeric"),
    // .test((a) => (a?.toString().length >= 9 ? "tin_limit" : undefined)),
  },
  supplier_email: {
    name: "supplier_email",
    validate: Nope.string().required("supplier_email"),
    // .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "valid_email"),
  },
  supplier_payment_method: {
    name: "supplier_payment_method",
    validate: Nope.string().required("supplier_payment_method"),
  },

  supplier_account_name: {
    name: "supplier_account_name",
    validate: Nope.string().required("supplier_account_name"),
  },

  supplier_account_number: {
    name: "supplier_account_number",
    validate: Nope.string()
      .required("supplier_account_number")
      .regex(/^[a-zA-Z0-9_]*$/, "supplier_account_number_alphanumeric")
      .test((a) => a.length > 15 && "supplier_account_number_limit"),
  },

  supplier_bank_name: {
    name: "supplier_bank_name",
    validate: Nope.string().required("supplier_bank_name"),
  },

  supplier_bank_branch_code: {
    name: "supplier_bank_branch_code",
    validate: Nope.string()
      .required("supplier_bank_branch_code")
      .regex(/^[a-zA-Z0-9_]*$/, "supplier_bank_branch_code_alphanumeric")
      .test((a) => a.length > 15 && "supplier_bank_branch_code_limit"),
  },

  supplier_business_name: {
    name: "supplier_business_name",
    validate: Nope.string().required("supplier_business_name"),
  },

  partner: {
    name: "partner",
    validate: Nope.string().required("partner"),
  },

  partner_full_name: {
    name: "partner_full_name",
    validate: Nope.string().required("partner_full_name"),
  },
  partner_email: {
    name: "partner_email",
    validate: Nope.string().required("partner_email"),
    // .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "partner_email_valid"),
  },
  partner_mobile: {
    name: "partner_mobile",
    validate: Nope.string().required("partner_mobile"),
  },
  supplier_mobile: {
    name: "supplier_mobile",
    validate: Nope.string().required("supplier_mobile"),
  },
  payrollDoc1: {
    name: "payrollDoc1",
    validate: Nope.string().required("payrollDoc1"),
  },
  payrollDoc2: {
    name: "payrollDoc2",
    validate: Nope.string().required("payrollDoc2"),
  },
  payrollDoc3: {
    name: "payrollDoc3",
    validate: Nope.string().required("payrollDoc3"),
  },
  inventoryLpo: {
    name: "inventoryLpo",
    validate: Nope.string().required("inventoryLpo"),
  },

  lastInvoice1: {
    name: "lastInvoice1",
    validate: Nope.string().required("lastInvoice1"),
  },
  lastInvoice2: {
    name: "lastInvoice2",
    validate: Nope.string().required("lastInvoice2"),
  },
  lastInvoice3: {
    name: "lastInvoice3",
    validate: Nope.string().required("lastInvoice3"),
  },
  lastInvoice4: {
    name: "lastInvoice4",
    validate: Nope.string().required("lastInvoice4"),
  },
  lastInvoice5: {
    name: "lastInvoice5",
    validate: Nope.string().required("lastInvoice5"),
  },
  lastInvoice6: {
    name: "lastInvoice6",
    validate: Nope.string().required("lastInvoice6"),
  },
  lpoDoc: {
    name: "lpoDoc",
    validate: Nope.string().required("lpoDoc"),
  },
  tncAgree: {
    name: "tncAgree",
    validate: Nope.string().required("tncAgree"),
  },
  multipleInvoiceUpload: {
    name: "multipleInvoiceUpload",
    validate: Nope.string().required("multipleInvoiceUpload"),
  },
  nationality: {
    name: "nationality",
    validate: Nope.string().required("nationality"),
  },
  first_name: {
    name: "first_name",
    validate: Nope.string().required("first_name"),
  },
  last_name: {
    name: "last_name",
    validate: Nope.string().required("last_name"),
  },
  dob: {
    name: "dob",
    validate: Nope.date().required("dob"),
  },
  address: {
    name: "address",
    validate: Nope.string().required("address"),
  },
  tin: {
    name: "tin",
    validate: Nope.string()
      .required("tin")
      .regex(/^([0-9]+]*)$/, "tin_numeric")
      .test((a) => (a?.toString().length === 9 ? undefined : "tin_limit")),
  },
  business_vrn: {
    name: "business_vrn",
    validate: Nope.string()
      .required("business_vrn")
      .regex(/^[a-zA-Z0-9_]*$/, "business_vrn_alphanumeric")
      .test((a) =>
        a?.toString().length === 9 ? undefined : "business_vrn_limit"
      ),
  },
  business_sector: {
    name: "business_sector",
    validate: Nope.string().required("business_sector"),
  },
  auth_representative_name: {
    name: "auth_representative_name",
    validate: Nope.string().required("auth_representative_name"),
  },
  authorized_representative_role: {
    name: "authorized_representative_role",
    validate: Nope.string().required("authorized_representative_role"),
  },
  vrn: {
    name: "vrn",
    validate: Nope.string().required("vrn"),
  },
  nin: {
    name: "nin",
    validate: Nope.string().required("nin"),
  },
  registration_year: {
    name: "registration_year",
    validate: Nope.string().required("registration_year"),
  },
  certificate_of_registration: {
    name: "certificate_of_registration",
    validate: Nope.string().required("certificate_of_registration"),
  },
  tax_clearance: {
    name: "tax_clearance",
    validate: Nope.string().required("tax_clearance"),
  },
  certificate_of_incorporation: {
    name: "certificate_of_incorporation",
    validate: Nope.string().required("certificate_of_incorporation"),
  },
  director_id_1: {
    name: "director_id_1",
    validate: Nope.string().required("director_id_1"),
  },
  director_id_2: {
    name: "director_id_2",
    validate: Nope.string().required("director_id_2"),
  },
  tin_certificate: {
    name: "tin_certificate",
    validate: Nope.string().required("tin_certificate"),
  },
  current_password: {
    name: "current_password",
    validate: Nope.string().required("current_password"),
  },
  new_password: {
    name: "new_password",
    validate: Nope.string().required("new_password"),
  },
  confirm_password: {
    name: "confirm_password",
    validate: Nope.string().required("confirm_password"),
  },
};
