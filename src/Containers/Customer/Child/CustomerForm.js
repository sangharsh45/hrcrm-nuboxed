import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Checkbox } from "antd";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { HeaderLabel, StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
  addCustomer,
  setClearbitData
} from "../CustomerAction";
import { Fragment } from 'react'
import { getAllSalesList } from "../../Opportunity/OpportunityAction"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
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

function CustomerForm(props) {
  const people = [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:""
        
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        "",
    },
    {
      id: 4,
      name: 'Tom Cook',
      avatar:
       "",
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Hellen Schmidt',
      avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Caroline Schultz',
      avatar:
       "",
    },
    {
      id: 8,
      name: 'Mason Heaney',
      avatar:
        "",
    },
    {
      id: 9,
      name: 'Claudie Smitham',
      avatar:
        "",
    },
    {
      id: 10,
      name: 'Emil Schaefer',
      avatar:
       "",
    },
  ]
  const [selected1, setSelected1] = useState(people[3])
  const[checked,setChecked]=useState(true);
  const[whiteblue,setWhiteblue]=useState(true);

  function handleWhiteBlue (checked) {
    setWhiteblue( checked );
  };

 function handleReset  (resetForm) {
    resetForm();
  };
 function handleChange () {
  setChecked(
 !checked
    );
  };
  useEffect(() => {
    props.getAllCustomerEmployeelist();
    props.getSectors();
    props.getAllSalesList();
  }, []);

    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingCustomer,
      addCustomer,
      clearbit,
      // setClearbitData,
    } = props;
    const employeesData = props.allCustomerEmployeeList.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    const sectorOption = props.sectors.map((item) => {
      return {
        label: item.sectorName || "",
        value: item.sectorId,
      };
    });
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            // sectorId:"",
            // sectorName:"",
            partnerName: "",
            // sectorDescription:"",
            name: "",
            url: "",
            gst:"",
            // sector: "",
            sectorId: "",
            country: props.user.country,
            email: "",
            // sector: props.user.sectorName,
            countryDialCode: props.user.countryDialCode,
            phoneNumber: "",
            fullName:"",
            category: checked ? "Both" : whiteblue ? "White" : "Blue",
            userId: props.userId,
            notes: "",
            businessRegistration: "",
            assignedTo: userId ? userId : "",
            department: "",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: props.user.countryName,
              },
            ],
            category: whiteblue ? "White" : "Blue" || "Both",
          }}
          // validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCustomer(
              {
                ...values,
                category: checked ? "Both" : whiteblue ? "White" : "Blue",
              },
              props.userId,
              () => handleReset(resetForm)
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
                  <Spacer />
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    }
                    isColumn
                    width={"100%"}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                  />
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={<FormattedMessage id="app." defaultMessage="URL" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  <Spacer />
                  <Field
                    name="email"
                    type="text"
                    // label="Email"
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />                  
                   <div class=" flex justify-between">
                    <div class=" w-3/12">
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        // label="Phone #"
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
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div>

                  <Spacer/>
                  <div class=" flex justify-between">
                  <div class=" w-6/12">
                  <FastField                     
                            name="sectorId"
                            label={
                              <FormattedMessage
                                id="app.sector"
                                defaultMessage="Sector"
                              />
                            }
                            isColumn
                            placeholder="Sector"
                            component={SelectComponent}
                            value={values.sectorId}
                            options={
                              Array.isArray(sectorOption) ? sectorOption : []
                            }
                          />
                    </div>
                   
                 
                    <div class=" w-1/3">
                     <div>
                        <StyledLabel>Requirement Type</StyledLabel>
                        </div>
                        <Switch
                          checked={whiteblue}
                          onChange={handleWhiteBlue}
                          disabled={checked}
                          checkedChildren="White collar"
                          unCheckedChildren="Blue collar"
                        />
                    
                    </div>
                    <div>
                      <Checkbox
                        checked={checked}
                        onChange={() => handleChange()}
                      >Both
                      </Checkbox>
                    </div>
                  </div>

                 
                  <Spacer />
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
                 <Spacer/>
                 <div class=" flex justify-between">
                    <div class=" h-full w-full">
                    <Listbox value={selected1} onChange={setSelected1}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full leading-4 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm: text-sm">
          
              <span className="flex items-center">
                <img src={selected1.avatar} alt="" className="h-2 w-2 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected1.fullName}</span>
              </span>
             

              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {props.sales.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected1, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={person.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected1 ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.fullName}
                          </span>
                        </div>

                        {selected1 ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
                    {/* <Field
                    name="assignedTo"
                    selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    // component={SearchSelect}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${firstName || ""} ${middleName ||
                    //     ""} ${lastName || ""}`,
                    //   value: employeeId,
                    // }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    inlineLabel
                  /> */}
                  </div>
                    </div>
                    <Spacer />
                    <div class=" flex justify-between">
                    <div class=" w-2/5">
                      <Field
                        name="vatNo"
                        type="text"
                        // label="VAT Number"
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
                    </div>
                    <div class=" w-2/5">
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
                    </div>
                  </div>
                  <Spacer/>
                  <div class=" flex justify-between">
                    <div class=" w-2/5">
                      <Field
                        name="gst"
                        type="text"
                        // label="VAT Number"
                        label={
                          <FormattedMessage
                            id="app.gst"
                            defaultMessage="GST"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  
                  </div>
                  <Spacer/>
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} >Corporate Address</HeaderLabel>
                  </div>
                    </div>
                  <Spacer />
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
                   <div class=" flex justify-between">
                   <div class=" w-1/2">
                     <Field
                       name="country"
                       isColumnWithoutNoCreate
                       label={
                         <FormattedMessage
                           id="app.country"
                           defaultMessage="Country"
                         />
                       }
                       component={SearchSelect}
                       defaultValue={{
                         value: props.user.countryName,
                       }}
                       value={values.countryName}
                       selectType="country"
                       inlineLabel
                       isColumn
                       width="100%"
                     />
                   </div>
                 </div>
               
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingCustomer}
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


const mapStateToProps = ({ auth, customer,employee ,opportunity,sector}) => ({
  addingCustomer: customer.addingCustomer,
  addingCustomerError: customer.addingCustomerError,
  clearbit: customer.clearbit,
  user: auth.userDetails,
  sales: opportunity.sales,
  // employees: employee.employees,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  sectors: sector.sectors,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomer,
      setClearbitData,
      getSectors,
      getAllSalesList,
      getAllCustomerEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
