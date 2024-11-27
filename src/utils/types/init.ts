import TEXT_TAGS from "constants/TextTags";
import { LinkType } from "./links";
import { RotatingTextItem } from "./rotatingText";

import { MediaObjects } from "./media";
import { UserType } from "./user";
import { ProjectType } from "./project";
import { Site } from "./site";

export type init = {
  texts: Array<CmsText>;
  media: MediaObjects;
  languages: Array<language>;
  generalInfo: Array<GeneralInfo>;
  links: Array<LinkType>;

  iamRoles: Array<IAMRoleType>;

  modules: Array<ModuleType>;
  files: MediaObjects;
  users: Array<UserType>;
  projects: Array<ProjectType>;
  sites: Array<Site>;
};

export type generalInfoValue =
  | Array<generalInfoItem>
  | RotatingTextItem
  | generalInfoItem;

export type generalInfoItem = {
  _id: string;
  data: string;
};

export type GeneralInfo = {
  cmsTitle?: string;
  inputType: string;
  name: string;
  value: generalInfoValue;
  _id?: string;
};

export type language = {
  _id: string;
  lang: string;
};

export type CmsText = {
  key: string;
  tag: TextTagsKeys;
  value: TextValue;
};

type TextValue = {
  [key: string]: string;
};

export type TextTagsKeys = keyof typeof TEXT_TAGS;

export type moduleType = {
  bitwise: number;
  _id: string;
  title: string;
  route: string;
};

export type IAMRoleType = {
  _id: string;
  title: string;
  permissionBitwise: number;
};

export type ModuleType = {
  bitwise: number;
  _id: string;
  title: string;
  route: string;
};
