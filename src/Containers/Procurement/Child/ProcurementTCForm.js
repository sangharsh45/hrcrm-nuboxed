import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";

class ProcurementTCForm extends Component {

    componentDidMount = () => {
   
    }

    render() {

        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        // termsOfPayment: orderTermsnCondition.termsOfPayment === "null" ? "" : orderTermsnCondition.termsOfPayment,
                        // applicant: orderTermsnCondition.applicant === "null" ? "" : orderTermsnCondition.applicant,
                        // offerValidity: orderTermsnCondition.offerValidity === "null" ? "" : orderTermsnCondition.offerValidity,
                        // deliveryTerms: orderTermsnCondition.deliveryTerms === "null" ? "" : orderTermsnCondition.deliveryTerms,
                        // installationTerms: orderTermsnCondition.installationTerms === "null" ? "" : orderTermsnCondition.installationTerms,
                        // beneficiary: orderTermsnCondition.beneficiary === "null" ? "" : orderTermsnCondition.beneficiary,
                    }}
                    //   validationSchema={CallSchema}
                    onSubmit={(values, { resetForm }) => {

                        this.props.addTnCInOrder(
                            {
                                ...values,
                                // projectOrderId: this.props.projectOrderId,
                                // userId: this.props.userId
                            },
                            // this.props.projectOrderId
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
                        <Form>
                            <div class="flex justify-between m-auto">
                                <div class="w-[30%]">
                                    <Field
                                        name="termsOfPayment"
                                        label="Terms of Payment"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                        
                                    />
                                </div>

                                <div class="w-[30%]">
                                    <Field
                                        name="applicant"
                                        label="Applicant/Buyer"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                                                            />
                                </div>
                                <div class="w-[30%]">
                                    <Field
                                        name="offerValidity"
                                        label="Offer Validity"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                    />
                                </div>

                            </div>
                            <div class="flex justify-between m-auto">
                                <div class="w-[30%]">
                                    <Field
                                        name="deliveryTerms"
                                        label="Delivery Terms"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                       
                                    />
                                </div>

                                <div class="w-[30%]">
                                    <Field
                                        name="installationTerms"
                                        label="Installation Terms:"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                    />
                                </div>
                                <div class="w-[30%]">
                                    <Field
                                        name="beneficiary"
                                        label="Beneficiary / Consigner / Manufacturer"
                                        isColumn
                                        width={"100%"}
                                        component={TextareaComponent}
                                        inlineLabel
                                    />
                                </div>

                            </div>
                        
                            <div class="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={this.props.addingTnCInOrder}
                                >
                                    Update
                                </Button>
                            </div>
                      


                        </Form>
                    )}
                </Formik>

            </>
        );
    }
}

const mapStateToProps = ({ order, auth }) => ({
    // orderTermsnCondition: order.orderTermsnCondition,
    // userId: auth.userDetails.userId,
    // addingTnCInOrder: order.addingTnCInOrder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // addTnCInOrder,
            // getTermsNConditionInOrder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementTCForm);

