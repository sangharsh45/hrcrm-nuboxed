import React from "react";
import { Select } from "antd";

const Option = Select.Option;
export const SelectComponent = ({ field, options, label, placeholder, isRequired, defaultValue, noLabel, inlineLabel, changeCallback,
    form: { touched, errors, setFieldTouched, setFieldValue }, ...props }) => {
    function handleChange(value) {
        console.log(`selected ${value}`);
        setFieldValue(field.name, value)
        console.log()
        changeCallback && changeCallback(value)

    }

    function handleBlur() {
        console.log('blur');
        setFieldTouched(field.name, true)
    }

    function handleFocus() {
        console.log('focus');
    }

    return (
        <>
            <Select
                {...field}
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder || 'select'}
                defaultValue={defaultValue}
                isRequired={isRequired}
            >
                {
                    options
                        .map((option, i) => {
                            if (typeof option === "string") {
                                return <Option key={i} value={option}>{option}</Option>
                            } else {
                                return <Option key={i} value={option.value}>{option.label}</Option>
                            }
                        }
                        )}
            </Select>
        </>
    )
};