"use client";
import React, { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import POPUP_TYPES from "constants/popup-types";
import { clsx, generateUniqueId } from "utils/functions";

// popup components
import ApiErrorPopup from "./components/ApiErrorPopup/ApiErrorPopup";
import TextsPopup from "./components/TextsPopup/TextsPopup.tsx";
import BasicPopup from "./components/Basic/BasicPopup";
import TwoActionPopup from "./components/TwoAction";
import MediaPopup from "./components/MediaPopup/MediaPopup";
import EditGeneralInfoPopup from "./components/EditGeneralInfoPopup/EditGeneralInfoPopup";
import GeneralInfoPopup from "./components/GeneralInfoPopup/GeneralInfoPopup";
import LinksPopup from "./components/LinksPopup/LinksPopup";

import IAMRolePopup from "./components/IAMRolePopop/IAMRolePopup";
import CreateUserPopup from "./components/CreateUserPopup/CreateUserPopup";
import TrashPopup from "./components/TrashPopup/TrashPopup";
import UpdateUserPopup from "./components/UpdateUserPopup/UpdateUserPopup";

import { useAppSelector } from "utils/hooks/useRedux";
import FilesPopup from "./components/FilesPopup/FilesPopup";
import ProjectPopup from "./components/ProjectPopup/ProjectPopup";
import MailTokenPopup from "./components/MailTokenPopup/MailTokenPopup";
import SitePopup from "./components/SitesPopup/SitesPopup";

export default function Popups({ className = "" }) {
  const popupsArray = useAppSelector((store) => store.popupsArray);

  // stop body from scrolling while popup is open
  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (popupsArray.length > 0) {
      const popupContainer = document.querySelector("#popupContainer");
      if (!userAgent.match(/safari/i)) {
        console.log("unmatched in");
        disableBodyScroll(popupContainer);
      } else {
        document.body.style.overflow = "hidden";
        document.body.style.WebkitOverflowScrolling = "none";
      }
    }
    return () => {
      if (!userAgent.match(/safari/i)) {
        console.log("unmatched out");
        clearAllBodyScrollLocks();
      } else {
        document.body.style.overflow = null;
        document.body.style.WebkitOverflowScrolling = null;
      }
    };
  }, [popupsArray]);

  // map popup types to popup components
  const getPopupComponent = (key, type, payload) => {
    const popupComponents = {
      [POPUP_TYPES.API_ERROR]: <ApiErrorPopup key={key} payload={payload} />,
      [POPUP_TYPES.BASIC]: <BasicPopup key={key} payload={payload} />,
      [POPUP_TYPES.TWO_ACTION]: <TwoActionPopup key={key} payload={payload} />,
      [POPUP_TYPES.TEXTS]: <TextsPopup key={key} payload={payload} />,
      [POPUP_TYPES.MEDIA]: <MediaPopup key={key} payload={payload} />,
      [POPUP_TYPES.EDIT_GENERAL_INFO]: (
        <EditGeneralInfoPopup key={key} payload={payload} />
      ),
      [POPUP_TYPES.GENERAL_INFO]: (
        <GeneralInfoPopup key={key} payload={payload} />
      ),
      [POPUP_TYPES.LINKS]: <LinksPopup key={key} payload={payload} />,

      [POPUP_TYPES.IAM_ROLE]: <IAMRolePopup key={key} payload={payload} />,
      [POPUP_TYPES.CREATE_USER]: (
        <CreateUserPopup key={key} payload={payload} />
      ),
      [POPUP_TYPES.TRASH]: <TrashPopup key={key} payload={payload} />,
      [POPUP_TYPES.UPDATE_USER]: (
        <UpdateUserPopup key={key} payload={payload} />
      ),

      [POPUP_TYPES.FILES]: <FilesPopup key={key} payload={payload} />,
      [POPUP_TYPES.PROJECT]: <ProjectPopup key={key} payload={payload} />,
      [POPUP_TYPES.SITES]: <SitePopup key={key} payload={payload} />,
      [POPUP_TYPES.MAILS_TOKENS]: (
        <MailTokenPopup key={key} payload={payload} />
      ),
    };

    const popupToReturn =
      type in popupComponents ? (
        popupComponents[type]
      ) : (
        <ApiErrorPopup key={key} payload={{ text: "unknown popup type" }} />
      );
    return popupToReturn;
  };

  const renderPopups = () => {
    const popupsToRender = popupsArray.map((popup) => {
      const popupComponent = getPopupComponent(
        popup.key,
        popup.type,
        popup.payload
      );
      return (
        <div
          className={`priority-` + popup.priority}
          key={"popup-" + popup.key + popup.type}
        >
          {popupComponent}
        </div>
      );
    });
    return popupsToRender;
  };

  return (
    <div className={clsx("popup", className)} id="popupContainer">
      {renderPopups()}
    </div>
  );
}
