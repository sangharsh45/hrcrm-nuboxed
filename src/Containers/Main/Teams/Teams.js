import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { handleTeamsModal, setTeamsViewType } from "./TeamsAction";
import TeamsHeader from "./TeamsHeader";
import TeamsModal from "./TeamsModal";

class Teams extends Component {
  render() {
    const {
      viewType,
      addTeamsModal,
      handleTeamsModal,
      setTeamsViewType,
      user
    } = this.props;

    return (
      <React.Fragment>
        <TeamsHeader
          viewType={viewType}
          handleTeamsModal={handleTeamsModal}
          setTeamsViewType={setTeamsViewType}
        />
        <TeamsModal
          addTeamsModal={addTeamsModal}
          handleTeamsModal={handleTeamsModal}
        />
        {/* <Suspense fallback={<BundleLoader />}>
          {
           
            viewType === "table" && user.functionName !== "Customer Care" ? (
              <TeamsTable />
            ) : viewType === "partner" && user.functionName !== "Customer Care" ? (
              <TeamsAllocationTable />
            ) :
              viewType === "client" ? (
                <TeamsClientTable />
              ) : viewType === "inventory" ? (
                <TeamsInventoryTable />
              ) :
                null}
        </Suspense> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ teams, auth }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  viewType: teams.viewType,
  addTeamsModal: teams.addTeamsModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTeamsViewType,
      handleTeamsModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Teams);
