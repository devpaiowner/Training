import React from "react";
import RadioSelectionForm from "../form/radioSelectionForm";
interface Iprops {
  name?: string;
  disable?: boolean;
}
export default function RadioFormYesNo(props: Iprops) {
  return (
    <div className="d-flex justify-content-start ms-3">
      <div className="form-check me-5">
        <RadioSelectionForm
          name={props?.name}
          value={"yes"}
          class="form-check-input"
          disable={props?.disable}
        />

        <label
          className="form-check-label text-black"
          htmlFor="flexRadioDefault1"
        >
          {" "}
          Yes{" "}
        </label>
      </div>
      <div className="form-check">
        <RadioSelectionForm
          name={props?.name}
          value={"no"}
          class="form-check-input"
          disable={props?.disable}
        />
        <label
          className="form-check-label text-black"
          htmlFor="flexRadioDefault1"
        >
          {" "}
          No{" "}
        </label>
      </div>
    </div>
  );
}
