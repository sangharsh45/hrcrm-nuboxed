import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Checkbox } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
  addLeads,
  setClearbitData
} from "../../Leads/LeadsAction";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class LeadsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whiteblue: true,
      checked: true,
    };
  }

  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
  };

  handleReset = (resetForm) => {
    resetForm();
  };
  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };
  componentDidMount() {
    this.props.getAllCustomerEmployeelist();
  }

  render() {
    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingLeads,
      addLeads,
      clearbit,
      setClearbitData,
    } = this.props;
    const employeesData = this.props.allCustomerEmployeeList.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            partnerName: "",
            companyName: "",
            url: "",
            sectorId: "",
            email: "",
            phoneNumber: "",
            fullName:"",
            category: this.state.checked ? "Both" : this.state.whiteblue ? "White" : "Blue",
            userId: this.props.userId,
            notes: "",
            businessRegistration: "",
            assignedTo: userId ? userId : "",
            department: "",
            salutation:"",
            firstName:"",
            middleName:"",
            lastName:"",
            proposalValue:"",
            opportunityName:"",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
              },
            ],
            category: this.state.whiteblue ? "White" : "Blue" || "Both",
          }}
          // validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addLeads(
              {
                ...values,
                category: this.state.checked ? "Both" : this.state.whiteblue ? "White" : "Blue",
              },
              this.props.userId,
              () => this.handleReset(resetForm)
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
            <Form className="form-background">
             <div  style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "70vh",
                  overflow: "scroll",
                  paddingRight: "0.6em",
                }} >
                <div class=" h-full w-1/2"   >
                   <div>
                    {clearbit && clearbit.hasOwnProperty("logo") && (
                      <ProgressiveImage
                        preview={
                          "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
                        }
                        image={clearbit.logo}
                        width={140}
                        height={150}
                        borderRadius={25}
                        padding={15}

                      />
                    )}
                    {clearbit && clearbit.hasOwnProperty("logo") ? (
                      <a
                        href="https://clearbit.com"
                        target="_blank"
                        style={{ fontSize: 13, marginLeft: 5 }}
                      >
                        Logos provided by Clearbit
                      </a>
                    ) : null}
                  </div> 
                  <StyledLabel>
                  <div class=" flex  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="salutation"
                            type="text"
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
                                id="app.middleName"
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

                  <Field
                    name="email"
                    type="text"
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> 
                  </StyledLabel>                 
                  <div class=" flex justify-between">
                    <div class=" w-3/12">
                   
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.phone"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                  
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      </StyledLabel>
                    </div>
                  </div>
                  <Spacer />
                  <StyledLabel>
                  <Field
                    isRequired
                    name="companyName"
                    type="text"
                    label={
                      <FormattedMessage id="app.company" defaultMessage="Company" />
                    }
                    isColumn
                    width={"100%"}
                    setClearbitData={this.props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                  />
                  </StyledLabel>
                  <StyledLabel>
                  <Field
                    name="url"
                    type="text"
                    label={<FormattedMessage id="app." defaultMessage="URL" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </StyledLabel>
                         
                  <Spacer />
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                    <StyledLabel>
                      <Field
                        name="vatNo"
                        type="text"
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </StyledLabel>
                    </div>
                    <div class=" w-2/5">
                    <StyledLabel>
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.businessregistration"
                            defaultMessage=" Business Registration#"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </StyledLabel>
                    </div>
                  </div>
                  <Spacer/>
                  <div class=" flex justify-between">
                   <div class=" w-1/2">
               
                      <FastField
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        value={values.sectorId}
                      />
                    
                    </div>
                  
                    {/* <div class=" w-1/3">
                    <div>   
                        <StyledLabel>Requirement Type</StyledLabel>
                        </div>
                        <Switch
                          checked={this.state.whiteblue}
                          onChange={this.handleWhiteBlue}
                          disabled={this.state.checked}
                          checkedChildren="White collar"
                          unCheckedChildren="Blue collar"
                        />
                     
                    </div>
                    <div>
                      <Checkbox
                        checked={this.state.checked}
                        onChange={() => this.handleChange()}
                      >Both
                      </Checkbox>
                    </div>
                 */}
                    </div>
                  <Spacer />

                  <div class=" w-1/2">
                    <StyledLabel>
                      <Field
                        name="proposalValue"
                        type="text"
                        label={
                          <FormattedMessage
                            id="app.proposalValue"
                            defaultMessage="Proposal Value"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </StyledLabel>
                    </div>
                    <div class=" w-1/2">
                    <StyledLabel>
                      <Field
                        name="opportunityName"
                        type="text"
                        label={
                          <FormattedMessage
                            id="app.opportunityName"
                            defaultMessage="Opportunity Namwe"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </StyledLabel>
                    </div>
                </div>
                <div class=" h-3/4 w-5/12 "  
                >
                 <Spacer/>
                 <div class=" flex justify-between">
                    <div class=" w-1/2">
                    <StyledLabel>
                    <Field
                    name="assignedTo"
                    selectType="employee"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    isColumn
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    inlineLabel
                  />
                  </StyledLabel>
                  </div>
                    </div>
                  <Spacer />
                  <StyledLabel>
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
                  </StyledLabel>
                  
                 <Spacer />
                  <Field
                    name="notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingLeads}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, leads,employee }) => ({
  addingLeads: leads.addingLeads,
  addingLeadsError: leads.addingLeadsError,
   clearbit: leads.clearbit,
  user: auth.userDetails,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       addLeads,
      setClearbitData,
       getAllCustomerEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsForm);
