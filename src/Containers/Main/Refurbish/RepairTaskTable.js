import React, { useState, useEffect,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../Account/AccountAction";
import { addTaskByPhoneId,updateProcessTask } from "./RefurbishAction"
import {  StyledLabel } from "../../../Components/UI/Elements";
import { Button, Input, Switch, Select } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
const RepairTaskList=lazy(()=>import("./RepairTaskList"));

const { Option } = Select;

function RepairTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId);
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
        <div class="flex justify-around max-sm:flex-col">
            <div class=" h-full w-w47.5 max-sm:w-wk">
            <div class="flex justify-between">
                  <div class="w-[31%]">
                  <StyledLabel>Add Task</StyledLabel>
                  </div>
                  <div class="w-[31%]">
                  <Switch
                                checked={type}
                                onChange={handleChangeType}
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                            />
                  </div>
                  
                  {type ?
                            <div  class="w-[50%]">
                                <Input type="text" value={customName} placeholder="Enter Custome Task" onChange={(value) => { handleCustomeName(value) }} />
                            </div>
                            : <div class="w-[50%]">
                                <Select onChange={handleTask}>
                                    {props.phoTasklist.map((a) => {
                                        return <Option value={a.itemTaskId}>{a.name}</Option>;
                                    })}
                                </Select>

                            </div>}
                </div>
               
              </div>
<div class=" h-full w-w47.5 max-sm:w-wk">
<div class="flex justify-between">
                  <div class="w-[48%]">
                  <Button type="primary"
                  onClick={handleSubmitTask}>Add</Button>
                  </div>
                </div>
              </div>
              </div>
              <Suspense fallback={<BundleLoader />}>
              <RepairTaskList phoneId={props.phoneId}/>
            </Suspense>
   
        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    taskByPhone: refurbish.taskByPhone,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist,
            addTaskByPhoneId,
            updateProcessTask,   
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskTable);
