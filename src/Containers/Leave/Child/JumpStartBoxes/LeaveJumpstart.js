import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,JumpStartBox1,JumpStartBox2,JumpStartBox3 } from "../../../../Components/UI/Elements";

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
      <div class=" flex flex-col w-full items-center" >
            <div class=" flex w-full flex-row  md:ml-[9%] max-sm:ml-0 max-sm:justify-between max-sm:flex-col">
<div class="flex w-wk">
                <div class="md:w-[35%] max-sm:w-wk">
                <JumpStartBox
                // bgColor="#005075"
                title="Annual Leaves"
                stringValue
                noProgress
                value={totalLeaves}
                />
                </div>

                <div class="md:w-[35%] max-sm:w-wk">
                <JumpStartBox1
                // bgColor="#0073a8"
                stringValue
                noProgress
                title="Leaves Applied"
                value={totalAppliedLeaves}
                />
                </div>
                </div>
                <div class="flex w-wk">
                <div class="md:w-[35%] max-sm:w-wk">
                <JumpStartBox2
                // bgColor="#0093d7"
                // title="Pending"
                title="Approved"
                stringValue
                noProgress
                 value={"Data Not Available"}
                />
                </div>

                <div class="md:w-[35%] max-sm:w-wk">
                <JumpStartBox3
                // bgColor="#24b9fe"
                title="Leave Balance"
                stringValue
                noProgress
                value={leaveBalance}
                />
                </div>
                </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userDetails: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeaveJumpstart);
