"use client";

import React, { useRef } from "react";

import styles from "./SitePopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { SlidePopupRef } from "utils/types/popup";
import Api from "api/requests";

import { FormDataType } from "utils/types/form";
import { Site } from "utils/types/site";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: Site;
};

function SitePopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const formData: FormDataType = {
    inputs: [
      {
        name: "name",
        rules: ["not_empty"],
        label: "שם",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },

      {
        name: "url",
        rules: ["not_empty"],
        label: "url",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
    ],
    initialData: dataItem,
  };
  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem?._id) {
      payload["id"] = dataItem._id;
      return Api.updateSite({ payload, onSuccess });
    }

    Api.addSite({ payload, onSuccess });
    function onSuccess() {
      animateOut();
    }
  }

  const animateOut = () => ref.current?.animateOut();

  return (
    <SlidePopup ref={ref} className={styles["site-popup"]}>
      <div className={styles["content"]}>
        <FormCreator
          formData={formData}
          buttonText={dataItem?._id ? "עדכון" : "יצירה"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}
export default SitePopup;
