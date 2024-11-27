import { TextTagsKeys } from "./init";
import { Media } from "./media";

export type InitApp = {
  texts: Texts;
};
export type Texts = {
  [key: string]: TextType;
};

export type TextType = {
  tag: TextTagsKeys;
  text: string;
};
