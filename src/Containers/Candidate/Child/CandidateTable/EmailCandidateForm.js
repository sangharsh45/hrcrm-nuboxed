import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
import { Button, Switch } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addCandidateEmail, getFilteredEmailContact } from "../../CandidateAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import { getCustomerList } from "../../../Customer/CustomerAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ChooseCandidateEmailTable from "./ChooseCandidateEmailTable";



import dayjs from "dayjs";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";

/**
 * yup validation scheme for creating a opportunity
 */
const emailCandidateSchema = Yup.object().shape({
    // tag_with_company: Yup.string().required("Select Company"),
    // billing: Yup.string().required("Input needed!"),
    contact1: Yup.string().required("Select Contact"),
    customer1: Yup.string().required("Select Contact"),
  });


class EmailCandidateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          files: null,
          flag: null,
          status: "done",
          vendor: false,
          customer: false,
        };
      }
      handleVendor = (checked) => {
        this.setState({ vendor: checked });
      };
       onChange = (value) => {
        console.log(value);
        this.setState({
          option: value,
        });
      };
      onChange1 = (value) => {
        console.log(value);
        this.setState({
          option1: value,
        });
      };
      onChange2 = (value) => {
        ////debugger;
        console.log(value);
        this.setState({
          option2: value,
        });
      };

      handleReset = (resetForm) => {
        this.props.setEmailModalVisible(false);
        resetForm();
        this.setState({ editorState: EditorState.createEmpty() });
      };
      handleRemove = ({ }) => {
        ////debugger
        console.log(this.state.flag);
        if (this.state.flag === true) {
          return this.setState({ file: null });
        }
        console.log(this.state.files);
      };
      onEditorStateChange = (editorState) => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        this.setState({ editorState });
      };
      createCallback = () => {
        this.setState({ editorState: EditorState.createEmpty(), edit: true }, () =>
          this.props.callback()
        );
      };
      onFileChoose = (file) => {
        //debugger;
    
        console.log(file);
        if (file.status !== "uploading") {
          this.setState({
            files: file.file.originFileObj,
            flag: true,
          });
        }
      };
      handleReset = (resetForm) => {
        this.props.setEmailModalVisible(false);
        resetForm();
        this.setState({ editorState: EditorState.createEmpty() });
      };
      onEditorBlank = () => {
        ////debugger;
        // this.setState({ editorState: EditorState.createEmpty() });
      };
      getcontactOptions = (filterOptionKey, filterOptionValue) => {
        const contactOptions =
          this.props.filteredContact.length &&
          this.props.filteredContact
            .filter((option) => {
              if (
                option.customerId === filterOptionValue &&
                option.probability !== 0
              ) {
                return option;
              }
            })
            .map((option) => ({
              label: option.fullName || "",
              value: option.contactId,
            }));
    
        return contactOptions;
      }

  componentDidMount() {
    const { getFilteredEmailContact, getCustomerList, userId } = this.props;
    getFilteredEmailContact(userId);
    getCustomerList(userId)
  }

  render() {

    const customerOption = this.props.customerByList.map((item) => {
        return {
          label: item.name || "",
          value: item.customerId,
        };
      });

 



    const {
    //   user: { userId },
      candidateDate,
      onboardDate,
      sendEmail
     
    } = this.props;
    const { editorState, placeholder } = this.state;
    // console.log("profile",this.props.profileId);
    return (
      <>
          <Formik
            enableReinitialize
            initialValues={{
              subject: "",
              candidateIds: this.props.selectedRowKeys,
              body: "",
              // cc: [],
              // bcc: [],
              // to: "",
              from: "",
              message: "",
              customerId: "",
              contactId: "",
              customer1: "",
              contact1: "",
              customer2: "",
              contact2: "",
              contact3: "",
              customer3: "",
              vendor: 0 ,
              worktype: this.state.vendor ? "Vendor" : "Customer",
              emailInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].emailInd,

              mobileNoInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].mobileNoInd,
              nameInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].nameInd,

              roleInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].roleInd,
              skillInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].skillInd,
              availableDateInd: this.props.chooseCandidateEmail.length && this.props.chooseCandidateEmail[0].availableDateInd,

            }}
            // validationSchema={NoteSchema}
            validationSchema={emailCandidateSchema}
            onSubmit={(values, { resetForm }) => {
              ////debugger
              console.log(
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
              );
              const htmlBody = draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              );
              //   const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

              console.log({ ...values, cc: [values.cc], bcc: [values.bcc] });
              const emailFormData = new FormData();
              //   emailFormData.append("to", new Array(values.to));
              //   emailFormData.append("cc", new Array(values.cc));
              //   emailFormData.append("bcc", new Array(values.bcc));
              //   emailFormData.set("subject", values.subject);
              //   emailFormData.set("from", values.from);
              //   emailFormData.set("body", htmlBody);
              //   emailFormData.set("userId", userId);
              //   emailFormData.set("orgId", organizationId);
              //   emailFormData.set("contactId", contactId);
              //   emailFormData.append("attachment", this.state.files);
              console.log(this.state.files);
              console.log(emailFormData);
              //   sendEmail(emailFormData, this.onEditorBlank(), () =>
              //     this.handleReset(resetForm)
              //   );emailCandidateSchema

              this.props.addCandidateEmail({
                ...values,
                message: htmlBody,
                worktype: this.state.vendor ? "Vendor" : "Customer",

                //  cc: [values.cc], 
                //  bcc: [values.bcc], 
                //attachment: this.state.file 
              },
                //  () => setEmailModalVisible(false)
              )
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
            }) => {
              const empty = values.to;
              console.log(empty);

              return (
                <Form className="form-background">
                  <FlexContainer style={{ width: "15%", justifyContent: "space-between" }}>
                    <StyledLabel>Select</StyledLabel>
                    <Switch
                      checked={this.state.vendor}
                      onChange={this.handleVendor}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Vendor"
                      unCheckedChildren="Customer"
                    />
                  </FlexContainer>
                  <Spacer /><Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "3%" }}><StyledLabel>To</StyledLabel></div>
                    <div style={{ width: "26%" }}>
                      <Field
                        // style={{ width: "7%" }}
                        name="customer1"
                        isRequired
                        //selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.customer"
                            defaultMessage={this.state.vendor ? "Vendor" : "Customer"}
                          />
                        }
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={Array.isArray(customerOption) ? customerOption : []}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "29%", marginRight: "29em" }}>
                      <Field
                        name="contact1"
                        isRequired
                        //selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.contact"
                            defaultMessage="Contact"
                          />
                        }
                        // component={SearchSelect}
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            this.getcontactOptions("customer1", values.customer1)
                          )
                            ? this.getcontactOptions("customer1", values.customer1)
                            :
                            []
                        }
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "3%" }}>
                      <StyledLabel>Cc</StyledLabel>
                    </div>
                    <div style={{ width: "26%" }}>
                      <Field
                        name="customer2"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.customer"
                            defaultMessage={this.state.vendor ? "Vendor" : "Customer"}
                          />
                        }
                        component={SelectComponent}
                        options={Array.isArray(customerOption) ? customerOption : []}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "29%", marginRight: "29em" }}>
                      <Field
                        name="contact2"
                        //selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.contact"
                            defaultMessage="Contact"
                          />
                        }
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            this.getcontactOptions("customer2", values.customer2)
                          )
                            ? this.getcontactOptions("customer2", values.customer2)
                            :
                            []
                        }
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "3%" }}>
                      <StyledLabel>Bcc</StyledLabel>
                    </div>
                    <div style={{ width: "26%" }}>
                      <Field
                        name="customer3"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.customer"
                            defaultMessage={this.state.vendor ? "Vendor" : "Customer"}
                          />
                        }
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={Array.isArray(customerOption) ? customerOption : []}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "29%", marginRight: "29em" }}>
                      <Field
                        name="contact3"
                        //selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.contact"
                            defaultMessage="Contact"
                          />
                        }
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            this.getcontactOptions("customer3", values.customer3)
                          )
                            ? this.getcontactOptions("customer3", values.customer3)
                            :
                            []
                        }
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <Spacer />
                  <FlexContainer alignItems="center">
                    <span><FormattedMessage
                      id="app.subject"
                      defaultMessage="Subject"
                    /></span>
                    <Field
                      name="subject"
                      inlineLabel
                      labelWidth="6%"
                      placeholder="Enter subject"
                      component={InputComponent}
                      style={{ width: "60%" }}
                    />
                  </FlexContainer>
                  <ChooseCandidateEmailTable
                    chooseCandidateEmail={this.props.chooseCandidateEmail}
                  />
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: "12em",
                      overflow: "auto",
                      border: "0.06em solid #aaa",
                      padding: "0.31em 0.62em ",
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={placeholder || "Type here"}
                  />
                  <FlexContainer justifyContent="flex-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      // disabled={!values.to && values.cc && values.bcc}
                      // disabled={!empty.length}
                      loading={this.props.addingCandidateEmail}
                      style={{ marginTop: "1.62em" }}
                    >
                      {/* Send */}
                      <FormattedMessage id="app.send" defaultMessage="Send" />
                    </Button>
                  </FlexContainer>
                </Form>
              );
            }}
          </Formik> 
      </>
    );
  }
}

const mapStateToProps = ({ auth, opportunity, contact, customer ,candidate}) => ({
   
    userId: auth.userDetails.userId,
    user: auth.userDetails.user,
    customerByList:customer.customerByList,
    //customerByUserId: customer.customerByUserId,
    filteredContact: candidate.filteredContact,
    chooseCandidateEmail: candidate.chooseCandidateEmail,
    addingCandidateEmail: candidate.addingCandidateEmail
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCandidateEmail,
        getFilteredEmailContact,
        getCustomerList,
        // getCustomerListByUserId,
        // linktagCustomer
     
        //addCandidateDate

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailCandidateForm);
