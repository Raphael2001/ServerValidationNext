"use client";

import React, { useRef } from "react";

import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormData } from "utils/types/form";

import styles from "./GeneralFormPopup.module.scss";
import { FormPayload } from "utils/types/general";
import { clsx } from "utils/functions";

type Props = {
  hasDataItem: boolean;
  formData: FormData;
  onSubmit: (payload: FormPayload, onSuccess: () => void) => void;
  formClassName?: string;
  className?: string;
  overrideBtnText?: string;
};

export default function GeneralFormPopup(props: Props) {
  const {
    hasDataItem = false,
    formData,
    onSubmit,
    formClassName,
    className,
    overrideBtnText,
  } = props;

  const ref = useRef<SlidePopupRef>();

  function onSuccess() {
    ref.current?.animateOut();
  }

  function onSubmitHandler(payload: FormPayload) {
    onSubmit(payload, onSuccess);
  }

  return (
    <SlidePopup
      className={clsx(styles["general-form-popup"], className)}
      ref={ref}
    >
      <div className={clsx(styles["form"], formClassName)}>
        <FormCreator
          formData={formData}
          buttonText={
            overrideBtnText ? overrideBtnText : !hasDataItem ? "הוסף" : "עדכן"
          }
          onSubmit={onSubmitHandler}
        />
      </div>
    </SlidePopup>
  );
}
