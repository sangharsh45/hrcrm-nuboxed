import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Icon, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
// import { getCurrency } from "../../../Auth/AuthAction"
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
// import { getCustomer } from "../../../Settings/Category/CategoryAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
// import Flag from "../../../Components/Forms/Formik/Flag";
import { updateDistributor } from "./AccountAction";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const DistributorSchema = Yup.object().shape({
    name: Yup.string().required("Input needed!"),
    country: Yup.string().required("Input needed!"),
    phoneNo: Yup.string().required("Input needed!"),
});

class UpdateAccountForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vatInd: false,
        }
    }

    componentDidMount() {
        this.props.getCountry();
        // this.props.getCurrency()
        // this.props.getCustomer()
    }
    handleVatCheckBox() {
        this.setState({ vatInd: true })
    }

    render() {
        const CountryOptions = this.props.countries.map((item) => {
            return {
              label: `${item.country_name || ""}`,
              value: item.country_id,
            };
          });
        // const customerOption = this.props.customer.map((item) => {
        //     return { 
        //         label: item.clientName || "",
        //         value: item.clientId,
        //     };
        // })
        const currencyOption = this.props.currencies.map((item) => {
            return {
                label: item.currencyName || "",
                value: item.currencyName,
            };
        })
        return (
            <>
                <Formik
                    initialValues={{
                        userId: this.props.userId,
                        name: this.props.setEditingDistributor.name || "",
                        countryId: this.props.setEditingDistributor.countryId || "",
                        countryValue: this.props.setEditingDistributor.countryValue || "",
                        insuranceGrade: this.props.setEditingDistributor.insuranceGrade || "",
                        currencyPrice: this.props.setEditingDistributor.currencyPrice || "",
                        currency: this.props.setEditingDistributor.currency || "",
                        phoneNo: this.props.setEditingDistributor.phoneNo || "",
                        url: this.props.setEditingDistributor.url || "",
                        description: this.props.setEditingDistributor.description || "",
                        imageId: this.props.setEditingDistributor.imageId || "",
                        notes: this.props.setEditingDistributor.notes || "",
                        dialCode: this.props.setEditingDistributor.dialCode || "",
                        clientId: this.props.setEditingDistributor.clientId || "",
                        // address: [
                            // {
                              // country:setEditingCustomer.country || "",
                            //   addressId: this.props.setEditingDistributor.address.address[0].addressId || "",
                            //   address1: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].address1 : "",
                            //   address2:  this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].address2 : "",
                            //   street:  this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].street : "",
                            //   city:  this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].city : "",
                            //   state:  this.props.setEditingDistributor.address.address[0].state || "",
                            //   country: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].country : "",
                            //   postalCode:  this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].postalCode : "",             
                            // },
                        //   ],
                       
                        address: [
                            {
                                addressId: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].addressId : "",
                                addressType: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].addressType : "",
                                address1: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].address1 : "",
                                address2: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].address2 : "",
                                town: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].town : "",
                                street: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].street : "",
                                city: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].city : "Null",
                                state: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].state : "",
                                pinCode: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].pinCode : "",
                                country: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].country : "",
                                dialCode: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].dialCode : "",
                                latitude: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].latitude : "",
                                longitude: this.props.setEditingDistributor.address.length ? this.props.setEditingDistributor.address[0].longitude : "",
                            },
                        ],
                    }}
                    validationSchema={DistributorSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        this.props.updateDistributor(
                            {
                                ...values,
                            },
                            this.props.setEditingDistributor.distributorId,
                            
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
                                        placeholder="Start typing..."
                                        isColumn
                                        inlineLabel
                                    />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode"
                                                label="Dail Code"
                                                isColumn
                                                width={"100%"}
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                defaultValue={{
                                                    // label: (
                                                    //     <Flag />
                                                    // ),
                                                }}
                                                inlineLabel
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                name="phoneNo"
                                                label="Mobile #"
                                                placeholder="Phone #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Field
                                        isRequired
                                        name="url"
                                        type="text"
                                        label="Website"
                                        width={"100%"}
                                        component={InputComponent}
                                        // placeholder="Start typing..."
                                        isColumn
                                        inlineLabel
                                    />
                                    <Spacer />
                                    <FlexContainer justify-content="space-between">
                                        <div>
                                            <b>VAT Validity</b>
                                            <Checkbox
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div><b>VAT</b></div>
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="country"
                                                label="Country"
                                                isColumn
                                                inlineLabel
                                                component={SelectComponent}
                                                // options={[]}
                                                options={Array.isArray(CountryOptions) ? CountryOptions : []}
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
                                    <Field
                                        name="insuranceGrade"
                                        type="text"
                                        label="Insurance Grade"
                                        width={"100%"}
                                        component={InputComponent}
                                        isColumn
                                        inlineLabel
                                    />
                                    <FlexContainer justifyContent="space-between">
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
                                                options={[]}
                                                // options={Array.isArray(currencyOption) ? currencyOption : []}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                label="Payment Terms"
                                                name="payment"
                                                placeholder="Price"
                                                component={SelectComponent}
                                                options={["7", "15", "21"]}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="clientId"
                                                label="Type"
                                                isColumn
                                                inlineLabel
                                                component={SelectComponent}
                                                options={[]}
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
                                    loading={this.props.updateDisributorById}
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

const mapStateToProps = ({ auth, distributor, rule, category }) => ({
    userId: auth.userDetails.userId,
    vat: rule.vat,
    currencies: auth.currencies,
    setEditingDistributor: distributor.setEditingDistributor,
    updateDisributorById: distributor.updateDisributorById,
    countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCountry,
           // getCurrency,
            updateDistributor,
            //getCustomer
        },
        dispatch
    );
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateAccountForm);


