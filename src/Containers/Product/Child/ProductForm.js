import React, { Component,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { base_url } from "../../../Config/Auth";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import Upload from "../../../Components/Forms/Formik/Upload";
import { addProduct } from "../ProductAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { getCurrency } from "../../Auth/AuthAction"
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { CurrencySymbol } from "../../../Components/Common";
import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  categoryName: Yup.string()
    .nullable()
    .required("Input required!"),
  subCategoryName: Yup.string()
    .nullable()
    .required("Input required!"),
  subAttributeName: Yup.string()
    .nullable()
    .required("Input required!"),
  attributeName: Yup.string()
    .nullable()
    .required("Input required!"),
});

class Productform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseComponent: false,
      percentage: true,
      amount: true,
      priceGst: true,
      marginCustomer: false,
      marginDistributor: true,
      subscriptionAvailable: false,
    };
  }
  callback = (restForm) => {
    console.log("callback");
    restForm();
  };
  handleComponentChange = (checked) => {
    this.setState({
      baseComponent: checked,
    });
    console.log(this.state.baseComponent);
  };

  handlePriceGstChange = (checked) => {
    console.log(checked);
    this.setState({
      priceGst: checked,
    });
  };

  handleAmountChange = (checked) => {
    console.log(checked);
    this.setState({
      percentage: checked,
    });
  };

  handleCustomerMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      marginCustomer: checked,
    });
  };

  handleDistributorMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      marginDistributor: checked,
    });
  };

  handleConsumerMarginChange = (checked) => {
    console.log(checked);
    this.setState({
      amount: checked,
    });
  };
  handleSubscriptionAvailableChange = (checked) => {
    console.log(checked);
    this.setState({
      subscriptionAvailable: checked,
    });
  };

  componentDidMount() {
    this.props.getCurrency()
  }
  render() {
    const { addingProduct, addProduct } = this.props;

    const currencyType = this.props.currencies.map((item) => {
      return {
        label: item.currencyName || "",
        value: item.currencyId,
      };
    })

    const currencySymbol = (
      <span>
        Price&nbsp;
        <CurrencySymbol currencyType={"INR"} />
      </span>
    );
    return (
      <>
        <Formik
          initialValues={{
            userId: this.props.userId,
            groupId: this.props.groupId,
            attribute: "",
            attributeName: "",
            currencyName: "",
            category: "",
            categoryName: "",
            description: "",
            quantity: 0,
            imageId: "",
            name: "",
            price: 0,
            distributorMaxMargin: 0,
            consumerMaxMargin: 0,
            subAttribute: "",
            subAttributeName: "",
            articleNo: "",
            subCategory: "",
            subCategoryName: "",
            tax: 0,
            unitInStock: "",
            expireDays: "",
            bestBefore: "",
            alert: "",
            marginType: this.state.percentage ? "Percentage" : "Amount",
            consumerMarginType: this.state.amount ? "Amount" : "Percentage",
            gstIncludeInd: this.state.priceGst ? true : false,
            customerMarginInd: this.state.marginCustomer ? false : true,
            distributorMarginInd: this.state.marginDistributor ? true : false,
            subscriptionInd: this.state.subscriptionAvailable ? true : false,
          }}
          validationSchema={ProductSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            addProduct(
              {
                ...values,
                marginType: this.state.percentage ? "Percentage" : "Amount",
                consumerMarginType: this.state.amount ? "Amount" : "Percentage",
                gstIncludeInd: this.state.priceGst ? true : false,
                customerMarginInd: this.state.marginCustomer ? true : false,
                distributorMarginInd: this.state.marginDistributor
                  ? true
                  : false,
                subscriptionInd: this.state.subscriptionAvailable
                  ? true
                  : false,
              },
              () => this.callback(resetForm),
              this.props.groupId,
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
                    <div
                      style={{
                        width: "40%",
                      }}
                    ><Spacer />
                      <Field name="imageId" component={Upload} />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "48%" }}>
                      <Field
                        isRequired
                        name="categoryName"
                        label="Category"
                        placeholder="Search or Create"
                        optionLabel="categoryName"
                        optionValue="categoryName"
                        url={`${base_url}/supplies/category`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="subCategoryName"
                        label="Sub Category"
                        placeholder="Search or Create"
                        optionLabel="subCategoryName"
                        optionValue="subCategoryName"
                        url={`${base_url}/supplies/subcategory`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <Field
                    name="name"
                    label="Name"
                    isColumn
                    width={"100%"}
                    inlineLabel
                    component={InputComponent}
                  />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "48%" }}>
                      <Field
                        name="attributeName"
                        label="Attribute"
                        placeholder="Search or Create"
                        optionLabel="attributeName"
                        optionValue="attributeName"
                        url={`${base_url}/supplies/attribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="subAttributeName"
                        label="Sub Attribute"
                        placeholder="Search or Create"
                        optionLabel="subAttributeName"
                        optionValue="subAttributeName"
                        url={`${base_url}/supplies/subattribute`}
                        component={LazySelect}
                        isColumn
                        inlineLabel
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
                        width={"100%"}
                        inlineLabel
                        component={SelectComponent}
                        options={["g", "kg"]}
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="palette"
                        label="Pallet"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={SelectComponent}
                        options={["Euro", "Block"]}
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
                        width={"100%"}
                        inlineLabel
                        component={SelectComponent}
                        options={Array.isArray(currencyType) ? currencyType : []}
                      />
                    </div>
                  </FlexContainer>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <Field
                        name="expireDays"
                        label="Expiry"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <Spacer />
                    <div style={{ width: "30%" }}>
                      <Field
                        name="bestBefore"
                        label="Best Before"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "30%" }}>
                      <Field
                        name="alert"
                        label="Alert(in days)"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel

                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <StyledLabel>Subscription Available ?</StyledLabel> &nbsp;
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={this.state.subscriptionAvailable}
                    onChange={this.handleSubscriptionAvailableChange}
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <Field
                        name="tax"
                        label="GST %"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel

                      />
                    </div>
                    <div
                      style={{
                        width: "39%",
                        fontWeight: "bold",
                      }}
                    >
                      Price Includes GST
                      <Switch
                        onChange={this.handlePriceGstChange}
                        checked={this.state.priceGst}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%", marginTop: "1.875em" }}>
                      <Switch
                        onChange={this.handleAmountChange}
                        checked={this.state.percentage}
                        checkedChildren="Percentage"
                        unCheckedChildren="Amount"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        name="distributorMaxMargin"
                        label="Margin(Max)"
                        type="number"
                        isColumn
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <div style={{ width: "100%" }}>
                    <StyledLabel>Margin applicable for B2C</StyledLabel>&nbsp;&nbsp;&nbsp;
                    <Switch
                      onChange={this.handleCustomerMarginChange}
                      checked={this.state.marginCustomer}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <Spacer />
                  <div style={{ width: "100%" }}>
                    <StyledLabel>Margin applicable for B2B</StyledLabel>&nbsp;
                    <Switch
                      onChange={this.handleDistributorMarginChange}
                      checked={this.state.marginDistributor}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <Spacer />
                  <div style={{ fontWeight: "bold" }}>
                    Applicable for B2C ONLY
                  </div>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%", marginTop: "1em" }}>
                      <Switch
                        onChange={this.handleConsumerMarginChange}
                        checked={this.state.amount}
                        checkedChildren="Amount"
                        unCheckedChildren="Percentage"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        // isRequired
                        name="consumerMaxMargin"
                        label="B2C Margin(Max)"
                        type="number"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        use12Hours
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <Field
                        name="description"
                        label="Description"
                        isColumn
                        width={"33.125em"}
                        component={TextareaComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                </div>
              </div>
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingProduct}
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

const mapStateToProps = ({ auth, product }) => ({
  addingProduct: product.addingProduct,
  addingProductError: product.addingProductError,
  addProductModal: product.addProductModal,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  groupId: auth.userDetails.groupId,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProduct,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Productform);
