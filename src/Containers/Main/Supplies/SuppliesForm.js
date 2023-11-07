import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import * as Yup from "yup";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { Formik, Form, Field } from "formik";
import { base_url } from "../../../Config/Auth";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import Upload from "../../../Components/Forms/Formik/Upload";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { CurrencySymbol } from "../../../Components/Common";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { addSupplies } from "./SuppliesAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SuppliesSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  cost: Yup.string().required("Input needed!"),
  hsn: Yup.string().required("Input needed!"),
});
class Suppliesform extends Component {

  componentDidMount() {
    this.props.getCurrency()
  }
  render() {
    const currencyType = this.props.currencies.map((item) => {
      return {
        label: item.currencyName || "",
        value: item.currencyName,
      };
    })
    console.log(this.props.groupId)
    return (
      <>
        <Formik
          initialValues={{
            attribute: "",
            attributeName: "",
            category: "",
            categoryName: "",
            description: "",
            imageId: "",
            name: "",
            hsn: "",
            subAttribute: "",
            subAttributeName: "",
            subCategory: "",
            subCategoryName: "",
            price: 0,
            tax: 0,
            cost: "",
            groupId: this.props.groupId,
            userId: this.props.userId,
            currencyName: ""
          }}
          validationSchema={SuppliesSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSupplies(
              {
                ...values,
                // baseComponentInd: this.state.baseComponent,
              },
              this.props.groupId
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
            <Form class="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <FlexContainer flexWrap="no-wrap">
                    <div style={{ width: "40%" }}>
                      <Spacer />
                      <Field name="imageId" component={Upload} />
                    </div>
                  </FlexContainer>
                  <Field
                    isRequired
                    name="categoryName"
                    label="Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="categoryName"
                    optionValue="categoryName"
                    url={`${base_url}/supplies/category`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Field
                    name="subCategoryName"
                    label="Sub Category"
                    placeholder="Start typing to search or create..."
                    optionLabel="subCategoryName"
                    optionValue="subCategoryName"
                    url={`${base_url}/supplies/subcategory`}
                    component={LazySelect}
                    isColumn
                    inlineLabel
                  />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <Field
                        name="attributeName"
                        label="Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url}/supplies/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                      <Field
                        name="subAttributeName"
                        label="Sub Attribute"
                        placeholder="Start typing to search or create..."
                        optionLabel="subAttributeName"
                        optionValue="subAttributeName"
                        url={`${base_url}/supplies/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                  </FlexContainer>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "50%",
                  }}
                >
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="name"
                        label="Name"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="hsn"
                        label="HSN"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                  </FlexContainer>

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="cost"
                        label="Cost"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="currencyName"
                        label="Currency"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={Array.isArray(currencyType) ? currencyType : []}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="netWeight"
                        label="Net Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="netUnit"
                        label="Units"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="grossWeight"
                        label="Gross Weight"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="grossUnit"
                        label="Units"
                        isColumn
                        inlineLabel
                        component={SelectComponent}
                        options={["g", "kg"]}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="reorder"
                        label="Re-order"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="dateOfManufacture"
                        label="Date of manufacture"
                        isColumn
                        inlineLabel
                        component={DatePicker}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <Field
                        name="description"
                        label="Description"
                        isColumn
                        width={"21.875em"}
                        component={TextareaComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  {/* <StyledLabel>Additional Info</StyledLabel> */}
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingPurchase}
                >
                  Create
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, supplies }) => ({
  addingPurchase: supplies.addingPurchase,
  groupId: auth.userDetails.groupId,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSupplies,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Suppliesform);
