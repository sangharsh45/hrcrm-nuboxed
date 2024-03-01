// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getPhoneTasklist } from "../../../Account/AccountAction";
// import { MainWrapper } from "../../../../../Components/UI/Elements";
// import { Checkbox, Switch } from "antd";

// function AccountPhoneTaskTable(props) {
//     useEffect(() => {
//         props.getPhoneTasklist(props.phoneId)
//         settask1Ind(props.phoTasklist.task1Ind)
//         settask2Ind(props.phoTasklist.task2Ind)
//         settask3Ind(props.phoTasklist.task3Ind)
//     }, [
//         props.phoTasklist.task1Ind,
//         props.phoTasklist.task2Ind,
//         props.phoTasklist.task3Ind,
//     ])
//     const [task1Ind, settask1Ind] = useState(props.phoTasklist.task1Ind)
//     const [task2Ind, settask2Ind] = useState(props.phoTasklist.task2Ind)
//     const [task3Ind, settask3Ind] = useState(props.phoTasklist.task3Ind)

//     return (
//         <>
//             <MainWrapper>
//                 <>
//                     <h4>Task Type</h4>
//                     {props.phoTasklist.task1 ?
//                         <h5>Task1 :{props.phoTasklist.task1}

//                         </h5>
//                         : null}
//                     {props.phoTasklist.task2 ?
//                         <h5>Task2 :{props.phoTasklist.task2}
//                         </h5>

//                         : null}

//                     {props.phoTasklist.task3 ?
//                         <h5>Task3 :{props.phoTasklist.task3}</h5> : null}
//                 </>
//             </MainWrapper>
//         </>
//     );
// }

// const mapStateToProps = ({ distributor }) => ({
//     phoTasklist: distributor.phoTasklist,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getPhoneTasklist
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskTable);

import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../../AccountAction";
import { addTaskByPhoneId } from "../../../Refurbish/RefurbishAction"
import { Button, Input, Switch, Select } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import AccountPhoneTaskList from "./AccountPhoneTaskList";

const { Option } = Select;

function AccountPhoneTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId);
    }, []);

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
                            <div class="font-bold text-base">Add Custom Task</div>
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
                            <div class="w-[50%]">
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
                <AccountPhoneTaskList phoneId={props.phoneId} />
            </Suspense>
        </>
    );
}

const mapStateToProps = ({ distributor, auth, refurbish }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist,
            addTaskByPhoneId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountPhoneTaskTable);

