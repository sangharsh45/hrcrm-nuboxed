import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import LeaveCardList from "./Child/CardView/LeaveCardList";
import LeaveCardView from "./Child/CardView/LeaveCardView";
import LeaveJumpstartBoxex from "./Child/JumpStartBoxes/LeaveJumpstartBoxes";
import LeaveHeader from "./Child/LeaveHeader";
import LeaveTable from "./Child/Tab/LeaveTable";
import { getleaveLeftSideDetails,setLeavesViewType } from "./LeavesAction";
import LeaveStatusCard from "./Child/CardView/LeaveStatusCard";
import LeaveGranttChart from "./Child/Chart/LeaveGranttChart";
const LeaveJumpstart = lazy(() => import("./Child/JumpStartBoxes/LeaveJumpstart"));
const LeaveDetailLeft = lazy(() => import("./Child/LeaveDetailLeft"));
const LeaveDetailRight = lazy(() => import("./Child/LeaveDetailRight"));

class Leave extends Component {
  state = { currentData: "",currentUser:"" };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
    const {
      user: { userId },
      getleaveLeftSideDetails,
    } = this.props;
    getleaveLeftSideDetails(userId);
  }
  render() {
    const {
      setLeavesViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <>
       
        <LeaveHeader 
             handleDropChange={this.handleDropChange}
             currentUser={this.state.currentUser}
            viewType={this.props.viewType}
            setLeavesViewType={this.props.setLeavesViewType}
          //  handleCustomerModal={handleCustomerModal}
           handleClear={this.handleClear}
           handleChange={this.handleChange}
           currentData={this.state.currentData}
           setCurrentData={this.setCurrentData}
        />
 <LeaveJumpstart leaveFetching={this.props.leaveFetching} />

        {/* <FlexContainer>
          <Suspense fallback={"Loading..."}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}> */}
            { this.props.viewType === "tile"?
            <LeaveCardView
            viewType={viewType}
            />  :
          //  this.props.viewType === "table" ?
          //      <LeaveTable 
          //      viewType={viewType}
          //      />:
               this.props.viewType === "card" ?
               <LeaveCardList
               viewType={viewType}
               />: this.props.viewType === "list" ?
               <LeaveStatusCard
               viewType={viewType}
               />:this.props.viewType === "grant" ?
               <LeaveGranttChart
               viewType={viewType}
               />:
               null}
              {/* <div style={{ width: "25%", height: "100%" }}>
                <LeaveDetailLeft leaveFetching={this.props.leaveFetching} />
              </div> */}
              {/* <div style={{ width: "100%", height: "100%" }}>
                <LeaveDetailRight />
              </div> */}
            {/* </FlexContainer>
          </Suspense>
        </FlexContainer> */}
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, leave }) => ({
  user: auth.userDetails,
  viewType: leave.viewType,

  leaveFetching: leave.leaveFetching,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    getleaveLeftSideDetails,
    setLeavesViewType
   }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
