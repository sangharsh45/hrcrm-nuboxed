import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { handleTeamsModal, setTeamsViewType } from "./TeamsAction";
const PerformanceManagement =lazy(()=> import('./PerformanceManagement'));
const TeamsHeader =lazy(()=> import('./TeamsHeader'));
const TeamsModal =lazy(()=> import('./TeamsModal'));
const TeamsTable =lazy(()=> import('./TeamsTable'));
const TeamsAllocationTable =lazy(()=> import('./TeamsAllocationTable'));
const TeamsClientTable =lazy(()=> import('./TeamsClientTable'));
const TeamsInventoryTable =lazy(()=> import('./TeamsInventoryTable'));
const TeamsCardList =lazy(()=> import('./TeamsCard.js/TeamsCardList'));

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
        <Suspense fallback={<BundleLoader />}>
        {  viewType === "table" ?
         <TeamsCardList/>
 
  :viewType==="client" ?
 <PerformanceManagement/> 

          :null}
      
        </Suspense>
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
