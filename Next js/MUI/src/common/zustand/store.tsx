import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export type formField = {
  purpose: string;
  purpose_other: string;
  has_alternate_income_source: string;
  has_other_finance_form: string;
  other_finance_form_desc: string;
  has_existing_loan: string;
  business_name: string;
  business_address: string;
  director_name: string;
  email: string;
  mobile: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_branch_code: string;
  tenure: string;
  total_monthly_income: string;
  alternate_income_source_desc: string;
  existing_loan_type: string;
  existing_loan_amount: string;
  application_type: string;

  supplier_account_name: string;
  supplier_account_number: string;
  supplier_bank_name: string;
  supplier_bank_branch_code: string;
  supplier_business_name: string;
  supplier_mobile: string;

  sCredToggle: boolean;
  switch_agent_call: boolean;
  salesToggle: boolean;
  sbusinessToggle: boolean;
  repayment_method: string;
  supplier_payment_method: string;

  current_password: string;
  new_password: string;
  confirm_password: string;

  payrollDoc1: any;
  payrollDoc2: any;
  payrollDoc3: any;

  trading_license: any;
  lease_agreement: any;
  title_deed: any;
  power_attorney: any;
  tbs: any;

  lastInvoice1: any;
  lastInvoice2: any;
  lastInvoice3: any;
  lastInvoice4: any;
  lastInvoice5: any;
  lastInvoice6: any;

  lpoDoc: any;

  partner: string;
  partner_full_name: string;
  partner_email: string;
  partner_mobile: string;

  multipleInvoiceList: any;
  multipleInvoiceUpload: string;

  description: string;
  loan_application_id: string;
  amount_due: string;

  searchStatus: string;
  searchData: string;
  searchDate: string;
  search: string;

  otherDoc1: string;
  otherDoc2: string;
  otherDoc3: string;

  business_vrn: string;
  inventoryLpo: string;
  inventoryLpoStore: any;

  attachment_proof: string;
  attach: string;

  certificate_of_incorporation: string;
  bank_ststement: string;
  certificate_of_registration: string;
  tax_clearance: string;
  tin_certificate: string;
  director_id_1: string;
  director_id_2: string;
  business_sector: string;
  address: string;
  tin: string;
  nin: string;
  authorized_representative_role: string;
  auth_representative_name: string;
  registration_year: string;

  vrn?: string;

  nationality?: any;
  first_name?: string;
  last_name?: string;
  dob?: string;
  avatar?: any;

  csrf?: string;
};
export type dataType = formField & {
  // TODO add field of init
  businessProfile: any;
  ms: Array<string>;
  loanApplications: any;
  getProductList: Array<string>;
  getDistributorList: Array<string>;
  businessSectors: Array<any>;
  loanApplicationById: any;
  commentStatus: object;
  getPaymentOverviewStatus: object;
  getEMISchedulesStatus: object;
  selected: any;

  createPaymentStatus: object;
  businessesStatus: any;
  countryList: Array<any>;

  categoryList: Array<any>;
  getPaymentOverviewList: Array<any>;
  getEMISchedulesList: Array<any>;
  userList: Array<any>;
  getProductListById: any;
  getDistributorListById: object;
  getUserList: object;
  myProfile: any;
  notificationList: any;
  getPurchaseOrderList: any;
  getPurchaseOrderListById: any;
  invoiceProductList: Array<object>;
  getInvoiceList: Array<object>;
  getInvoiceListById: any;
  getInvoicePaymentList: Array<object>;
  getInvoiceTrackingList: Array<object>;
  getInvoiceTrackingListById: Array<object>;
  dashboardList: any;
  creditSummary: any;
  // TODO add response field here

  // TODO add field for WS
  socketStatus: number;
  webSocket: object;
  authUser: object;

  businessProfileStatus: object;
  sectorStatus: object;
  loanApplicationsStatus: object;
  getLoanApplicationByIdStatus: object;

  getProductStatus: object;
  getDistributorIdStatus: object;
  addProductStatus: object;
  addDistributorStatus: object;
  getProductByIdStatus: object;
  getProductCategoryStatus: object;
  getDistributorStatus: object;
  delProductStatus: object;
  delDistributorStatus: object;
  editProductStatus: object;
  countryStatus: object;
  changePasswordStatus: object;
  authUserStatus: object;
  updateNotificationStatus: object;
  updateTwoFaStatus: object;
  logoutStatus: object;
  getAllUserStatus: object;
  getPurchaseOrderStatus: object;
  addPurchaseOrderStatus: object;
  getPurchaseOrderIdStatus: object;
  getInvoiceStatus: object;
  getInvoiceIdStatus: object;
  invoicePaymentStatus: object;
  getInvoicePaymentStatus: object;
  getInvoiceTrackingStatus: object;
  getInvoiceTrackingByIdStatus: object;
  delInvoiceStatus: object;
  notificationStatus: object;
  getInvoicePaymentDelStatus: object;
  updateDistributorStatus: any;
  uploadCsv: object;
  emailStatus: any;
  dashboardStatus: any;
  getCreditSummaryStatus: any;
  proof_payment_doc: object;

  selection: string;

  // TODO add field for UI Component controls
  buttonLoading: boolean;
  skeletonLoading: boolean;

  validation: formField;
};
export interface IStore {
  data: dataType;
  setData: Function;
  setDataError: Function;
  setNewError;
}

const defaultData = {
  buttonLoading: false,
  // invoiceProductList: [{}],
};

const useStore =
  process.env.NODE_ENV === "development"
    ? create<IStore>()(
        devtools(
          persist(
            (set) => ({
              data: defaultData as dataType,
              setData: (obj: object) =>
                set((state: { data: dataType }) => ({
                  data: { ...state.data, ...obj },
                })),
              setDataError: (obj: formField) =>
                set((state: { data: dataType }) => ({
                  data: {
                    ...state.data,
                    validation: {
                      ...state["data"].validation,
                      ...obj,
                    },
                  },
                })),
              setNewError: (obj: formField) =>
                set((state: { data: dataType }) => ({
                  data: { ...state.data, validation: obj },
                })),
            }),
            {
              name: "application",
              storage: createJSONStorage(() => sessionStorage),
              version: new Date().getTime(),
            }
          )
        )
      )
    : create<IStore>((set) => ({
        data: defaultData as dataType,
        setData: (obj: object) =>
          set((state: { data: dataType }) => ({
            data: { ...state.data, ...obj },
          })),
        setDataError: (obj: formField) =>
          set((state: { data: dataType }) => ({
            data: {
              ...state.data,
              validation: { ...state["data"].validation, ...obj },
            },
          })),
        setNewError: (obj: formField) =>
          set((state: { data: dataType }) => ({
            data: { ...state.data, validation: obj },
          })),
      }));
export default useStore;
