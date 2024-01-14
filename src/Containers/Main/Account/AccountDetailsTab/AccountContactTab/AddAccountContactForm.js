import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { addContactDistributor } from "../../AccountAction";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"
import { FormattedMessage } from "react-intl";

const DistributorSchema = Yup.object().shape({
    firstName: Yup.string().required("Input required"),
    emailId: Yup.string()
        .email("Enter a valid Email")
        .required("Input needed!"),
});

const { Option } = Select;


class AddAccountContactForm extends Component {

    componentDidMount() {
        this.props.getDesignations()
        this.props.getDepartments()
    }

    render() {
        const designation = this.props.designations.map((item) => {
            return {
                label: item.designationType || "",
                value: item.designationTypeId,
            };
        });

        const department = this.props.departments.map((item) => {
            return {
                label: item.departmentName || "",
                value: item.departmentId,
            };
        });

        return (
            <>
                <Formik
                    initialValues={{
                        userId: this.props.userId,
                        distributorId: this.props.distributorId,
                        salutation: "",
                        mobileNo: "",
                        phoneNo: "",
                        notes: "",
                        middleName: "",
                        linkedIn: "",
                        lastName: "",
                        firstName: "",
                        dialCode1: "",
                        dialCode2: "",
                        emailId: "",
                        designationId: "",
                        departmentId: "",
                        address: [
                            {
                                addressType: "",
                                address1: "",
                                address2: "",
                                addressId: "",
                                date: "",
                                street: "",
                                city: "",
                                pinCode: "",
                                country: "",
                                county: "",
                                latitude: "",
                                longitude: "",
                                location: "",
                                state: "",
                            },
                        ],

                    }}
                    validationSchema={DistributorSchema}


                    onSubmit={(values, { resetForm }) => {
                        this.props.addContactDistributor(
                            {
                                ...values,
                            },
                            this.props.distributorId
                        );
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                    }) => (
                        <Form class="form-background">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                > <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "40%" }}>
                                            <Field name="imageId" component={Upload} />
                                        </div>
                                        <div style={{ width: "60%" }}>

                                            <FastField
                                                isRequired
                                                name="firstName"
                                                label="First Name"
                                                type="text"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel

                                            />

                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "47%" }}>
                                                    <FastField
                                                        name="middleName"
                                                        label="Middle Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                                <div style={{ width: "47%" }}>
                                                    <FastField
                                                        name="lastName"
                                                        label="Last Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                            </FlexContainer>
                                        </div>
                                    </FlexContainer>
                                    <FlexContainer justifyContent="space-between" style={{ alignItems: "end" }}>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode1"
                                                label={
                                                    <FormattedMessage id="app.mobile #" defaultMessage="Mobile #" />
                                                }
                                                // label="Mobile #"
                                                isColumn
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                value={values.countryDialCode}
                                                inlineLabel
                                                isColumnWithoutNoCreate

                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                name="mobileNo"
                                                placeholder="Mobile #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn

                                            />
                                        </div>
                                    </FlexContainer>
                                    <FlexContainer justifyContent="space-between" style={{ alignItems: "end" }}>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode2"
                                                // style={{flexBasis:"33%"}}
                                                selectType="dialCode"
                                                label="Phone #"
                                                isColumn
                                                component={SearchSelect}
                                                value={values.countryDialCode1}
                                                inlineLabel
                                                isColumnWithoutNoCreate
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                name="phoneNo"
                                                placeholder="Phone #"
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}

                                            />
                                        </div>
                                    </FlexContainer>

                                    <div style={{ width: "100%" }}>
                                        <FastField
                                            type="email"
                                            name="emailId"
                                            label="Email"
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                        />
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <FastField
                                            name="LinkedIn"
                                            label="LinkedIn"
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                        />
                                    </div>

                                    <Spacer style={{ marginTop: "1.25em" }} />
                                    <Field
                                        name="notes"
                                        label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                    />
                                </div>
                                <div
                                    style={{
                                        height: "70%",
                                        width: "45%",
                                    }}
                                >
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="designationId"
                                                placeholder="Designation"
                                                label="Designation"
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                                style={{
                                                    //  borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="departmentId"
                                                component={InputComponent}
                                                label="Department"
                                                // component={SelectComponent}
                                                // options={Array.isArray(department) ? department : []}
                                                style={{
                                                    //  borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div>
                                        <Spacer />
                                        <FieldArray
                                            name="address"
                                            render={(arrayHelpers) => (
                                                <AddressFieldArray
                                                    singleAddress
                                                    arrayHelpers={arrayHelpers}
                                                    values={values}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Spacer />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.addingContactDistributor}
                                >
                                    Create
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ auth, distributor, departments, designations }) => ({
    addingContactDistributor: distributor.addingContactDistributor,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    designations: designations.designations,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addContactDistributor,
            getDesignations,
            getDepartments
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountContactForm);
