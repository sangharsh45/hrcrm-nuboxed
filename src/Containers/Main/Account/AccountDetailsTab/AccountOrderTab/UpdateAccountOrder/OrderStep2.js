import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { addCarDetails } from "../../../AccountAction";
import DraggableUpload1 from "../../../../../../Components/Forms/Formik/DraggableUpload1";
import { FormattedMessage } from 'react-intl';

function OrderStep2(props) {
    const [xlUpdateInd, setxlUpdateInd] = useState(true)
    const handleKeepData = () => {
        setxlUpdateInd(!xlUpdateInd)
    }
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
                            type: "Non-Catalogue",
                            xlUpdateInd: xlUpdateInd ? false : true
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
                            <div class="justify-between flex w-5/12 mt-1">
                                <h2>
                                    <FormattedMessage
                                        id="app.Keepearlieruploadeddata"
                                        defaultMessage="Keep earlier uploaded data?"
                                    />
                                </h2>
                                <Switch
                                    onChange={handleKeepData}
                                    checked={xlUpdateInd}
                                    checkedChildren="Yes"
                                    unCheckedChildren="No"
                                />
                            </div>
                            <div class="justify-between flex">
                                <div class="h-full w-[47%]">
                                    <div class="mt-3">
                                        <Field
                                            name="excelId"
                                            isRequired
                                            component={DraggableUpload1}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div class="justify-end flex mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingCar}
                                >
                                    <FormattedMessage
                                        id="app.finish"
                                        defaultMessage="Finish"
                                    />
                                </Button>
                            </div>
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
    addingCar: distributor.addingCar
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
)(OrderStep2);

