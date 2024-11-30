"use client";

import React from "react";

import { FormData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";

export default function SyncDBPopup() {
  const syncOptions = useAppSelector((store) => store.init.syncOptions);

  function onSubmit(payload, onSuccess) {
    Api.syncDB({ payload, onSuccess });
  }

  const formData: FormData = {
    inputs: [
      {
        name: "tables",
        label: "טבלאות",
        inputType: FORM_INPUTS_TYPES.CHECKBOXES,
        rules: ["not_empty"],
        options: syncOptions,
        field: "title",
      },
    ],
  };

  return (
    <GeneralFormPopup
      formData={formData}
      onSubmit={onSubmit}
      hasDataItem={false}
      overrideBtnText="בצע"
    />
  );
}
