import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, Icon, Tag, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { HeaderLabel, Spacer } from "../../../../Components/UI/Elements";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { ShowOrCollapse } from "../../../../Components/Common";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateContact } from "../../ContactAction";
import Upload from "../../../../Components/Forms/Formik/Upload";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateContactForm extends Component {
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);

  }
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
      user: { userId, firstName, lastName },
      updateContact,
      updateContactById,
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
      designationTypeId,
      departmentId,
      defaultCustomers
    } = this.props;
    console.log(linkContact);
    const customerNameOption = this.props.customerData
    .sort((a, b) => {
      const libraryNameA = a.name && a.name.toLowerCase();
      const libraryNameB = b.name && b.name.toLowerCase();
      if (libraryNameA < libraryNameB) {
        return -1;
      }
      if (libraryNameA > libraryNameB) {
        return 1;
      }
  
      // names must be equal
      return 0;
    }
  )
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });
    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingContact.salutation || "",
            designationTypeId: this.props.setEditingContact.designationTypeId || "",
            description: this.props.setEditingContact.description || "",
            departmentId: this.props.setEditingContact.departmentId || "",
            departmentDetails:
              this.props.setEditingContact.departmentDetails || "",
            userId: this.props.userId,
            firstName: this.props.setEditingContact.firstName || "",
            middleName: this.props.setEditingContact.middleName || "",
            lastName: this.props.setEditingContact.lastName || "",
            countryDialCode:
              this.props.setEditingContact.countryDialCode ||
              this.props.user.countryDialCode,
            countryDialCode1:
              this.props.setEditingContact.countryDialCode1 ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingContact.phoneNumber || "",
            mobileNumber: this.props.setEditingContact.mobileNumber || "",
            emailId: this.props.setEditingContact.emailId || "",
            customerId:this.props.setEditingContact.customerId||"",
            linkedinPublicUrl:
              this.props.setEditingContact.linkedinPublicUrl || "",
              address: [
              {
                addressId: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].addressId : "",
                address1: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].address1 : "",
                street:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].street : "",
                city:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].city : "",
                state:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].state : "",
                postalCode:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].postalCode : "",
              },
            ],
            notes: this.props.setEditingContact.notes || "",
          }}
          validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateContact(
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
              <div class=" flex justify-between overflow-scroll "
              >
                <div class=" h-full w-1/2"
                >
                 <div class=" flex  flex-nowrap">
                    <FastField name="imageId" component={Upload} />
                    <div>
                    <div class=" flex justify-between">
                        <div class=" w-2/5">
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
                        <div class=" w-1/2">
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
                      </div>
                      <div class=" flex justify-between">
                        <div class=" w-2/5">
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
                        <div class=" w-1/2">
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
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
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
                        isRequired
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/6">
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
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobileNumber"
                            defaultMessage="Mobile #"
                          />
                        }
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
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
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/4">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        //placeholder="Phone #"
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
                  </div>

                 
                  <Spacer />
                  < div class=" flex justify-between">
                    <div class=" w-full">
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
                  </div>
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
                
                <div class=" h-3/4 w-5/12 "
                > 
                <div class=" flex  justify-between">
                <div class=" w-1/2">
                      <Field
                        name="customerId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.tagCompany"
                            defaultMessage="Tag Company"
                          />
                        }
                        component={SelectComponent}
                        isColumn
                        value={values.customerId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>
                <Spacer />
                <div class=" w-2/5">
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
                    // options={[
                    //   "Board",
                    //   "CXO",
                    //   "Director",
                    //   "Unit Head",
                    //   "Mid Level",
                    //   "Junior",
                    // ]}
                    isColumn
                    // component={SelectComponent}
                    component={SearchSelect}
                    value={values.designationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                  />
                </div>
              </div>
              <Spacer />
              <div class=" w-full">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      // options={[
                      //   "Business",
                      //   "Operations",
                      //   "IT",
                      //   "Finance",
                      //   "Recruitment",
                      //   "HR",
                      //   "Sales",
                      //   "Marketing",
                      //   "Procurement",
                      //   "Legal",
                      //   "Facilities",
                      //   "Alliance",
                      // ]}
                      // onChange={() => {
                      //   this.handleFieldClik();
                      // }}
                      isColumn
                      isColumnWithoutNoCreate
                      // component={SelectComponent}
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                 
                  <Spacer style={{ marginTop: "1.25em" }} />
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} > Address</HeaderLabel>
                  </div>
                    </div>
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

                <Spacer style={{ marginTop: "1.25em" }} />
                  <Spacer />
                 
                  <div class=" flex  justify-between">
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.ddress[0].city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                      </div> */}
                  </div>
                  <Spacer />
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.address[0].State"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer> */}
                </div>
              </div>
              <Spacer />
              <div class=" flex  justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />

                  {/* Update */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, team,customer, departments, designations, opportunity }) => ({
  setEditingContact: contact.setEditingContact,
  updateContactById: contact.updateContactById,
  updateContactByIdError: contact.updateContactByIdError,
  user: auth.userDetails,
  customerData:customer.customerData,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateContact,
      getCustomerData,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactForm);
