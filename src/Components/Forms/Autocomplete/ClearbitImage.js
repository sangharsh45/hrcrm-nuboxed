import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import { ValidationError, StyledLabel, StyledAsync } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";

class ClearbitImage extends Component {
    loadOptions = (value) => {
        if (!value) {
            return Promise.resolve([]);
        }
        const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`;
        return axios
            .get(url)
            .then((res) => {
                return res.data.map((opt) => ({
                    label: opt.name,
                    value: opt.name,
                    website: opt.domain,
                    url: opt.domain,
                    logo: opt.logo,
                }));
            })
            .catch((err) => console.log(err));
    };
    // renderOptions = ({ data }) => (<div><p>----{data.website}</p></div>);
    handleInputChange = (e) => e;

    handleOnChange = (option) => {
        this.props.form.setFieldValue("name", option.value);
        this.props.form.setFieldValue("url", option.website);
        this.props.form.setFieldValue("imageURL", option.logo);
        this.props.setClearbitData(option);

    };

    handleBlur = (option) => {
        this.props.form.setFieldValue("label", true);
    };
    render() {
        const {
            label,
            placeholder,
            isRequired,
            inlineLabel,
            isColumn,
            defaultValue,
            form: { touched, errors, setFieldValue, setFieldTouched },
            field,
            ...rest
        } = this.props;
        if (isColumn) {
            return (
                <>
                    <StyledLabel style={{ flexBasis: "20%" }}>{label}</StyledLabel>
                    <StyledAsync
                        isRequired={isRequired}
                        classNamePrefix="sales"
                        placeholder={placeholder}
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultValue={defaultValue}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                        onChange={(option) => this.handleOnChange(option)}
                        styles={{ width: 600 }}

                    // components={this.renderOptions}
                    />

                    {get(touched, field.name) && get(errors, field.name) && (
                        <ValidationError>{get(errors, field.name)}</ValidationError>
                    )}
                </>
            );
        }
        return (
            <>
                <FlexContainer>
                    <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
                        <StyledLabel style={{ flexBasis: "20%" }}>{label}</StyledLabel>
                        <StyledAsync
                            isRequired={isRequired}
                            classNamePrefix="sales"
                            placeholder={placeholder}
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultValue={defaultValue}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            onChange={(option) => this.handleOnChange(option)}
                            styles={{ width: 600 }}

                        // components={this.renderOptions}
                        />
                    </FlexContainer>
                </FlexContainer>
                {get(touched, field.name) && get(errors, field.name) && (
                    <ValidationError>{get(errors, field.name)}</ValidationError>
                )}
            </>
        );
    }
}

export default ClearbitImage;