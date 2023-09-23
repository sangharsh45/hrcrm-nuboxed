import React from "react";
import dayjs from 'dayjs';
import { DatePicker } from "antd";

export default  ({ value, field, label, isRequired, noLabel, inlineLabel, form: { setFieldValue, setFieldTouched, touched, errors }, ...props }) => {
    return (
        <>
            <DatePicker
                allowClear={false}
                {...field}
                {...props}
                isRequired={isRequired}
                onChange={(date, dateString) => setFieldValue(field.name, dayjs(dateString))}
                value={value}
                onBlur={() => setFieldTouched(field.name, true)}
            />
        </>
    )
};