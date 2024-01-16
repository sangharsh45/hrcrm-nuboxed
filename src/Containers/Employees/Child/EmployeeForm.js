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
import { addEmployee,getEmployeelist } from "../EmployeeAction";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {getRoles} from "../../Settings/Category/Role/RoleAction"
import {getDesignations} from "../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";


// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const documentSchema = Yup.object().shape({
//   mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
//   phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
//   departmentId: Yup.string().required("Input needed!"),
//   roleType: Yup.string().required("Input needed!"),
//   reportingManager: Yup.string().required("Input needed!"),
// });


class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      checked: true,
      typeInd:false,
      selectedDept:"",

      selectedCountry: '',
      locations: [],
      role:[],
      selectedRole:"",
      selectedLocation: "",
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
  handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    const filteredRoles = this.props.roles.filter((item) => item.departmentId === selectedDept);
    this.setState({ selectedDept, role: filteredRoles });
    
  };
  handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    this.setState({ selectedRole });
  };
  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const filteredLocations = this.props.showLocation.filter((item) => item.country_name === selectedCountry);
    this.setState({ selectedCountry, locations: filteredLocations });
  };
  handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    this.setState({ selectedLocation });
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
  getLocationNameOption(filterOptionKey, filterOptionValue) {
    const locationOptions = this.props.showLocation
      .filter(option => option.country_id === filterOptionValue && option.probability !== 0)
      .map(option => ({
        label: option.locationName || "",
        value: option.locationDetailsId,
      }));
  
    return locationOptions;
  }
  
  

  componentDidMount() {
    const { getCountries ,getRoles,getlocation,getEmployeelist} = this.props;
    console.log();
    getRoles(this.props.organizationId);
    getCountries(getCountries);
    getlocation(this.props.orgId);
    getEmployeelist();
}

getEmployeesbyDepartment (filterOptionKey, filterOptionValue) {
  const StagesOptions =
    this.props.employees.length &&
    this.props.employees
      .filter((option) => {
        if (
          option.departmentId === filterOptionValue &&
          option.probability !==0
        ) {
          return option;
        }
      })
      .sort((a, b) => {
        const stageDealA = a.name && a.name.toLowerCase();
        const stageDealB = b.name && b.name.toLowerCase();
        if (stageDealA < stageDealB) {
          return -1;
        }
        if (stageDealA > stageDealB) {
          return 1;
        }
        return 0;
      })

      .map((option) => ({
        label: option.fullName || "",
        value: option.employeeId,
      }));

  return StagesOptions;
}
  render() {
    console.log(this.state.selectedLocation);
    const countryNameOption = this.props.countries.map((item) => {
      return {
          label: `${item.country_name || ""}`,
          value: item.country_name,
      };
  });
  
   
  
  const WorkflowOptions = this.props.departments.map((item) => {
    return {
      label: `${item.departmentName || ""}`,
      value: item.departmentId,
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
            reportingManagerDeptId:"",
            phoneNo: "",
            location:this.state.selectedLocation,
            workplace:this.state.selectedCountry,
            roleType:this.state.selectedRole,
            departmentId:this.state.selectedDept,
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
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            // console.log({ ...values, job_type: this.state.active });
            this.props.addEmployee({
              ...values,
              reportingManagerDeptId:values.reportingManagerDeptId,
              location:this.state.selectedLocation,
              workplace:this.state.selectedCountry,
              roleType:this.state.selectedRole,
              departmentId:this.state.selectedDept,
              job_type: this.state.active ? "Full Time" : "Part Time",
              type: this.state.typeInd ? "true" : "false",
              // job_type: this.state.active,
              employee_type: this.state.workType,
            },"cretiondate");
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
            <div class=" h-[32rem]  max-sm:h-[30rem]">
            <Form className="form-background">
                  <div class="flex justify-between  pr-2 max-sm:flex-col">
                <div class=" w-[47.5%] max-sm:w-wk">
                  <Spacer />
                  <div class=" flex flex-nowrap justify-between" >
                  <FastField name="imageId" component={Upload} />
                  <div>
                  <div class=" flex justify-between max-sm:flex-col" >
                    {/* <div class=" w-1/3 max-sm:w-full">
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
                    </div> */}
                    <div class=" w-wk max-sm:w-full">
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
                  <div class=" flex justify-between max-sm:flex-col" >
                  <div class=" w-2/5 max-sm:w-full">
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
                    <div class=" w-3/6 max-sm:w-full">
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
                        defaultMessage="Email"/>}
                      component={InputComponent}
                      inlineLabel
                      />
                  </div>
                  <div class=" flex justify-between" >
                  
                    <div class="w-w47.5 max-sm:w-wk">
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
                  <div class="flex justify-between max-sm:flex-col">
                  <div class=" flex  w-w47.5 justify-between mt-4 max-sm:flex-col max-sm:w-wk " >
                    <div class=" w-w47.5 max-sm:w-wk ">
                      <Field
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={<FormattedMessage
                          id="app.personal"
                          defaultMessage="Personal"
                        />}
                        placeholder="Select"
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
                         <div class=" w-w47.5 max-sm:w-wk">
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
                  <div class=" flex  w-w47.5 justify-between mt-4 max-sm:flex-col max-sm:w-wk" >
                    <div class="w-w47.5 max-sm:w-wk">
                      <Field
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        label={<FormattedMessage
                          id="app.countryDialCode1"
                          defaultMessage="Work #"
                        />}
                        placeholder="Select"
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
                    <div class="w-w47.5 max-sm:w-wk">
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
                  <div class=" flex justify-between max-sm:flex-col" >
                  <div class=" w-w48 max-sm:w-wk">
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
                  <div class=" w-w47.5 max-sm:w-wk">
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
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)",marginTop:"0.5rem" }}>
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
                <div class=" w-[47.5%] max-sm:w-wk ">

<div class=" flex justify-between max-sm:flex-col" >
                      <div class=" w-w48 flex flex flex-col max-sm:w-wk">
                   <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Department</label>
                      <select  className="customize-select"
                      
                      onChange={this.handleDeptChange}>
          <option value="">Select </option>
          {this.props.departments.map((item, index) => (
            <option 
           
            key={index} value={item.departmentId}>
              {item.departmentName}
            </option>
          ))}
        </select>
                      {/* <Field
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
/> */}
                    </div>
                    <div class="w-w47.5 max-sm:w-wk">
                    <FastField
                    name="label"
                    type="level"
                    placeholder="Select"
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
                  <div class=" flex justify-between " >
                  <div class=" w-w48 flex flex-col max-sm:w-wk">
                  <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Role</label>
                
                  <select
                 
                 className="customize-select"
                      onChange={this.handleRoleChange}
                    >
          <option value="">Select </option>
          {this.state.role.map((item, index) => (
            <option key={index}
            // disabled={!values.country_name}
             value={item.roleTypeId}>
              {item.roleType}
            </option>
          ))}
        </select>
        </div>
        </div>

{/* <Field
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
                     /> */}
                    
                      <div class=" flex justify-between max-sm:flex-col" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                      <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>WorkPlace</label>
                      <select 
                        className="customize-select"
                      onChange={this.handleCountryChange}>
          <option value="">Select </option>
          {this.props.countries.map((item, index) => (
            <option key={index} value={item.country_name}>
              {item.country_name}
            </option>
          ))}
        </select>
                      {/* <Field
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
                      /> */}
                    </div>
               
                    <div class=" w-w47.5 flex flex-col max-sm:w-wk">
                    <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Location</label>
                    <select  className="customize-select"
                //  style={{ border: "0.06em solid #aaa" }}
                      onChange={this.handleLocationChange}
                    >
          <option value="">Select </option>
          {this.state.locations.map((item, index) => (
            <option key={index}
            // disabled={!values.country_name}
             value={item.locationDetailsId}>
              {item.locationName}
            </option>
          ))}
        </select>
                    {/* <Field
  name="location"
  label={<FormattedMessage id="app.location" defaultMessage="Location" />}
  isColumnWithoutNoCreate
  component={SelectComponent}
  options={
    this.getLocationNameOption("country_id", values.country_id) || []
  }
  value={values.location}
  filterOption={{
    filterType: "country_id",
    filterValue: values.country_id,
  }}
  disabled={!values.country_id}
  isColumn
  margintop={"0"}
  inlineLabel
  style={{ flexBasis: "80%" }}
/> */}


                    {/* <Field
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
                          Array.isArray(getLocationNameOption)
                            ? getLocationNameOption
                            : []
                        }
                       
                        component={SelectComponent}
                        inlineLabel
                      /> */}
                    </div>
                  </div>
                  <div class="mt-2">
                    <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Reports To</label>
                    </div>


                  <div class=" flex justify-between  max-sm:flex-col" >
                      <div class=" w-w48 max-sm:w-wk">
                      <Field
  isRequired
  name="reportingManagerDeptId"
  label={<FormattedMessage id="app.department" defaultMessage="Department" />}
  isColumnWithoutNoCreate
  component={SearchSelect}
  value={values.reportingManagerDeptId}
  selectType="departmentName"
  isColumn
  inlineLabel
  onChange={(selectedDepartment) => {
    setFieldValue("reportingManagerDeptId", selectedDepartment);
    // Handle other updates here, if needed
  }}
/>
                     </div>
                    
                     <div class="w-w48  max-sm:w-wk">
                     <Field
  name="reportingManager"
  isColumnWithoutNoCreate
  label={<FormattedMessage id="app.reportingManager" defaultMessage="Reporting Manager" />}
  component={SelectComponent}
  options={
    values.reportingManagerDeptId
      ? (Array.isArray(
          this.getEmployeesbyDepartment("reportingManagerDeptId", values.reportingManagerDeptId)
        )
          ? this.getEmployeesbyDepartment(
              "reportingManagerDeptId",
              values.reportingManagerDeptId
            )
          : [])
      : [] // Set it to an empty array or a default value when department is not selected
  }
  isColumn
  value={values.reportingManager}
  filterOption={{
    filterType: "departmentId",
    filterValue: values.reportingManagerDeptId,
  }}
  disabled={!values.reportingManagerDeptId}
  inlineLabel
/>

              </div>
              </div>
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
                         <div class=" flex " >
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
          &nbsp;&nbsp;&nbsp;&nbsp;
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
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingEmployee}
                >
                  Submit
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
const mapStateToProps = ({ auth,role,location, employee,designations,departments }) => ({
  userDetails: auth.userDetails,
  roles: role.roles,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  countries: auth.countries,
  showLocation:location.showLocation,
  addingEmployee: employee.addingEmployee,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
  employees:employee.employees,
  departments: departments.departments,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     addEmployee,
     getCountries,
     getDesignations,
      getDepartments,
      getRoles,
      getlocation,
      getEmployeelist,
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
