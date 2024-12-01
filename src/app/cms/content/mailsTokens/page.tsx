"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function MailsTokensPage(props) {
  const tokens = useAppSelector((store) => store.init.tokens);

  const header = {
    name: {
      title: "שם אתר",
      type: TABLE_CELL_TYPES.TEXT,
    },
    apiToken: {
      title: "טוקן",
      type: TABLE_CELL_TYPES.TEXT,
      copyBtn: true,
    },
  };
  return (
    <PageGenerator
      data={tokens}
      deleteApi={Api.deleteMailToken}
      deleteTitle="למחוק את הטוקן הזה?"
      header={header}
      module={CMS_MODULES.MAILS_TOKENS}
      popup={POPUP_TYPES.MAILS_TOKENS}
      showUpdateAction={false}
    />
  );
}

export default MailsTokensPage;
