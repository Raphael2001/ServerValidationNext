"use client";

import React from "react";

import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";
import { Project } from "utils/types/project";
import { FormData } from "utils/types/form";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

type Props = {
  payload: Payload;
};

type Payload = {
  dataItem?: Project;
};

function ProjectPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const formData: FormData = {
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

  function onSubmit(payload, onSuccess) {
    if (dataItem?._id) {
      payload["_id"] = dataItem._id;
      return Api.updateProject({ payload, onSuccess });
    }

    Api.addProject({ payload, onSuccess });
  }

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
}
export default ProjectPopup;
