"use client";
import React from "react";

import styles from "./CopyButton.module.scss";
import CopyIcon from "/public/assets/icons/copy.svg";
import { useAppDispatch } from "utils/hooks/useRedux";
import { addNotification } from "redux-store/features/notificationsSlice";
import NotificationsTypes from "constants/NotificationsTypes";

type Props = {
  value: string;
};

function CopyButton(props: Props) {
  const { value } = props;
  const dispatch = useAppDispatch();

  function onCopyClick() {
    navigator.clipboard.writeText(value);
    dispatch(
      addNotification({
        type: NotificationsTypes.INFO,
        payload: { title: "העותק בהצלחה", text: "הטקסט הועתק בהצלחה" },
      })
    );
  }

  return (
    <button className={styles["copy-btn"]} onClick={onCopyClick}>
      <img src={CopyIcon.src} />
    </button>
  );
}

export default CopyButton;
