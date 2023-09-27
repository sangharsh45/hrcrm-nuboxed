import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { updateOpportunity, getAllSalesList } from "../../OpportunityAction";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { getWorkflow, getStages } from "../../OpportunityAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
import { getContactData } from "../../../Contact/ContactAction";
/**
 * yup validation scheme for creating a opportunity
 */

const UpdateOpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  // startDate: Yup.date().required("Initiation date needed!"),
  // endDate: Yup.date().required("Closure date needed!"),
  // proposalAmount: Yup.number()
  //   .typeError("Value must be a number")
  customerId:Yup.string().required("Input needed!"),
  currency: Yup.string().required("Currency needed!"),
  startDate: Yup.string().required("Input needed!"),
  endDate: Yup.string().required("Input needed!"),
  salesUserIds: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
});
class UpdateOpportunityForm extends Component {
  componentDidMount() {
    this.props.getAllSalesList();
    this.props.getCustomerData(this.props.userId);
    this.props.getContactData(this.props.userId);
    this.props.getWorkflow(this.props.orgId);
    this.props.getStages(this.props.orgId);
  }

  getStagesOptions(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      this.props.stages.length &&
      this.props.stages
        .filter((option) => {
          if (
            option.opportunityWorkflowDetailsId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })

        .map((option) => ({
          label: option.stageName || "",
          value: option.opportunityStagesId,
        }));

    return StagesOptions;
  }
  render() {
    const salesNameOption = this.props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });

    const customerNameOption = this.props.customerData
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

    const getAreaOptions = (filterOptionKey, filterOptionValue) => {
      const contactOptions =
        this.props.contactData.length &&
        this.props.contactData
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
    };

    const WorkflowOptions = this.props.workflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.opportunityWorkflowDetailsId,
      };
    });
    const { updateOpportunityById, updateOpportunity, startDate, endDate } =
      this.props;

    return (
      <>
        <Formik
          initialValues={{
            opportunityName:
              this.props.setEditingOpportunity.opportunityName || "",
            startDate:
              dayjs(this.props.setEditingOpportunity.startDate) || dayjs(),
            endDate: dayjs(this.props.setEditingOpportunity.endDate) || dayjs(),
            // endDate: endDate || null,

            proposalAmount:
              this.props.setEditingOpportunity.proposalAmount || "",
            currency: this.props.setEditingOpportunity.currency || "",
            salesUserIds: this.props.setEditingOpportunity.salesUserIds || [],
            customerId: this.props.setEditingOpportunity.customerId || "",
            contactId: this.props.setEditingOpportunity.contactId || "",
          }}
          validationSchema={UpdateOpportunitySchema}
          onSubmit={(values, { resetForm }) => {
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

            this.props.updateOpportunity(
              {
                ...values,
                opportunityId: this.props.opportunityId,
                orgId: this.props.organizationId,
                // customerId: this.props.customerId,
                userId: this.props.userId,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
              },
              this.props.opportunityId,
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
              <div class=" flex justify-between">
                <div class=" h-full w-1/2">
                  <Spacer />
                  <StyledLabel>
                    <Field
                      isRequired
                      name="opportunityName"
                      type="text"
                      //label="Name"
                      label={
                        <FormattedMessage
                          id="app.opportunityName"
                          defaultMessage="Name"
                        />
                      }
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      // accounts={accounts}
                      inlineLabel
                    />
                  </StyledLabel>
                  <Spacer />
                  <div class="flex justify-between">
                    <div class=" w-1/2">
                      <StyledLabel>
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start Date"
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
                      </StyledLabel>
                    </div>
                    <div class=" w-2/5">
                      <StyledLabel>
                        <Field
                          isRequired
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
                      </StyledLabel>
                    </div>
                  </div>
                  <Spacer />
                  <div class="flex justify-between">
                    <div class=" w-1/2">
                      <StyledLabel>
                        <Field
                          name="proposalAmount"
                          // label="Proposal Amount"
                          label={
                            <FormattedMessage
                              id="app.proposalAmount"
                              defaultMessage="Proposal Amount"
                            />
                          }
                          isColumn
                          isRequired
                          width={"100%"}
                          component={InputComponent}
                        />
                      </StyledLabel>
                    </div>
                    <div class=" w-2/5">
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // label="currencyName"
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        isColumn
                        defaultValue={{
                          value: this.props.user.currency,
                        }}
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />

                      <Spacer />
                    </div>
                  </div>
                </div>
                <div class=" h-full w-2/5">
                  <Spacer />
                  <StyledLabel>
                    <Field
                      isRequired
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
                      component={SelectComponent}
                      options={
                        Array.isArray(salesNameOption) ? salesNameOption : []
                      }
                      isColumn
                      inlineLabel
                    />
                  </StyledLabel>
                  <Spacer />

                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    // isRequired
                    component={SelectComponent}
                    isColumn
                    options={
                      Array.isArray(customerNameOption)
                        ? customerNameOption
                        : []
                    }
                    value={values.customerId}
                    inlineLabel
                  />

                  <Spacer />

                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contactId"
                        defaultMessage="Contact"
                      />
                    }
                    component={SelectComponent}
                    isColumn
                    options={
                      Array.isArray(
                        getAreaOptions("customerId", values.customerId)
                      )
                        ? getAreaOptions("customerId", values.customerId)
                        : []
                    }
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    disabled={!values.customerId}
                    value={values.contactId}
                    inlineLabel
                  />

                  <Spacer />
                  <div class="flex justify-between">
                    <div class=" w-1/2">
                      <StyledLabel>
                        <Field
                          name="oppWorkflow"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.workflow"
                              defaultMessage="Workflow"
                            />
                          }
                          component={SelectComponent}
                          options={
                            Array.isArray(WorkflowOptions)
                              ? WorkflowOptions
                              : []
                          }
                          value={values.oppWorkflow}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                        />
                      </StyledLabel>
                    </div>
                    <Spacer />
                    <div class=" w-2/5">
                      <StyledLabel>
                        <Field
                          name="oppStage"
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
                              this.getStagesOptions(
                                "oppWorkflow",
                                values.oppWorkflow
                              )
                            )
                              ? this.getStagesOptions(
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
                          margintop={"0"}
                          inlineLabel
                        />
                      </StyledLabel>
                    </div>
                  </div>
                  <Spacer />
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateOpportunityById}
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

const mapStateToProps = ({ auth, opportunity, customer, contact }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingOpportunity: opportunity.setEditingOpportunity,
  updateOpportunityById: opportunity.updateOpportunityById,
  sales: opportunity.sales,
  workflow: opportunity.workflow,
  stages: opportunity.stages,
  contactData: contact.contactData,
  customerData: customer.customerData,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOpportunity,
      getAllSalesList,
      getWorkflow,
      getStages,
      getContactData,
      getCustomerData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOpportunityForm);
