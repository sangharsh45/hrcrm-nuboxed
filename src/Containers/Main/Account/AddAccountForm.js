import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addDistributor } from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
// import { getVat } from "../../../Rules/RulesAction"
import { getCurrency } from "../../Auth/AuthAction"
// import { getCustomer } from "../../../../Settings/Category/CategoryAction"
// import { getUserById } from "../../../Groups/GroupAction"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
    name: Yup.string().required("Input needed!"),
    country: Yup.string().required("Input needed!"),
    dialCode: Yup.string().required("Input needed!"),
    phoneNo: Yup.string().required("Input needed!"),
    // assignTo: Yup.string().required("Input needed!"),
});
class AddAccountForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vatInd: false,
        }
    }
    componentDidMount() {
       // this.props.getCustomer();
       // this.props.getVat();
        this.props.getCurrency();
       // this.props.getUserById(this.props.groupId)
    }
    handleVatCheckBox() {
        this.setState({ vatInd: true })
    }
    render() {
        // const vatOption = this.props.vat.map((item) => {
        //     return {
        //         value: item.country,
        //         label: item.country
        //     }
        // })
        const currencyOption = this.props.currencies.map((item) => {
            return {
                label: item.currencyName || "",
                value: item.currencyName,
            };
        })
        // const customerOption = this.props.customer.map((item) => {
        //     return {
        //         label: item.clientName || "",
        //         value: item.clientId,
        //     };
        // })

        // const assignToOption = this.props.groupUsers.map((item) => {
        //     return {
        //         label: item.name || "",
        //         value: item.userId,
        //     };
        // })
        return (
            <>
                <Formik
                    // enableReinitialize
                    initialValues={{
                        userId: this.props.userId,
                        name: "",
                        phoneNo: "",
                        url: "",
                        description: "",
                        dialCode: "",
                        country: "",
                        clientId: "",
                        groupId: this.props.groupId,
                        vatInd: this.state.vatInd,
                        address: [
                            {
                                addressType: "",
                                address1: "",
                                address2: "",
                                addressId: "",
                                town: "",
                                street: "",
                                city: "",
                                pinCode: "",
                                country: "",
                                county: "",
                                latitude: "",
                                longitude: "",
                                location: "",
                                pinCode: "",
                                state: "",
                            },
                        ],
                    }}
                    validationSchema={CustomerSchema}
                    onSubmit={(values, { resetForm }) => {
                        this.props.addDistributor(
                            {
                                ...values,
                            },
                            this.props.userId,

                            resetForm()
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
                                    <Field
                                        isRequired
                                        name="name"
                                        type="text"
                                        label="Name"
                                        width={"100%"}
                                        component={InputComponent}
                                        // placeholder="Start typing..."
                                        isColumn
                                        inlineLabel
                                    />
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode"
                                                label="Dial Code"
                                                isColumn
                                                width={"100%"}
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                inlineLabe
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                // isRequired
                                                name="phoneNo"
                                                label="Telphone"
                                                placeholder="Phone #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Field
                                        // isRequired
                                        name="url"
                                        type="text"
                                        label="Website"
                                        width={"100%"}
                                        component={InputComponent}
                                        isColumn
                                        inlineLabel
                                    />
                                    <Spacer />
                                    <FlexContainer justify-content="space-evenly">
                                        <div>
                                            <b>VAT Validity</b>
                                            <Checkbox
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    <div><b>VAT</b></div>
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="country"
                                                label="Country"
                                                isColumn
                                                inlineLabel
                                              //  component={SelectComponent}
                                                //options={Array.isArray(vatOption) ? vatOption : []}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                label="Value"
                                                name="countryValue"
                                                placeholder="Value"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    {/* <Field
                                        name="insuranceGrade"
                                        type="text"
                                        label="Insurance Grade"
                                        width={"100%"}
                                        component={InputComponent}
                                        isColumn
                                        inlineLabel
                                    />
                                    <Spacer /> */}
                                    {/* <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                label="Credit Limit"
                                                name="currencyPrice"
                                                placeholder="Price"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="currency"
                                                label="Currency"
                                                isColumn
                                                inlineLabel
                                                component={SelectComponent}
                                                options={Array.isArray(currencyOption) ? currencyOption : []}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer /> */}
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                label="Payment Terms"
                                                name="payment"
                                                placeholder="Price"
                                                component={SelectComponent}
                                                options={["7", "15", "21", "30", "45", "60", "75", "90"]}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="clientName"
                                                label="Type"
                                                isColumn
                                                inlineLabel
                                             //   component={SelectComponent}
                                               // options={Array.isArray(customerOption) ? customerOption : []}
                                            // options={["Marketplace", "Customer", "Distributor"]}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    <Field
                                        name="description"
                                        label="Description"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                    />
                                </div>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <div>
                                        <FastField
                                            name="assignTo"
                                            label="Assigned To"
                                            isColumn
                                            inlineLabel
                                           // component={SelectComponent}
                                           // options={Array.isArray(assignToOption) ? assignToOption : []}
                                        />
                                    </div>
                                    <Spacer />
                                    <StyledLabel >Invoice Address</StyledLabel>
                                    <div>
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
                                    loading={this.props.addingDistributor}
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

const mapStateToProps = ({ auth, distributor, rule, groups, category }) => ({
    userId: auth.userDetails.userId,
    groupId: auth.userDetails.groupId,
    vat: rule.vat,
    currencies: auth.currencies,
  //  groupUsers: groups.groupUsers,
   // customer: category.customer,
    addingDistributor: distributor.addingDistributor
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addDistributor,
          //  getVat,
            getCurrency,
           // getUserById,
           // getCustomer
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);
