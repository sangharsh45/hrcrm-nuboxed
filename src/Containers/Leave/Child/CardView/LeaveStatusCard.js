import React, {  useEffect, useState,  lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
const UpdateLeavesModal = lazy(() => import("../Tab/UpdateLeavesModal"));
const LeavePendingStatusCard = lazy(() => import("./LeavePendingStatusCard"));
const LeaveApprovedStatusCard = lazy(() => import("./LeaveApprovedStatusCard"));
const LeaveRejectedStatusCard = lazy(() => import("./LeaveRejectedStatusCard"));


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
      <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <LeavePendingStatusCard />
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <LeaveApprovedStatusCard />
        </div>
        <div className="w-[26rem] max-sm:w-wk">
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
