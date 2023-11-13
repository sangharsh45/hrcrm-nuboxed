import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../Account/AccountAction";
import { MainWrapper } from "../../../Components/UI/Elements";
import { Checkbox, Switch } from "antd";

function DistributorPhoneTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.phoneId)
        settask1Ind(props.phoTasklist.task1Ind)
        settask2Ind(props.phoTasklist.task2Ind)
        settask3Ind(props.phoTasklist.task3Ind)
    }, [
        props.phoTasklist.task1Ind,
        props.phoTasklist.task2Ind,
        props.phoTasklist.task3Ind,
    ])
    const [task1Ind, settask1Ind] = useState(props.phoTasklist.task1Ind)
    const [task2Ind, settask2Ind] = useState(props.phoTasklist.task2Ind)
    const [task3Ind, settask3Ind] = useState(props.phoTasklist.task3Ind)

    return (
        <>
            <MainWrapper>
                <>
                    <h4>Task Type</h4>
                    {props.phoTasklist.task1 ?
                        <h5>Task1 :{props.phoTasklist.task1}

                        </h5>
                        : null}
                    {props.phoTasklist.task2 ?
                        <h5>Task2 :{props.phoTasklist.task2}
                        </h5>

                        : null}

                    {props.phoTasklist.task3 ?
                        <h5>Task3 :{props.phoTasklist.task3}</h5> : null}
                </>
            </MainWrapper>
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    phoTasklist: distributor.phoTasklist,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorPhoneTaskTable);
