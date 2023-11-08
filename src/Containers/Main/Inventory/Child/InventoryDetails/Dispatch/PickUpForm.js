import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import moment from "moment";
import { Button, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addPickupDate } from "../../../InventoryAction";

function PickUpForm(props) {


  return (
    <>
      <Formik
        initialValues={{
          orderPhoneId: props.orderPhoneId,
          dispatchReceivedInd: true,
          dispatchReceivedDate: ""
        }}
        onSubmit={(values) => {
          let newPickUpDate = moment(values.dispatchReceivedDate).format("YYYY-MM-DD");
          props.addPickupDate({
            ...values,
            dispatchReceivedDate: `${newPickUpDate}T00:00:00Z`,
          }, props.orderPhoneId,
            props.locationDetailsId);
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
            <div style={{ width: "50%" }}>
              <Field
                name="dispatchReceivedDate"
                label="Date"
                component={DatePicker}
                value={values.dispatchReceivedDate}
                isColumn
                isRequired
                width={"100%"}
                inlineLabel
              />
            </div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ inventory, auth }) => ({
  setEditingInventory: inventory.setEditingInventory,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addPickupDate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PickUpForm);
