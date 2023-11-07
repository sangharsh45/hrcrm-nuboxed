import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import { Spacer, StyledLabel } from '../../../../../Components/UI/Elements';
import { FlexContainer } from '../../../../../Components/UI/Layout';
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from '../../../../../Components/Forms/Formik/TextareaComponent';
import { Button, Tooltip, message } from 'antd';
import { addOrderForm, getContactDistributorList } from '../../AccountAction'
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const FormSchema = Yup.object().shape({
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
})
function AddOrderInAccount(props) {
    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })
    useEffect(() => {
        props.getContactDistributorList(props.distributorId)
    }, [])

    const [priority, setPriority] = useState("High")

    function handleButtonClick(type) {
        console.log(type)
        setPriority(type)
    }
    return (
        <Formik
            initialValues={{
                availabilityDate: "",
                deliveryDate: "",
                contactPersonId: "",
                paymentInTerms: "",
                comments: "",
                awbNo: "",
                deliverToBusinessInd: "",
                fullLoadTruckInd: "",
                privateInd: "",
                advancePayment: "",
                distributorId: props.distributorId,
                userId: props.userId,
                orderId: "",
                priority: priority || "",
                loadingAddress: [
                    {
                        address1: "",
                        addressId: "",
                        state: "",
                        city: "",
                        pinCode: "",
                        countryId: "",
                        latitude: "",
                        longitude: "",
                        country: "",
                    },
                ],

                unloadingAddress: [
                    {
                        address1: "",
                        addressId: "",
                        state: "",
                        city: "",
                        pinCode: "",
                        countryId: "",
                        latitude: "",
                        longitude: "",
                        country: "",
                    },
                ],

            }}

            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(priority)
                // const date1 = moment(values.deliveryDate).format("DD-MM-YYYY")
                // const date2 = moment(values.availabilityDate).format("DD-MM-YYYY")
                if (values.advancePayment < 100) {
                    props.addOrderForm({
                        ...values,
                        priority: priority || "",
                        // deliveryDate: `${date1}T20:00:00Z`,
                        // availabilityDate: `${date2}T20:00:00Z`,
                    });
                } else {
                    message.success("Advance payment should be less than 100")
                }
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <div>
                        <StyledLabel><h3> Pickup Address</h3></StyledLabel>

                        {/* <FieldArray
                            name="loadingAddress"
                            render={(arrayHelpers) => (
                                <AddressFieldArray1
                                    singleAddress
                                    arrayHelpers={arrayHelpers}
                                    values={values}
                                />
                            )}
                        /> */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="availabilityDate"
                                    label="Available Date "
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    disabledDate={(currentDate) => {
                                        const date = new Date()
                                        if (
                                            moment(currentDate).isBefore(moment(date).subtract(1, 'days'))
                                        ) {
                                            return true;
                                        } else {
                                            return false;
                                        }

                                    }}
                                    component={DatePicker}
                                    value={values.availabilityDate}

                                />
                            </div>
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="deliveryDate"
                                    label="Delivery Date "
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={DatePicker}
                                    value={values.deliveryDate}
                                    disabledDate={(currentDate) => {
                                        if (values.availabilityDate) {
                                            if (
                                                moment(currentDate).isBefore(
                                                    moment(values.availabilityDate)
                                                )
                                            ) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <Spacer />
                        <FlexContainer justifyContent="space-between">
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="paymentInTerms"
                                    label="Payment Terms"
                                    isColumn
                                    inlineLabel
                                    component={SelectComponent}
                                    options={["7", "15", "30"]}
                                />
                            </div>
                            <div style={{ width: "47%" }}>
                                <Field
                                    label="Contact Person"
                                    name="contactPersonId"
                                    placeholder="Value"
                                    component={SelectComponent}
                                    options={Array.isArray(contactOption) ? contactOption : []}
                                    inlineLabel
                                    width={"100%"}
                                    isColumn
                                />
                            </div>
                        </FlexContainer>
                        <Spacer />
                        <FlexContainer justifyContent="space-between">
                            <div style={{ width: "30%" }}>

                                <Field
                                    width={"100%"}
                                    name="advancePayment"
                                    label="Advance Payment(%)"
                                    isColumn
                                    inlineLabel
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "30%" }}>
                                <Field
                                    label="Air Way Bill"
                                    name="awbNo"
                                    component={InputComponent}
                                    inlineLabel
                                    width={"100%"}
                                    isColumn
                                />
                            </div>
                            <div style={{ width: "30%", marginTop: "2%" }}>
                                <StyledLabel>Priority</StyledLabel>
                                <FlexContainer justifyContent="spcae-between">
                                    <FlexContainer>
                                        <Tooltip title="High">
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                onClick={() => handleButtonClick("High")}
                                                style={{
                                                    backgroundColor:
                                                        priority === "High"
                                                            ? "red"
                                                            : "white",
                                                }}
                                            />
                                        </Tooltip>
                                        &nbsp;
                                        <Tooltip title="Medium">
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                onClick={() => handleButtonClick("Medium")}
                                                style={{
                                                    backgroundColor:
                                                        priority === "Medium"
                                                            ? "Orange"
                                                            : "white",
                                                }}
                                            />
                                        </Tooltip>
                                        &nbsp;
                                        <Tooltip title="Low">
                                            <Button
                                                type="primary"
                                                shape="circle"
                                                icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                onClick={() => handleButtonClick("Low")}
                                                style={{
                                                    backgroundColor:
                                                        priority === "Low"
                                                            ? "teal"
                                                            : "white",
                                                }}
                                            ></Button>
                                        </Tooltip>
                                    </FlexContainer>
                                </FlexContainer>
                            </div>

                        </FlexContainer>
                        <Spacer />
                        <FlexContainer justifyContent="space-between">
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="comments"
                                    label="Comment"
                                    width={"100%"}
                                    isColumn
                                    component={TextareaComponent}
                                />
                            </div>

                            <div style={{ width: "47%", margin: "67px 39px 17px -33px", display: "flex", justifyContent: "flex-end" }}>

                                <Button
                                    style={{
                                        backgroundColor: "#3695cd",
                                        color: "white",
                                        fontSize: "15px",
                                        padding: "0px 12px",
                                    }
                                    }
                                    htmlType="Submit"
                                >Save</Button>
                            </div>
                        </FlexContainer>
                    </div>

                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = ({ homeStepper, auth, distributor }) => ({
    contactDistributor: distributor.contactDistributor,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addOrderForm,
            getContactDistributorList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderInAccount);