import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addShipper } from "./ShipperAction";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .email("Enter a valid Email")
    .required("Input needed!"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Too Short").max(10, "Too Large")
});

class AddShipperForm extends Component {
  render() {
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            userId: this.props.userId,
            name: "",
            dialCode: "",
            phoneNo: "",
            emailId: "",
            // mobileNo: "",
            shipById: "",
            address: [
              {
                addressId: "",
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                pinCode: "",
                country: "",
                latitude: "",
                longitude: "",

              },
            ],
            // address: "",
          }}
          validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            this.props.addShipper(
              {
                ...values,
              },
              this.props.userId,

              resetForm()
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
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    label="Name"
                    width={"100%"}
                    component={InputComponent}
                    // placeholder="Start typing..."
                    isColumn
                    inlineLabel
                  />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <FastField
                        name="dialCode2"
                        selectType="dialCode"
                        label="Dial Code"
                        isColumn
                        //margintop={"0.25em"}
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "68%" }}>
                      <FastField
                        type="text"
                        name="phoneNo"
                        placeholder="Phone #"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </FlexContainer>
                  <div style={{ width: "100%" }}>
                    <FastField
                      type="email"
                      name="emailId"
                      label="Email"
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <Field
                      name="shipById"
                      selectType="shipperName"
                      label="Ship By"
                      component={SearchSelect}
                      isColumn
                      value={values.shipById}
                      // defaultValue={{ label: firstName, value: documentId }}
                      inlineLabel
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <div>
                    <Spacer />
                    <FieldArray
                      name="address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          singleAddress
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingShipper}
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

const mapStateToProps = ({ auth, shipper }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addingShipper: shipper.addingShipper,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addShipper,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddShipperForm);
