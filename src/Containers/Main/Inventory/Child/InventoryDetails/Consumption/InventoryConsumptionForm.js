import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { MainWrapper } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { addInventoryConsumption } from "../../../InventoryAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { setClearbitPurchaseData } from "../../../../Suppliers/SuppliersAction";
import PurchaseClearbit from "../../../../../../Components/Forms/Autocomplete/PurchaseClearbit";
import moment from "moment";

function InventoryConsumption(props) {
  return (
    <>
      <Formik
        initialValues={{
          deliveryDate: moment(),
          suppliesFullName: "",
          quantity: 0,
          userId: props.userId,
          suppliesId: props.suppliesId,
          // shiftId: props.shiftId,
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.addInventoryConsumption(
            {
              ...values,
              locationDetailsId: props.locationDetailsId,
              suppliesId: props.suppliesId,
              deliveryDate: moment(values.deliveryDate).toISOString(),

              // startDate: `${newStartDate}T${newStartTime}`,
            },
            props.locationDetailsId
            // props.shiftId,//from headerPart
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
            <MainWrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "100%",
                  width: "100%",
                  alignItems: "end",
                }}
              >
                <div
                  style={{
                   // height: "100%",
                    width: "20%",
                  //  marginTop: "17px",
                  }}
                >
                  <Field
                    isRequired
                    name="label"
                    type="text"
                    label="Search"
                    width={"100%"}
                    placeholder="Start typing..."
                    isColumnWithoutNoCreate
                    setClearbitPurchaseData={props.setClearbitPurchaseData}
                    component={PurchaseClearbit}
                    inlineLabel
                    // style={{ flexBasis: "80%", width: "50%" }}
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                    width: "20%",
                   // margin: "2% 0%",
                  }}
                >
                  <Field
                    name="suppliesFullName"
                    disabled
                    label="Details"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                   width: "20%",
                  //  margin: "2% 0%",
                  }}
                >
                  <Field
                    isRequired
                    name="quantity"
                    label="Opening Inventory(in units)"
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                    width: "15%",
                   // margin: "2% 0%",
                  }}
                >
                  <Field
                    name="batchNumber"
                    label="Batch No."
                    type="number"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                    width: "13%",
                   // margin: "2% 0%",
                  }}
                >
                  <Field
                    name="deliveryDate"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    isRequired
                    value={values.deliveryDate}
                    inlineLabel
                  />
                </div>
                <div
                  style={{
                   // margin: "4.16% 0%",
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.addingInventoryConsumption}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </MainWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ inventory, auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  addingInventoryConsumption: inventory.addingInventoryConsumption,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  suppliesId: suppliers.clearbitPurchase.suppliesId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addInventoryConsumption,
      setClearbitPurchaseData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryConsumption);
