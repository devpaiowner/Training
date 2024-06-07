import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useStore, { IStore } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { toast } from "react-toastify";
import { FILE_ACCEPT, LOAN_DOCS } from "@/common/utils/constant";
import MutipleUpload from "../layout/MutipleUpload";

export default function MultipleUpload() {
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const { storeData, setStoreData, setDataError } = useStore(
    (state: IStore) => ({
      storeData: state.data,
      setStoreData: state.setData,
      setDataError: state.setDataError,
    })
  );
  const [inputFields, setInputFields] = useState([
    {
      brandName: "",
      lpoDoc: "",
      // lpoDocPath: "",
      lastInvoice1: "",
      lastInvoice2: "",
      lastInvoice3: "",
      lastInvoice4: "",
      lastInvoice5: "",
      lastInvoice6: "",
    },
  ]);

  useEffect(() => {
    if (storeData?.multipleInvoiceList?.length > 0)
      setInputFields(storeData?.multipleInvoiceList);
  }, []);

  const addFields = (e) => {
    e.preventDefault();
    let data1 = [];
    let status = true;
    inputFields?.map((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        if (!value) {
          data1[index] = {
            error: errorMessage("invoice_brand"),
            index,
          };
          status = false;
        }
      }
    });

    let newfield = {
      brandName: "",
      lpoDoc: "",
      // lpoDocPath: "",
      lastInvoice1: "",
      lastInvoice2: "",
      lastInvoice3: "",
      lastInvoice4: "",
      lastInvoice5: "",
      lastInvoice6: "",
    };

    if (inputFields.length <= 2) {
      if (status) {
        setInputFields([...inputFields, newfield]);
      } else {
        toast.warning(errorMessage("invoice_brand"));
      }
    }
  };

  const upload = async (file: any, documentType?: string) => {
    const res = await apis.uploadDocument({
      fileData: file,
      link: LOAN_DOCS,
      documentType,
    });
    if (res?.id) {
      return {
        id: res.id,
        document_type: res.document_type?.slug,
        file: res.file,
        title: res["title"],
      };
    } else {
    }
  };

  const fieldName = [
    "lpoDoc",
    "lastInvoice1",
    "lastInvoice2",
    "lastInvoice3",
    "lastInvoice4",
    "lastInvoice5",
    "lastInvoice6",
  ];

  const handleFormChange = async (index, event) => {
    setDataError({ multipleInvoiceUpload: "" });
    let data = [...inputFields];
    if (fieldName.includes(event.target.name)) {
      data[index][event.target.name] = await upload(
        event.target.files[0],
        event.target.name
      );
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setInputFields(data);
    setStoreData({ multipleInvoiceList: data });
  };

  const submit = (e) => {
    e.preventDefault();
  };

  const removeFields = async (index, event) => {
    let data = [...inputFields];

    const res = await apis.deleteFile(data[index][event]);

    if (res) {
      data[index][event] = "";
      setInputFields(data);
      setStoreData({ multipleInvoiceList: data });
    } else {
      toast.error(res?.error?.[0]?.message);
    }
  };

  const removeFormFields = (i) => {
    let data = [...inputFields];
    data.splice(i, 1);
    setInputFields(data);
    setStoreData({ multipleInvoiceList: data });
  };
  const { t } = useTranslation("loanForm");
  const errorMessage = useTranslation("errorMessage").t;
  return (
    <>
      <form onSubmit={submit} className="mt-2">
        {inputFields.map((input, index) => {
          return (
            <>
              <div className="text-center w-50 mx-auto">
                <div className="mb-5 d-flex align-items-center">
                  <div className="form-label-group">
                    <input
                      type="text"
                      name="brandName"
                      id="floating-label1"
                      placeholder={t("enter_brand_name")}
                      value={input.brandName}
                      className="form-control"
                      onChange={(event) => handleFormChange(index, event)}
                    />
                    <label htmlFor="floating-label1">
                      {t("enter_brand_name")}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="ms-2 icon-info fs-5"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={t("add_upto_three_brands")}
                  ></button>
                </div>
              </div>
              <h5 className="text-dblue">
                <small>{t("purchase_order_that_needs")}</small>
              </h5>

              <div className="border-1">
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lpoDoc}
                  name="lpoDoc"
                  title={t("upload_lpo")}
                />
              </div>
              <h5 className="text-dblue mt-4">
                <small>{t("last_six_invoice_supplier")}</small>
              </h5>
              <div className="border-1" style={{ marginBottom: "50px" }}>
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice1}
                  name="lastInvoice1"
                  title={t("invoice_slip_1")}
                />
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice2}
                  name="lastInvoice2"
                  title={t("invoice_slip_2")}
                />
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice3}
                  name="lastInvoice3"
                  title={t("invoice_slip_3")}
                />
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice4}
                  name="lastInvoice4"
                  title={t("invoice_slip_4")}
                />
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice5}
                  name="lastInvoice5"
                  title={t("invoice_slip_5")}
                />
                <MutipleUpload
                  handleFormChange={handleFormChange}
                  removeFields={removeFields}
                  indexNo={index}
                  item={input.lastInvoice6}
                  name="lastInvoice6"
                  title={t("invoice_slip_6")}
                />
              </div>
              {storeData?.purpose !== "Inventory stock for one brand" &&
                (index ? (
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-blue px-4 adbrnd"
                      onClick={() => removeFormFields(index)}
                    >
                      {t("remove")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-white px-4 adbrnd"
                      onClick={addFields}
                    >
                      {t("add_brand")}
                    </button>
                  </div>
                ) : (
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-white px-4 adbrnd"
                      onClick={addFields}
                    >
                      {t("add_brand")}
                    </button>
                  </div>
                ))}
            </>
          );
        })}
      </form>

      {/* {storeData?.validation?.["multipleInvoiceUpload"] && (
                <div
                    className="error position-relative text-center"
                   
                >
                    {storeData?.validation?.["multipleInvoiceUpload"]}
                </div>
            )} */}
    </>
  );
}
