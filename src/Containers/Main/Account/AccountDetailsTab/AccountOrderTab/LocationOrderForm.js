import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { addLocationInOrder } from "../../AccountAction"

function LocationOrderForm(props) {
    // useEffect(() => {
    //     props.getInventory(props.userId);
    // }, []);
    moment.addRealYear = function addRealYear(y) {
        var fm = moment(y).add(10, "Y");
        var fmEnd = moment(fm).endOf("year");
        return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
            ? fm.add(10, "y")
            : fm;
    };
    // const locationsName = props.inventory.map((item) => {
    //     return {
    //         label: item.name || "",
    //         value: item.locationDetailsId,
    //     };
    // });
    return (
        <>
            <Formik
                initialValues={{
                    locationId: "",
                    userId: props.userId,
                    orderPhoneId: props.particularRowData.orderId
                }}
                onSubmit={(values, { resetForm }) => {
                    //debugger;
                    console.log(values);
                    props.addLocationInOrder({
                        ...values,
                        transferInd: 1,
                    },
                        props.particularRowData.distributorId);
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <div style={{ width: "90%" }}>
                                <Field
                                    name="locationId"
                                    type="text"
                                    width={"100%"}
                                    placeholder="Location"
                                    label="Location"
                                    isRequired
                                    component={SelectComponent}
                                    options={["1"]}
                                // options={Array.isArray(locationsName) ? locationsName : []}
                                />
                            </div>
                            <div style={{ marginTop: "15px", marginLeft: "14px" }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ inventory, plant, auth }) => ({
    // userId: auth.userDetails.userId,
    // inventory: inventory.inventory
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        // getInventory,
        addLocationInOrder
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationOrderForm);
