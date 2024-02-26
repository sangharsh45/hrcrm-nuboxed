import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addLinkContactByOpportunityId } from "../../Contact/ContactAction";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import {addContactInvest} from "../ContactInvestAction";
import {getInvestorData} from "../../Investor/InvestorAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

class ContactInvestForm extends Component {
  componentDidMount() {
    this.props.getInvestorData(this.props.userId);
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      whatsapp: false,
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
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
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
      addContactInvest,
      addingContact,
      customerId,
      designationTypeId,
      departmentId,
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
    } = this.props;


    const investorNameOption = this.props.investorData
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
        value: item.investorId,
      };
    });

    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            departmentId: this.props.departmentId,
            departmentDetails: "",
            userId: this.props.userId,
            investorId: this.props.investorId,
            opportunityId: this.props.opportunityId,
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            linkedinPublicUrl: "",
            sourceId:"",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.country,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            linkContact
              ? addLinkContactByOpportunityId(values, opportunityId, () =>
                this.handleReset(resetForm)
              )
              : addContactInvest(
                {
                  ...values,
                //   whatsapp: this.state.whatsapp ? "Different" : "Same",
                },
                this.props.userId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col ">
                <div class=" h-full w-w47.5 max-sm:w-wk">
                  <div class=" flex justify-between  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-2/5 max-sm:w-wk">
                          <FastField
                            name="salutation"
                            type="text"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div> */}
                        <div class=" w-1/2 max-sm:w-wk">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstname"
                                defaultMessage="firstname"
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
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-wk">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-1/2 max-sm:w-wk">
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastname"
                                defaultMessage="lastname"
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
                            id="app.email"
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
                            id="app.dialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        placeholder='+31'
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-[60%]">
                      <FastField
                        type="number"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobile"
                            defaultMessage="mobile #"
                          />
                        }
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    {/* <div class=" w-1/4 font-bold"
                    >
                      WhatsApp
                      <Switch
                        onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div> */}
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <FastField
                          name="countryDialCode1"
                          selectType="dialCode"
                          isColumnWithoutNoCreate
                          //label="Phone No #"
                          placeholder='+31'
                          label={
                            <FormattedMessage
                              id="app.dialCode"
                              defaultMessage="dialCode"

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
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
                        <FastField
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone #"
                          label={
                            <FormattedMessage
                              id="app.whatsapp"
                              defaultMessage="whatsapp #"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                        />
                      )}
                    </div>
                  </div>
                 
                  < div class=" flex justify-between mt-3">
                    <div class=" w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
</div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk " >
                  <div class=" flex  justify-between">
                    <div class=" w-w47.5">
                      <Field
                        name="investorId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.tagcompany"
                            defaultMessage="tagcompany"
                          />
                        }
                        component={SelectComponent}
                        isColumn
                        value={values.investorId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(investorNameOption) ? investorNameOption : []}
                        inlineLabel
                      />
                    </div>

                    <div class=" w-w47.5">
                      <FastField
                        name="designationTypeId"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="designation"
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
                  </div>
                
                  <div class=" flex justify-between mt-3">         
                  <div class="w-w47.5">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="department"
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
                  <div class=" w-w47.5">
                  <FastField
                            name="sourceId"
                             label={
                              <FormattedMessage
                                id="app.source"
                                defaultMessage="source"
                              />
                            }
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.sourceId}
                            isColumn
                          />
                        </div>
                  </div>
                 
                  <div class="w-full mt-3 "
                   style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <div class="text-white font-medium m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" > Address</div>
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

                  
                  {/* <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address[0].address1"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                   */}
                  {/* <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  /> */}
                  
                  <div class=" flex  justify-between mt-6">
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
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-4 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingContact}
                >
                  <FormattedMessage id="app.create" defaultMessage="create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, customer,investor, opportunity, departments, designations }) => ({
  addingContact: contact.addingContact,
  addingContactError: contact.addingContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  investorData:investor.investorData,
  investorId: investor.investorDetails.investorId,
  tagWithCompany: customer.customer.name,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactInvest,
      addLinkContactByOpportunityId,
      getDesignations,
      getInvestorData,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestForm);
