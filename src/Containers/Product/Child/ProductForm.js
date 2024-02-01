import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { base_url2 } from "../../../Config/Auth";
import { StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import Upload from "../../../Components/Forms/Formik/Upload";
import { addProduct } from "../ProductAction";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { getCurrency } from "../../Auth/AuthAction";
import { CurrencySymbol } from "../../../Components/Common";

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
    const { addingProduct, addProduct} = this.props;

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
            active: true,
            userId: this.props.userId,
            attribute: "",
            attributeName: "",
            category: "",
            categoryName: "",
            description: "",
            quantity: 0,
            imageId: "",
            name: "",
            price: 0,
            distributorAllowedMargin:0,
            distributorMaxMargin: 0,
            consumerAllowedMargin:0,
            consumerMaxMargin: 0,
            subAttribute: "",
            subAttributeName: "",
            articleNo:"",
            subCategory: "",
            subCategoryName: "",
            tax: 0,
            unitInStock: "",
            expireDays: "",
            bestBefore: "",
            alert: "",
            maxDiscount:0,
            maxDiscountValidDate:"",
            publishInd: true,
            marginType: this.state.percentage ? "Percentage" : "Amount",
            consumerMarginType: this.state.amount ? "Amount" : "Percentage",
            gstIncludeInd: this.state.priceGst ? true : false,
            customerMarginInd: this.state.marginCustomer ? false : true,
            distributorMarginInd: this.state.marginDistributor ? true : false,
            subscriptionInd: this.state.subscriptionAvailable ? true : false,
          }}
          // validationSchema={ProductSchema}
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
            <Form>
            <div class="flex justify-between">
              <div class="h-full w-[45%]">
                <div class="flex-nowrap">
                  <div class="w-[40%]" >
                    <Field name="imageId" component={Upload} />
                  </div>
                </div>
                <div class="mt-4">
                <Field
                  name="articleNo"
                  label="Article #"
                  placeholder="Article No"
                  isColumn
                  width={"100%"}
                  inlineLabel
                  component={InputComponent}
                  
                />
                </div>
                <div class="flex justify-between mt-4">
                 <div class="w-[48%]">
                <Field
                  isRequired
                  name="categoryName"
                  label="Category"
                  placeholder="Search or Create"
                  optionLabel="categoryName"
                  optionValue="categoryName"
                  url={`${base_url2}/product/category`}
                  component={LazySelect}
                  isColumn
                  inlineLabel
                  
                />
                </div>

                <div class="w-[47%]">
                <Field
                  name="subCategoryName"
                  label="Sub Category"
                  placeholder="Search or Create"
                  optionLabel="subCategoryName"
                  optionValue="subCategoryName"
                  url={`${base_url2}/product/subcategory`}
                  component={LazySelect}
                  isColumn
                  inlineLabel
                  
                />
                </div>
                </div>

                <div class="mt-3">
                <Field
                  name="name"
                  label="Name"
                  isColumn
                  width={"100%"}
                  inlineLabel
                  component={InputComponent}
                  
                />
                </div>
                <div class="flex justify-between mt-5">
                <div class="w-[48%]">
                    <Field
                      name="attributeName"
                      label="Attribute"
                      placeholder="Search or Create"
                      optionLabel="attributeName"
                      optionValue="attributeName"
                      url={`${base_url2}/product/attribute`}
                      component={LazySelect}
                      isColumn
                      inlineLabel
                      
                    />
                  </div>
                  <div class="w-[48%]">
                    <Field
                      name="subAttributeName"
                      label="Sub Attribute"
                      placeholder="Search or Create"
                      optionLabel="subAttributeName"
                      optionValue="subAttributeName"
                      url={`${base_url2}/product/subattribute`}
                      component={LazySelect}
                      isColumn
                      inlineLabel
                     
                    />
                  </div>
                </div>
                
                {/* <div class="flex justify-between mt-5">
                <div class="w-[30%]">
                    <Field
                      name="expireDays"
                      label="Expiry"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      
                    />
                  </div>
                  <div class="w-[30%] mt-3">
                    <Field
                      name="bestBefore"
                      label="Best Before"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      
                    />
                  </div>
                  <div class="w-[30%]" >
                    <Field
                      name="alert"
                      label="Alert(in days)"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      
                    />
                  </div>
                </div>
                <div class="mt-5">
                <StyledLabel>Subscription Available ?</StyledLabel> &nbsp;
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  checked={this.state.subscriptionAvailable}
                  onChange={this.handleSubscriptionAvailableChange}
                />
              </div> */}
              </div>
              <div class="h-full w-[45%]">
                {/* <Spacer style={{ marginTop: "0.625em" }} />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "29%" }}>
                    <Field
                      name="price"
                      label={currencySymbol}
                      component={InputComponent}
                      inlineLabel
                      isColumn
                      width={"100%"}
                     
                    />
                  </div>

                  <div style={{ width: "29%" }}>
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
                     // marginTop: "2px",
                    }}
                  >
                    Price Includes GST
                    <Switch
                      style={{                      
                      marginLeft: "0.3125em"
                     }}
                      onChange={this.handlePriceGstChange}
                      checked={this.state.priceGst}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                </FlexContainer>
                <Spacer style={{ marginTop: "0.625em" }} />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Switch
                      style={{ marginTop: "1.875em" }}
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
                <Spacer style={{ marginTop: "0.75em" }} />
                <div style={{ width: "100%" }}>
                <StyledLabel>Margin applicable for B2C</StyledLabel>&nbsp;&nbsp;&nbsp;
                  <Switch
                    style={{marginLeft: "0.3125em" }}
                    onChange={this.handleCustomerMarginChange}
                    checked={this.state.marginCustomer}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </div>
                <Spacer style={{ marginTop: "0.75em" }} />
                <div style={{ width: "100%" }}>
                <StyledLabel>Margin applicable for B2B</StyledLabel>&nbsp;
                  <Switch
                    style={{marginLeft: "0.3125em" }}
                    onChange={this.handleDistributorMarginChange}
                    checked={this.state.marginDistributor}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </div>
                <Spacer style={{ marginTop: "0.75em" }} />
                <div style={{ fontWeight: "bold" }}>
                  Applicable for B2C ONLY
                </div>
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Switch
                      style={{ marginTop: "1.875em" }}
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
                <Spacer style={{ marginTop: "1.25em" }} /> */}

                <div class="flex justify-between">
                  <div class="w-full">
                    <Field
                      name="description"
                      label="Description"
                      isColumn
                      width={"33.125em"}
                      component={TextareaComponent}
                      inlineLabel
                      
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class = "flex justify-end ">
              <Button
                type="primary"
                htmlType="submit"
                loading={addingProduct}
              >
                Create
              </Button>
            </div>
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
