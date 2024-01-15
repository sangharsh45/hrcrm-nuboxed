import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { addPaidOrder } from "../../../Account/AccountAction";
import moment from "moment";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { FormattedMessage } from "react-intl";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";

function DistributorPaidForm(props) {

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          date: moment(),
          paymentAmount: "",
          paymentMode: "",
          remarks: "",
          docId: "",
          userId: props.userId,
          transactionNumber: "",
          approveByFinanceInd: false,
          orderId: props.particularRowData.orderId,
        }}

        onSubmit={(values, { resetForm }) => {
          let newEndDate = moment(values.date).format("YYYY-MM-DD");
          props.addPaidOrder(
            {
              ...values,
              date: `${newEndDate}T00:00:00Z`,
            },
            props.particularRowData.orderId,
            props.distributorId,
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
         <div  class="justify-between flex">
              <div class="h-full w-full">
                <div class="justify-between">
                  <div class="w-[47%]">
                    <Field
                      name="paymentAmount"
                      label={
                        <FormattedMessage
                          id="app.amount"
                          defaultMessage="Amount"
                        />}
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.paymentAmount}

                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="date"
                      label={
                        <FormattedMessage
                          id="app.date"
                          defaultMessage="Date"
                        />}
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={DatePicker}
                      value={values.date}
                    />
                  </div>

                </div>

                
                <div class="flex justify-between mt-2">
                  <div class="w-[47%]">
                    <Field
                      name="transactionNumber"
                      label={
                        <FormattedMessage
                          id="app.transactionid"
                          defaultMessage="Transaction ID"
                        />}
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.transactionNumber}
                   
                    />
                  </div>

                  <div class="w-[47%]">
                    <Field
                      name="paymentMode"
                      label={
                        <FormattedMessage
                          id="app.mode"
                          defaultMessage="Mode"
                        />}
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={SelectComponent}
                      options={["Cash", " Credit-Card", "Net Banking", "UPI"]}
                      style={{
                        borderRight: "0.18em solid red",
                      }}
                    />
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <div class="w-[47%]">
                    <Field
                      name="remarks"
                      label={
                        <FormattedMessage
                          id="app.reason"
                          defaultMessage="Reason"
                        />}
                      component={TextareaComponent}

                    />
                  </div>
                  <div class="w-[47%]">
                    <Field
                      name="docId"
                      label={
                        <FormattedMessage
                          id="app.documentId"
                          defaultMessage="Document Id"
                        />
                      }
                      isRequired
                      component={DragableUpload}
                    />
                  </div>
                </div>

              </div>
            </div>
        
            <div class="flex justify-end mt-3">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingPaidByDistributorId}
              >
               <FormattedMessage
                          id="app.submit"
                          defaultMessage="Submit"
                        />
                
              </Button>
            </div>
          </Form>
        )}
        {/*  */}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, distributor }) => ({
  userId: auth.userDetails.userId,
  distributorId: distributor.distributorDetailsByDistributorId.distributorId,
  addingPaidByDistributorId: distributor.addingPaidByDistributorId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPaidOrder,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorPaidForm);
