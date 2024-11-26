"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function SitesPage(props) {
  const sites = useAppSelector((store) => store.init.sites);

  const header = {
    name: {
      title: "שם אתר",
      type: TABLE_CELL_TYPES.TEXT,
    },
    url: {
      title: "url",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };
  return (
    <PageGenerator
      data={sites}
      deleteApi={Api.deleteSite}
      deleteTitle="למחוק את האתר הזה?"
      header={header}
      module={CMS_MODULES.SITES}
      popup={POPUP_TYPES.SITE}
    />
  );
}

export default SitesPage;
