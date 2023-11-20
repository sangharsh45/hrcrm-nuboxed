import React, { Component,useState,useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button ,Switch,Checkbox} from "antd";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { updateCustomer,setEditCustomer } from "../../CustomerAction";
import { getAllSalesList } from "../../../Opportunity/OpportunityAction";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import { getSectors } from "../../../../Containers/Settings/Sectors/SectorsAction";
import { HeaderLabel, StyledLabel } from "../../../../Components/UI/Elements";
import { Spacer } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Listbox, Transition } from '@headlessui/react'
import { getCrm} from "../../../Leads/LeadsAction";

//yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdateCustomerForm (props) {
  
  useEffect(() => {
    props.getAllCustomerEmployeelist();
    props.getSectors();
    props.getAllSalesList();
    props. getCrm();
  }, []);


  const handleReset = (resetForm) => {
    resetForm();
  };
  
    const {
      accounts,
      user,
      updateCustomerById,
      updateCustomer,
      setEditingCustomer,
      userId
    } = props;

    const employeesData = props.allCustomerEmployeeList.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    const [defaultOption, setDefaultOption] = useState(setEditingCustomer.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allCustomerEmployeeList.find((item) => item.fullName === selected);
    
    const srcnme=setEditingCustomer.source
    console.log("ssrcc",srcnme)
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: setEditingCustomer.name || "",
            url: setEditingCustomer.url || "",
            sectorId: setEditingCustomer.sectorId  ,
            vatNo:setEditingCustomer.vatNo  ,
            email: setEditingCustomer.email || "",
            country:setEditingCustomer.country || "",
            businessRegistration:setEditingCustomer.businessRegistration ||"",
            countryDialCode: setEditingCustomer.countryDialCode || user.countryDialCode,
            phoneNumber: setEditingCustomer.phoneNumber || "",
            userId: userId,
            source:setEditingCustomer.source  || "",
          
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
            notes: setEditingCustomer.notes || "",
            address: [
              {
                addressId: setEditingCustomer.address.length ? setEditingCustomer.address[0].addressId : "",
                address1: setEditingCustomer.address.length ? setEditingCustomer.address[0].address1 : "",
                address2:  setEditingCustomer.address.length ? setEditingCustomer.address[0].address2 : "",
                street:  setEditingCustomer.address.length ? setEditingCustomer.address[0].street : "",
                city:  setEditingCustomer.address.length ? setEditingCustomer.address[0].city : "",
                state:  setEditingCustomer.address.length ? setEditingCustomer.address[0].state : "",
                postalCode:  setEditingCustomer.address.length ? setEditingCustomer.address[0].postalCode : "",             
              },
            ],
          }}
          validationSchema={UpdateCustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomer(
              {
                ...values,
                customerId: props.customerId,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
              },
            props.customerId,
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
            <div class="max-sm:h-[30rem] overflow-y-auto">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" w-w47.5 max-sm:w-wk" >
                    <Spacer/>
                   <StyledLabel><FormattedMessage id="app.name" defaultMessage="Name" /></StyledLabel>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    accounts={accounts}
                    inlineLabel
                    />
                   
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
                  <Spacer />
                  {/* <Spacer />
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
                    /> */}
                   <div class=" flex justify-between">
                   <div class=" w-3/12 max-sm:w-[31%]">
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code "
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        // value={values.countryDialCode1}
                        inlineLabel
                       />
                    </div>
                    <div class=" w-8/12">
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
                         </div>
                  </div>
                  <Spacer/>
                  
                     <div class=" flex justify-between">
                     <div class="w-w47.5 max-sm:w-w47.5">
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
                    <div class=" w-w47.5">
                    <FastField
                          name="source"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.source"
                              defaultMessage="Source"
                            />
                          }
                          selectType="sourceName"
                          component={SearchSelect}
                          defaultValue={{
                            label:srcnme,
                            // value: d,
                          }}
                          isColumn
                          inlineLabel
                        />
           </div>
                 </div>
                
                 <Spacer/>
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

                 <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                >
                   <Spacer/>
                   <div class=" flex justify-between mb-[0.35rem]">
                   <div class=" h-full w-full">
                   <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem]">
              Assigned to
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.crmAllData.map((item) => (
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
                  </div>
                    </div>
              
                    <div class=" flex justify-between max-sm:flex-col">
                    <div class=" w-1/2 max-sm:w-wk">
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
                    </div>
                    <div class=" w-[10rem] max-sm:w-wk">
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
                 
                  <div class="mt-8" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} >Corporate Address</HeaderLabel>
                  </div>
                    </div>
                  <Spacer /><Spacer />
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
        {/* <div class=" flex justify-between">
                    <div class=" w-1/2 max-sm:w-wk">
                     <Field
                       // name="address[0].country"
                       name="country"
                       isColumnWithoutNoCreate
                       // label="Country"

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
                       // style={{ flexBasis: "80%" }}
                       isColumn
                       width="100%"
                     />
                   </div>
                 </div> */}
               
                                     
                </div>
              </div>
              <Spacer/>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateCustomerById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );

}

const mapStateToProps = ({ auth, customer,employee,leads }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  updateCustomerById: customer.updateCustomerById,
  updateCustomerByIdError: customer.updateCustomerByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  organizationId: auth.userDetails.organizationId,
  employees: employee.employees,
  crmAllData:leads.crmAllData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomer,
      setEditCustomer,
      getSectors,
      getAllSalesList,
      getAllCustomerEmployeelist,
      getCrm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerForm);
