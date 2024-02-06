import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Listbox, } from '@headlessui/react'
import {getCurrencyList} from "../../Settings/Category/Currency/CurrencyAction"
import { getlocation } from "../../Event/Child/Location/LocationAction";
import {getCountries,getTimeZone} from "../../Auth/AuthAction"
import { Formik, Form, Field,FieldArray, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import Upload from "../../../Components/Forms/Formik/Upload";
import { Radio } from "antd";
import { addEmployee,getAssignedToList } from "../EmployeeAction";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {getRoles} from "../../Settings/Category/Role/RoleAction"
import {getDesignations} from "../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";


function EmployeeForm (props) {

  const [active,setActive]=useState(false);
  const [checked,setChecked]=useState(true);
  const [typeInd,setTypeInd]=useState(false);
  const [selectedDept,setSelectedDept]=useState("");
  const [defaultOption,setDefaultOption]=useState(props.fullName);
  const [selected,setSelected]=useState(defaultOption);
  const [selectedCountry,setSelectedCountry]=useState("");
  const [locations,setLocations]=useState([]);
  const [selectedLocation,setSelectedLocation]=useState("");
  const [role,setRole]=useState([]);
  const [selectedRole,setSelectedRole]=useState("");
  const [workType,setWorkType]=useState("employee");
 

  // const handleSelectedChange = (value) => {
  //   setSelected(value);
  // };
  
 const radioClick = (c) => {
  setWorkType(c);
  };
 
 const handleJobType = (checked) => {
  setActive(checked);
  };

  const handleType = (checked) => {
    setTypeInd(checked);
  };
  const timeZoneOption = props.timeZone.map((item) => {
    return {
      label: item.zone_name
      || null,
      value: item.timezone_id
      ,
    };
  });

  const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    const filteredRoles = props.roles.filter((item) => item.departmentId === selectedDept);
    setSelectedDept(selectedDept);
    setSelectedRole(filteredRoles);  
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
  };
 const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const filteredLocations = props.showLocation.filter((item) => item.country_name === selectedCountry);
    setSelectedCountry(selectedCountry);
    setLocations(filteredLocations);
  };

 const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocations(selectedLocation);
  };

  // const getRoleOptions=(filterOptionKey, filterOptionValue)=> {
  //   const roleOptions =
  //     props.roles.length &&
  //     props.roles
  //       .filter((option) => {
  //         if (
  //           option.departmentId === filterOptionValue &&
  //           option.probability !== 0
  //         ) {
  //           return option;
  //         }
  //       })
  //       .map((option) => ({
  //         label: option.roleType || "",
  //         value: option.roleTypeId,
  //       }));

  //   return roleOptions;
  // }
//  const getLocationNameOption=(filterOptionKey, filterOptionValue)=> {
//     const locationOptions = props.showLocation
//       .filter(option => option.country_id === filterOptionValue && option.probability !== 0)
//       .map(option => ({
//         label: option.locationName || "",
//         value: option.locationDetailsId,
//       }));
  
//     return locationOptions;
//   }
  
  
const sortedCurrency =props.currencyList.sort((a, b) => {
  const nameA = a.currency_name.toLowerCase();
  const nameB = b.currency_name.toLowerCase();
  // Compare department names
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
const currencyNameOption = sortedCurrency.map((item) => {
  return {
    label: `${item.currency_name}`,
    value: item.currency_id,
  };
});

  useEffect(()=>{
    const { getCountries ,getTimeZone,getCurrencyList,getAssignedToList,getRoles,getlocation,} = props;
    getRoles(props.organizationId);
    getCountries(getCountries);
    getlocation(props.orgId);
    getCurrencyList();
    getAssignedToList(props.orgId)
    getTimeZone();
},[]);

const getEmployeesbyDepartment= (filterOptionKey, filterOptionValue)=> {
  const StagesOptions =
    props.employees.length &&
    props.employees
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
    const {
      userId,
    } = props;


  const dialCodeNameOption = props.countries.map((item) => {
    return {
        label: `${item.country_dial_code || ""}`,
        value: item.country_dial_code,
    };
});


    const { addEmployee, addingEmployee } = props;
    const selectedOption = props.assignedToList.find((item) => item.empName === selected);
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
            location:selectedLocation,
            workplace:selectedCountry,
            roleType:selectedRole,
            departmentId:selectedDept,
            dateOfJoining:dayjs(),
            dob:dayjs(),
            mobileNo: "",
            timeZone: "",
            country: "",
            workplace:"",
            designationTypeId:"",
            departmentId:"",
            roleType:"",
            linkedinPublicUrl:"",
            label: "",
            workplace: "",
            assignedTo: selectedOption ? selectedOption.employeeId : userId,
            job_type: active ? "Full Time" : "Part Time",
            type: typeInd ? "true" : "false",
            employee_type: workType,
            // job_type: active,
            reportingManager:"",
            // reportingManager: props.userDetails.userId
            //   ? props.userDetails.userId
            //   : "",
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
          onSubmit={(values, { resetForm }) => {
            props.addEmployee({
              ...values,
              reportingManagerDeptId:values.reportingManagerDeptId,
              location:selectedLocation,
              workplace:selectedCountry,
              roleType:selectedRole,
              departmentId:selectedDept,
              job_type: active ? "Full Time" : "Part Time",
              type: typeInd ? "true" : "false",
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
              employee_type: workType,
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
                 
                  <div class=" flex flex-nowrap justify-between mt-3" >
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
                
                  <div class=" flex justify-between" >
                  <div class=" w-[70%] flex flex-col max-sm:w-wk">
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
                    <div class=" max-sm:w-wk">
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        placeholder="Currency"
                        label={<FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />}
                        isColumn
                        // selectType="currencyName"
                        isRequired
                        component={SelectComponent}
                        options={
                          Array.isArray(currencyNameOption)
                            ? currencyNameOption
                            : []
                        }
                      
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
                          id="app.dialCode"
                          defaultMessage="Dial Code"
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
                         label="Personal"
                        placeholder="Input"
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
                          defaultMessage="Dial Code"
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
                         label="Work #"
                        placeholder="Input"
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
                    {/* <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                      id="app.dateofjoining"
                      defaultMessage=" Date Of Joining"
                    />
                    </div> */}
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
                    {/* <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                      id="app.dateofbirth"
                      defaultMessage=" Date Of Birth"
                    />
                    </div> */}
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
                      <div class=" text-[white] text-xs" >
                  Address for  Correspondence</div>
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
 
               
 

                </div>

          
                <div class=" w-[47.5%] max-sm:w-wk ">
                <div class=" w-full mt-2">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Time Zone</div>
                    <Field
                      name="timeZone"
                      type="text"
                      placeholder="Select Time Zone"
                      noLabel
                      // disabled={!values.productionInd && !values.inventoryInd}
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(timeZoneOption) ? timeZoneOption : []
                      }
                    />
                  </div>
                <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] m-[0.1rem 0 0.02rem 0.2rem] ">
              Assigned to
            </Listbox.Label>
            <div className="relative mt-[0.1rem]">
              <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.assignedToList.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.empName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-white" : "text-indigo-600"
                              }`}
                            >
                              
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </div>
          </>
        )}
      </Listbox>
<div class=" flex justify-between max-sm:flex-col mt-4" >
                      <div class=" w-w48 flex flex-col max-sm:w-wk">
                   <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Department</label>
                      <select  className="customize-select"
                      
                      onChange={handleDeptChange}>
          <option value="">Select </option>
          {props.departments.map((item, index) => (
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
                      onChange={handleRoleChange}
                    >
          <option value="">Select </option>
          {props.roles.map((item, index) => (
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
                      onChange={handleCountryChange}>
          <option value="">Select </option>
          {props.countries.map((item, index) => (
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
                      onChange={handleLocationChange}
                    >
          <option value="">Select </option>
          {props.showLocation.map((item, index) => (
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
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <FormattedMessage
                        id="app.jobtype"
                        defaultMessage="Job Type"
                      />
                    </div>
                    <Switch
                          checked={active}
                          onChange={handleJobType}
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
        
                  <div class=" ml-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <FormattedMessage
                        id="app.category"
                        defaultMessage="Category"
                      />
                    </div>
                    <Switch
                          checked={typeInd}
                          onChange={handleType}
                          checkedChildren="External"
                          unCheckedChildren="Internal"
                        />
               
                  </div>
                  </div>
                
                  <div class=" mt-3">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                      id="app.employeetype"
                      defaultMessage="Employee Type"
                    />
                    </div>
                 
                    <Radio.Group
                      name="radiogroup"
                      defaultValue={workType}
                    >
                      <Radio
                        style={{marginLeft:"0.5rem"}}
                        value={"Employee"}
                        onChange={() => radioClick("employee")}
                      >
                        Employee
                      </Radio>
                  
                      <Radio
                      style={{marginLeft:"0.5rem"}}
                        value={"contractor"}
                        onChange={() => radioClick("contractor")}
                      >
                        Contractor
                      </Radio>
                    
                      <Radio
                        style={{marginLeft:"0.5rem"}}
                        value={"intern"}
                        onChange={() => radioClick("intern")}
                      >
                        Intern
                      </Radio>
                 
                    </Radio.Group>
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
          getEmployeesbyDepartment("reportingManagerDeptId", values.reportingManagerDeptId)
        )
          ? getEmployeesbyDepartment(
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
                </div>
              </div>
           
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={addingEmployee}
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
const mapStateToProps = ({ auth,role,location,currency, employee,designations,departments }) => ({
  userDetails: auth.userDetails,
  roles: role.roles,
  currencyList: currency.currencyList,
  timeZone: auth.timeZone,
  fullName: auth.userDetails.fullName,
  assignedToList:employee.assignedToList,
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
      getCurrencyList,
      getTimeZone,
      getAssignedToList,
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
