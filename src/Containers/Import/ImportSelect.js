import React from "react";
import { get } from "lodash";
import { FlexContainer } from "../../Components/UI/Layout";
import { SelectInput, ValidationError } from "../../Components/UI/Elements";
const Option = SelectInput.Option;
export const SelectComponent = ({
  field,
  options,
  label,
  form: { touched, errors, setFieldTouched, setFieldValue },
  ...props
}) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    setFieldValue(field.name, value);
  }

  function handleBlur() {
    console.log("blur");
    setFieldTouched(field.name, true);
  }

  function handleFocus() {
    console.log("focus");
  }

  return (
    <FlexContainer flexWrap="no-wrap" style={{ margin: "0.6rem" }}>
      <span style={{ width: "28.75em" }}>{label}</span> &nbsp;
      <SelectInput
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {options.map((option, i) => (
          <Option key={i} value={option.fieldKey}>
            {option.fieldViewName}
          </Option>
        ))}
      </SelectInput>
      {get(touched, field.name) && get(errors, field.name) && (
        <ValidationError>{get(errors, field.name)}</ValidationError>
      )}
    </FlexContainer>
  );
};
