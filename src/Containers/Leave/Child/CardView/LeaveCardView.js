import React, {  useEffect, useState,  lazy } from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import styled from "styled-components";
import {  DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../Components/Placeholder";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AssistantIcon from "@mui/icons-material/Assistant";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
  handleStatusLeaveModal,
  handleLeaveNoteDrawer
} from "../../LeavesAction";
const StatusLeavesModal = lazy(()=>import("./StatusLeavesModal"));
const LeaveNoteDrawer = lazy(()=>import("./LeaveNoteDrawer"));
const UpdateLeavesModal = lazy(()=>import("../Tab/UpdateLeavesModal"));

const { Option } = Select;
function LeaveCardView(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);
  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }

  const {
    leaveListRangeByUserId,
    fetchingLeaveListRangeByUserId,
    handleUpdateLeaveModal,
    updateLeaveModal,
    updateStatusLeaveModal,
    handleStatusLeaveModal,
    noteLeaveDrawer,
    handleLeaveNoteDrawer
  } = props;

  if (fetchingLeaveListRangeByUserId) {
    return <BundleLoader />;
  }
  return (
    <>
      <div class=" h-h72 overflow-auto overflow-x-auto">
        <CardWrapper>
          {leaveListRangeByUserId.map((item) => {
            return (
              <CardElement>
                <CardImage>
                  <div class=" flex flex-col justify-around w-full ">
                    <div>
                      <div className=" flex font-medium flex-col  ">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          {/* Delivery Date */}
                          Start Date:{" "}
                          {item.startDate === null ? (
                            "No Transaction"
                          ) : (
                            <span class="text-xs">
                              {dayjs(item.startDate).format("DD-MM-YYYY")}
                            </span>
                          )}
                          &nbsp;
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class=" text-sm text-cardBody font-medium font-poppins">
                        {/* Delivery Date */}
                        End Date:{" "}
                        {item.endDate === null ? (
                          "No Transaction"
                        ) : (
                          <span class="text-xs">
                            {dayjs(item.endDate).format("DD-MM-YYYY")}
                          </span>
                        )}
                        &nbsp;
                      </div>
                    </div>
                    <div>
                      <div class=" text-sm text-cardBody font-medium font-poppins">
                        Cover:{" "}
                        <label class="text-xs"> {item.coverDetails}</label>
                        &nbsp;
                      </div>
                    </div>

                    {/* <div >
                        <div class=" text-xs text-cardBody font-medium font-poppins">

                        Reason:    {item.reason}
 

  &nbsp;
</div>
          </div> */}
                  </div>
                </CardImage>
                <div class=" flex flex-row justify-around w-full items-end">
                  <span>
                    {item.status === "Approved" && (
                      <div
                        style={{
                          // backgroundColor: " green",
                          border: "2px solid green",
                          padding: "0px 0.62em",
                          textAlign: "center",
                          margin: "2px",
                          width: "8rem",
                          borderRadius: "0.62em",
                        }}
                      >
                        {" "}
                        <span style={{ color: "green" }}>Approved </span>
                      </div>
                    )}
                    {item.status === "Rejected" && (
                      <div
                        style={{
                          // backgroundColor:"red",
                          border: "2px solid red",
                          padding: "0px 0.62em",
                          textAlign: "center",
                          margin: "2px",
                          width: "8rem",
                          borderRadius: "0.62em",
                        }}
                      >
                        <span style={{ color: "red" }}>Rejected</span>
                      </div>
                    )}
                    {item.status === "Pending" && (
                      <div
                        style={{
                          border: "2px solid #e1d16c",
                          // backgroundColor:"yellow",
                          padding: "0px 0.62em",
                          textAlign: "center",
                          margin: "2px",
                          width: "10rem",
                          borderRadius: "0.62em",
                        }}
                      >
                        {" "}
                        <span className="text-[#e1d16c]">
                          Waiting For Approval
                        </span>
                      </div>
                    )}
                  </span>
                  <Tooltip title={item.reason}>
                    <NoteAltIcon 
                    style={{ cursor: "pointer",padding: "2px",fontSize:"1.2rem" }}
                    onClick={() => {
                   
                      handleLeaveNoteDrawer(true);
                      handleSetCurrentLeaveId(item);
                    }}
                    />
                  </Tooltip>
                  <span>
                    {item.status === "Pending" ? (
                      <div
                        style={{ cursor: "pointer", padding: "2px" }}
                        // style={{ cursor: "pointer" }}
                        onClick={() => {
                          props.setEditLeave(item);
                          handleUpdateLeaveModal(true);
                          handleSetCurrentLeaveId(item.leaveId);
                        }}
                      >
                        <Tooltip title={item.emailId}>
                          <BorderColorIcon
                            style={{
                              color: "grey",
                              fontSize: "1.2rem",
                              padding: "2px",
                            }}
                          />
                        </Tooltip>
                      </div>
                    ) : (
                      ""
                    )}
                  </span>

                  <span>
                    <div
                      style={{ cursor: "pointer", padding: "2px" }}
                      onClick={() => {
                        handleStatusLeaveModal(true);
                        handleSetCurrentLeaveId(item.leaveId);
                      }}
                    >
                      <Tooltip title={"Status"}>
                        <AssistantIcon
                          style={{
                            color: "grey",
                            fontSize: "1.2rem",
                            padding: "2px",
                          }}
                        />
                      </Tooltip>
                    </div>
                  </span>

                  <span>
                    {item.status === "Pending" ? (
                      <div style={{ cursor: "pointer", padding: "2px" }}>
                        <DeleteOutlined
                          type="delete"
                          style={{ cursor: "pointer", color: "red" }}
                        ></DeleteOutlined>
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </CardElement>
            );
          })}
        </CardWrapper>
      </div>
      <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />

      <StatusLeavesModal
        leaveId={currentLeaveId}
        updateStatusLeaveModal={updateStatusLeaveModal}
        handleStatusLeaveModal={handleStatusLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />
      <LeaveNoteDrawer
       leavesItems={currentLeaveId}
      noteLeaveDrawer={noteLeaveDrawer}
      handleLeaveNoteDrawer={handleLeaveNoteDrawer}
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
  updateStatusLeaveModal: leave.updateStatusLeaveModal,
  noteLeaveDrawer:leave.noteLeaveDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
      handleStatusLeaveModal,
      handleLeaveNoteDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCardView);

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`;
const CardElement = styled.div`
  border-radius: 0.35rem;
  border: 3px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.25em 0.62em #aaa;
  height: 7rem;
  color: rgb(68, 68, 68);
  margin: 1em;
  padding: 0.2rem;
  width: 19vw;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
  }
`;
const CardDescription = styled.div`
  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const CardImage = styled.div`
  width: 200;
  display: flex;
  height: 200 @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const WithOutImage = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction:column @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`;
const Desc = styled.p`
  height: 0px;
`;
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
`;

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
