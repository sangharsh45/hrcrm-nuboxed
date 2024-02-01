import React,{lazy} from "react";
const LeaveJumpstart = lazy(() => import("./LeaveJumpstart"));

class LeaveJumpstartBoxex extends React.Component {
  render() {
    const { leaveFetching } = this.props;
    return (
      <>
        <LeaveJumpstart leaveFetching={leaveFetching} />
      </>
    );
  }
}
export default LeaveJumpstartBoxex;
