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
const { Option } = Select;

function LeaveApprovedStatusCard(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);
  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
  if (props.fetchingLeaveListRangeByUserId) {
    return <BundleLoader />;
  }
  const { handleUpdateLeaveModal, updateLeaveModal } = props;

  return (
    <>
      <OnlyWrapCard div className="h-[32rem]">
        {props.leaveListRangeByUserId
          .filter((sts) => sts.status === "Approved")
          .map((item) => {
            const currentdate = moment().format("DD/MM/YYYY");
            const date = moment(item.creationDate).format("DD/MM/YYYY");

            return (
              <>
                <div>
                  <div
                    className="flex justify-between mt-2 "
                    // style={hrStyle}
                    style={{
                      borderBottom: "3px dotted #515050",
                    }}
                  >
                    <div class=" flex flex-row justify-evenly w-wk">
                      <div className=" flex font-medium flex-col w-44 ">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Start Date
                        </div>

                        <div class=" font-normal text-sm text-cardBody font-poppins">
                          {` ${moment.utc(item.startDate).format("ll")}`}
                        </div>
                      </div>

                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          End Date
                        </div>

                        <div class=" font-normal text-sm text-cardBody font-poppins">
                          {` ${moment.utc(item.endDate).format("ll")}`}
                        </div>

                        {/* </Tooltip>   */}
                      </div>
                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Cover
                        </div>

                        <div class=" font-normal text-sm text-cardBody font-poppins">
                          {item.coverDetails}
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Reason
                        </div>

                        <div class=" font-normal text-sm text-cardBody font-poppins">
                          {item.reason}
                        </div>
                      </div>

                      <div className=" flex font-medium flex-col w-48 ">
                        <div class=" text-base text-cardBody font-poppins">
                          {item.status === "Approved" && (
                            <div
                              style={{
                                border: "2px solid green",
                                padding: "0px 0.62em",
                                textAlign: "center",
                                margin: "2px",
                                borderRadius: "0.62em",
                              }}
                            >
                              <div className="text-[green]">{item.status}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </OnlyWrapCard>

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveApprovedStatusCard);
