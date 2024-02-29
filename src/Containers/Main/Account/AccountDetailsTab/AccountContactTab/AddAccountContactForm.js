import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import PostImageUpld from "../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { addContactDistributor } from "../../AccountAction";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"
import { FormattedMessage } from "react-intl";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DistributorSchema = Yup.object().shape({
    firstName: Yup.string().required("Input required"),
    mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long"),
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
                    }) => (
                        <Form class="form-background">
                            <div class="flex justify-between">
                                <div class="h-full w-[45%]">
                                    <div class="flex justify-between mt-3">
                                        <div class="w-[40%]">
                                            <FastField name="imageId" component={PostImageUpld} />
                                        </div>
                                        <div class="w-[60%]">

                                            <FastField
                                                isRequired
                                                name="firstName"
                                                label={<FormattedMessage id="app.firstname" defaultMessage="First Name" />}
                                                type="text"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel

                                            />

                                            <div class="flex justify-between">
                                                <div class="w-[47%]">
                                                    <FastField
                                                        name="middleName"
                                                        label={<FormattedMessage id="app.middlename" defaultMessage="Middle Name" />}
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                                <div class="w-[47%]">
                                                    <FastField
                                                        name="lastName"
                                                        label={<FormattedMessage id="app.lastname" defaultMessage="Last Name" />}
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-end">
                                        <div class="w-[47%]">
                                            <FastField
                                                name="dialCode1"
                                                label={<FormattedMessage id="app.mobile" defaultMessage="Mobile #" />}
                                                isColumn
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                value={values.countryDialCode}
                                                inlineLabel
                                                isColumnWithoutNoCreate

                                            />
                                        </div>
                                        <div class="w-[47%]">
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
                                    </div>
                                    <div >
                                        <FastField
                                            type="email"
                                            name="emailId"
                                            label={<FormattedMessage id="app.email" defaultMessage="Email" />}
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                        />
                                    </div>
                                    <div class="w-full">
                                        <FastField
                                            name="LinkedIn"
                                            label={<FormattedMessage id="app.linkedIn" defaultMessage="LinkedIn" />}
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                        />
                                    </div>

                                    <div class="mt-3">
                                        <Field
                                            name="notes"
                                            label={<FormattedMessage id="app.notes" defaultMessage="Notes" />}
                                            width={"100%"}
                                            isColumn
                                            component={TextareaComponent}
                                        />
                                    </div>
                                </div>
                                <div
                                    class="w-[45%] h-[70%]">
                                    <div class="flex justify-between">
                                        <div class="w-[47%]">
                                            <Field
                                                name="designationId"
                                                placeholder="Designation"
                                                label={<FormattedMessage id="app.designation" defaultMessage="Designation" />}
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                                style={{
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <Field
                                                name="departmentId"
                                                component={InputComponent}
                                                label={<FormattedMessage id="app.department" defaultMessage="Department" />}
                                                style={{
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mt-3">
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
                            </div>

                            <div class="flex justify-end mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.addingContactDistributor}
                                >
                                    <FormattedMessage id="app.create" defaultMessage="Create" />

                                </Button>
                            </div>
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