import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import AddCatalogueTable from './AddCatalogueTable'
import { getAllProductList, saveUnitForCatalogueItem } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const AddCatalogueForm = (props) => {
    useEffect(() => {
        props.getAllProductList()
    }, [])

    const catalogueOption = props.allProduct.map((item) => {
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
                    type: props.toggle ? "Catalogue" : "Non-Catalogue"
                }}

                onSubmit={(values, { resetForm }) => {
                    props.saveUnitForCatalogueItem(
                        {
                            ...values,
                        },
                    );
                    resetForm();
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
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "50%" }}>
                                <Field
                                    name="paymentMode"
                                    label="Items"
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={SelectComponent}
                                    options={Array.isArray(catalogueOption) ? catalogueOption : []}
                                    style={{
                                        borderRight: "0.18em solid red",
                                    }}
                                />
                            </div>
                            <div style={{ width: "27%" }}>
                                <Field
                                    name="unit"
                                    label="Unit"
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "17%" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                // loading={props.addingPaidByDistributorId}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
                {/*  */}
            </Formik>
            <AddCatalogueTable />

        </>
    )
}
const mapStateToProps = ({ distributor }) => ({
    allProduct: distributor.allProduct
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getAllProductList,
    saveUnitForCatalogueItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueForm);


