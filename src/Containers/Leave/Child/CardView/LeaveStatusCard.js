import React, { Component, useEffect, useState, useMemo, lazy } from "react";
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import { FlexContainer, OnlyWrapCard } from "../../../../Components/UI/Layout";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
import UpdateLeavesModal from "../Tab/UpdateLeavesModal";
import LeavePendingStatusCard from "./LeavePendingStatusCard";
import LeaveApprovedStatusCard from "./LeaveApprovedStatusCard";
import LeaveRejectedStatusCard from "./LeaveRejectedStatusCard";
const { Option } = Select;

function LeaveStatusCard(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    // props.getLeaveListRangeByUserId(props.userId);
  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
//   if (props.fetchingLeaveListRangeByUserId) {
//     return <BundleLoader />;
//   }
  const { handleUpdateLeaveModal, updateLeaveModal } = props;

  return (
    <>
      <div className="flex justify-arround">
        <div className="w-[26rem]">
          <LeavePendingStatusCard />
        </div>
        <div className="w-[26rem]">
          <LeaveApprovedStatusCard />
        </div>
        <div className="w-[26rem]">
          <LeaveRejectedStatusCard />
        </div>
      </div>

      <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />
    </>
  );
}

const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingLeaveListRangeByUserId: leave.fetchingLeaveListRangeByUserId,
  fetchingLeaveListRangeByUserIdError:
    leave.fetchingLeaveListRangeByUserIdError,
  leaveListRangeByUserId: leave.leaveListRangeByUserId,
  // fetchingBankDetails: profile.fetchingBankDetails,
  updateLeaveModal: leave.updateLeaveModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveStatusCard);
