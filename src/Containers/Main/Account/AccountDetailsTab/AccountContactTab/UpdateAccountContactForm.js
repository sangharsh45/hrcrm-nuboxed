import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Switch } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { updateDistributorContact } from "../../AccountAction"
import * as Yup from "yup";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"

const DistributorSchema = Yup.object().shape({
    firstName: Yup.string().required("Input required"),
    // label: Yup.string().required("Input required !")
});

class UpdateAccountContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cash: "false",
            amount: "false",
        };
    }
    handleCashChange = (checked) => {
        console.log(checked);
        this.setState({
            cash: checked,
        });
    };
    handleAmountChange = (checked) => {
        console.log(checked);
        this.setState({
            amount: checked,
        });
    };
    componentDidMount() {
        this.props.getDesignations();
        this.props.getDepartments();
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
                        salutation: this.props.setEditingDistributorContact.salutation || "",
                        mobileNo: this.props.setEditingDistributorContact.mobileNo || "",
                        phoneNo: this.props.setEditingDistributorContact.phoneNo || "",
                        notes: this.props.setEditingDistributorContact.notes || "",
                        middleName: this.props.setEditingDistributorContact.middleName || "",
                        linkedIn: this.props.setEditingDistributorContact.linkedIn || "",
                        distributorId: this.props.distributorId,
                        userId: this.props.userId,
                        contactPersonId: this.props.setEditingDistributorContact.contactPersonId || "",
                        lastName: this.props.setEditingDistributorContact.lastName || "",
                        firstName: this.props.setEditingDistributorContact.firstName || "",
                        dialCode1: this.props.setEditingDistributorContact.dialCode1 || "",
                        dialCode2: this.props.setEditingDistributorContact.dialCode2 || "",
                        emailId: this.props.setEditingDistributorContact.emailId || "",
                        departmentId: this.props.setEditingDistributorContact.departmentId || "",
                        designationId: this.props.setEditingDistributorContact.designationId || "",
                        // address: [
                        //     {
                        //         addressId: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressId : "",
                        //         addressType: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressType : "",
                        //         address1: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address1 : "",
                        //         address2: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address2 : "",
                        //         date: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].date : "",
                        //         street: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].street : "",
                        //         city: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].city : "",
                        //         state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                        //         pinCode: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].pinCode : "",
                        //         country: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].country : "",
                        //         county: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].county : "",
                        //         state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                        //         location: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].location : "",
                        //         latitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].latitude : "",
                        //         longitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].longitude : "",
                        //     },
                        // ],

                    }}
                    validationSchema={DistributorSchema}

                    onSubmit={(values, { resetForm }) => {
                        this.props.updateDistributorContact(
                            {
                                ...values,

                            },
                            this.props.setEditingDistributorContact.contactPersonId,
                            this.props.distributorId,
                        );
                    }}
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        ...rest
                    }) => (
                        <Form class="form-background">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <FlexContainer flexWrap="no-wrap">
                                        <FastField name="imageId" component={Upload} />
                                        <div>
                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "40%" }}>
                                                    <FastField
                                                        name="salutation"
                                                        type="text"
                                                        label="Salutation"
                                                        options={["Mr.", "Ms.", "None"]}
                                                        component={SelectComponent}
                                                        inlineLabel
                                                        className="field"
                                                        isColumn
                                                        style={{
                                                            flexBasis: "80%",
                                                            //   height: "2.0625em",
                                                            //   marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "55%" }}>
                                                    <FastField

                                                        name="firstName"
                                                        isRequired
                                                        label="First Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            //  height: "2.0625em",
                                                            flexBasis: "80%",
                                                            //   marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                            </FlexContainer>
                                            <Spacer />
                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "40%" }}>
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
                                                <div style={{ width: "55%" }}>
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
                                    <Spacer style={{ marginTop: "1.25em" }} />
                                    <FlexContainer justifyContent="space-between" style={{alignItems:"end"}}>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode1"
                                                label="Mobile #"
                                                isColumn
                                                isColumnWithoutNoCreate
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                value={values.countryDialCode}
                                                inlineLabel

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
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between" style={{alignItems:"end"}}>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode2"
                                                selectType="dialCode"
                                                label="Phone #"
                                                isColumn
                                                isColumnWithoutNoCreate
                                                component={SearchSelect}
                                                value={values.countryDialCode1}
                                                inlineLabel
                                                style={{ flexBasis: "80%" }}
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

                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
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
                                    </FlexContainer>
                                    <Spacer style={{ marginTop: "1.25em" }} />
                                    <Field
                                        name="notes"
                                        label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                        style={{
                                            flexBasis: "80%",
                                            height: "3em",
                                            // marginLeft: "2.5em",
                                            //  marginTop: "0em",
                                        }}
                                    />

                                </div>

                                <div
                                    style={{
                                        height: "70%",
                                        width: "45%",
                                        //  marginTop: "10px"
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
                                                // placeholder="Designation"
                                                label="Department"
                                                component={SelectComponent}
                                                options={Array.isArray(department) ? department : []}
                                                style={{
                                                    //  borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer style={{ marginTop: "1.25em" }} />

                                    {/* <div>
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
                                    </div> */}
                                </div>
                            </div>
                            <Spacer style={{ marginTop: "1.25em" }} />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.updateDisributorContactById}
                                >
                                    Update
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}
// }

const mapStateToProps = ({ auth, distributor, departments, designations }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    distributor: distributor.distributor,
    setEditingDistributorContact: distributor.setEditingDistributorContact,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId,
    updateDisributorContactById: distributor.updateDisributorContactById,
    departments: departments.departments,
    designations: designations.designations,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateDistributorContact,
            getDesignations,
            getDepartments,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountContactForm);
