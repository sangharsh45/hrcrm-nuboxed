import { Field, Form, Formik } from 'formik'
import React, { useEffect, lazy, Suspense } from 'react'
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from '../../../../../Components/Forms/Formik/InputComponent';
import { Button } from 'antd';
import { getAllProductList, saveUnitForCatalogueItem } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
const AddCatalogueTable = lazy(() => import("./AddCatalogueTable"));

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
                            <div class="w-[30%]">
                                <Field
                                    name="categoryName"
                                    label={<FormattedMessage
                                        id="app.category"
                                        defaultMessage="Category"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[30%]">
                                <Field
                                    name="subCategoryName"
                                    label={<FormattedMessage
                                        id="app.subcategory"
                                        defaultMessage="Sub Category"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                        </div>
                        <div class="justify-between flex">
                            <div class="w-[27%]">
                                <Field
                                    name="attributeName"
                                    label={<FormattedMessage
                                        id="app.attribute"
                                        defaultMessage="Attribute"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%]">
                                <Field
                                    name="subAttributeName"
                                    label={<FormattedMessage
                                        id="app.subattribute"
                                        defaultMessage="Sub Attribute"
                                    />}
                                    disabled
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%]">
                                <Field
                                    name="quantity"
                                    label={<FormattedMessage
                                        id="app.unit"
                                        defaultMessage="Unit"
                                    />}
                                    isRequired
                                    isColumn
                                    inlineLabel
                                    width={"100%"}
                                    component={InputComponent}
                                />
                            </div>
                            <div class="w-[27%] mt-4">
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
            <Suspense fallback={"Loading"}>
                <AddCatalogueTable
                    distributorId={props.distributorId}
                    orderId={props.orderDetailsId}
                    toggle={props.toggle} />
            </Suspense>
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


