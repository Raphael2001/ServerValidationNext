import { HTMLInputTypeAttribute } from "react";
import { GeneralServerItem } from "./general";

export interface FormData {
  inputs: Array<FormInputData>;
  initialData?: Object;
}

export interface FormInputData {
  name: string;
  label: string;
  inputType: string;
  options?: Array<any>;
  rules: Array<any>;
  field?: string;
  isDisabled?: boolean;
  rows?: number;
  type?: HTMLInputTypeAttribute;
  accept?: string;
  required?: boolean;
  ariaLabel?: string;
  bitwiseField?: string;
  showDataTable?: boolean;
  tableHeaderData?: Array<FormTableHeaderItem>;
  enableDrag?: boolean;
  startHour?: number;
  endHour?: number;
  minuteInterval?: number;
  minDate?: Date;
  startYear?: number;
  endYear?: number;
  title?: string;
}

export type FormTableHeaderItem = {
  name: string;
  title: string;
};

export type InputAccessibility = {
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

export type OnChangeValue =
  | string
  | Array<string | GeneralServerItem>
  | number
  | File
  | TimePickerValue
  | Date
  | Boolean;

export type TimePickerValue = {
  minute: string;
  hour: string;
};
