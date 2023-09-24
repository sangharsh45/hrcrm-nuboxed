import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Checkbox } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import { StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import {
    updateLeads,
    setEditLeads
} from "../../../Leads/LeadsAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../Components/Forms/Autocomplete/ClearbitImage";
import Upload from "../../../../Components/Forms/Formik/Upload";
// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateLeadsSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  email: Yup.string().email("Enter a valid Email"),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateLeadsForm extends Component {
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
  componentDidMount () {
    this.setState({whiteblue:this.props.setEditingLeads.category==="White"?true : false,
  checked:this.props.setEditingLeads.category==="White" || this.props.setEditingLeads.category==="Blue"? false  : true,
  })
  };

  render() {
    console.log("wh",this.state.whiteblue)
    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateLeadsById,
      updateLeads,
    } = this.props;
    const employeesData = this.props.employees.map((item) => {
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
            name: this.props.setEditingLeads.name || "",
            url: this.props.setEditingLeads.url || "",
            sectorId: this.props.setEditingLeads.sectorId  ,
            vatNo:this.props.setEditingLeads.vatNo  ,
            email: this.props.setEditingLeads.email || "",
            country:this.props.setEditingLeads.country || "",
            countryDialCode:
              this.props.setEditingLeads.countryDialCode ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingLeads.phoneNumber || "",
            userId: this.props.userId,
            // country:"",
            notes: this.props.setEditingLeads.notes || "",
            category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
            address: [
              {
                addressId: this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].addressId : "",
                address1: this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].address1 : "",
                address2:  this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].address2 : "",
                street:  this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].street : "",
                city:  this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].city : "",
                state:  this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].state : "",
                postalCode:  this.props.setEditingLeads.address.length ? this.props.setEditingLeads.address[0].postalCode : "",             
              },
            ],
            category: this.state.whiteblue ?"White" : "Blue"||"Both",
          }}
          validationSchema={UpdateLeadsSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateLeads(
              {
                ...values,
                leadsId: this.props.leadsId,
                category:this.state.checked?"Both": this.state.whiteblue ? "White" : "Blue",
              },
              this.props.leadsId,
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
              <div class=" flex justify-between overflow-scroll ">
                <div class=" h-full w-1/2"   >
                    <Spacer/>
                    <div class=" flex  flex-nowrap">
                    <FastField name="imageId" component={Upload} />
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
                    <StyledLabel>
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
                            id="app.countryDialCode"
                            defaultMessage="Dial Code #"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        inlineLabel
                       />
                      
                    </div>
                    <div class=" w-8/12">
                    <StyledLabel>
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}
                        label="Phone No"
                        inlineLabel
                        width={"100%"}
                        />     
                        </StyledLabel>              
                         </div>
                  </div>
                  <Spacer/>
                    <StyledLabel>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.company" defaultMessage="Company" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                    </StyledLabel>
                    <StyledLabel>
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={
                      <FormattedMessage id="app.url" defaultMessage="URL" />
                    }
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
                        //isRequired
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
                 <div class=" w-1/3">
                 <Checkbox
                 checked={this.state.checked}
                 onChange={() => this.handleChange()}
               > 
               Both
               </Checkbox>
               </div> */}
                </div>
                 </div>
                 <div class=" h-3/4 w-5/12 "   >
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
                 
                 <Spacer/>
                 <StyledLabel>
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
                    </StyledLabel>                 
                </div>
              </div>
              <Spacer/>
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateLeadsById}
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

const mapStateToProps = ({ auth, leads,employee }) => ({
    setEditingLeads: leads.setEditingLeads,
    updateLeadsById: leads.updateLeadsById,
    updateLeadsByIdError: leads.updateLeadsByIdError,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
    employees: employee.employees,
    leadsAllData:leads.leadsAllData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateLeads,
        setEditLeads
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadsForm);
