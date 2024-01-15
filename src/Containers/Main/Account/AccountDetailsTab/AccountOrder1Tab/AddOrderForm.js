import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import OrderClearbit from "../../../../../Components/Forms/Autocomplete/OrderClearbit";
// import {
// //   linkOrderByDistributorId,
// //   setClearbitOrderData,
// } from "../../../../DistributorAction";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";

const FormSchema = Yup.object().shape({
    label: Yup.string().required("Input required!"),
    quantity: Yup.string()
        .nullable()
        .required("Input required!"),
});
class AddOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: false,
            apply: false,
        };
    }
    handleApplyChange = (checked) => {
        this.setState({
            apply: checked,
        });
    };

    handleButtonChange = () => {
        this.setState({ button: !this.state.button });
    }
    render() {
        const { productId } = this.props;
        return (
            <>
                <Formik
                    initialValues={{
                        categoryName: "",
                        subCategoryName: "",
                        productFullName: "",
                        attributeName: "",
                        subAttributeName: "",
                        price: 0,
                        name: "",
                        quantity: "",
                        distributorAllowedMargin: 0,
                        distributorMaxMargin: 0,
                        tax: "",
                        consumerMaxMargin: 0,
                        consumerAllowedMargin: 0,
                        productId: productId,
                        consumerMarginType: "",
                        marginType: "",
                        distributorAllowedDiscount: 0,
                        distributorDiscountSubType: "",
                        distributorDiscountType: "",
                        distributorOfferInd: "",
                        distributorMaxDiscount: 0,
                        distributorOfferDetails: this.state.apply === true,
                        distributorId: this.props.distributorDistributorId,
                    }}
                //   validationSchema={FormSchema}
                //   onSubmit={(values, { resetForm }) => {
                //     if (((Number(values.distributorAllowedDiscount) <= Number(values.distributorMaxDiscount)) &&
                //       (Number(values.distributorAllowedDiscount) >= 0)) &&
                //       (((Number(values.distributorAllowedMargin) <= Number(values.distributorMaxMargin)) &&
                //         (Number(values.distributorAllowedMargin) >= 0))) &&
                //       (((Number(values.consumerAllowedMargin) <= Number(values.consumerMaxMargin)) &&
                //         (Number(values.consumerAllowedMargin) >= 0)))) {
                //       this.props.linkOrderByDistributorId(
                //         {
                //           ...values,
                //           productId: productId,
                //           distributorDiscountSubType: values.distributorDiscountSubType === true ? "Amount" : "Percentage",
                //           distributorDiscountType: values.distributorDiscountType === true ? "Cash" : "Cash",
                //           marginType: values.marginType === true ? "Amount" : "Percentage",

                //         },
                //         this.props.distributorDistributorId
                //       );

                //     } else {
                //       message.error("Value can not exceed defined maximum or be less than 0!")
                //     }
                //   }}

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
                        <Form>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        marginTop: "6%",
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <Field
                                        isRequired
                                        name="label"
                                        type="text"
                                        label="Search"
                                        placeholder="Start typing to search..."
                                        isColumnWithoutNoCreate
                                        setClearbitOrderData={this.props.setClearbitOrderData}
                                        component={OrderClearbit}
                                        inlineLabel
                                        style={{ flexBasis: "80%" }}
                                    />
                                    <Spacer style={{ marginTop: "1.25em" }} />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                disabled="true"
                                                name="categoryName"
                                                type="text"
                                                label="Category"
                                                inlineLabel
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                style={{
                                                    flexBasis: "80%",
                                                    // height: "29px",
                                                    // marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                        {/* <Spacer /> */}
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                disabled="true"
                                                name="subCategoryName"
                                                label="Sub Category"
                                                inlineLabel
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                style={{
                                                    flexBasis: "80%",
                                                    // height: "29px",
                                                    //marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    <Field
                                        disabled="true"
                                        name="name"
                                        label="Name"
                                        inlineLabel
                                        isColumn
                                        width={"100%"}
                                        component={InputComponent}
                                        style={{
                                            flexBasis: "80%",
                                            // height: "29px",
                                            // marginTop: "0px",
                                        }}
                                    />
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="attributeName"
                                                disabled="true"
                                                label="Attribute"
                                                isColumn
                                                width={"100%"}
                                                inlineLabel
                                                component={InputComponent}
                                                style={{
                                                    flexBasis: "80%",
                                                    //height: "29px",
                                                    //marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                disabled="true"
                                                name="subAttributeName"
                                                label="Sub Attribute"
                                                inlineLabel
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                style={{
                                                    flexBasis: "80%",
                                                    // height: "29px",
                                                    // marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                </div>
                                {/*<Spacer /> */}

                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="quantity"
                                                label="Units"
                                                type="number"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    // height: "29px",
                                                    // marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                disabled="true"
                                                name="price"
                                                label="Price"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "50%",
                                                    // height: "29px",
                                                    //marginTop: "0px",
                                                }}
                                            />
                                        </div>

                                    </FlexContainer>
                                    {/* </div>*/}
                                    {/* <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >*/}
                                    <Spacer style={{ marginTop: "1.25em" }} />
                                    {/*<FlexContainer justifyContent="space-between">
                   

                  </FlexContainer>*/}
                                    <div style={{ fontWeight: "bold" }}>Discount</div>
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "35%", fontWeight: "bold" }}>
                                            <Field
                                                name="distributorDiscountSubType"
                                                component={SwitchComponent}
                                                data={values.distributorDiscountSubType}
                                                checkedChildren={"Amount"}
                                                unCheckedChildren={"Percentage"}
                                                marginTop={"0.5em"}
                                                disabled={true}
                                            />
                                        </div>
                                        <div style={{ width: "27%" }}>
                                            <Field
                                                name="distributorAllowedDiscount"
                                                label="Value"
                                                placeholder={"Value"}
                                                isColumn
                                                component={InputComponent}
                                                use12Hours
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    // marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>

                                        <div style={{ width: "27%" }}>
                                            <Field
                                                name="distributorMaxDiscount"
                                                disabled="true"
                                                label="MaxDiscount"
                                                type="number"
                                                isColumn
                                                component={InputComponent}
                                                use12Hours
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    // marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer style={{ marginTop: "0.6em" }} />
                                    <div style={{ fontWeight: "bold" }}>Margin</div>
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "35%", fontWeight: "bold" }}>
                                            <Field
                                                name="marginType"
                                                component={SwitchComponent}
                                                data={values.marginType}
                                                checkedChildren={"Amount"}
                                                unCheckedChildren={"Percentage"}
                                                marginTop={"0.5em"}
                                                disabled={true}
                                            />
                                        </div>
                                        <div style={{ width: "27%" }}>
                                            <Field
                                                name="distributorAllowedMargin"
                                                label="Allowed"
                                                placeholder={"value"}
                                                isColumn
                                                component={InputComponent}
                                                use12Hours
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    // marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>

                                        <div style={{ width: "27%" }}>
                                            <Field
                                                name="distributorMaxMargin"
                                                disabled="true"
                                                label="Max"
                                                type="number"
                                                isColumn
                                                component={InputComponent}
                                                use12Hours
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    // marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer style={{ marginTop: "0.6em" }} />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{
                                            fontWeight: "bold", width: "19%",
                                            marginBottom: "0.625em", marginTop: "3%"
                                        }}>
                                            Offers
                                        </div>
                                        {values.distributorOfferInd ?
                                            <div style={{ width: "30%" }}>
                                                <Button
                                                    type="primary"
                                                    style={{ color: "tomato" }}
                                                    onClick={this.handleButtonChange}
                                                >
                                                    Check
                                                </Button>
                                            </div>
                                            : null}
                                        {this.state.button ?
                                            <div style={{ width: "50%", marginTop: "0.625em" }}>
                                                <Switch
                                                    style={{ width: "7.5em" }}
                                                    onChange={this.handleApplyChange}
                                                    checked={this.state.apply}
                                                    checkedChildren="Apply"
                                                    unCheckedChildren="Not Applied"
                                                />
                                            </div> : null}

                                    </FlexContainer>
                                    {this.state.button ?
                                        <FlexContainer justifyContent="space-between">
                                            <div style={{
                                                width: "95%",
                                                //  marginTop: "8px"
                                            }}>
                                                <Field
                                                    name="distributorOfferDetails"
                                                    isColumn
                                                    component={TextareaComponent}
                                                    use12Hours
                                                    inlineLabel
                                                    style={{
                                                        flexBasis: "80%",
                                                        // marginTop: "0px",
                                                        width: "100%",
                                                        border: "none",
                                                        boxShadow: "none"
                                                    }}
                                                />
                                            </div>

                                        </FlexContainer>
                                        : null}

                                </div>
                            </div>

                            <Spacer style={{ marginTop: "1.25em" }} />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.addingOrderByDistributorId}
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

const mapStateToProps = ({ auth, distributor }) => ({
    //   user: auth.userDetails,
    //   distributor: distributor.distributor,
    //   productId: distributor.clearbitOrder.productId,
    //   addingOrderByDistributorId: distributor.addingOrderByDistributorId,
    //   distributorDistributorId:
    //     distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            //   linkOrderByDistributorId,
            //   setClearbitOrderData,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddOrderForm);
