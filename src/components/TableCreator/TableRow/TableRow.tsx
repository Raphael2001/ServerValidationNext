"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import React from "react";
import { clsx } from "utils/functions";
import ColoredCell from "../ColoredCell/ColoredCell";
import ActionsCell from "../Actions/ActionsCell/ActionsCell";
import InputCell from "../InputCell/InputCell";
import CheckBoxCell from "../CheckBoxCell/CheckBoxCell";
import { InputEvent } from "utils/types/inputs";
import { TableHeaderItem } from "utils/types/table";
import { DragHandle } from "components/DnD/Drag/Drag";
import { GeneralServerItem } from "utils/types/general";
import TextCell from "../TextCell/TextCell";

type Props = {
  styleRef: Object;
  styles: Object;
  dataItem: GeneralServerItem;
  header: Object;
  selectedCheckboxes: Array<string>;
  onChangeCheckBox: (e: InputEvent) => void;
  enableDrag?: boolean;
};

function TableRow({
  styleRef,
  styles,
  dataItem,
  header,
  onChangeCheckBox,
  selectedCheckboxes,
  enableDrag = false,
}: Props) {
  return (
    <div
      className={clsx(
        styles["table-row-wrapper"],
        styles["table-row-body-wrapper"]
      )}
    >
      {Object.keys(header).map((key, itemIndex) => {
        const value = dataItem[key] ?? dataItem;
        const title = header[key].title;
        const headerItem = header[key];
        return (
          <div
            style={styleRef}
            data-th={title}
            key={`table-body-item-${dataItem._id}${itemIndex}`}
            className={clsx(styles["table-item"], styles["table-body-item"])}
          >
            <RenderCell
              item={headerItem}
              value={value}
              name={key}
              data={dataItem}
              onChangeCheckBox={onChangeCheckBox}
              selectedCheckboxes={selectedCheckboxes}
            />
          </div>
        );
      })}
      {enableDrag ? <DragHandle /> : null}
    </div>
  );
}

export default TableRow;

type CellProps = {
  item: TableHeaderItem;
  value: string;
  name: string;
  data: GeneralServerItem;
  onChangeCheckBox: (e: InputEvent) => void;
  selectedCheckboxes: Array<string>;
};

function RenderCell({
  item,
  value,
  name,
  data,
  onChangeCheckBox,
  selectedCheckboxes,
}: CellProps) {
  const {
    type,
    options = {},
    uniqueField = "",
    actions = [],
    onChangeInput = () => {},
    dataset,
    displayField = "",
    onOptionClick,
    copyBtn = false,
  } = item;

  function renderContent() {
    switch (type) {
      case TABLE_CELL_TYPES.CHECKBOXES:
        return (
          <CheckBoxCell
            field={uniqueField}
            name={name}
            data={data}
            onChange={onChangeCheckBox}
            values={selectedCheckboxes}
          />
        );
      case TABLE_CELL_TYPES.INPUT:
        return (
          <InputCell
            name={name}
            onChange={onChangeInput}
            field={uniqueField}
            data={data}
          />
        );

      case TABLE_CELL_TYPES.ACTION_BUTTONS:
        return <ActionsCell data={data} actions={actions} />;
      case TABLE_CELL_TYPES.COLORED_CELL:
        return (
          <ColoredCell
            value={value}
            options={options}
            onOptionClick={onOptionClick}
            id={data._id}
          />
        );
      case TABLE_CELL_TYPES.COUNT_ROWS:
        if (Array.isArray(value)) {
          return value.length;
        }
        if (typeof value === "object") {
          return Object.keys(value).length;
        }
        return value;

      case TABLE_CELL_TYPES.TEXT_FROM_DATASET:
        if (Array.isArray(dataset)) {
          const foundItem = dataset.find((item) => item._id === value);
          if (foundItem && Object.hasOwn(foundItem, displayField)) {
            return foundItem[displayField];
          }
          return <TextCell value={value} showCopy={copyBtn} />;
        }

        return <TextCell value={value} showCopy={copyBtn} />;
      case TABLE_CELL_TYPES.TEXT:
      default:
        return <TextCell value={value} showCopy={copyBtn} />;
    }
  }

  return renderContent();
}
