/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore, { IStore, dataType } from "@/common/zustand/store";
import appContext, { AppContext } from "@/common/context/appContext";
import Api from "@/common/apis/apis";
import { FILE_ACCEPT, PROFILE_ACCEPT } from "@/common/utils/constant";
import { useTranslation } from "react-i18next";

interface IProps {
  label?: string;
  name: string;
  id?: string;
  downText?: string;
  required?: boolean;
  readOnly?: boolean;
  disable?: boolean;
  onChange?: Function;
  type: string;
  value?: string;
  button?: boolean;
  isBox?: boolean;
}

function FileInput(props) {
  return (
    <input
      id={props.name}
      type="file"
      name={props.name}
      onChange={props.handleOnChange}
      accept={PROFILE_ACCEPT}
      className="d-none"
      value={""}
      readOnly={props.props?.readOnly}
      disabled={props.disable}
    />
  );
}

const ProfileUploadInputForm = (props: IProps) => {
  const { t } = useTranslation("profile");
  const errorMessage = useTranslation("errorMessage").t;
  const apis = (useContext(appContext) as AppContext).apis as Api;
  const refList = (useContext(appContext) as AppContext).refList;
  const { storeData, setStoreData } = useStore((state: IStore) => ({
    storeData: state.data,
    setStoreData: state.setData,
  }));
  const [fileName, setFileName] = useState(props?.value);
  const [fileNameCheck, setFileNameCheck] = useState(false);

  const upload = async (file: any) => {
    try {
      const res = await apis.uploadDocument({
        fileData: file,
        link: props?.type,
        documentType: props?.name,
      });
      setFileName(res.title as any);
      setStoreData({
        [props.name]: {
          file: res.file as any,
          id: res.id as any,
          document_type: res.document_type?.slug as any,
          title: res.title as any,
        } as any,
      });
    } catch (err) {
      setStoreData({ buttonLoading: false });
      toast.error(JSON.stringify(err.message));
    }
  };

  const deleteFile = async () => {
    const res = await apis.deleteFile(fileName);

    if (res) {
      setFileName("");
      setStoreData({ [props?.name]: "" });
    } else {
      setStoreData({ buttonLoading: false });
      toast.error(res?.error?.[0]?.message);
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (
      storeData.myProfile !== undefined &&
      storeData.myProfile?.["documents"] &&
      !fileNameCheck
    ) {
      storeData?.myProfile?.documents?.map((d) => {
        if (d.type === props.name) {
          setFileName(d.url);
          setStoreData({
            [props.name as keyof dataType]: d.url,
          });
        } else if (d.title === props.name) {
          setFileName(d.url);
          setStoreData({
            [props.name as keyof dataType]: d.url,
          });
        }
      });
      setFileNameCheck(true);
    }
  }, [storeData.myProfile]);

  if (props?.button) {
    return (
      <>
        <div className="card-info upload_ffile">
          <label htmlFor={props.name}>{t("upload_new_photo")}</label>
          <div className="profile_img">
            <FileInput
              name={props.name}
              props={props}
              disable={props.disable}
              handleOnChange={(event) => {
                handleOnChange(event);
              }}
            />
          </div>
          <p>{t("allowed_profile_size")}</p>
        </div>
      </>
    );
  }

  if (props?.isBox) {
    return (
      <>
        <div className="other_box">
          {storeData?.[props.name] ? (
            <label htmlFor={props.name} className="form-control">
              <small>{storeData?.[props.name]?.title}</small>
              <span
                onClick={() => {
                  if (!props.disable) {
                    deleteFile();
                  }
                }}
                className="icon-delete center"
              >
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            </label>
          ) : (
            <>
              <label htmlFor={props.name} className="form-control">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/plus.png`}
                  alt=""
                />
              </label>
              <FileInput
                name={props.name}
                props={props}
                disable={props.disable}
                readOnly={props.readOnly}
                handleOnChange={(event) => {
                  handleOnChange(event);
                }}
              />
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <label>
        {props.label}
        <span className="required_star">*</span>
      </label>
      <div className="form-group form_box">
        <label className="form-control" htmlFor={props.name}>
          {storeData?.[props.name]?.title || ""}&nbsp;
        </label>
        <FileInput
          name={props.name}
          props={props}
          disable={props.disable}
          readOnly={props.readOnly}
          handleOnChange={(event) => {
            handleOnChange(event);
          }}
        />
        <span className="input_icon">
          {fileName ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/delete-red.png`}
              className="delete_file"
              onClick={() => {
                if (!props.disable) {
                  deleteFile();
                }
              }}
            />
          ) : (
            <img
              src={`${process.env.NEXT_PUBLIC_BASEPATH}/images/upload.png`}
            />
          )}
        </span>
        {storeData?.validation?.[props.name] && (
          <div className="error position-static text-start">
            {errorMessage(storeData?.validation?.[props.name])}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(ProfileUploadInputForm);
// export default UploadInputForm;
