import React, {useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTaskByPhoneId,  } from "./RefurbishAction"
import { MainWrapper } from "../../../Components/UI/Elements";
import RepairTaskToggle from "./RepairTaskToggle";


function RepairTaskList(props) {
    useEffect(() => {
        props.getTaskByPhoneId(props.phoneId)
    }, []);

    return (
        <>
            <MainWrapper>
        
                {props.taskByPhone.map((item) => {
                    return (
                        <div class="cursor-pointer w-[18%] flex justify-center ">
                            <div class="basis-[85%]">
                                {item.taskName}
                            </div>
                            <div>
                           <RepairTaskToggle phoneTaskId={item.phoneTaskId}/>
                            </div>
                        </div>
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
            getTaskByPhoneId,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RepairTaskList);