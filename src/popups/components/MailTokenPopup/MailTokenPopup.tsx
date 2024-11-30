"use client";

import React from "react";

import FORM_INPUTS_TYPES from "constants/form-inputs-types";

import Api from "api/requests";

import { FormData } from "utils/types/form";

import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

function MailTokenPopup() {
  const formData: FormData = {
    inputs: [
      {
        name: "name",
        rules: ["not_empty"],
        label: "שם",
        inputType: FORM_INPUTS_TYPES.INPUT,
      },
    ],
  };

  function onSubmit(payload, onSuccess) {
    Api.addMailToken({ payload, onSuccess });
  }

  return (
    <GeneralFormPopup
      hasDataItem={false}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
}
export default MailTokenPopup;
