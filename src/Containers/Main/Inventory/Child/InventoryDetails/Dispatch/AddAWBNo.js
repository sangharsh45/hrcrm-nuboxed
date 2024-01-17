import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { FlexContainer } from '../../../../../../Components/UI/Layout';
import { createAwbNo } from "../../../InventoryAction"

const AddAWBNo = (props) => {
    console.log(props.formValue)
    return (
        <Formik
            initialValues={{
                awbNo: "",
                pickUp: props.formValue.pickUp || "",
                shipperId: props.formValue.shipperId || "",
                packages: props.formValue.packages || "",
                weight: props.formValue.weight || "",
                api: props.formValue.api || "",
                orderId: props.rowData.orderPhoneId,
                unloadingAddressId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].addressId || "",
                pickUpAddressId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].addressId || "",
                pickUpAddress: [
                    {
                        address1: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].address1 || "",
                        addressId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].addressId || "",
                        state: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].state || "",
                        city: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].city || "",
                        street: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].street || "",
                        postalCode: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].postalCode || "",
                        countryId: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].countryId || "",
                        latitude: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].latitude || "",
                        longitude: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].longitude || "",
                        country: props.rowData.pickUpAddress && props.rowData.pickUpAddress[0].country || "",
                    },
                ],
                loadingAddress: [
                    {
                        address1: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].address1 || "",
                        addressId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].addressId || "",
                        state: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].state || "",
                        city: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].city || "",
                        street: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].street || "",
                        postalCode: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].postalCode || "",
                        countryId: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].countryId || "",
                        latitude: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].latitude || "",
                        longitude: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].longitude || "",
                        country: props.rowData.unloadingAddresses && props.rowData.unloadingAddresses[0].country || "",
                    },
                ],


            }}

            // validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
                props.createAwbNo({
                    ...values,
                },
                    props.locationDetailsId
                )
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
                    <FlexContainer justifyContent="space-between">
                        <div class=" w-[60%]"  >
                            <Field
                                label="AWB"
                                name="awbNo"
                                component={InputComponent}
                                inlineLabel
                                width={"100%"}
                                isColumn
                            />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <Button
                                htmlType="Submit"
                                loading={props.addingReceivedUser}>
                                Add
                            </Button>
                        </div>
                    </FlexContainer>
                </Form>
            )}
        </Formik>
    );
}
const mapStateToProps = ({ inventory, shipper }) => ({
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createAwbNo
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddAWBNo);

