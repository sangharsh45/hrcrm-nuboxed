import React, { useState, useEffect, useMemo, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { setClearbitProductData } from "../../../Product/ProductAction";
import * as Yup from "yup";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import moment from "moment";
import { updateDistributorOffer } from "../../ProductAction";

class UpdateDistributorOfferForm extends Component {

    render() {
        const { distributorStartDate, distributorEndDate } = this.props;

        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        productFullName: this.props.setEditingDistributorOffer.productFullName || "",
                        distributorOfferProductFullName: this.props.setEditingDistributorOffer.distributorOfferProductFullName || "",
                        distributorOfferProductQty: this.props.setEditingDistributorOffer.distributorOfferProductQty || "",
                        distributorProductQty: this.props.setEditingDistributorOffer.distributorProductQty || "",
                        distributorOfferProductId: this.props.setEditingDistributorOffer.distributorOfferProductId || "",
                        productId: this.props.setEditingDistributorOffer.productId || "",
                        distributorStartDate: distributorStartDate || moment(),
                        distributorEndDate: distributorEndDate || null,
                        distributorEndDate: moment(),
                    }}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        console.log(values);
                        let timeZoneFirst = "GMT+05:30";

                        let mytimeZone = timeZoneFirst.substring(4, 10);
                        console.log(mytimeZone);

                        var a = mytimeZone.split(":");
                        console.log(a);
                        var timeZoneminutes = +a[0] * 60 + +a[1];
                        console.log(timeZoneminutes);
                        if (!values.distributorEndDate) {
                            values.distributorEndDate = values.distributorStartDate;
                        }
                        let newStartDate = moment(values.distributorStartDate).format("YYYY-MM-DD");
                        console.log(newStartDate);
                        //Time calculation
                        let firstStartTime = moment(values.startTime).format(
                            "HH:mm:ss.SSS[Z]"
                        ); // getting start time from form input
                        console.log(firstStartTime);

                        let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
                        console.log(firstStartHours);

                        let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
                        console.log(timeEndPart);

                        var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
                        console.log(firstStartTimeSplit);

                        var minutes =
                            +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
                        console.log(minutes);

                        var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
                        console.log(firstStartTimeminutes);

                        let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
                        let m = firstStartTimeminutes % 60;
                        h = h < 10 ? "0" + h : h;
                        m = m < 10 ? "0" + m : m;
                        let finalStartTime = `${h}:${m}`;
                        console.log(finalStartTime);

                        let newStartTime = `${finalStartTime}${timeEndPart}`;
                        console.log(newStartTime);

                        let newEndDate = moment(values.distributorEndDate).format("YYYY-MM-DD");
                        let firstEndTime = moment(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
                        console.log(firstEndTime);
                        let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
                        console.log(firstEndHours);

                        var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
                        console.log(firstEndTimeSplit);
                        var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
                        console.log(endMinutes);
                        var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
                        console.log(firstEndTimeminutes);
                        let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
                        console.log(hr);
                        let mi = firstEndTimeminutes % 60;
                        console.log(hr);
                        hr = hr < 10 ? "0" + hr : hr;
                        mi = mi < 10 ? "0" + mi : mi;
                        let finalEndTime = `${hr}:${mi}`;
                        console.log(finalEndTime);
                        console.log(timeEndPart);
                        console.log(`${finalEndTime}${timeEndPart}`);

                        let newEndTime = `${finalEndTime}${timeEndPart}`;

                        this.props.updateDistributorOffer({
                            ...values,
                        },
                            this.props.setEditingDistributorOffer.distributorOfferId,
                        );

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
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >

                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "12%" }}>
                                            <Field
                                                isRequired
                                                name="distributorProductQty"
                                                isColumn
                                                placeholder="value1"
                                                component={InputComponent}
                                                inlineLabel
                                                // value={values.product}
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "80%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "35%" }}>
                                            <Field
                                                isRequired
                                                name="productFullName"
                                                placeholder={"product"}
                                                isColumn
                                                disabled="true"
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginTop: "31px" }}>=</div>

                                        <div style={{ width: "12%" }}>
                                            <Field
                                                isRequired
                                                name="distributorOfferProductQty"
                                                isColumn
                                                placeholder={"value2"}
                                                component={InputComponent}
                                                // value={values.startDate}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "80%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "33%" }}>

                                            <Field
                                                isRequired
                                                name="distributorOfferProductFullName"
                                                placeholder={"product"}
                                                isColumn
                                                disabled="true"
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>


                                    <Spacer style={{ marginBottom: "15px" }} />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="distributorStartDate"
                                                label="Start Date"
                                                isColumn
                                                component={DatePicker}
                                                value={values.distributorStartDate}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="distributorEndDate"
                                                label="End Date"
                                                component={DatePicker}
                                                isColumn
                                                value={values.distributorEndDate || values.startDate}
                                                defaultValue={moment("2015-01-01")}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                                disabledDate={(currentDate) => {
                                                    if (values.distributorStartDate) {
                                                        if (
                                                            moment(currentDate).isBefore(
                                                                moment(values.distributorStartDate)
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
                                    </FlexContainer>
                                </div>
                            </div>

                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.updateDistributorOfferById}
                                    style={{
                                        marginTop: "20px",
                                        marginLeft: "286px",
                                    }}
                                >
                                    Submit
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ product, distributor }) => ({
    setEditingDistributorOffer: product.setEditingDistributorOffer,
    updateDistributorOfferById: product.updateDistributorOfferById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateDistributorOffer,
            setClearbitProductData
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateDistributorOfferForm);
