import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { getPhoneTasklist } from "../Account/AccountAction";
import { getTaskByPhoneId, addTaskByPhoneId } from "./RefurbishAction"
import { MainWrapper, StyledLabel } from "../../../Components/UI/Elements";
import { Button, Input, Switch, Select } from "antd";
const { Option } = Select;

function RepairTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId)
        props.getTaskByPhoneId(props.phoneId)
    }, [])
    const [task, setTask] = useState("")
    const [customName, setCustomeName] = useState("")
    const [type, setType] = useState(false)
    const handleTask = (value) => {
        console.log(value)
        setTask(value)
    }
    const handleCustomeName = (e) => {
        setCustomeName(e.target.value)
    }
    const handleChangeType = () => {
        setType(!type)
    }
    const handleSubmitTask = () => {
        props.addTaskByPhoneId({
            phoneId: props.phoneId,
            itemTaskId: task,
            taskName: customName,
            userId: props.userId
        }, props.phoneId)
    }
    return (
        <>
            <StyledLabel>Add Task</StyledLabel>
            <MainWrapper>
                <div style={{ justifyContent: "space-between", display: "flex", width: "70%" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
                        <div style={{ width: "30%" }}>
                            <Switch
                                checked={type}
                                onChange={handleChangeType}
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                        </div>
                        {type ?
                            <div style={{ width: "50%" }}>
                                <Input type="text" value={customName} placeholder="Enter Custome Task" onChange={(value) => { handleCustomeName(value) }} />
                            </div>
                            : <div style={{ width: "50%" }}>
                                <Select onChange={handleTask}>
                                    {props.phoTasklist.map((a) => {
                                        return <Option value={a.itemTaskId}>{a.name}</Option>;
                                    })}
                                </Select>

                            </div>}
                    </div>
                    <div style={{ width: "20%" }}><Button onClick={handleSubmitTask}>Add</Button></div>
                </div>
                {props.taskByPhone.map((item) => {
                    return (
                        <EventWrapper>
                            <EventName style={{ flexBasis: "85%" }}>
                                {item.taskName}
                            </EventName>
                        </EventWrapper>
                    )
                })}
            </MainWrapper>


        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    taskByPhone: refurbish.taskByPhone,
    userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist,
            getTaskByPhoneId,
            addTaskByPhoneId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);
const EventWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const EventName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;