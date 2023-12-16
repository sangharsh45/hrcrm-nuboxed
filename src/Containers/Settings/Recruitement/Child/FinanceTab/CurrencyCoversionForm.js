import React, { useState, useEffect, useMemo, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field,} from "formik";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { Spacer } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import moment from "moment";
// import { addDistributorOffer } from "../../ProductAction";

function CurrencyCoversionForm(props)  {

        const { distributorStartDate, distributorEndDate } = props;
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        currency:"",

                    }}
                    onSubmit={(values, { resetForm }) => {
                        // this.props.addDistributorOffer({
                        //     ...values,
                        // });
                        resetForm();
                    }
                    }
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
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >

                                    <div class="flex justify-between">
                                        <div style={{ width: "18%" }}>
                                            <Field
                                                isRequired
                                                name="currency"
                                                isColumn
                                                label="Reporting Currency"
                                                component={SelectComponent}
                                                inlineLabel
                                               options={["USD","EUR","GBP","INR"]}
                                                style={{
                                                    flexBasis: "80%",
                                                }}
                                            />
                                        </div>
                                        <div>
                                        <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={this.props.addingDistributorOffer}
                                    style={{
                                        marginTop: "20px",
                                        marginLeft: "286px",
                                    }}
                                >
                                    Submit
                                </Button>
                                </div>
                                    </div>
                                </div>
                            </div>

                     
                        </Form>
                    )}
                </Formik>
            </>
        );
}


const mapStateToProps = ({ product }) => ({
    // addingDistributorOffer: product.addingDistributorOffer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // setClearbitProductDistributorData,
            // addDistributorOffer,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyCoversionForm);
