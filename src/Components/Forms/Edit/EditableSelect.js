import React from "react";
import { get } from "lodash";
import { FlexContainer } from "../../UI/Layout";
import { SelectInput, ValidationError, StyledLabel } from "../../UI/Elements";
const Option = SelectInput.Option;
const EditableSelect = ({
  field,
  options,
  label,
  name,
  isRequired,
  defaultValue,
  value,
  handleChange,
  placeholder,
  ...props
}) => {
  // function handleChange(value) {
  //     console.log(`selected ${value}`);
  //     setFieldValue(field.name, value)
  // }
  // function handleBlur(value) {
  //     props.onBlur(field.name, true)
  // }
  return (
    <SelectInput
      {...props}
      onChange={(value) => handleChange(name, value)}
      // onBlur={handleBlur}

      placeholder={placeholder}
      // defaultValue={defaultValue}
      value={value || defaultValue}
      isRequired={isRequired}
    >
      {options.map((option, i) => {
        if (typeof option === "string") {
          return (
            <Option key={i} value={option}>
              {option}
            </Option>
          );
        } else {
          return (
            <Option key={i} value={option.value}>
              {option.label}
            </Option>
          );
        }
      })}
    </SelectInput>
  );
};
export default EditableSelect;
