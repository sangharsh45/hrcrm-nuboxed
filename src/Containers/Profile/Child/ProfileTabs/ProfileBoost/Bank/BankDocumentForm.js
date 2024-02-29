import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { addBankDetails } from "../../../../ProfileAction";
import { FormattedMessage } from "react-intl";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class BankDocumentForm extends Component {
  render() {
    const { addingBankDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            accountName:"",
            bankName: "",
            branchName: "",
            ifscCode: "",
            accountNo: "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addBankDetails(values, this.props.employeeId);

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
            <Form className="form-background">
              <div class=" w-full"
              >
                  <FastField name="imageId" component={Upload} />
                  <div class=" w-full"
              >
                  <FastField
                    name="accountName"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountName"
                        defaultMessage="Account Holder Name"
                      />
                    }
                    isColumn
                    margintop={"0.25em"}
                    component={InputComponent}
                    inlineLabel
                    //style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
               
                <div class=" w-full mt-3"
              >
                  <FastField
                    name="accountNo"
                    //label="Account Number"
                    label={
                      <FormattedMessage
                        id="app.accountNo"
                        defaultMessage="Account Number"
                      />
                    }
                    isColumn
                    margintop={"0.25em"}
                    selectType="number"
                    component={InputComponent}
                    inlineLabel
                   // style={{ flexBasis: "80%", width: "100%" }}
                  />
                </div>
                <div class=" flex mt-3">
                  <div class=" w-[47%]" >
                    <FastField
                      name="ifscCode"
                      //label="IFSC CODE"
                      label={
                        <FormattedMessage
                          id="app.ifscCode"
                          defaultMessage="SWIFT/IFSC Code"
                        />
                      }
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  
                  <div class=" w-[50%] ml-2" >
                    <FastField
                      name="branchName"
                      // label="Branch Name"
                      label={
                        <FormattedMessage
                          id="app.branchName"
                          defaultMessage="Branch Name"
                        />
                      }
                      type="text"
                      width={"100%"}
                      isColumn
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                </div>
                
                <div class=" mt-3 w-full" >
                  <FastField
                    isRequired
                    name="bankName"
                    //label="Bank Name"
                    label={
                      <FormattedMessage
                        id="app.bankName"
                        defaultMessage="Bank Name"
                      />
                    }
                    type="text"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    inlineLabel
                    />
                </div>
              </div>

            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingBankDetails}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({
  addingBankDetails: profile.addingBankDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addBankDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BankDocumentForm);
