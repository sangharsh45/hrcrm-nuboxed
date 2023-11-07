import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon, Tooltip } from "antd";
import { FileOutlined, FileSearchOutlined, IdcardOutlined, MailOutlined, MoreOutlined, WechatOutlined, LinkedinOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { Spacer } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import {
    addDistributorActivityTask,
    getActivityListByDistributorId,
} from "../../../../DistributorAction";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { getTasks } from "../../../../Settings/Task/TaskAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
    startDate: Yup.string().nullable().required("Input needed!"),
    endDate: Yup.string().nullable().required("Input needed!"),
})
class ActivityTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "To Start",
            priority: "High",
            Type: "Email",
        };
    }

    glassButtoClick = (type) => {
        this.setState({ active: type });
    };

    handleCallback = (resetForm) => {
        const { callback } = this.props;
        this.props.getActivityListByDistributorId(this.props.distributorDistributorId);
        callback && callback();
        resetForm();
    };

    handleButtonClick = (type) => {
        this.setState({ priority: type });
    };

    componentDidMount() {
        this.props.getTasks();
    }

    render() {
        const today = moment();
        var todayDate = new Date();
        console.log(today);
        const {
            user: { userId, firstName, middleName, lastName, timeZone },
            tasks,
            startDate,
            endDate,
        } = this.props;

        const taskTypeOption = tasks.map((item) => {
            return {
                label: item.taskTypeName || "",
                value: item.taskTypeId,
            }
        })

        return (
            <>
                <Formik
                    initialValues={{
                        name: "",
                        status: this.state.active,
                        priority: this.state.priority,
                        startDate: startDate || moment(),
                        endDate: endDate || null,
                        description: "",
                        taskTypeId: "",
                        distributorId: this.props.distributorDistributorId,
                        userId: this.props.userId,
                    }}
                    validationSchema={FormSchema}
                    onSubmit={(values, { resetForm }) => {
                        this.props.addDistributorActivityTask(
                            {
                                ...values,
                                status: this.state.active,
                                priority: this.state.priority,
                                type: this.state.Type,
                            },

                            () => this.handleCallback(resetForm)
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
                        <Form class="form-background">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <div
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <div style={{ width: "65%" }}>
                                            <Field
                                                isRequired
                                                name="name"
                                                label="Topic"
                                                component={InputComponent}
                                                isColumn
                                                width={"100%"}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "60%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "30%" }}>
                                            <StyledLabel>Status</StyledLabel>
                                            <div style={{ width: "100%", marginTop: "-4px" }}>
                                                <ButtonGroup>
                                                    <StatusIcon
                                                        color="blue"
                                                        type="To Start"
                                                        iconType="fa-hourglass-start"
                                                        tooltip="To Start"
                                                        status={this.state.active}
                                                        onClick={() => this.glassButtoClick("To Start")}
                                                    />
                                                    <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        status={this.state.active}
                                                        onClick={() => this.glassButtoClick("In Progress")}
                                                    />
                                                    <StatusIcon
                                                        type="Completed"
                                                        iconType="fa-hourglass"
                                                        tooltip="Completed"
                                                        status={this.state.active}
                                                        onClick={() => this.glassButtoClick("Completed")}
                                                    />
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <FlexContainer
                                        justifyContent="spcae-between"
                                        style={{ width: "100%" }}
                                    >
                                        <div style={{ width: "45%" }}>
                                            <FlexContainer
                                                justifyContent="spcae-between"
                                                style={{ width: "100%" }}
                                            >
                                                <div style={{ width: "100%" }}>
                                                    <StyledLabel>Priority</StyledLabel>
                                                    <FlexContainer>
                                                        <Tooltip title="High">
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                icon={<ExclamationCircleOutlined style={{ fontSize: '3px' }} />}
                                                                onClick={() => this.handleButtonClick("High")}
                                                                style={{
                                                                    backgroundColor:
                                                                        this.state.priority === "High"
                                                                            ? "red"
                                                                            : "white",
                                                                }}
                                                            />
                                                        </Tooltip>
                                                        &nbsp;
                                                        <Tooltip title="Medium">
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                icon={<ExclamationCircleOutlined style={{ fontSize: '3px' }} />}
                                                                onClick={() => this.handleButtonClick("Medium")}
                                                                style={{
                                                                    backgroundColor:
                                                                        this.state.priority === "Medium"
                                                                            ? "Orange"
                                                                            : "white",
                                                                }}
                                                            />
                                                        </Tooltip>
                                                        &nbsp;
                                                        <Tooltip title="Low">
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                icon={<ExclamationCircleOutlined style={{ fontSize: '3px' }} />}
                                                                onClick={() => this.handleButtonClick("Low")}
                                                                style={{
                                                                    backgroundColor:
                                                                        this.state.priority === "Low"
                                                                            ? "teal"
                                                                            : "white",
                                                                }}
                                                            ></Button>
                                                        </Tooltip>
                                                    </FlexContainer>
                                                </div>
                                            </FlexContainer>
                                        </div>
                                        <div style={{ width: "55%" }}>
                                            <FlexContainer
                                                justifyContent="space-between"
                                                style={{ width: "100%" }}
                                            >
                                                <div style={{ width: "100%" }}>
                                                    <FlexContainer
                                                        justifyContent="space-between"
                                                        style={{ width: "100%" }}
                                                    >
                                                        <div style={{ width: "100%" }}>
                                                            <Field
                                                                name="taskTypeId"
                                                                // placeholder="Designation"
                                                                label="Type"
                                                                component={SelectComponent}
                                                                options={Array.isArray(taskTypeOption) ? taskTypeOption : []}
                                                                style={{
                                                                    borderRadius: "2px",
                                                                    width: "100%"
                                                                }}
                                                            />

                                                        </div>
                                                    </FlexContainer>
                                                </div>
                                            </FlexContainer>
                                        </div>
                                    </FlexContainer>
                                    <FlexContainer
                                        justifyContent="space-between"
                                        style={{ width: "100%" }}
                                    >
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="startDate"
                                                label="Start "
                                                component={DatePicker}
                                                value={values.startDate}
                                                isColumn
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                isRequired
                                                name="endDate"
                                                label="End "
                                                isColumn
                                                component={DatePicker}
                                                value={values.endDate || values.startDate}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "29px",
                                                    marginTop: "0px",
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
                                    </FlexContainer>
                                    <div>
                                        <Spacer />
                                        {values.startDate && (
                                            <>
                                                {moment(todayDate).isSameOrBefore(
                                                    moment(values.startDate)
                                                ) ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        {" "}
                                                        <span style={{ marginLeft: 10 }}>
                                                            <b>This Task occurs in the past !</b>
                                                        </span>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <Field
                                        name="description"
                                        label="Description"
                                        width={"350px"}
                                        isColumn
                                        component={TextareaComponent}
                                        inlineLabel
                                    />

                                    <Spacer />
                                </div>
                            </div>
                            <Spacer />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.addingDistributorActivityTask}
                                >
                                    Create
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ auth, distributor, tasks }) => ({
    addingDistributorActivityTask: distributor.addingDistributorActivityTask,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    distributorDistributorId: distributor.distributorDetailsByDistributorId.distributorId,
    tasks: tasks.tasks,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addDistributorActivityTask,
            getActivityListByDistributorId,
            getTasks
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityTaskForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
    const start = type;
    console.log(start);
    //////debugger;
    if (status === type) {
        size = "30px";
    } else {
        size = "16px";
    }
    return (
        <Tooltip title={tooltip}>
            <Button
                ghost={status !== type}
                style={{
                    padding: "6px",
                    borderColor: "transparent",
                    color: status === type ? "orange" : "grey",
                }}
                onClick={onClick}
            >
                <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
            </Button>
        </Tooltip>
    );
}
