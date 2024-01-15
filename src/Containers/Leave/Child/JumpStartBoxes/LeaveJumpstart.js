import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { JumpStartBox } from "../../../../Components/UI/Elements";

class LeaveJumpstart extends React.Component {
  render() {
    const {
      leaveFetching: {
        leaveBalance,
        totalAppliedLeaves,
        totalLeaves,
        totalPendingLeaves,
        
      },
    } = this.props;
     console.log(leaveBalance);
    return (
      <FlexContainer flexDirection="column" style={{ width: "100%" }}>
            <div class=" flex w-full flex-row  md:ml-[9%] max-sm:ml-0 max-sm:justify-between">

                <div class="md:w-1/5 max-sm:w-[24%]">
                <JumpStartBox
                // bgColor="#005075"
                title="Annual Leaves"
                stringValue
                noProgress
                value={totalLeaves}
                />
                </div>

                <div class="md:w-1/5 max-sm:w-[24%]">
                <JumpStartBox
                // bgColor="#0073a8"
                stringValue
                noProgress
                title="Leaves Applied"
                value={totalAppliedLeaves}
                />
                </div>

                <div class="md:w-1/5 max-sm:w-[24%]">
                <JumpStartBox
                // bgColor="#0093d7"
                // title="Pending"
                title="Approved"
                stringValue
                noProgress
                 value={"Data Not Available"}
                />
                </div>

                <div class="md:w-1/5 max-sm:w-[24%]">
                <JumpStartBox   
                // bgColor="#24b9fe"
                title="Leave Balance"
                stringValue
                noProgress
                value={leaveBalance}
                />
                </div>
            </div>
        </FlexContainer>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveJumpstart);
