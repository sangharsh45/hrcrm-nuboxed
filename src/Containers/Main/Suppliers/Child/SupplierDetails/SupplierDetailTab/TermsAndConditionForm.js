import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import { addTermsnCondition, getTermsnConditionOfPo } from "../../../SuppliersAction"
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

function TermsAndConditionForm(props) {

    useEffect(() => {
        props.getTermsnConditionOfPo(props.poSupplierDetailsId)
    }, [])

    return (
        <>
            <Formik
                initialValues={{
                    specialTerms: props.termsnconditionofpo.specialTerms || "",
                    delivery: props.termsnconditionofpo.delivery || "",
                    freight: props.termsnconditionofpo.freight || "",
                    packing: props.termsnconditionofpo.packing || "",
                    orderacceptance: props.termsnconditionofpo.orderacceptance || "",
                    warrenty: props.termsnconditionofpo.warrenty || "",
                    testCertificate: props.termsnconditionofpo.testCertificate || "",
                    payment: props.termsnconditionofpo.payment || ""
                }}
                onSubmit={(values, { resetForm }) => {
                    props.addTermsnCondition({
                        ...values,
                        userId: props.userId,
                        poSupplierDetailsId: props.poSupplierDetailsId
                    },
                        props.poSupplierDetailsId
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
                        <div class="flex justify-between">
                            <div class="w-[32%]">
                                <Field
                                    name="specialTerms"
                                    label={<FormattedMessage
                                        id="app.specialtermsandcondition"
                                        defaultMessage="Special terms and condition"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%]">
                                <Field
                                    name="delivery"
                                    label={<FormattedMessage
                                        id="app.delivery"
                                        defaultMessage="Delivery"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%]">
                                <Field
                                    name="freight"
                                    label={<FormattedMessage
                                        id="app.freight"
                                        defaultMessage="Freight"
                                    />}
                                    F isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="w-[32%]">
                                <Field
                                    name="packing"
                                    label={<FormattedMessage
                                        id="app.packing"
                                        defaultMessage="Packing"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%]">
                                <Field
                                    name="warrenty"
                                    label={<FormattedMessage
                                        id="app.warrenty"
                                        defaultMessage="Warrenty"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%]">
                                <Field
                                    name="testCertificate"
                                    label={<FormattedMessage
                                        id="app.testCertificate"
                                        defaultMessage="Test Certificate"
                                    />}
                                    F isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="w-[32%]">
                                <Field
                                    name="orderacceptance"
                                    label={<FormattedMessage
                                        id="app.orderacceptance"
                                        defaultMessage="Order Acceptance"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%]">
                                <Field
                                    name="payment"
                                    label={<FormattedMessage
                                        id="app.payment"
                                        defaultMessage="Payment"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={TextareaComponent}
                                />
                            </div>
                            <div class="w-[32%] mt-3.7rem">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingTermsnCondition}
                                >
                                    <FormattedMessage
                                        id="app.submit"
                                        defaultMessage="Submit"
                                    />
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ suppliers, plant, auth }) => ({
    termsnconditionofpo: suppliers.termsnconditionofpo,
    userId: auth.userDetails.userId,
    addingTermsnCondition: suppliers.addingTermsnCondition
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addTermsnCondition,
        getTermsnConditionOfPo
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TermsAndConditionForm);
