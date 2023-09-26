import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Switch } from "antd";
import { getTasks } from "../../../Containers/Settings/Task/TaskAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Spacer } from "../../../Components/UI/Elements";
import { getUnits } from "../../../Containers/Settings/Unit/UnitAction";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  addTask,
  updateTask,
  handleTaskModal,
  getCustomerTask,
  getProjectTaskList,
  getCandidateTaskList,
  getCandidateTaskFilterList,
  deleteTask,
} from "../TaskAction";
import { getTaskForRecruit,getTaskForStages } from "../../Settings/SettingsAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { StyledLabel } from "../../../Components/UI/Elements";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import Upload from "../../../Components/Forms/Formik/Upload";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import { Select } from "antd";
import moment from "moment";
const { Option } = Select;

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.selectedTask
        ? this.props.selectedTask.taskStatus
        : "To Start",
      priority: this.props.selectedTask
        ? this.props.selectedTask.priority
        : "High",
      complexity: this.props.selectedTask
        ? this.props.selectedTask.complexity
        : "Easy",
      Type: this.props.selectedTask
        ? this.props.selectedTask.taskType
        : "Email",
      selectedType: this.props.selectedTask
        ? this.props.selectedTask.taskType
        : "Email",
      reminder: true,
    };
  }

  handleDropChange = (value) => {
    this.setState({ currentType: value });
  };

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  handleReminderChange = (checked) => {
    this.setState({
      reminder: checked,
    });
  };

  handleCallback = () => {
    const { handleChooserModal, handleTaskModal, callback } = this.props;
    handleChooserModal(false);
    handleTaskModal(false);
    callback && callback();
  };

  handleButtonClick = (type) => {
    this.setState({ priority: type });
    // alert(this.state.priority)
  };

  handleComplexityClick = (type) => {
    this.setState({ complexity: type });
    // alert(this.state.priority)
  };

  handleprojectOptions = (filterOptionKey, filterOptionValue) => {
    const projectOptions =
      this.props.projectTaskList.length &&
      this.props.projectTaskList.filter((option) => {
        if (
          option.customerId === filterOptionValue &&
          option.probability !== 0
        ) {
          return option;
        }
      });
    const newArray = [
      ...new Map(projectOptions.map((m) => [m.projectId, m])).values(),
    ];

    const newData = newArray.map((option) => ({
      label: option.projectName || "",
      value: option.projectId,
    }));

    return newData;
  };

  handlecandidateOptions = (filterOptionKey, filterOptionValue) => {
    const candidateOptions =
      this.props.candidateFilterTaskList.length &&
      this.props.candidateFilterTaskList
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.candidateName || "",
          value: option.included,
        }));
    console.log(candidateOptions);

    return candidateOptions;
  };

  componentDidMount() {
    this.props.getEmployeelist();
    this.props.getTaskForStages();
    this.props.getTaskForRecruit(this.props.orgId);
    this.props.getCustomerTask(this.props.orgId);
    this.props.getProjectTaskList(this.props.orgId);
    this.props.getTasks();
    this.props.getUnits(this.props.orgId);
    this.props.getCandidateTaskList(this.props.orgId);
    this.props.getCandidateTaskFilterList(this.props.orgId);
  }
  render() {
    console.log("type", this.state.currentType);

    const customerData = this.props.customerTaskList
      .sort((a, b) => {
        const customerNameA = a.name && a.name.toLowerCase();
        const customerNameB = b.name && b.name.toLowerCase();
        if (customerNameA < customerNameB) {
          return -1;
        }
        if (customerNameA > customerNameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      .map((item) => {
        return {
          label: `${item.name}`,
          // label: `${item.salutation || ""} ${item.firstName ||
          //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
          value: item.customerId,
        };
      });
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
      user: { userId, firstName, fullName, middleName, lastName, timeZone },
      addingTask,
      isEditing,
      prefillTask,
      addTask,
      startDate,
      endDate,
      deleteTask,
      deletingTask,
      defaultContacts,
      assignedDate,
      ownerId,
      defaultAccounts,
      updateTask,
      updatingTask,
      startTime,
      endTime,
      defaultOpportunities,
      // oppoStages,
      employeeId,
      taskTypeId,
    } = this.props;
    const employeesData = this.props.employees.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });

    const unitData = this.props.units.map((item) => {
      return {
        label: `${item.unitName}`,
        value: item.unitId,
      };
    });

    const TaskOptions = this.props.recruitTask.map((item) => {
      return {
        label: `${item.taskChecklistName}`,
        value: item.taskChecklistId,
      };
    });
    const TaskStageOptions = this.props.stagesTask.map((item) => {
      return {
        label: `${item.taskChecklistName}`,
        value: item.taskChecklistId,
      };
    });

    const candidateOption = this.props.candidateTaskList.map((item) => {
      return {
        label: item.fullName,
        value: item.included,
      };
    });

    const TaskOption = this.props.tasks.map((item) => {
      return {
        label: item.taskType,
        value: item.taskTypeId,
      };
    });

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillTask
              : {
                  // taskType: this.state.currentType,
                  taskTypeId: "",
                  taskName: "",
                  fullName: "",
                  assignedDate: assignedDate || dayjs(),
                  customerId: "",
                  projectName: "",
                  included: [],
                  taskChecklistId: "",
                  taskDescription: "",
                  timeZone: timeZone,

                  startDate: startDate || dayjs(),
                  endDate: endDate || null,
                  endDate: dayjs(),
                  taskStatus: this.state.active,

                  priority: this.state.priority,
                  complexity: this.state.complexity,
                  unit: "",

                  department: "",
                  remindInd: this.state.reminder ? true : false,
                  remindTime: "",
                  level: "",
                  repeatInd: false,

                  ownerIds: [],
                  startTime: startDate || null,
                  endTime: endDate || null,
                  // employeesId: [],

                  included: [],
                  value: "",

                  assignedTo: "",
                  //  taskTypeId: "",
                }
          }
          // validationSchema={TaskSchema}
          onSubmit={(values, { resetForm }) => {
            ////debugger;
            console.log(values);
            console.log(values.startDate);

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

            isEditing
              ? updateTask(
                  prefillTask.taskId,
                  {
                    ...values,
                    // taskType: this.state.currentType,
                    // taskTypeId: "",
                    taskStatus: this.state.active,
                    priority: this.state.priority,
                    complexity: this.state.complexity,

                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                  },
                  this.handleCallback
                )
              : addTask(
                  {
                    ...values,
                    taskStatus: this.state.active,
                    priority: this.state.priority,
                    complexity: this.state.complexity,
                    ownerIds: userId === userId ? [userId] : [],
                    startDate: `${newStartDate}T20:00:00Z`,
                    endDate: `${newEndDate}T20:00:00Z`,
                    startTime: 0,
                    endTime: 0,
                  },
                  this.handleCallback
                );
            !isEditing && resetForm();
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
                  paddingRight: "0.6em",
                }}
              >
                <div class=" h-full w-1/2">
                  <div class=" flex justify-between">
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <FastField name="imageId" component={Upload} />
                    )}

                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-4/6">
                        <Field
                          name="documentId"
                          isRequired
                          component={DragableUpload}
                        />
                      </div>
                    )}
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                      <Spacer />
                      <StyledLabel>Type</StyledLabel>

                      <Field
                        name="taskTypeId"
                        component={SelectComponent}
                        value={values.taskTypeId}
                        options={Array.isArray(TaskOption) ? TaskOption : []}
                      />
                    </div>
                  
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-1/2">
                          <Spacer />
                      <StyledLabel>Task CheckList</StyledLabel>
                          <Field
                            name="taskChecklistId"
                            // selectType="contactListFilter"
                            isColumnWithoutNoCreate
                            isRequired
                            placeolder="Select type"
                            // label={
                            //   <FormattedMessage
                            //     id="app.taskList"
                            //     defaultMessage="Task CheckList"
                            //   />
                            // }
                            // component={SearchSelect}
                            component={SelectComponent}
                            options={
                              Array.isArray(TaskOptions) ? TaskOptions : []
                            }
                            value={values.taskChecklistId}
                            isColumn
                            inlineLabel
                          />
                     
                      </div>
                    )}
                      <div class=" w-1/2">
                          <Spacer />
                      <StyledLabel>Task Stages</StyledLabel>
                          <Field
                            name="taskChecklistId"
                            // selectType="contactListFilter"
                            isColumnWithoutNoCreate
                            isRequired
                            placeolder="Select type"
                            // label={
                            //   <FormattedMessage
                            //     id="app.taskList"
                            //     defaultMessage="Task CheckList"
                            //   />
                            // }
                            // component={SearchSelect}
                            component={SelectComponent}
                            options={
                              Array.isArray(TaskStageOptions) ? TaskStageOptions : []
                            }
                            value={values.taskChecklistId}
                            isColumn
                            inlineLabel
                          />
                     
                      </div>


                 
                    <div style={{ width: "24%" }}>
                      <Spacer style={{ marginTop: "1.25em" }} />
                      <StyledLabel>
                        <FormattedMessage
                          id="app.status"
                          defaultMessage="Status"
                        />
                        {/* Status */}
                      </StyledLabel>

                      <div style={{ width: "100%" }}>
                        <ButtonGroup>
                          <StatusIcon
                            color="blue"
                            type="To Start"
                            iconType="fa-hourglass-start"
                            tooltip="To Start"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.tostart"
                                defaultMessage="To Start"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("To Start")}
                          />

                          <StatusIcon
                            type="In Progress"
                            iconType="fa-hourglass-half"
                            tooltip="In Progress"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.inprogress"
                                defaultMessage="In Progress"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("In Progress")}
                          />

                          <StatusIcon
                            type="Completed"
                            iconType="fa-hourglass"
                            tooltip="Completed"
                            tooltipTitle={
                              <FormattedMessage
                                id="app.completed"
                                defaultMessage="Completed"
                              />
                            }
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("Completed")}
                            //  status={item.taskStatus}
                            //  onClick={() =>
                            //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                            //  }
                          />
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                  <Spacer />
                  <div class=" flex justify-between w-full">
                    <div class=" w-1/2">
                      <div class=" flex justify-between w-full">
                        <div class=" w-full">
                          <StyledLabel>
                            {/* Priority */}
                            <FormattedMessage
                              id="app.priority"
                              defaultMessage="Priority"
                            />
                          </StyledLabel>
                          <div>
                            <Tooltip title="High">
                              <Button
                                type="primary"
                                // shape="circle"
                                // icon={<ExclamationCircleOutlined />}
                                onClick={() => this.handleButtonClick("High")}
                                style={{
                                  backgroundColor:
                                    this.state.priority === "High"
                                      ? "red"
                                      : "white",
                                      borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                      width: "31px", // Adjust the width as needed
                                      height: "31px"
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="Medium">
                              <Button
                                type="primary"
                                // shape="circle"
                                // icon={<ExclamationCircleOutlined />}
                                onClick={() => this.handleButtonClick("Medium")}
                                style={{
                                  backgroundColor:
                                    this.state.priority === "Medium"
                                      ? "Orange"
                                      : "white",
                                      borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                      width: "31px", // Adjust the width as needed
                                      height: "31px",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="Low">
                              <Button
                                type="primary"
                                // shape="circle"
                                // icon={<ExclamationCircleOutlined />}
                                onClick={() => this.handleButtonClick("Low")}
                                style={{
                                  backgroundColor:
                                    this.state.priority === "Low"
                                      ? "teal"
                                      : "white",
                                      borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                      width: "31px", // Adjust the width as needed
                                      height: "31px"
                                }}
                              ></Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class=" w-5/12">
                      <div class=" flex justify-between w-full">
                        <div class=" w-full">
                          <Field
                            isRequired
                            name="taskName"
                            //label="Name"
                            // value={values.taskName}
                            label={
                              <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                              />
                            }
                            component={InputComponent}
                            isColumn
                            width={"100%"}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Spacer />
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                      <Field
                        isRequired
                        name="startDate"
                        //label="Start "
                        label={
                          <FormattedMessage
                            id="app.startDate"
                            defaultMessage="Start Date"
                          />
                        }
                        isColumn
                        component={DatePicker}
                        value={values.startDate}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <Spacer />
                    <div class=" w-5/12">
                      <Field
                        // isRequired
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.startTime"
                            defaultMessage="Start Time"
                          />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <Spacer />

               
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        // defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              moment(currentDate).isBefore(
                                moment(values.startDate)
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
                    <div class=" w-5/12">
                      <Field
                        // isRequired
                        name="endTime"
                        //label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endTime"
                            defaultMessage="End Time"
                          />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>

                  <div class=" flex justify-between">
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-1/2">
                        <Field
                          // isRequired
                          name="customerId"
                          label="Customer"
                          isColumn
                          component={SelectComponent}
                          value={values.customerId}
                          options={
                            Array.isArray(customerData) ? customerData : []
                          }
                          // use12Hours

                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-5/12">
                        <Field
                          isRequired
                          name="projectName"
                          label="Project"
                          component={SelectComponent}
                          options={
                            Array.isArray(
                              this.handleprojectOptions(
                                "customerId",
                                values.customerId
                              )
                            )
                              ? this.handleprojectOptions(
                                  "customerId",
                                  values.customerId
                                )
                              : []
                          }
                          value={values.projectName}
                          isColumn
                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div class=" flex justify-between">
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-1/2">
                        <Field
                          // isRequired
                          name="value"
                          label="Value"
                          component={InputComponent}
                          isColumn
                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-5/12">
                        <Field
                          // isRequired
                          name="unit"
                          label="Unit"
                          isColumn
                          value={values.unitId}
                          component={SelectComponent}
                          options={Array.isArray(unitData) ? unitData : []}
                          // use12Hours

                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div class=" flex justify-between w-full">
                    <div class=" w-1/2">
                      <div class=" flex justify-between w-full">
                        {values.taskTypeId === "TSK52434477391272022" && (
                          <div class=" w-full">
                            <StyledLabel>Complexity</StyledLabel>
                            <div>
                              <Tooltip title="Easy">
                                <Button
                                  type="primary"
                                  shape="circle"
                                  icon={<ExclamationCircleOutlined />}
                                  onClick={() =>
                                    this.handleComplexityClick("Easy")
                                  }
                                  style={{
                                    backgroundColor:
                                      this.state.complexity === "Easy"
                                        ? "green"
                                        : "white",
                                  }}
                                />
                              </Tooltip>
                              &nbsp;
                              <Tooltip title="Medium">
                                <Button
                                  type="primary"
                                  shape="circle"
                                  icon={<ExclamationCircleOutlined />}
                                  onClick={() =>
                                    this.handleComplexityClick("Medium")
                                  }
                                  style={{
                                    backgroundColor:
                                      this.state.complexity === "Medium"
                                        ? "Orange"
                                        : "white",
                                  }}
                                />
                              </Tooltip>
                              &nbsp;
                              <Tooltip title="Hard">
                                <Button
                                  type="primary"
                                  shape="circle"
                                  icon={<ExclamationCircleOutlined />}
                                  onClick={() =>
                                    this.handleComplexityClick("Hard")
                                  }
                                  style={{
                                    backgroundColor:
                                      this.state.complexity === "Hard"
                                        ? "red"
                                        : "white",
                                  }}
                                ></Button>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class=" w-2/5">
                      <div class=" flex justify-between w-full">
                        {values.taskTypeId === "TSK52434477391272022" && (
                          <div class=" w-full">
                            <Field
                              isRequired
                              name="assignedDate"
                              label=" Assigned Date"
                              component={DatePicker}
                              isColumn
                              value={values.assignedDate}
                              // defaultValue={dayjs("2015-01-01")}
                              inlineLabel
                              style={{
                                width: "100%",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Spacer />
                    {/* {values.startDate && (
                      <>
                        {dayjs(todayDate).isSameOrBefore(
                          dayjs(values.startDate)
                        ) ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <span
                            >
                              <b>This Task occurs in the past !</b>
                            </span>
                          </>
                        )}
                      </>
                    )} */}
                  </div>
                </div>
                <div class=" h-full w-2/5">
                  <Spacer />
                  <Field
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
                    component={SearchSelect}
                    isColumn
                    value={values.assignedTo}
                    // defaultValue={{
                    //   label: `${firstName || ""} ${middleName ||
                    //     ""} ${lastName || ""}`,
                    //   value: employeeId,
                    // }}
                    inlineLabel
                  />
                  <Spacer />
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <Field
                      name="included"
                      //type="text"
                      label="Team"
                      mode
                      component={SelectComponent}
                      options={
                        Array.isArray(
                          this.handlecandidateOptions(
                            "customerId",
                            values.customerId
                          )
                        )
                          ? this.handlecandidateOptions(
                              "customerId",
                              values.customerId
                            )
                          : []
                      }
                      value={values.included}
                    />
                  )}
                  {values.taskTypeId !== "TSK52434477391272022" && (
                    <Field
                      name="included"
                      //type="text"
                      label="Team"
                      mode
                      component={SelectComponent}
                      value={values.included}
                      options={
                        Array.isArray(candidateOption) ? candidateOption : []
                      }
                    />
                  )}
                  <Spacer />
                  <Field
                    name="taskDescription"
                    //label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"21.875em"}
                    isColumn
                    component={TextareaComponent}
                    inlineLabel
                  />
                  <Spacer />
                  <div class=" flex justify-between">
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-1/2 font-bold">
                        <div class=" flex justify-between">
                          <div>
                            <StyledLabel>Set Reminder </StyledLabel>
                          </div>
                          <div>
                            {/* <FlexContainer justifyContent="space-between"> */}
                            <Switch
                              onChange={this.handleReminderChange}
                              checked={this.state.reminder}
                              checkedChildren="Yes"
                              unCheckedChildren="No"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-1/3 font-bold">
                        {this.state.reminder ? (
                          <div>
                            <Field
                              // isRequired
                              name="remindTime"
                              label="Reminder"
                              width={"100%"}
                              component={SelectComponent}
                              options={[
                                "15 min",
                                "30 min",
                                "45 min",
                                "1 hour",
                                "2 hour",
                              ]}
                              defaultValue="30 min"
                              isColumn
                              inlineLabel
                            />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      //title="Do you want to delete?"
                      title={
                        <FormattedMessage
                          id="app.doyouwanttodelete?"
                          defaultMessage="Do you want to delete?"
                        />
                      }
                      onConfirm={() => deleteTask(prefillTask.taskId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingTask}
                      >
                        <FormattedMessage
                          id="app.delete"
                          defaultMessage="Delete"
                        />
                        {/* Delete */}
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingTask : addingTask}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                    // "Create"
                    <FormattedMessage id="app.create" defaultMessage="Create" />
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  task,
  settings,
  employee,
  unit,
  tasks,
  candidate,
}) => ({
  addingTask: task.addingTask,
  orgId: auth.userDetails.organizationId,
  projectTaskList: task.projectTaskList,
  candidateTaskList: task.candidateTaskList,
  user: auth.userDetails,
  stagesTask:settings.stagesTask,
  updatingTask: task.updatingTask,
  units: unit.units,
  recruitTask: settings.recruitTask,
  deletingTask: task.deleteTask,
  // oppoStages: settings.oppoStages,
  employees: employee.employees,
  tasks: tasks.tasks,
  // candidateId: candidate.clearbitCandidate.candidateId,
  customerTaskList: task.customerTaskList,
  candidateFilterTaskList: task.candidateFilterTaskList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTask,
      getTasks,
      handleChooserModal,
      getCandidateTaskFilterList,
      getCandidateTaskList,
      updateTask,
      handleTaskModal,
      getCustomerTask,
      getTaskForRecruit,
      deleteTask,
      getEmployeelist,
      getProjectTaskList,
      getUnits,
      getTaskForStages,
      // getOppoStages,
      // setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  console.log(start);
  //////debugger;
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
          color: status === type ? "orange" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
