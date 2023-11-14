import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../../../../Config/Auth";
import { Spacer,StyledLabel } from "../../../../../../Components/UI/Elements";
import Clearbit from "../../../../../../Components/Forms/Autocomplete/Clearbit";
import LazySelect from "../../../../../../Components/Forms/Formik/LazySelect";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import ProgessiveImage from "../../../../../../Components/Utils/ProgressiveImage";
import { updateCustomerOpportunity } from "../../../../CustomerAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {
  getAllSalesList, getWorkflow, getStages,
} from "../../../../../Opportunity/OpportunityAction";
/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
});
function UpdateCustomerOpportunityForm(props) {

  useEffect(() => {
   
    props.getAllSalesList();
    props.getWorkflow(props.orgId);
    props.getStages(props.orgId);
  }, []);
  function handleReset (resetForm) {
    resetForm();
  };
  function handleReset (resetForm) {
    const { callback } = props;
    callback && callback();
    resetForm();
  };
 function getStagesOptions (filterOptionKey, filterOptionValue) {
    const StagesOptions =
      props.stages.length &&
      props.stages
        .filter((option) => {
          if (option.opportunityWorkflowDetailsId === filterOptionValue && option.probability !== 0) {
            return option;
          }
        })
        .sort((a, b) => {
          if (a.probability < b.probability) {
            return -1; // Sort in increasing order
          } else if (a.probability > b.probability) {
            return 1;
          } else {
            return 0;
          }
        })
        .map((option) => ({
          label: `${option.stageName}  ${option.probability}`,
          value: option.opportunityStagesId,
        }));

    return StagesOptions;
  }


    const {
      updatingCustomerOpportunity,
      contactId,
      customerId,
      opportunityId,
      startDate,
      endDate,
      defaultCustomers,
      defaultContacts,
      name,
    } = props;
    // const salesNameOption = props.sales.map((item) => {
    //   return {
    //     label: `${item.fullName || ""}`,
    //     value: item.employeeId,
    //   };
    // });
    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
   
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    const WorkflowOptions = props.workflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.opportunityWorkflowDetailsId,
      };
    });
    const [defaultOption, setDefaultOption] = useState(props.setEditingCustomerOpportunity.assignedTo);
  const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.sales.find((item) => item.fullName === selected);
console.log("hh",customerId)
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: props.setEditingCustomerOpportunity.opportunityName || "",
            startDate: dayjs(props.setEditingCustomerOpportunity.startDate) || "",
            endDate: props.setEditingCustomerOpportunity.endDate || null,
            endDate: dayjs(props.setEditingCustomerOpportunity.endDate) || "",
            proposalAmount: props.setEditingCustomerOpportunity.proposalAmount || "",
            currency: props.setEditingCustomerOpportunity.currency || "",
            salesUserIds:selectedOption ? selectedOption.employeeId:props.setEditingCustomerOpportunity.salesUserIds,
            orgId: props.organizationId,
            customerId: customerId ? customerId.value : "",
            contactId: props.setEditingCustomerOpportunity.contactId || "",
            description:props.setEditingCustomerOpportunity.description || "",
            oppWorkflow: props.setEditingCustomerOpportunity.oppWorkflow || "",
            oppStage: props.setEditingCustomerOpportunity.oppStage ,
          }}
          validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);

            let timeZoneFirst = "GMT+05:30";

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;

            props.updateCustomerOpportunity(
              {
                ...values,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                customerId: props.customerId,
                oppStage: props.setEditingCustomerOpportunity.opportunityStagesId || "" ,
                oppWorkflow: props.setEditingCustomerOpportunity.opportunityWorkflowDetailsId || "" ,
                // oppStage:props.opportunityStagesId,
                // oppWorkflow:props.opportunityWorkflowDetailsId,
                salesUserIds:selectedOption ? selectedOption.employeeId:props.setEditingCustomerOpportunity.salesUserIds,
 
              },
              props.setEditingCustomerOpportunity.opportunityId,

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                ><Spacer />
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    //label="Name"

                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn

                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.startdate"
                            defaultMessage="Start Date"
                          />
                        }
                        component={DatePicker}
                        value={values.startDate}
                        isColumn
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End Date"
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
                        inlineLabel
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="proposalAmount"
                        //label="Proposal Amount"

                        label={
                          <FormattedMessage
                            id="app.proposalAmount"
                            defaultMessage="Proposal Amount"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // label="Currency"
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      // flag={values.currency}
                      // options={Array.isArray(currency) ? currency : []}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <Field
                    name="description"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
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
                  {props.sales.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.fullName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.fullName}
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
                  {/* <Field
                    name="salesUserIds"
                    // selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    width="100%"
                    component={SearchSelect}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    // margintop={"0"}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${fullName}`,
                    //   value: employeeId,
                    // }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  /> */}
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    // label="Customer"

                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    // margintop={"4px"}
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactOpportunityList"
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    // margintop={"4px"}
                    value={values.contactId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    // isDisabled={defaultContacts}
                    // defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{width:"47%"}}>
                    <StyledLabel>
                   <Field
                    name="oppWorkflow"
                   // selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.workflow"
                        defaultMessage="Workflow"
                      />
                    }
                   // component={SearchSelect}
                   component={SelectComponent}
                   options={Array.isArray(WorkflowOptions) ? WorkflowOptions : []}
                   value={values.oppWorkflow}
                  
                  
                    isColumn
                    margintop={"0"}
              
                    inlineLabel
                   
                  />
                    </StyledLabel>
                  </div>
                   <Spacer />
                   <div style={{width:"47%"}}>
                   <StyledLabel>
                     <Field
                     name="oppStage"
                     //selectType="initiativeName"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.stages"
                        defaultMessage="Stages"
                      />
                    }
                    component={SelectComponent}
                    options={
                      Array.isArray(getStagesOptions("oppWorkflow", values.oppWorkflow))
                        ? getStagesOptions("oppWorkflow", values.oppWorkflow)
                        : []
                    }
                    value={values.oppStage}
                    filterOption={{
                      filterType: "oppWorkflow",
                      filterValue: values.oppWorkflow,
                    }}
                    disabled={!values.oppWorkflow}
                    // component={SearchSelect}
                    isColumn
                    margintop={"0"}
                    
                    inlineLabel
                   
                  />
                    </StyledLabel>
                  </div>
                  </FlexContainer>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updatingCustomerOpportunity}
                >
                  <FormattedMessage id="app.update" defaultMessage="Upsate" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }

const mapStateToProps = ({ auth, opportunity, contact, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  opportunityId: opportunity.opportunityId,
  updatingCustomerOpportunity: customer.updatingCustomerOpportunity,
  updatingCustomerOpportunityError: customer.updatingCustomerOpportunity,
  setEditingCustomerOpportunity: customer.setEditingCustomerOpportunity,
  workflow: opportunity.workflow,
  stages: opportunity.stages,
  orgId: auth.userDetails.organizationId,
  sales: opportunity.sales,


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomerOpportunity,
      getAllSalesList,
      getWorkflow,
      getStages,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerOpportunityForm);