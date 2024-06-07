import { CURRENCY_TYPE } from "../utils/constant";
import { urls } from "./urls";
import Cookie from "js-cookie";
import _ from "lodash";
export default class Api {
  _authorization!: string;
  _csrf!: string;
  _socketClient!: string;
  _authUser!: any;

  get authorization() {
    return this._authorization;
  }
  get authUser() {
    return this._authUser;
  }

  setAuthorization(val: string) {
    this._authorization = val;
  }
  setAuthUser(val: object) {
    this._authUser = val;
  }

  get csrf() {
    return this._csrf;
  }

  setCsrf(val: string) {
    this._csrf = val;
  }

  get socketClient() {
    return this._socketClient;
  }

  setSocketClient(val: string) {
    this._socketClient = val;
  }

  constructor(private url: string = "", _socketClient: string, token?: string) {
    this.setSocketClient(_socketClient);
    this.setAuthorization(`Bearer ${token}`);
    const _authUser = Cookie.get("authUser");
    const authUser = _authUser ? JSON.parse(_authUser) : _authUser;
    this.setAuthUser(authUser);
  }

  addIfFound(
    newObj: any,
    key: string,
    value: any,
    errorObj: { [key: string]: any },
    required: boolean
  ) {
    if (typeof value !== "undefined") {
      if (value !== null) {
        newObj[key] = typeof value === "string" ? value?.trim() : value;
      } else {
        if (required) {
          errorObj[key] = "REQUIRED";
        }
      }
    } else {
      if (required) {
        errorObj[key] = "REQUIRED";
      }
    }
  }

  async fetchWithoutAuth(
    apiUrl: string,
    fetchOptions: object
  ): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
  }> {
    // add the base url if applicable
    if (apiUrl.startsWith("/")) {
      apiUrl = this.url + apiUrl;
    }
    return new Promise((resolve, reject) => {
      fetch(apiUrl, fetchOptions)
        .then(async (response) => {
          let res = await response.json();
          resolve(res);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  }

  async configs(args: { type: string }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    data?: any;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
        });
      } else {
        let apiUrl = this.url + "/common/configs/" + args.type;
        let fetchOptions = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        };

        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }
  getAuthHeaders(extra = {}) {
    return {
      "x-request-socket-client": this._socketClient,
      "Content-Type": "application/json",
      Authorization: this._authorization,
      ...extra,
    };
  }

  async getBusinessSectors(args: {}): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode?: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
        });
      } else {
        let apiUrl = this.url + urls.common.BusinessSector;
        let fetchOptions = {
          method: "get",
          headers: this.getAuthHeaders(),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async getCountries(args: {}): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode?: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
        });
      } else {
        let apiUrl = this.url + urls.common.countries;
        let fetchOptions = {
          method: "get",
          headers: this.getAuthHeaders(),
        };

        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async healthCheck(args: {}): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    data?: any;
  }> {
    return new Promise((resolve, reject) => {
      let apiUrl = this.url + urls.common.health_check;
      let fetchOptions = {
        method: "get",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }
  async getCsrf(): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    data?: { token: string };
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
        });
      } else {
        let apiUrl = this.url + urls.common.csrf;
        let fetchOptions = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        };

        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async fetchAuthUser(args: {}): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + urls.auth.user;
        let fetchOptions = {
          method: "get",
          headers: this.getAuthHeaders(),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async submitLoapApplication(
    args: {
      repayment_method: string;
      principal: string;
      mobile: string;
      supplier_payment_method: string;
      account_name: string;
      account_number: string;
      bank_name: string;
      bank_branch_code: string;
      purpose: string;
      tenure: string;
      total_monthly_income: string;
      has_alternate_income_source: string;
      alternate_income_source_desc: string;
      has_other_finance_form: string;
      other_finance_form_desc: string;
      has_existing_loan: string;
      existing_loan_type: string;
      existing_loan_amount: string;
      supplier_account_name: string;
      supplier_account_number: string;
      supplier_bank_name: string;
      supplier_bank_branch_code: string;
      supplier_business_name: string;
      supplier_mobile: string;
      supplier_email: string;
      supplier_tin: string;
      supplier_director_name: string;
      supplier_address: string;
      application_type: string;
      purpose_other: string;
      partner: string;
      partner_full_name: string;
      partner_email: string;
      partner_mobile: string;
      switch_agent_call: boolean;
      payrollDoc1: string;
      payrollDoc2: string;
      payrollDoc3: string;
      trading_license: string;
      lease_agreement: string;
      title_deed: string;
      power_attorney: string;
      tbs: string;
      inventoryLpoStore: string;
      multipleInvoiceList: any;

      // csrf?: string;
    },
    applicationType: string
  ): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let data = {
          application_type: applicationType,
          tenure: parseInt(args?.tenure),
          repayment_method: args?.repayment_method,
          total_monthly_income: args?.total_monthly_income,
          documents: [],
          principal: args?.principal,
          purpose: args?.purpose || args?.purpose_other,
        };
        [
          "trading_license",
          "lease_agreement",
          "title_deed",
          "power_attorney",
          "tbs",
          "payrollDoc1",
          "payrollDoc2",
          "payrollDoc3",
          "inventoryLpoStore",
        ].map((document_type_slug) => {
          if (args[document_type_slug]) {
            data.documents.push(args[document_type_slug]);
          }
        });
        const fields = [
          "account_name",
          "account_number",
          "bank_name",
          "account_name",
          "bank_branch_code",
          "mobile",
        ];
        fields.map((field) => {
          this.addIfFound(bodyParams, field, args[field], errorObj, false);
        });
        data["applicant_payment_info"] =
          args?.repayment_method === "bank_transfer"
            ? {
                account_name: bodyParams?.account_name,
                account_number: bodyParams?.account_number,
                bank_name: bodyParams?.bank_name,
                bank_branch_code: bodyParams?.bank_branch_code,
              }
            : {
                mobile: args?.mobile,
                account_name: args?.account_name,
              };

        if (applicationType === "revolving") {
          const brand = [];
          args?.multipleInvoiceList?.map((item) => {
            brand?.push({
              name: item?.brandName?.trim(),
              documents: [
                item?.lpoDoc,
                item?.lastInvoice1,
                item?.lastInvoice2,
                item?.lastInvoice3,
                item?.lastInvoice4,
                item?.lastInvoice5,
                item?.lastInvoice6,
              ].filter((item) => item),
            });
          });
          data["brands"] = brand;
          data["purpose"] = args?.purpose;
          data["existing_loan_type"] = args?.partner;
          const requiredFields = [
            "partner_email",
            "partner_mobile",
            "supplier_director_name",
            "supplier_email",
            "supplier_mobile",
            "supplier_account_name",
            "supplier_account_number",
            "supplier_bank_name",
            "supplier_bank_branch_code",
            "supplier_tin",
            "supplier_business_name",
            "supplier_mobile",
          ];
          requiredFields.map((f) => {
            this.addIfFound(bodyParams, f, args[f], errorObj, false);
          });
          if (args?.partner === "partnership") {
            data["loan_partners"] = [
              {
                full_name: args?.partner_full_name,
                email: args?.partner_email?.toLowerCase(),
                mobile: args?.partner_mobile,
              },
            ];
          }
          data["supplier"] = {
            business_name: bodyParams?.supplier_business_name,
            address__street: args?.supplier_address,
            first_name: bodyParams?.supplier_director_name.split(" ")[0],
            last_name: bodyParams?.supplier_director_name.split(" ")[1] ?? "",
            email: bodyParams?.supplier_email?.toLowerCase(),
            tin: bodyParams?.supplier_tin,
            mobile: bodyParams?.supplier_mobile,
            created_by: this.authUser.id,
            contact_type: "supplier",
          };
          data["supplier_payment_info"] =
            args?.supplier_payment_method === "bank_transfer"
              ? {
                  account_name: bodyParams?.supplier_account_name,
                  account_number: bodyParams?.supplier_account_number,
                  bank_name: bodyParams?.supplier_bank_name,
                  bank_branch_code: bodyParams?.supplier_bank_branch_code,
                }
              : {
                  account_name: bodyParams?.supplier_business_name,
                  mobile: bodyParams?.supplier_mobile,
                };
        }

        if ([true, "yes"].includes(args?.has_alternate_income_source)) {
          data["has_has_alternate_income_source"] = true;
          data["alternate_income_source_desc"] =
            args.alternate_income_source_desc;
        } else {
          data["has_has_alternate_income_source"] = false;
        }
        if ([true, "yes"].includes(args?.has_other_finance_form)) {
          data["has_other_finance_form"] = true;
          data["other_finance_form_desc"] = args?.other_finance_form_desc;
        } else {
          data["has_other_finance_form"] = false;
        }
        if (args.existing_loan_amount) {
          data["existing_loan_amount"] = args?.existing_loan_amount;
        }
        data["existing_loan_type"] = args?.existing_loan_type;
        data["credit_provider"] = args["credit_provider"];
        let apiUrl = this.url + urls.credit.LoanApplication;
        let fetchOptions = {
          method: "post",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async updateBusinessProfile(args: {
    business_name: string;
    business_sector: string;
    tin: string;
    director_name: string;
    nin: string;
    authorized_representative_role: string;
    auth_representative_name: string;
    registration_year: string;
    certificate_of_incorporation: string;
    bank_ststement: string;
    business_id: string;
    business_vrn: string;
    vrn?: string;
    certificate_of_registration: string;
    tax_clearance: string;
    tin_certificate: string;
    director_id_1: string;
    director_id_2: string;
    otherDoc1: string;
    otherDoc2: string;
    otherDoc3: string;
    csrf?: string;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      this.addIfFound(
        bodyParams,
        "business_name",
        args.business_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "business_sector",
        args.business_sector,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "tin_number", args.tin, errorObj, true);
      this.addIfFound(
        bodyParams,
        "auth_representative_name",
        args.auth_representative_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "authorized_representative_role",
        args.authorized_representative_role,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "nin", args.nin, errorObj, true);

      this.addIfFound(
        bodyParams,
        "director_name",
        args.director_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "registration_year",
        args.registration_year,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "vrn", args.business_vrn, errorObj, true);
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let data = {
          name: bodyParams.business_name,
          business_sector: bodyParams.business_sector,
          tin: bodyParams.tin_number.toString(),
          vrn: bodyParams?.vrn,
          registration_year: bodyParams?.registration_year,
          director_profiles_data: [
            {
              full_name: bodyParams?.director_name,
              nin: bodyParams?.nin,
              role: "director",
            },
          ],
          authorized_representatives: [
            {
              full_name: bodyParams.auth_representative_name,
              role: bodyParams.authorized_representative_role,
              // nin: bodyParams?.nin,
            },
          ],

          documents: [
            args?.certificate_of_registration,
            args?.tax_clearance,
            args?.certificate_of_incorporation,
            args?.director_id_1,
            args?.director_id_2,
            args?.tin_certificate,
            args?.vrn,
            args?.otherDoc1,
            args?.otherDoc2,
            args?.otherDoc3,
          ].filter((i) => i),
        };
        // format addresses
        Object.keys(args).map((key) => {
          if (key.startsWith("address")) {
            const value = args[key]?.trim();
            if (value) {
              data[key.replace(".", "__")] = value;
            }
          }
        });
        let apiUrl = this.url + urls.common.Business + args.business_id + "/";
        let fetchOptions = {
          method: "patch",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async createBusinessProfile(
    args: {
      business_name: string;
      business_sector: string;
      tin: string;
      director_name: string;
      nin: string;
      authorized_representative_role: string;
      auth_representative_name: string;
      registration_year: string;
      certificate_of_incorporation: string;
      bank_ststement: string;
      vrn?: string;
      csrf?: string;
    },
    store: any
  ): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    /*
    store {
      certificate_of_incorporation: string;
      bank_ststement: string;
      certificate_of_registration: string;
      tax_clearance: string;
      tin_certificate: string;
      director_id_1: string;
      director_id_2: string;
      otherDoc1: string;
      otherDoc2: string;
      otherDoc3: string;
      
    }
    */
    return new Promise((resolve, reject) => {
      const bodyParams: any = {};
      const errorObj = {};
      this.addIfFound(
        bodyParams,
        "business_name",
        args.business_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "business_sector",
        args.business_sector,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "tin_number", args.tin, errorObj, true);
      this.addIfFound(
        bodyParams,
        "auth_representative_name",
        args.auth_representative_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "authorized_representative_role",
        args.authorized_representative_role,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "nin", args.nin, errorObj, true);
      this.addIfFound(
        bodyParams,
        "director_name",
        args.director_name,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "registration_year",
        args.registration_year,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "vrn", args.vrn, errorObj, true);
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        const data = {
          name: bodyParams.business_name,
          business_sector: bodyParams.business_sector,
          tin: bodyParams.tin_number,
          vrn: bodyParams?.vrn,
          registration_year: bodyParams?.registration_year,
          director_profiles_data: [
            {
              full_name: bodyParams?.director_name,
              nin: bodyParams?.nin,
            },
          ],
          authorized_representatives: [
            {
              name: bodyParams.auth_representative_name,
              role: bodyParams.authorized_representative_role,
            },
          ],
          documents: [
            store?.tax_clearance,
            store?.certificate_of_incorporation,
            store?.certificate_of_registration,
            store?.director_id_1,
            store?.director_id_2,
            store?.tin_certificate,
            store?.bank_ststement,
            store?.otherDoc1,
            store?.otherDoc2,
            store?.otherDoc3,
          ].filter((i) => i), //filter to remove empty documents
        };
        // format addresses
        Object.keys(store).map((key) => {
          if (key.startsWith("address")) {
            const value = store[key]?.trim();
            if (value) {
              data[key.replace(".", "__")] = value;
            }
          }
        });
        const apiUrl = this.url + urls.common.Business;
        const fetchOptions = {
          method: "post",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  async fetchLoanApplications(args: {
    search?: any;
    page?: number;
    due_date?: string;
    status?: string;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let apiUrl =
        this.url +
        urls.credit.LoanApplication +
        "?" +
        new URLSearchParams({
          order_by: "-id",
          loan_due_date: args.due_date || "",
          page: args.page as any,
          ...args,
        }).toString();
      let fetchOptions = {
        method: "get",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }

  //get payment listing
  async fetchPayments(args: {
    search: any;
    page: number;
    date: string;
    status: string;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let apiUrl =
        this.url +
        urls.billing.Payment +
        "?payment_type=loan_repayment&search=" +
        args?.search?.trim();
      if (args?.date) {
        apiUrl += "&due_date=" + args?.date;
      }
      if (args?.page) {
        apiUrl += "&page=" + args?.page;
      }

      let fetchOptions = {
        method: "get",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }

  // overview payment listing.
  async getPaymentOverview(args: { search: any }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + urls.billing.Payment;
        let fetchOptions = {
          method: "get",
          headers: this.getAuthHeaders(),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  // overdue payment listing.
  async getEMISchedules(args: {
    search?: any;
    order_by?: any;
    size?: any;
    status?: any;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      const apiUrl =
        this.url + urls.credit.EMISchedule + "?" + new URLSearchParams(args);
      const fetchOptions = {
        method: "GET",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }
  //logout
  async logout(args: {}): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + urls.auth.logout;
        let fetchOptions = {
          method: "post",
          headers: this.getAuthHeaders(),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }
  //update notification
  async updateNotification(args: { status: any; csrf?: string }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
    csrf?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + "/users/change-notification";
        let data = {
          notification_enabled: args.status,
        };
        let fetchOptions = {
          method: "PATCH",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  //change password.
  async changePassword(args: {
    current_password: any;
    new_password: any;
    confirm_password: any;
    csrf?: string;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      this.addIfFound(
        bodyParams,
        "current_password",
        args.current_password,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "new_password",
        args.new_password,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "confirm_password",
        args.confirm_password,
        errorObj,
        true
      );

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + "/users/change-login-password";
        let fetchOptions = {
          method: "post",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(bodyParams),
        };

        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  // dashboard outstanding balance api.
  async getCreditSummary(appType: string): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let apiUrl =
        urls.credit.LoanApplication + "summary/?application_type=" + appType;
      let fetchOptions = {
        method: "get",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }

  // user details update api.
  async updateUser(args: {
    nationality?: any;
    first_name?: string;
    last_name?: string;
    dob?: string;
    avatar?: string;

    csrf?: string;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      this.addIfFound(
        bodyParams,
        "first_name",
        args.first_name,
        errorObj,
        true
      );
      this.addIfFound(bodyParams, "last_name", args.last_name, errorObj, true);
      // this.addIfFound(
      //   bodyParams,
      //   "nationality",
      //   args.nationality,
      //   errorObj,
      //   true
      // );
      this.addIfFound(bodyParams, "avatar", args.avatar, errorObj, false);
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let data = {
          first_name: bodyParams.first_name,
          last_name: bodyParams.last_name,
          nationality: bodyParams.nationality,
          dob: args.dob,
          avatar: bodyParams.avatar,
        };
        let apiUrl = this.url + urls.auth.user;
        let fetchOptions = {
          method: "patch",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  // credit request listing api.
  async getLoanApplicationById(id?: any): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      const apiUrl = urls.credit.LoanApplication + id + "/";
      const fetchOptions = {
        method: "get",
        headers: this.getAuthHeaders(),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }

  // create payment
  async createPaymentById(args: {
    loan_application_id?: any;
    order_id?: any;
    amount_paying: string;
    create_payment_note: string;
    payment_mode: string;
    amount_due: string;
    id: string;
    documents: any;
    payment_reference_number?: any;
  }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};

      this.addIfFound(
        bodyParams,
        "payment_mode",
        args?.payment_mode,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "amount_currency",
        CURRENCY_TYPE,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "amount",
        args?.amount_paying,
        errorObj,
        true
      );
      this.addIfFound(
        bodyParams,
        "notes",
        args?.create_payment_note,
        errorObj,
        true
      );

      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let data = {
          payment_mode: bodyParams.payment_mode,
          amount_currency: bodyParams.amount_currency,
          amount: bodyParams.amount,
          notes: bodyParams.notes,
          documents: args.documents,
          transaction_id: args.payment_reference_number,
          payment_type: "loan_repayment",
          loan_application: args.loan_application_id,
          order: args.order_id,
        };
        let apiUrl = this.url + urls.billing.Payment;
        let fetchOptions = {
          method: "post",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }

  // credit record update comment
  async UpdateCreditComment(args: { comment: string; id: string }): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let data = {
        approval_comment: args?.comment,
      };
      let apiUrl = this.url + urls.credit.LoanApplication + args?.id + "/";
      let fetchOptions = {
        method: "patch",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      };
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) => resolve(resp));
    });
  }

  // upload file callback with progress data
  async uploadDocument(args: {
    fileData?: any;
    progress?: any;
    link?: string;
    documentType?: string;
  }): Promise<{
    file: any;
    id: any;
    document_type: any;
    title(title: any): unknown;
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    const { fileData, progress, documentType } = args;
    const apiUrl = urls.base_url + urls.common.Document;
    const formData = new FormData();
    formData.append("title", fileData?.name);
    formData.append("file", fileData);
    formData.append("document_type", JSON.stringify({ slug: documentType }));

    let fetchOptions = {
      method: "post",
      headers: {
        "x-request-socket-client": this._socketClient,
        Authorization: this._authorization,
      },
      body: formData,
    };
    return new Promise((resolve, reject) => {
      this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
        resolve(resp as any)
      );
    });
  }

  async apiClient(
    link: string,
    options: any = {
      method: "get",
    }
  ): Promise<any> {
    const { method = "get" } = options;
    let fetchOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-request-socket-client": this._socketClient,
        Authorization: this._authorization,
      },
      ...options,
    };
    if (link.startsWith("/")) {
      link = this.url + link;
    }
    return this.fetchWithoutAuth(link, fetchOptions);
  }

  async deleteFile(Filepath?: any): Promise<{
    error?: { error: boolean; message: string; errorParams?: object };
    result?: any;
    statusCode: number;
    traceId?: string;
  }> {
    return new Promise((resolve, reject) => {
      let bodyParams: any = {},
        errorObj = {};
      if (Object.keys(errorObj).length > 0) {
        resolve({
          error: {
            error: true,
            message: "Params not enough",
            errorParams: errorObj,
          },
          statusCode: 400,
        });
      } else {
        let apiUrl = this.url + "/common/delete?" + "file=" + Filepath;
        let fetchOptions = {
          method: "delete",
          headers: this.getAuthHeaders(),
        };
        this.fetchWithoutAuth(apiUrl, fetchOptions).then((resp) =>
          resolve(resp)
        );
      }
    });
  }
}
