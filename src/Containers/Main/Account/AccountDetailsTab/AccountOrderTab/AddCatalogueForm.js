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

    function handleProductList(a, setFieldValue) {
        return props.allProduct.map((item) => {
            if (item.productId === a) {
                setFieldValue("productId", item.productId);
                setFieldValue("name", item.name);
                setFieldValue("categoryName", item.categoryName);
                setFieldValue("subCategoryName", item.subCategoryName);
                setFieldValue("attributeName", item.attributeName);
                setFieldValue("subAttributeName", item.subAttributeName)
            }
        });
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    type: "Catalogue",
                    productId: "",
                    quantity: "",
                    productName: "",
                    categoryName: "",
                    subCategoryName: "",
                    attributeName: "",
                    subAttributeName: "",
                    distributorDiscountSubType: "amount",
                    marginType: "amount",
                    distributorDiscountType: "cash"
                }}

                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.saveUnitForCatalogueItem(
                        {
                            ...values,
                            distributorId: props.distributorId,
                            orderId: props.orderDetailsId
                        },
                        props.distributorId,
                        props.orderDetailsId
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
                            <div style={{ width: "33%" }}>
                                <Field
                                    name="productId"
                                    label="Items"
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={SelectComponent}
                                    onSelect={(e) => {
                                        console.log(e);
                                        handleProductList(e, setFieldValue);
                                    }}
                                    options={Array.isArray(catalogueOption) ? catalogueOption : []}
                                    style={{
                                        borderRight: "0.18em solid red",
                                    }}
                                />
                            </div>
                            <div style={{ width: "30%" }}>
                                <Field
                                    name="categoryName"
                                    label="Category"
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "30%" }}>
                                <Field
                                    name="subCategoryName"
                                    label="Sub Category"
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "27%" }}>
                                <Field
                                    name="attributeName"
                                    label="Attribute"
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "27%" }}>
                                <Field
                                    name="subAttributeName"
                                    label="Sub Attribute"
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "27%" }}>
                                <Field
                                    name="quantity"
                                    label="Unit"
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div style={{ width: "10%", marginTop: "15px" }}>
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
            <AddCatalogueTable
                distributorId={props.distributorId}
                orderId={props.orderDetailsId}
                toggle={props.toggle} />

        </>
    )
}
const mapStateToProps = ({ distributor }) => ({
    allProduct: distributor.allProduct,
    orderDetailsId: distributor.orderDetailsId,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getAllProductList,
    saveUnitForCatalogueItem
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddCatalogueForm);


