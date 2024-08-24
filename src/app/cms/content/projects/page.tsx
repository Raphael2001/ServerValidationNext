"use client";

import React from "react";

import POPUP_TYPES from "constants/popup-types";

import TABLE_CELL_TYPES from "constants/TableCellType";

import Api from "api/requests";

import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";
import PageGenerator from "components/Cms/PageGenerator/PageGenerator";

function ProjectsPage(props) {
  const projects = useAppSelector((store) => store.init.projects);

  const header = {
    name: {
      title: "שם פרויקט",
      type: TABLE_CELL_TYPES.TEXT,
    },
    url: {
      title: "url",
      type: TABLE_CELL_TYPES.TEXT,
    },
    cdn: {
      title: "cdn",
      type: TABLE_CELL_TYPES.TEXT,
    },
    apiVersion: {
      title: "גרסת api",
      type: TABLE_CELL_TYPES.TEXT,
    },
    platform: {
      title: "פלטפורמה",
      type: TABLE_CELL_TYPES.TEXT,
    },
  };
  return (
    <PageGenerator
      data={projects}
      deleteApi={Api.deleteProject}
      deleteTitle="למחוק את הפרויקט הזה?"
      header={header}
      module={CMS_MODULES.PROJECT}
      popup={POPUP_TYPES.PROJECT}
    />
  );
}

export default ProjectsPage;
