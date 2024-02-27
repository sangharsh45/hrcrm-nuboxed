import { Field, Form, Formik } from 'formik'
import React, { useEffect, lazy, Suspense } from 'react'
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { getAllProductList, saveUnitForCatalogueItem } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const CheckInInventoryLocation = (props) => {
    useEffect(() => {
        // props.getAllProductList()
    }, [])

    const catalogueOption = props.allProduct.length && props.allProduct
        .sort(function (a, b) {
            var nameA = a.projectName; // ignore upper and lowercase
            var nameB = b.projectName; // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        }).map((item) => {
            return {
                label: item.name,
                value: item.productId
            }
        })


    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{

                }}

            // onSubmit={(values, { resetForm }) => {
            //     console.log(values)
            //     props.saveUnitForCatalogueItem(
            //         {
            //             ...values,
            //             distributorId: props.distributorId,
            //             orderId: props.productionOrderId.orderId,
            //             orgId: props.orgId
            //         },
            //         props.distributorId,
            //         props.productionOrderId.orderId
            //     );
            //     resetForm();
            // }}
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
                        <div class="justify-between flex">
                            <div class="w-[33%]">
                                <Field
                                    name="productId"
                                    label={<FormattedMessage
                                        id="app.items"
                                        defaultMessage="Items"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    // component={SelectComponent}
                                    // onSelect={(e) => {
                                    //     console.log(e);
                                    //     handleProductList(e, setFieldValue);
                                    // }}
                                    // options={Array.isArray(catalogueOption) ? catalogueOption : []}
                                    style={{
                                        borderRight: "0.18em solid red",
                                    }}
                                />
                            </div>
                            <div class="w-[30%]">
                                <Field
                                    name="categoryName"
                                    label={<FormattedMessage
                                        id="app.location"
                                        defaultMessage="Location"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[30%]">

                                <Button
                                    type="primary"
                                    htmlType="submit"
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
    )
}
const mapStateToProps = ({ distributor, auth }) => ({
    allProduct: distributor.allProduct,
    orgId: auth.userDetails.organizationId,
    productionOrderId: distributor.productionOrderId,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getAllProductList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckInInventoryLocation);


