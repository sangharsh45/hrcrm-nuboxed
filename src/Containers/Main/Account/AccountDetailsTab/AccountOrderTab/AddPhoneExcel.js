import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import * as Yup from "yup";
import { Formik, Form, Field, FastField } from "formik";
import { Spacer } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { addCarDetails } from "../../AccountAction"
import DraggableUpload1 from "../../../../../Components/Forms/Formik/DraggableUpload1";


function AddPhoneExcel(props) {

    return (
        <>
            <Formik
                initialValues={{
                    orderPhoneId: props.orderDetailsId,
                    excelId: "",
                    userId: props.userId,
                    distributorId: props.distributorId,
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.addCarDetails(

                        {
                            ...values,
                        },
                        props.distributorId
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
                    <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
                    <Form class="form-background">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "47%",
                                }}
                            ><Spacer />
                                <Field
                                    name="excelId"
                                    isRequired
                                    component={DraggableUpload1}
                                />
                            </div>

                        </div>
                        <Spacer />
                        <FlexContainer justifyContent="flex-end">
                            <Button
                                type="primary"
                                htmlType="submit"
                            // loading={props.uploadDocumentById}
                            >
                                Finish
                            </Button>
                        </FlexContainer>
                    </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ auth, distributor }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addCarDetails
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPhoneExcel);

