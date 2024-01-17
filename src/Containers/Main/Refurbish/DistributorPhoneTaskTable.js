import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPhoneTasklist } from "../Account/AccountAction";
import { MainWrapper } from "../../../Components/UI/Elements";

function DistributorPhoneTaskTable(props) {
    useEffect(() => {
        props.getPhoneTasklist(props.orgId)
    }, [])
    return (
        <>
            <MainWrapper>

            </MainWrapper>
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    phoTasklist: distributor.phoTasklist,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneTasklist
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorPhoneTaskTable);
