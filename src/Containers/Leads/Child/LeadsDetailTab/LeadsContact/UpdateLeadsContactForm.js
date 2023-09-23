import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, Icon, Tag, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../Components/UI/Elements";
import { ShowOrCollapse } from "../../../../../Components/Common";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { updateLeadsContact } from "../../../LeadsAction";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
// import {getDesignations} from "../../../../../Settings/Designation/DesignationAction";
// import {getDepartments} from "../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateLeadsContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().email("Enter a valid Email"),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateLeadsContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
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

  render() {
    const {
      user: { userId,  lastName },
      contactByLeadsId,
      updateLeadsContactById,
      updateLeadsContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
      customerId,
      tagWithCompany,
    } = this.props;
    // console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingLeadsContact.salutation || "",
            // designation: undefined,
            designationTypeId:this.props.setEditingLeadsContact.designationTypeId || "",
            description:this.props.setEditingLeadsContact.description || "",
            // department: undefined,
            departmentDetails: this.props.setEditingLeadsContact.departmentDetails || "",
            departmentId:this.props.setEditingLeadsContact.departmentId || "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: this.props.setEditingLeadsContact.tagWithCompany || "",
            firstName: this.props.setEditingLeadsContact.firstName || "",
            middleName:this.props.setEditingLeadsContact.middleName || "",
            lastName:this.props.setEditingLeadsContact.lastName || "",
            countryDialCode:  this.props.setEditingLeadsContact.countryDialCode ||
            this.props.user.countryDialCode,
             // countryDialCode1:  this.props.setEditingLeadsContact.countryDialCode1 ||
            // this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingLeadsContact.phoneNumber || "",
            mobileNumber: this.props.setEditingLeadsContact.mobileNumber || "",
            customerId:this.props.setEditingLeadsContact.customerId||"",
            email:this.props.setEditingLeadsContact.email || "",
            emailId: this.props.setEditingLeadsContact.emailId || "",
            linkedinPublicUrl:  this.props.setEditingLeadsContact.linkedinPublicUrl || "",
            address: [
              {
                addressId: this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].addressId : "",
                addressType: this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].addressType : "",
                address1:  this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].address1 : "",
                address2:  this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].address2 : "",
                town: "",
                street: this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].street : "",
                city: this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].city : "",
                postalCode: this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].postalCode : "",
                state:  this.props.setEditingLeadsContact.address.length ? this.props.setEditingLeadsContact.address[0].state : "",
                country: this.props.setEditingLeadsContact.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes:this.props.setEditingLeadsContact.notes || "",
          }}
          validationSchema={UpdateLeadsContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateLeadsContact(
              {
                ...values,
                contactId: this.props.contactId,
                
              },
              this.props.contactId,
              () => this.handleReset(resetForm)
            );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
              <Form className="form-background">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "45%",
                    }}
                  ><Spacer />
                    <FlexContainer flexWrap="no-wrap">
                      <FastField name="imageId" component={Upload} />
                      <div>
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "35%" }}>
                            <FastField
                              name="salutation"
                              type="text"
                              // label="Salutation"
                              label={
                                <FormattedMessage
                                  id="app.salutation"
                                  defaultMessage="Salutation"
                                />
                              }
                              options={["Mr.", "Ms.", "None"]}
                              component={SelectComponent}
                              inlineLabel
                              className="field"
                              isColumn
                            />
                          </div>
                          <div style={{ width: "63%" }}>
                            <FastField
                              isRequired
                              name="firstName"
                              // label="First Name"
                              label={
                                <FormattedMessage
                                  id="app.firstName"
                                  defaultMessage="First Name"
                                />
                              }
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                        </FlexContainer>
                        <Spacer />
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "40%" }}>
                            <FastField
                              name="middleName"
                              //label="Middle Name"
                              label={
                                <FormattedMessage
                                  id="app.middle"
                                  defaultMessage="Middle"
                                />
                              }
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                          <div style={{ width: "55%" }}>
                            <FastField
                              name="lastName"
                              //label="Last Name"
                              label={
                                <FormattedMessage
                                  id="app.lastName"
                                  defaultMessage="Last Name"
                                />
                              }
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                        </FlexContainer>
                      </div>
                    </FlexContainer>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="countryDialCode"
                          isColumnWithoutNoCreate
                          //label="Mobile #"
                          label={
                            <FormattedMessage
                              id="app.countryDialCode"
                              defaultMessage="Dial Code"
                            />
                          }
                          isColumn
                          selectType="dialCode"
                          component={SearchSelect}
                        //   defaultValue={{
                        //     value: this.props.user.countryDialCode,
                        //   }}
                        //   value={values.countryDialCode}
                          inlineLabel
                         />
                      </div>
                      <div style={{ width: "47%" }}>
                        <FastField
                          type="text"
                          name="mobileNumber"
                          //placeholder="Mobile #"
                          label={
                            <FormattedMessage
                              id="app.mobileNumber"
                              defaultMessage="Mobile #"
                            />
                          }
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                          isColumn
                          />
                      </div>
                    </FlexContainer>
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Phone No #"
                          label={
                            <FormattedMessage
                              id="app.countryDialCode1"
                              defaultMessage="Dial Code"
                            />
                          }
                          isColumn
                          component={SearchSelect}
                        //   defaultValue={{
                        //     value: this.props.user.countryDialCode,
                        //   }}
                        //   value={values.countryDialCode1}
                          inlineLabel
                          />
                      </div>
                      <div style={{ width: "47%" }}>
                        <FastField
                          type="text"
                          name="phoneNumber"
                          // placeholder="Phone #"
                          label={
                            <FormattedMessage
                              id="app.phoneNumber"
                              defaultMessage="Phone #"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                         />
                      </div>
                    </FlexContainer>

                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "100%" }}>
                        <FastField
                          isRequired
                          type="email"
                          name="emailId"
                          //label="Email"
                          label={
                            <FormattedMessage
                              id="app.emailId"
                              defaultMessage="Email"
                            />
                          }
                          className="field"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                         />
                      </div>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "100%" }}>
                        <FastField
                          type="text"
                          name="linkedinPublicUrl"
                          //label="Linkedin "
                          label={
                            <FormattedMessage
                              id="app.linkedinPublicUrl"
                              defaultMessage="Linkedin"
                            />
                          }
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                         />
                      </div>
                    </FlexContainer>
                    <Spacer />

                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <>
                        <Field
                    name="customerId"
                    selectType="customerList"
                    isColumnWithoutNoCreate
                    // label="Tag Company"
                    label={
                      <FormattedMessage
                        id="app.tagWithCompany"
                        defaultMessage="Tag Company"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    value={values.tagWithCompany}
                    // defaultValue={{ label: firstName, value: documentId }}
                    inlineLabel
                  />
                        </>
                      </div>
                      <div style={{ width: "47%" }}>
                        <FastField
                         name="designationTypeId"
                         //label="Designation"
                         label={
                           <FormattedMessage
                             id="app.designation"
                             defaultMessage="Designation"
                           />
                         }
                         selectType="designationType"
                           isColumn
                         component={SearchSelect}
                         value={values.designationTypeId}
                         isColumnWithoutNoCreate
                         inlineLabel
                        />
                     </div>
                     <div style={{ width: "100%" }}>
                      <FastField
                        name="departmentId"
                        //label="Department"
                        label={
                          <FormattedMessage
                            id="app.department"
                            defaultMessage="Department"
                          />
                        }
                        isColumn
                        isColumnWithoutNoCreate
                        component={SearchSelect}
                        value={values.departmentId}
                        selectType="departmentName"
                        inlineLabel
                        />
                    </div>
                    </FlexContainer>
                    <Spacer />
                    <FlexContainer justifyContent="space-between"></FlexContainer>
                  </div>
                &nbsp;
                <div
                    style={{
                      height: "70%",
                      width: "45%",
                    }}
                  >                  
                    <Spacer style={{ marginBottom: "1.25em" }} />
                    <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <Field
                          // name="address[0].country"
                          name="countryName"
                          isColumnWithoutNoCreate
                          // label="Country"

                          label={
                            <FormattedMessage
                              id="app.countryName"
                              defaultMessage="Country"
                            />
                          }
                          component={SearchSelect}
                        //   defaultValue={{
                        //     value: this.props.user.countryName,
                        //   }}
                        //   value={values.countryName}
                          selectType="country"
                          inlineLabel
                          isColumn
                          width="100%"
                        />
                      </div>
                    </FlexContainer>
                    <Spacer style={{ marginTop: "1.25em" }} />                  
                    <Field
                      name="notes"
                      // label="Notes"
                      label={
                        <FormattedMessage id="app.notes" defaultMessage="Notes" />
                      }
                      width={"100%"}
                      isColumn
                      component={TextareaComponent}
                      />
                  </div>
                </div>
                
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updateLeadsContactById}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                    {/*                     
                    Create */}
                  </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, leads, opportunity,departments,designations }) => ({
  updateLeadsContactById: leads.updateLeadsContactById,
  updateLeadsContactByIdError: leads.updateLeadsContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  leadsId: leads.lead.leadsId,
//   departmentId:departments.departmentId,
//   designationTypeId:designations.designationTypeId,
setEditingLeadsContact:leads.setEditingLeadsContact,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
      updateLeadsContact,
   
    //   getDesignations,
    //   getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadsContactForm);
