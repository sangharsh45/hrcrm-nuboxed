import React, { Component, useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerData } from "../../Customer/CustomerAction";
import { getContactData } from "../../Contact/ContactAction";
import { FormattedMessage } from "react-intl";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { base_url } from "../../../Config/Auth";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import Clearbit from "../../../Components/Forms/Autocomplete/Clearbit";
import LazySelect from "../../../Components/Forms/Formik/LazySelect";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import ProgessiveImage from "../../../Components/Utils/ProgressiveImage";
import {
  addOpportunity,
  getRecruiterName,
  getAllSalesList,
  getInitiative,
  getWorkflow,
  getStages,
} from "../OpportunityAction";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  oppStage: Yup.string().required("Input needed!"),
});
function OpportunityForm(props) {
  useEffect(() => {
    props.getRecruiterName();
    props.getAllSalesList();
    props.getContactData(props.userId);
    props.getCustomerData(props.userId);
    props.getInitiative(props.userId);
    props.getWorkflow(props.orgId);
    props.getStages(props.orgId);
  }, []);

  const people = [
    {
      id: 1,
      name: "Wade Cooper",
      avatar: "",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Devon Webb",
      avatar: "",
    },
    {
      id: 4,
      name: "Tom Cook",
      avatar: "",
    },
    {
      id: 5,
      name: "Tanya Fox",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 7,
      name: "Caroline Schultz",
      avatar: "",
    },
    {
      id: 8,
      name: "Mason Heaney",
      avatar: "",
    },
    {
      id: 9,
      name: "Claudie Smitham",
      avatar: "",
    },
    {
      id: 10,
      name: "Emil Schaefer",
      avatar: "",
    },
  ];
  const [selected, setSelected] = useState(people[3]);

  function getAreaOptions(filterOptionKey, filterOptionValue) {
    const contactOptions =
      props.contactData.length &&
      props.contactData
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.fullName || "",
          value: option.contactId,
        }));

    return contactOptions;
  }

  function getInitiativeOptions(filterOptionKey, filterOptionValue) {
    const initiativeOptions =
      props.initiatives.length &&
      props.initiatives
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })

        .map((option) => ({
          label: option.initiativeName || "",
          value: option.initiativeDetailsId,
        }));

    return initiativeOptions;
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function getStagesOptions(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      props.stages.length &&
      props.stages
        .filter((option) => {
          if (
            option.opportunityWorkflowDetailsId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
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
        })

        .map((option) => ({
          label: option.stageName || "",
          value: option.opportunityStagesId,
        }));

    return StagesOptions;
  }

  const WorkflowOptions = props.workflow.map((item) => {
    return {
      label: `${item.workflowName || ""}`,
      value: item.opportunityWorkflowDetailsId,
    };
  });

  function getskillOptions(filterOptionKey, filterOptionValue) {
    const skillOptions =
      props.opportunitySkills.length &&
      props.opportunitySkills
        .filter((option) => {
          if (option.initiativeDetailsId === filterOptionValue) {
            // console.log("option",option.initiativeSkillMapper)
            return option;
          }
        })

        .map((option) => {
          console.log("option1", option);
          return {
            label: `${option.skillName || ""}`,
            value: option.skilId,
          };
        });

    return skillOptions;
  }

  const customerNameOption = props.customerData
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
    })
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });

  const recruiterNameOption = props.recruiterName.map((item) => {
    return {
      label: `${item.fullName || ""}`,
      value: item.employeeId,
    };
  });

  const salesNameOption = props.sales.map((item) => {
    return {
      label: `${item.fullName || ""}`,
      value: item.employeeId,
    };
  });
  const [text, setText] = useState("");
  function handletext(e) {
    setText(e.target.value);
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const {
    user: { userId },
    addingOpportunity,
    employeeId,
    salesUserIds,
    fullName,
    contactId,
    customerId,
    startDate,
    endDate,
    defaultCustomers,
    defaultContacts,
    name,
  } = props;
  console.log(customerId);
  return (
    <>
      <Formik
        initialValues={{
          opportunityName: "",
          startDate: startDate || dayjs(),
          endDate: endDate || null,
          endDate: dayjs(),
          userId: props.userId,
          description: "",
          proposalAmount: "",
          currency: props.user.currency,
          orgId: props.organizationId,
          userId: props.userId,
          customerId: undefined,
          oppWorkflow: "",
          contactId: undefined,
          oppInnitiative: "",
          oppStage: "",
          salesUserIds: props.user.employeeId || "",
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

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
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

          props.addOpportunity(
            {
              ...values,
              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
              description: transcript ? transcript : text,
            },
            props.userId,
            props.customerId,
            resetForm()
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
            <div class=" flex justify-between">
              <div
class=" h-full w-1/2"
              >
                <Spacer />
                <Field
                  isRequired
                  name="opportunityName"
                  type="text"
                  //label="Name"

                  label={
                    <FormattedMessage id="app.name" defaultMessage="Name" />
                  }
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  // accounts={accounts}
                  inlineLabel
                />
                <Spacer />
                <div class="flex justify-between">
                <div class=" w-1/2">
                    <Field
                      name="startDate"
                      //label="Start "
                      label={
                        <FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />
                      }
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class=" w-2/5">
                    <Field
                      // isRequired
                      name="endDate"
                      // label="End Date"
                      label={
                        <FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />
                      }
                      isColumn
                      component={DatePicker}
                      value={values.endDate || values.startDate}
                      inlineLabel
                      disabledDate={(currentDate) => {
                        if (values.startDate) {
                          if (
                            dayjs(currentDate).isBefore(dayjs(values.startDate))
                          ) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <Spacer />
                <div class="flex justify-between">
                <div class=" w-1/2">
                    <Field
                      name="proposalAmount"
                      //label="Proposal Amount"

                      label={
                        <FormattedMessage
                          id="app.proposalamount"
                          defaultMessage="Proposal Amount"
                        />
                      }
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
                  <div class=" w-2/5">
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />
                      }
                      width="100%"
                      isColumn
                      selectType="currencyName"
                      value={values.currencyName}
                      isRequired
                      component={SearchSelect}
                    />
                  </div>
                </div>
                <Spacer />
                <StyledLabel>Description</StyledLabel>
                <div>
                  <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span style={{ fontSize: "1.5em", color: "red" }}>
                          <PlayCircleFilledIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span
                          style={{
                            fontSize: "1.5em",
                            color: "green",
                            marginLeft: "3px",
                          }}
                        >
                          <StopCircleIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span style={{ fontSize: "1.5em", marginLeft: "3px" }}>
                          <RotateRightIcon />
                        </span>
                      </Tooltip>
                    </span>
                  </div>
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
               class=" h-full w-2/5"
              >
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium text-gray-700">
                        Assigned to
                      </Listbox.Label>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full leading-4 cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm: text-sm">
                          <span className="flex items-center">
                            <img
                              src={selected.avatar}
                              alt=""
                              className="h-2 w-2 flex-shrink-0 rounded-full"
                            />
                            <span className="ml-3 block truncate">
                              {selected.fullName}
                            </span>
                          </span>

                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
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
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <img
                                        src={person.avatar}
                                        alt=""
                                        className="h-6 w-6 flex-shrink-0 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.fullName}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
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

                <Spacer />

                <StyledLabel>
                  <Field
                    name="customerId"
                    // selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    //component={SearchSelect}
                    component={SelectComponent}
                    options={
                      Array.isArray(customerNameOption)
                        ? customerNameOption
                        : []
                    }
                    isColumn
                    margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                  />
                </StyledLabel>
                <StyledLabel>
                  <Field
                    name="contactId"
                    // selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    // component={SearchSelect}
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        getAreaOptions("customerId", values.customerId)
                      )
                        ? getAreaOptions("customerId", values.customerId)
                        : []
                    }
                    value={values.contactId}
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    disabled={!values.customerId}
                    isColumn
                    inlineLabel
                  />
                </StyledLabel>
                <StyledLabel>
                  <Field
                    name="oppInnitiative"
                    //selectType="initiativeName"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.initiative"
                        defaultMessage="Initiative"
                      />
                    }
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        getInitiativeOptions("customerId", values.customerId)
                      )
                        ? getInitiativeOptions("customerId", values.customerId)
                        : []
                    }
                    value={values.initiativeDetailsId}
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    disabled={!values.customerId}
                    isColumn
                    inlineLabel
                  />
                </StyledLabel>
                <Spacer />

                <div class="flex justify-between">
                  <div class=" w-1/2">
                    <StyledLabel>
                      <Field
                        name="oppWorkflow"
                        // selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        isRequired
                        placeolder="Select type"
                        label={
                          <FormattedMessage
                            id="app.workflow"
                            defaultMessage="Workflow"
                          />
                        }
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={
                          Array.isArray(WorkflowOptions) ? WorkflowOptions : []
                        }
                        value={values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                    </StyledLabel>
                  </div>
                  <Spacer />
                  <div class=" w-2/5">
                    <StyledLabel>
                      <Field
                        name="oppStage"
                        isRequired
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.stages"
                            defaultMessage="Stages"
                          />
                        }
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            getStagesOptions("oppWorkflow", values.oppWorkflow)
                          )
                            ? getStagesOptions(
                                "oppWorkflow",
                                values.oppWorkflow
                              )
                            : []
                        }
                        value={values.oppStage}
                        filterOption={{
                          filterType: "oppWorkflow",
                          filterValue: values.oppWorkflow,
                        }}
                        disabled={!values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                    </StyledLabel>
                  </div>
                </div>
              </div>
            </div>
            <Spacer />
            <div class=" flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                Loading={addingOpportunity}
              >
                <FormattedMessage id="app.create" defaultMessage="Create" />
                {/* Create */}
              </Button>
            </div>
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
  initiativesByCustomerId: customer.initiativesByCustomerId,
  addingOpportunity: opportunity.addingOpportunity,
  addingOpportunityError: opportunity.addingOpportunityError,
  recruiterName: opportunity.recruiterName,
  orgId: auth.userDetails.organizationId,
  // salesUserIds:auth.userDetails.userId,
  sales: opportunity.sales,
  stages: opportunity.stages,
  currencies: auth.currencies,
  contactByUserId: contact.contactByUserId,
  customerByUserId: customer.customerByUserId,
  initiatives: opportunity.initiatives,
  workflow: opportunity.workflow,
  customerData: customer.customerData,
  contactData: contact.contactData,
  // opportunitySkills:opportunity.opportunitySkills
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunity,
      getContactData,
      getRecruiterName,
      getAllSalesList,
      // getInitiativeByCustomerId,
      getCustomerData,
      getInitiative,
      // getOpportunitySKill
      getWorkflow,
      getStages,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityForm);
