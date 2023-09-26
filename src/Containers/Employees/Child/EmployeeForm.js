import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { getlocation } from "../../Event/Child/Location/LocationAction";
import {getCountries} from "../../Auth/AuthAction"
import { Formik, Form, Field,FieldArray, FastField } from "formik";
import { HeaderLabel, Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import Upload from "../../../Components/Forms/Formik/Upload";
import { Radio } from "antd";
import { addEmployee } from "../EmployeeAction";
import * as Yup from "yup";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {getRoles} from "../../Settings/Category/Role/RoleAction"
import {getDesignations} from "../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  departmentId: Yup.string().required("Input needed!"),
  roleType: Yup.string().required("Input needed!"),
  reportingManager: Yup.string().required("Input needed!"),
});


class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: true,
      typeInd:false,
      workType: "employee",
    };
  }

  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  radioClick = (c) => {
    this.setState({ workType: c });
  };
  handleJobType = (checked) => {
    this.setState({ active: checked });
  };
  handleType = (checked) => {
    this.setState({ typeInd: checked });
  };

  getRoleOptions(filterOptionKey, filterOptionValue) {
    const roleOptions =
      this.props.roles.length &&
      this.props.roles
        .filter((option) => {
          if (
            option.departmentId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.roleType || "",
          value: option.roleTypeId,
        }));

    return roleOptions;
  }

  componentDidMount() {
    const { getCountries ,getRoles,getlocation} = this.props;
    console.log();
    getRoles(this.props.organizationId);
    getCountries(getCountries);
    getlocation(this.props.orgId);
}
  render() {
    const countryNameOption = this.props.countries.map((item) => {
      return {
          label: `${item.country_name || ""}`,
          value: item.country_name,
      };
  });
  const locationNameOption = this.props.showLocation.map((item) => {
    return {
        label: `${item.locationName || ""}`,
        value: item.locationDetailsId,
    };
});
  

  const dialCodeNameOption = this.props.countries.map((item) => {
    return {
        label: `${item.country_dial_code || ""}`,
        value: item.country_dial_code,
    };
});


  
    const { addEmployee, addingEmployee } = this.props;
    const { clearbit } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            firstName: "",
            lastName: "",
            emailId: "",
            countryDialCode: "",
            countryDialCode1: "",
            phoneNo: "",
            location:"",
            dateOfJoining:dayjs(),
            dob:dayjs(),
            mobileNo: "",
            country: "",
            workplace:"",
            designationTypeId:"",
            departmentId:"",
            roleType:"",
            linkedinPublicUrl:"",
            label: "",
            workplace: "",
            job_type: this.state.active ? "Full Time" : "Part Time",
            type: this.state.typeInd ? "true" : "false",
            employee_type: this.state.workType,
            // job_type: this.state.active,
            reportingManager: this.props.userDetails.userId
              ? this.props.userDetails.userId
              : "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
                latitude: "",
                longitude: "",
              },
            ],
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            // console.log({ ...values, job_type: this.state.active });
            this.props.addEmployee({
              ...values,
              job_type: this.state.active ? "Full Time" : "Part Time",
              type: this.state.typeInd ? "true" : "false",
              // job_type: this.state.active,
              employee_type: this.state.workType,
            });
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
                  <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "70vh",
                  overflow: "scroll",
                  paddingRight: "0.6em",
                }}
              >
                <div class=" w-1/2"
                 
                ><Spacer />
                  <div class=" flex flex-nowrap" >
                  <FastField name="imageId" component={Upload} />
                  <div>
                  <div class=" flex justify-between" >
                    <div class=" w-1/3">
                      <FastField
                        name="salutation"
                        placeholder="Select"
                        component={SelectComponent}
                        options={["Mr", "Mrs", "Miss","None"]}
                        
                        label={<FormattedMessage
                          id="app.salutation"
                          defaultMessage="Salutation"
                        />}
                        isColumn
                        />
                    </div>
                    <div class=" w-2/4">
                      <Field
                        isRequired
                        name="firstName"
                        type="text"
                        isColumn
                        width={"100%"}
                        label={<FormattedMessage
                          id="app.firstName"
                          defaultMessage="First Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                       />                   
                       </div>
                  </div>
                  <div class=" flex justify-between" >
                  <div class=" w-2/5">
                      {" "}
                      <Field
                      
                        name="middleName"
                        type="text"
                        isColumn
                        width={"100%"}
                        label={<FormattedMessage
                          id="app.middleName"
                          defaultMessage="Middle Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-3/6">
                      {" "}
                      <Field
                        name="lastName"
                        type="text"
                        isColumn
                        width={"100%"}
                        label={<FormattedMessage
                          id="app.lastName"
                          defaultMessage="Last Name"
                        />}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                  </div>
                  </div>
                  </div>
                  <div>
                    <Field
                      isRequired
                      name="emailId"
                      type="text"
                      isColumn
                      width={"100%"}
                      label={<FormattedMessage
                        id="app.emailId"
                        defaultMessage="Email"
                      />}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" flex justify-between" >
                  
                    <div class="w-w47.5">
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                       
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                  
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      
                      />
                    </div>
                  </div>
                  <div class="flex justify-between">
                  <div class=" flex  w-w47.5 justify-between" >
                    <div class=" w-w47.5">
                      <Field
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={<FormattedMessage
                          id="app.personal"
                          defaultMessage="Personal"
                        />}
                        isColumn
                        options={
                          Array.isArray(dialCodeNameOption)
                            ? dialCodeNameOption
                            : []
                        }
                        component={SelectComponent}
                        inlineLabel
                        />
                        </div>
                         <div class=" w-w47.5">
                      <Field
                        type="text"
                        name="mobileNo"
                        label="Mobile #"
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                         />
                    
                    </div>
                   
                  </div>
                  <div class=" flex  w-w47.5 justify-between" >
                    <div class="w-w47.5">
                      <Field
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        label={<FormattedMessage
                          id="app.countryDialCode1"
                          defaultMessage="Work #"
                        />}
                        isColumn
                        options={
                          Array.isArray(dialCodeNameOption)
                            ? dialCodeNameOption
                            : []
                        }
                        component={SelectComponent}
                        inlineLabel
                        />
                    </div>
                    <div class="w-w47.5">
                      <Field
                        type="text"
                        name="phoneNo"
                        label="Mobile #"
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        />
                    </div>
                  </div>
                  </div>
                  <div class=" flex justify-between" >
                  <div class=" w-w48">
                    {/* <StyledLabel><FormattedMessage
                      id="app.dateofjoining"
                      defaultMessage=" Date Of Joining"
                    />
                    </StyledLabel> */}
                    <Field
                      isRequired
                      name="dateOfJoining"
                      label={<FormattedMessage
                        id="app.dateOfJoining"
                        defaultMessage="Date of Joining"
                      />}
                      isColumn
                      component={DatePicker}
                      value={values.dateOfJoining}
                      // defaultValue={dayjs("2020-01-01")}
                       style={{                
                        width: "100%",
                       }}
                    />
                  </div>
                  <div class=" w-w47.5">
                    {/* <StyledLabel><FormattedMessage
                      id="app.dateofbirth"
                      defaultMessage=" Date Of Birth"
                    />
                    </StyledLabel> */}
                    <Field
                      isRequired
                      name="dob"
                      label={<FormattedMessage
                        id="app.dateOfBirth"
                        defaultMessage="Date of Birth"
                      />}
                      isColumn
                      component={DatePicker}
                      value={values.dob}
                      // defaultValue={dayjs("2020-01-01")}
                       style={{                
                        width: "100%",
                       }}
                    />
                  </div>
                  </div>

                  <div class=" flex justify-between" >
                    <div class=" w-full">
                    <Field
                        name="linkedinPublicUrl"
                        type="text"
                        isColumn
                        width={"100%"}
                        label={<FormattedMessage
                          id="app.linkedIn"
                          defaultMessage="LinkedIn"
                        />}
                        component={InputComponent}
                        inlineLabel
                        />
                      
                    </div>
                 
                  </div>
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}}>
                  Address for  Correspondence</HeaderLabel>
                  </div>
                    </div>
             
                  {/* <Spacer /> */}
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
 
               
 

                </div>
                <div class=" h-3/4 w-5/12 "
                
                >

<div class=" flex justify-between" >
                      <div class=" w-w48">
                      <Field
  isRequired  // This makes the field mandatory
  name="departmentId"
  label={<FormattedMessage
    id="app.department"
    defaultMessage="Department"
  />}
  isColumnWithoutNoCreate
  component={SearchSelect}
  value={values.departmentId}
  selectType="departmentName"
  isColumn
  inlineLabel
/>
                    </div>
                    <div class="w-w47.5">
                    <FastField
                    name="label"
                    type="level"
                    label={<FormattedMessage
                      id="app.level"
                      defaultMessage="Level"
                    />}
                    options={["L1", "L2", "L3"]}
                    component={SelectComponent}
                    inlineLabel
                    className="field"
                    isColumn
                    />
                    </div>
                  </div>

<Field
                    name="roleType"
                    label={<FormattedMessage
                      id="app.role"
                      defaultMessage="Role"
                    />}
                    isColumnWithoutNoCreate
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        this.getRoleOptions(
                          "departmentId",
                          values.departmentId
                        )
                      )
                        ? this.getRoleOptions(
                            "departmentId",
                            values.departmentId
                          )
                        : []
                    }
                    value={values.roleType}
                    filterOption={{
                      filterType: "departmentId",
                      filterValue: values.departmentId,
                    }}
                    disabled={!values.departmentId}
                    isColumn
                    margintop={"0"}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                    // value={values.roleTypeId}
                    // width={"100%"}
                    // isColumn
                    // selectType="roleType"
                     />
                      <div class=" flex justify-between" >
                      <div class=" w-w48">
                      <Field
                        isRequired
                        name="workplace"
                        isColumnWithoutNoCreate
                        label={<FormattedMessage
                          id="app.workPlace"
                          defaultMessage="Work Place "
                        />}
                        isColumn
                        placeholder='+31'
                        options={
                          Array.isArray(countryNameOption)
                            ? countryNameOption
                            : []
                        }
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                    <div class="w-w47.5">
                    <Field
                        isRequired
                        name="location"
                        isColumnWithoutNoCreate
                        label={<FormattedMessage
                          id="app.location"
                          defaultMessage="Location"
                        />}
                        isColumn
                        // placeholder='+31'
                        options={
                          Array.isArray(locationNameOption)
                            ? locationNameOption
                            : []
                        }
                       
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                  </div>



                  {/* <Field
                    name="designationTypeId"
                    label={<FormattedMessage
                      id="app.designation"
                      defaultMessage="Designation"
                    />}
                    isColumnWithoutNoCreate
                    component={SearchSelect}
                    value={values.designationTypeId}
                    width={"100%"}
                    isColumn
                    selectType="designationType"
                     /> */}
                     
                
                     <Field
                    name="reportingManager"
                    isColumnWithoutNoCreate
                    selectType="user"
                    label={<FormattedMessage
                      id="app.reportingManager"
                      defaultMessage="Reporting Manager"
                    />}
                    component={SearchSelect}
                    isColumn
                    value={values.reportingManager}
                    filterOption={{
                      filterType: "departmentId",
                      filterValue: values.departmentId,
                    }}
                    disabled={!values.departmentId}
                    inlineLabel
                   />
              
                  {/* <Field
                    name="workplace"
                    label={<FormattedMessage
                      id="app.workplace"
                      defaultMessage="Work place"
                    />}
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                     /> */}
                         <div class=" flex justify-between" >
                  <div>
                    <StyledLabel>
                      <FormattedMessage
                        id="app.jobtype"
                        defaultMessage="Job Type"
                      />
                    </StyledLabel>
                    <Switch
                          checked={this.state.active}
                          onChange={this.handleJobType}
                          checkedChildren="Full Time"
                          unCheckedChildren="Part Time"
                        />
                    {/* <ButtonGroup name="job_type">
                      <StatusIcon
                        color="blue"
                        type="Full Time"
                        iconType="fa-hourglass-start"
                        tooltip="Full Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Full Time")}
                      />
                      <StatusIcon
                        type="Part Time"
                        name="icon1"
                        iconType="fa-hourglass-half"
                        tooltip="Part Time"
                        status={this.state.active}
                        onClick={() => this.glassButtoClick("Part Time")}
                      />
                    </ButtonGroup> */}
                  </div>
                  <Spacer />
                  <div>
                    <StyledLabel>
                      <FormattedMessage
                        id="app.category"
                        defaultMessage="Category"
                      />
                    </StyledLabel>
                    <Switch
                          checked={this.state.typeInd}
                          onChange={this.handleType}
                          checkedChildren="External"
                          unCheckedChildren="Internal"
                        />
               
                  </div>
                  </div>
                  <Spacer />
                  <div>
                    <StyledLabel><FormattedMessage
                      id="app.employeetype"
                      defaultMessage="Employee Type"
                    />
                    </StyledLabel>
                    <Spacer />
                    <Radio.Group
                      name="radiogroup"
                      defaultValue={this.state.workType}
                    >
                      <Radio
                        value={"Employee"}
                        onChange={() => this.radioClick("employee")}
                      >
                        Employee
                      </Radio>
                      &nbsp;&nbsp;
                      <Radio
                        value={"contractor"}
                        onChange={() => this.radioClick("contractor")}
                      >
                        Contractor
                      </Radio>
                      &nbsp;&nbsp;
                      <Radio
                        value={"intern"}
                        onChange={() => this.radioClick("intern")}
                      >
                        Intern
                      </Radio>
                      &nbsp;&nbsp;
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEmployee}
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
const mapStateToProps = ({ auth,role,countrys,location, employee,designations,departments }) => ({
  userDetails: auth.userDetails,
  roles: role.roles,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  countries: auth.countries,
  showLocation:location.showLocation,
  addingEmployee: employee.addingEmployee,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     addEmployee,
     getCountries,
     getDesignations,
      getDepartments,
      getRoles,
      getlocation,
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
