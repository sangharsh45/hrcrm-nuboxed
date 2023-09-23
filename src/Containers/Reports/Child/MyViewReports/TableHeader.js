import React, { useEffect, useState, useMemo } from "react";
import { Checkbox, Divider } from "antd";
const CheckboxGroup = Checkbox.Group;

const TableHeader = (props) => {
  const {
    indeterminate,
    onCheckAllChange,
    plainOptions,
    checkedList,
    onChange,
    checkAll
  } = props;
  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};
export default TableHeader;