import TEXT_TAGS from "constants/TextTags";
import { Link } from "./links";
import { RotatingTextItem } from "./rotatingText";

import { MediaObjects } from "./media";
import { UserType } from "./user";

import { Site } from "./site";
import { Project } from "./project";

export type Init = {
  texts: Array<CmsText>;
  media: MediaObjects;
  languages: Array<Language>;
  generalInfo: Array<GeneralInfo>;
  links: Array<Link>;

  iamRoles: Array<IAMRoleType>;

  modules: Array<ModuleType>;
  files: MediaObjects;
  users: Array<UserType>;
  projects: Array<Project>;
  sites: Array<Site>;

  syncOptions: Array<SyncOption>;
};

export type GeneralInfoValue =
  | Array<GeneralInfoItem>
  | RotatingTextItem
  | GeneralInfoItem;

export type GeneralInfoItem = {
  _id: string;
  data: string;
};

export type GeneralInfo = {
  cmsTitle?: string;
  inputType: string;
  name: string;
  value: GeneralInfoValue;
  _id?: string;
};

export type Language = {
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
  show?: boolean;
};

export type SyncOption = {
  id: string;
  title: string;
};
