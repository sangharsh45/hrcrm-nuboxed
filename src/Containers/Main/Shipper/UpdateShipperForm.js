import React from "react";
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
import { updateShipper } from "./ShipperAction";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .email("Enter a valid Email")
    .required("Input needed!"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Too Short").max(10, "Too Large")
});
function UpdateShipperForm(props) {
    console.log( props.rowdata.shipperId)
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          userId: props.userId,

          name: props.setEditingShipper.name || "",
          dialCode: props.setEditingShipper.dialCode || "",
          phoneNo: props.setEditingShipper.phoneNo || "",
          emailId: props.setEditingShipper.emailId || "",
          mobileNo: props.setEditingShipper.mobileNo || "",
          imageId: props.setEditingShipper.imageId || "",
          shipById: props.setEditingShipper.shipById || "",
          // address: [
          //   {
          //     addressId: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].addressId
          //       : "",
          //     addressType: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].addressType
          //       : "",
          //     address1: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].address1
          //       : "",
          //     address2: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].address2
          //       : "",
          //     town: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].town
          //       : "",
          //     street: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].street
          //       : "",
          //     city: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].city
          //       : "Null",
          //     state: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].state
          //       : "",
          //     pinCode: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].pinCode
          //       : "",
          //     country: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].country
          //       : "",
          //     dialCode: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].dialCode
          //       : "",
          //     latitude: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].latitude
          //       : "",
          //     longitude: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].longitude
          //       : "",
          //   },
          // ],
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

          // address: [
          //   {
          //     addressId: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].addressId
          //       : "",
          //     addressType: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].addressType
          //       : "",
          //     address1: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].address1
          //       : "",
          //     address2: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].address2
          //       : "",
          //     town: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].town
          //       : "",
          //     street: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].street
          //       : "",
          //     city: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].city
          //       : "",
          //     state: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].state
          //       : "",
          //     pinCode: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].pinCode
          //       : "",
          //     country: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].country
          //       : "",
          //     dialCode: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].dialCode
          //       : "",
          //     latitude: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].latitude
          //       : "",
          //     longitude: props.setEditingShipper.addresses.length
          //       ? props.setEditingShipper.addresses[0].longitude
          //       : "",
          //   },
          // ],
        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.updateShipper(
            {
              ...values,
            },
            props.rowdata.shipperId,
            props.userId
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
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[33rem]">
          <Form class="form-background">
          <div class="flex justify-between max-sm:flex-col">
          <div class="h-full w-w47.5 max-sm:w-full">
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
                  style={{ flexBasis: "60%" }}
                />

                <Spacer style={{ marginTop: "1.25em" }} />
                <FlexContainer justifyContent="space-between">
                <div class="w-[30%] max-sm:w-[40%] ">
                  <label>Dial Code</label>
                  <div class="-ml-8">
                    <FastField
                      name="dialCode"
                      //label="Phone #"
                      isColumn
                      // margintop={"0.25em"}
                      width={"100%"}
                      selectType="dialCode"
                      component={SearchSelect}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
                    </div>
                  </div>
                  <div class="w-[68%] max-sm:w-[50%]">
                  <label>Phone #</label>
                    <FastField
                      type="text"
                      // isRequired
                      name="phoneNo"
                      //label="Phone #"
                      placeholder="Phone #"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                      style={{
                        flexBasis: "80%",
                        // height: "29px",
                        //marginTop: "0px",
                      }}
                    />
                  </div>
                </FlexContainer>
                <Spacer />
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
                    style={{
                      flexBasis: "80%",
                      // height: "29px",
                      // marginTop: "0px",
                    }}
                  />
                </div>


                <Spacer style={{ marginTop: "1.25em" }} />
                <label>Ship By</label>
                <div class="md:-ml-24 max-sm:-ml-12">
                <Field
                  name="shipById"
                  selectType="shipperName"
                  label="Ship By"
                  component={SearchSelect}
                  isColumn
                  // margintop={"0.25em"}
                  value={values.shipById}
                  // defaultValue={{ label: firstName, value: documentId }}
                  inlineLabel
                  style={{ flexBasis: "80%" }}
                />
                </div>
              </div>

              <div class="h-full w-w47.5 max-sm:w-full">
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
            <Spacer style={{ marginTop: "1.25em" }} />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.updateShipperById}
              >
                Update
              </Button>
            </FlexContainer>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, shipper }) => ({
  userId: auth.userDetails.userId,
  setEditingShipper: shipper.setEditingShipper,
  updateShipperById: shipper.updateShipperById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateShipper,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateShipperForm);
