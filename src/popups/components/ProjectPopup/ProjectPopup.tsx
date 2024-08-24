"use client";

import React, { useRef } from "react";

import styles from "./ProjectPopup.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { SlidePopupRef } from "utils/types/popup";
import Api from "api/requests";
import { ProjectType } from "utils/types/project";
import { FormDataType } from "utils/types/form";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: ProjectType;
};

function ProjectPopup(props: Props) {
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

      {
        name: "cdn",
        rules: ["not_empty"],
        label: "cdn",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },

      {
        name: "apiVersion",
        rules: ["not_empty"],
        label: "גרסת api",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },

      {
        name: "platform",
        rules: ["not_empty"],
        label: "פלטפורמה",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
    ],
    initialData: dataItem,
  };
  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem?._id) {
      payload["id"] = dataItem._id;
      return Api.updateProject({ payload, onSuccess });
    }

    Api.addProject({ payload, onSuccess });
    function onSuccess() {
      animateOut();
    }
  }

  const animateOut = () => ref.current?.animateOut();

  return (
    <SlidePopup ref={ref} className={styles["project-popup"]}>
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
export default ProjectPopup;
