import React, { Component } from "react";
import { Switch } from "antd";

import { FlexContainer } from "../../UI/Layout";

export const SwitchComponent = ({
  field,
  data,
  width,
  disabled,
  label,
  marginLeft,
  marginTop,
  checkedChildren,
  unCheckedChildren,
  form: { setFieldValue },
  ...props
}) => {
  function handleChange(checked) {
    console.log(`selected ${checked}`);
    setFieldValue(field.name, checked);
  }

  return (
    <>
      <FlexContainer>
        <Switch
          disabled={disabled}
          label={label}
          checked={data}
          onChange={handleChange}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          style={{
            width: width,
            marginLeft: marginLeft,
            marginTop: marginTop,
          }}
        />
      </FlexContainer>
    </>
  );
};
