import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { FlexContainer, MainWrapper } from "../../../../../../Components/UI/Elements";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import moment from "moment";
import {
  addConsumptionReason,
  getConsumptionReasonList,
} from "../../../InventoryAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
function ConsumptionReasonForm(props) {
  //   const reasonList = props.consumptionReasonList.map((item) => {
  //     return {
  //       label: item.name || null,
  //       value: item.id,
  //     };
  //   });
  return (
    <>
      <Formik
        initialValues={{
          date: moment(),
          locationDetailsId: props.locationDetailsId,
          suppliesId: props.setEditingInventoryConsumption.suppliesId || "",
          inStock: props.setEditingInventoryConsumption.quantity || "",
          userId: props.userId,
          units: "",
        }}
        // validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.addConsumptionReason({
            ...values,
            date: moment(values.date).toISOString(),
          });
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
            <MainWrapper>
            {/* <FlexContainer justifyContent="space-between"> */}
              <div
                style={{
                  display: "flex",
                  justifyContent:"space-evenly",
                  height: "100%",
                  width: "100%",
                  alignItems: "end"
                }}
              >
                <div
                  style={{
                   // height: "100%",
                    width: "35%",
                   // marginTop: "24px",
                   // marginLeft: "3%",
                  }}
                >
                  <Field
                    name="reasonId"
                    selectType="reasonType"
                    label="Reason"
                    component={SearchSelect}
                    isColumn
                   // margintop={"0.25em"}
                    value={values.reasonId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                   // style={{ flexBasis: "80%" }}
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                    width: "11%",
                   // margin: "2% 0%",
                  }}
                >
                  <Field
                    disabled="true"
                    name="quantity"
                    label="In Stock"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    value={values.inStock}
                    inlineLabel
                  />
                </div>
                <div
                  style={{
                    //height: "100%",
                    width: "11%",
                  // margin: "2% 0%",
                  }}
                >
                  <Field
                    name="units"
                    label="Units"
                    type="number"
                    placeholder={"Value"}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    isRequired
                  />
                </div>
                <div
                  style={{
                   // height: "100%",
                    width: "17%",
                   // margin: "2% 0%",
                  }}
                >
                  <Field
                    name="date"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    isRequired
                    value={values.date}
                    inlineLabel
                    // style={{
                    //   flexBasis: "80%",
                    //   height: "29px",
                    //   width: "100%",
                    //   marginTop: "0px",
                    // }}
                    // disabledDate={(currentDate) => {
                    //   if (values.manufactureDate) {
                    //     if (
                    //       moment(values.manufactureDate).isBefore(
                    //         moment(currentDate)
                    //       )
                    //     ) {
                    //       return true;
                    //     } else {
                    //       return false;
                    //     }
                    //   }
                    // }}
                  />
                </div>
                <div
                  style={{
                    //margin: "4% 0%",
                    width: "8%",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={props.addingConsumptionReason}
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

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  addingConsumptionReason: inventory.addingConsumptionReason,
  addingConsumptionReasonError: inventory.addingConsumptionReasonError,
  setEditingInventoryConsumption: inventory.setEditingInventoryConsumption,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  consumptionReasonList: inventory.consumptionReasonList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { addConsumptionReason, getConsumptionReasonList },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumptionReasonForm);
