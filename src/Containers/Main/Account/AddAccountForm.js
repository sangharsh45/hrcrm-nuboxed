import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {getCountry } from "../../../Containers/Settings/Category/Country/CountryAction"
import {
    getCustomer,
} from "../../Settings/Category/Customer/CustomerAction";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addDistributor,setClearbitData1 } from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { getCurrency } from "../../Auth/AuthAction"
import { ProgressiveImage } from "../../../Components/Utils";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
    name: Yup.string().required("Input needed!"),
    country: Yup.string().required("Input needed!"),
    // dialCode: Yup.string().required("Input needed!"),
    // phoneNo: Yup.string().required("Input needed!"),
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
        this.props.getCountry();
        this.props.getCustomer(this.props.orgId);
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

          
  const CountryOptions = this.props.country.map((item) => {
    return {
      label: `${item.country_name || ""}`,
      value: item.country_id,
    };
  });
  const CustomerTypeOptions = this.props.customerListData.map((item) => {
    return {
      label: `${item.name || ""}`,
      value: item.customerTypeId,
    };
  });
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
        const {accounts,clearbit1}=this.props;
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
                              town: "",
                              street: "",
                              city: "",
                              postalCode: "",
                              country: this.props.user.countryName,
                              latitude: "",
                              state: "",
                              longitude: "",
                            },
                          ],
                        // address: [
                        //     {
                        //         addressType: "",
                        //         address1: "",
                        //         address2: "",
                        //         addressId: "",
                        //         town: "",
                        //         street: "",
                        //         city: "",
                        //         pinCode: "",
                        //         country: "",
                        //         county: "",
                        //         latitude: "",
                        //         longitude: "",
                        //         location: "",
                        //         pinCode: "",
                        //         state: "",
                        //     },
                        // ],
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
                                     <div>
                    {clearbit1 && clearbit1.hasOwnProperty("logo") && (
                      <ProgressiveImage
                        preview={
                          "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
                        }
                        image={clearbit1.logo}
                        width={140}
                        height={150}
                        borderRadius={25}
                        padding={15}

                      />
                    )}
                    {clearbit1 && clearbit1.hasOwnProperty("logo") ? (
                      <a
                        href="https://clearbit.com"
                        target="_blank"
                        style={{ fontSize: 13, marginLeft: 5 }}
                      >
                        Logos provided by Clearbit
                      </a>
                    ) : null}
                  </div>
                  <Spacer />
                                    <Field
                                        isRequired
                                        name="name"
                                        type="text"
                                        label="Name"
                                        width={"100%"}
                                        // component={InputComponent}
                                        setClearbitData1={this.props.setClearbitData1}
                    component={ClearbitImage}
                    accounts={accounts}
                                        isColumn
                                        inlineLabel
                                    />
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "50%" }}>
                                            <FastField
                                                name="dialCode"
                                                label="Dial Code"
                                                isColumn
                                                width={"100%"}
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                inlineLabel
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
                                                placeholder="Select"
                                                inlineLabel
                                                component={SelectComponent}
                                                options={
                                                    Array.isArray(CountryOptions) ? CountryOptions : []
                                                  }
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
                                                label="Payment Terms (in Days)"
                                                name="payment"
                                                placeholder="Select"
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
                                                component={SelectComponent}
                                                options={
                                                    Array.isArray(CustomerTypeOptions) ? CustomerTypeOptions : []
                                                  }
                                                // component={SelectComponent}
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
                                        {/* <FastField
                                            name="assignTo"
                                            label="Assigned To"
                                            isColumn
                                            component={SelectComponent}
                                            options={["1", "2"]}
                                            inlineLabel
                                        // component={SelectComponent}
                                        // options={Array.isArray(assignToOption) ? assignToOption : []}
                                        /> */}
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

const mapStateToProps = ({ auth,countrys,catgCustomer, distributor, rule, groups, category }) => ({
    userId: auth.userDetails.userId,
    groupId: auth.userDetails.groupId,
    vat: rule.vat,
    user: auth.userDetails,
    orgId:auth.userDetails.organizationId,
    customerListData: catgCustomer.customerListData,
    countries:auth.countries,
    clearbit1: distributor.clearbit1,
    currencies: auth.currencies,
    country: countrys.country,
    //  groupUsers: groups.groupUsers,
    // customer: category.customer,
    addingDistributor: distributor.addingDistributor
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addDistributor,
            setClearbitData1,
            getCountry,
            getCustomer,
            //  getVat,
            getCurrency,
            // getUserById,
            // getCustomer
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);
