import React, {  useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getAllEmployeelist} from "../../Investor/InvestorAction"
import { StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
     updatePitch,
    setEditPitch,
    // setClearbitData,
} from "../PitchAction";
import {getSources} from "../../Settings/Category/Source/SourceAction"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Listbox, } from '@headlessui/react'

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdatePitchSchema = Yup.object().shape({
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdatePitchForm (props) {
 
  

  const handleReset = (resetForm) => {
    resetForm();
  };
  useEffect (()=>{
    props.getAllEmployeelist();
    props.getSources(props.orgId)
  },[])
 


    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateLeadsById,
      updateLeads,
      setClearbitData,
    } = props;
    const SourceOptions = props.sources.map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.sourceId,
      };
    });
    const [defaultOption, setDefaultOption] = useState(props.setEditingPitch.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            companyName: props.setEditingPitch.companyName || "",
            url: props.setEditingPitch.url || "",
            sectorId: props.setEditingPitch.sectorId  ,
            
            source: props.setEditingPitch.source  ,

            vatNo:props.setEditingPitch.vatNo  ,
            email: props.setEditingPitch.email || "",
            country:props.setEditingPitch.country || "",
            countryDialCode:
              props.setEditingPitch.countryDialCode ||
              props.user.countryDialCode,
            phoneNumber: props.setEditingPitch.phoneNumber || "",
            userId: props.userId,
            notes: props.setEditingPitch.notes || "",
            salutation:props.setEditingPitch.salutation || "",
            firstName:props.setEditingPitch.firstName || "",
            middleName:props.setEditingPitch.middleName || "",
            lastName:props.setEditingPitch.lastName || "",
            businessRegistration:props.setEditingPitch.businessRegistration ||"",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,
            address: [
              {
                addressId: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].addressId : "",
                address1: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].address1 : "",
                address2:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].address2 : "",
                street:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].street : "",
                city:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].city : "",
                state:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].state : "",
                postalCode:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].postalCode : "",  
                country: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].country : "",           
              },
            ],
            
          }}
          validationSchema={UpdatePitchSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.updatePitch(
              {
                ...values,
                investorleadsId: props.investorleadsId,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,
              },
              props.investorleadsId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
            <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
                    <Spacer/>
                    <div class=" flex  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
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
                        <div class=" w-1/2 max-sm:w-full">
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
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
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
                        <div class=" w-1/2 max-sm:w-full">
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
                    <div class=" w-3/12 max-sm:w-[32%]">
                  
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
             
                    name="companyName"
                    type="text"
                    //label="Name"
                    label={
                      <FormattedMessage id="app.company" defaultMessage="Company" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    // setClearbitData={props.setClearbitData}
                    // component={ClearbitImage}
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
                  <div class=" flex justify-between max-sm:flex-col">
                    <div class=" w-w47.5 max-sm:w-wk">
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
                    <div class=" w-w47.5 max-sm:w-wk">
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
                     <div class=" flex justify-between">
                     {/* <div class=" w-1/2">
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
                    </div> */}
                    <div class="w-full">
                    <StyledLabel>
                        <Field
                          name="source"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.source"
                              defaultMessage="Source"
                            />
                          }
                          component={SelectComponent}
                          options={
                            Array.isArray(SourceOptions)
                              ? SourceOptions
                              : []
                          }
                          value={values.source}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                        />
                      </StyledLabel>
        
           </div>
                </div>
                 </div>
                 <div class=" h-3/4 w-w47.5 max-sm:w-wk "   >
                   <Spacer/>
                   
                    <div class="">
                    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem] mt-[0.6rem]">Assigned to</Listbox.Label>
          <div className="relative mt-1">
              <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.allEmployeeList.map((item) => (
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
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                 Loading={props.updatePitchById}
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

const mapStateToProps = ({ auth,investor, leads,employee,source,pitch }) => ({
    setEditingPitch: leads.setEditingPitch,
    updateLeadsById: leads.updateLeadsById,
    sources: source.sources,
    updatePitchById:pitch.updatePitchById,
    updateLeadsByIdError: leads.updateLeadsByIdError,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
    employees: employee.employees,
    leadsAllData:leads.leadsAllData,
    allEmployeeList:investor.allEmployeeList,
    setEditingPitch:pitch.setEditingPitch
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updatePitch,
        getSources,
        // updateLeads,
        setEditPitch,
        getAllEmployeelist,
    //   setClearbitData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePitchForm);
