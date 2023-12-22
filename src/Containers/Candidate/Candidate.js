import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {
  handleCandidateModal,
  handleCandidateResumeModal,
  getCandidateListByUserId,
  getCandidatePagination,
  setCandidateViewType,
  handleCandidateFilterModal,
  emptyCandidate,
  getCandidateWhitePagination,
  getCandidateBluePagination,
} from "./CandidateAction";
const AddCandidateModal = lazy(() => import("./Child/AddCandidateModal"));
const CandidateHeader = lazy(() => import("./Child/CandidateHeader"));
const CandidateWhiteTable = lazy(() =>
  import("../Candidate/Child/CandidateWhiteTable")
);
const CandidateBlackListTable = lazy(() =>
  import("../Candidate/CandidateBlackListTable")
);
const AddCandidateResumeModal = lazy(() =>
  import("../Candidate/Child/AddCandidateResumeModal")
);
const CandidateBlueTable = lazy(() =>
  import("../Candidate/Child/CandidateBlueTable")
);
const CandidateTable = lazy(() =>
  import("./Child/CandidateTable/CandidateTable")
);
const CandidateMap = lazy(() =>
  import("../Candidate/CandidateMap")
);
const AddCandidateFilterModal = lazy(() =>
  import("../Candidate/Child/AddCandidateFilterModal")
);
const CandidateDollarTable = lazy(() =>
  import("../Candidate/Child/CandidateTable/CandidateDollarTable")
);
const CandidateBillableStepper = lazy(() =>
  import("../Dashboard/Child/BillableCandidate/CandidateBillableStepper")
);
const CandidateCardView = lazy(() => import("./CandidateCardView"));

class Candidate extends Component {
  constructor(props) {
    super(props);
  this.state = {
    currentData: undefined,
    responseData: null,
    text: undefined,
    currentSkillData: "",
  };
}

  handleResponseData = (data) => {
    console.log("functioncalled")
    this.setState({ responseData: data });
  };

  handleDropChange = (value) => {
    this.setState({ currentUser: value });

    if (this.props.viewType === "table") {
      this.props.getCandidatePagination(value, 0);
    }

    if (this.props.viewType === "list") {
      this.props.getCandidateWhitePagination("white", value, 0);
    }

    if (this.props.viewType === "dashboard") {
      this.props.getCandidateBluePagination("blue", value, 0);
    }

    console.log("valid", value);
  };
  handleClear = () => {
    this.setState({ currentData: undefined });
    this.props.emptyCandidate();
    this.props.getCandidateListByUserId(
      this.state.currentUser ? this.state.currentUser : this.props.userId,
      0
    );
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
    console.log(value);
  };

  handleSkillClear = () => {
    this.setState({ currentSkillData: "" });
    this.props.getCandidateListByUserId(this.props.userId);
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value });
  };
  setCurrentSkillData = (value) => {
    this.setState({ currentSkillData: value });
  };
  render() {
    console.log("candidadte render");
    console.log("candidadte",this.props.selectedLanguage);
    const {
      addCandidateModal,
      addCandidateResumeModal,
      addCandidateFilterModal,
      handleCandidateModal,
      handleCandidateResumeModal,
      handleCandidateFilterModal,
      handleContactDrawer,
      viewType,
      setCandidateViewType,
      contacts,
      fetchingContacts,
    } = this.props;

    console.log("statue", this.state.responseData);
    return (
      <React.Fragment>
        <CandidateHeader
          viewType={viewType}
          handleDropChange={this.handleDropChange}
          currentUser={this.state.currentUser}
          setCandidateViewType={setCandidateViewType}
          handleCandidateModal={handleCandidateModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          text={this.state.text}
          setCurrentData={this.setCurrentData}
          handleSkillClear={this.handleClear}
          currentSkillData={this.state.currentSkillData}
          setCurrentSkillData={this.setCurrentSkillData}
        />

        <AddCandidateModal
          addCandidateModal={addCandidateModal}
          handleCandidateModal={handleCandidateModal}
          responseData={this.state.responseData}
        />
       
        <AddCandidateFilterModal
          addCandidateFilterModal={addCandidateFilterModal}
          handleCandidateFilterModal={handleCandidateFilterModal}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
            <CandidateCardView
              viewType={viewType}
              handleResponseData={this.handleResponseData}
              responseData={this.state.responseData}
            />
          ) : this.props.viewType === "dollar" ? (
            <CandidateDollarTable viewType={viewType} />
            
          ) 
          : this.props.viewType === "billable" ? (
            <CandidateBillableStepper viewType={viewType} />
            
          ) 
          : this.props.viewType === "table" ? (
            <CandidateTable
              handleResponseData={this.handleResponseData}
              responseData={this.state.responseData}
              currentUser={this.state.currentUser}
              selectedLanguage={this.props.selectedLanguage}

            />
          ) : this.props.viewType === "list" ? (
            <CandidateWhiteTable currentUser={this.state.currentUser} />
          ) : this.props.viewType === "dashboard" ? (
            <CandidateBlueTable currentUser={this.state.currentUser} />
          ) : this.props.viewType === "black" ? (
            <CandidateBlackListTable />
          ) : // this.props.viewType==="grid"?
          // <CandidateGridTable/>:

          this.props.viewType === "map" ? (
            <CandidateMap />
          ) : null}
        </Suspense>

        <AddCandidateResumeModal
          addCandidateResumeModal={addCandidateResumeModal}
          handleCandidateResumeModal={handleCandidateResumeModal}
          handleResponseData={this.handleResponseData}
          responseData={this.state.responseData}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ candidate, account, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addCandidateModal: candidate.addCandidateModal,
  addCandidateResumeModal: candidate.addCandidateResumeModal,
  viewType: candidate.viewType,
  addCandidateFilterModal: candidate.addCandidateFilterModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCandidateFilterModal,
      handleCandidateModal,
      handleCandidateResumeModal,
      getCandidateListByUserId,
      setCandidateViewType,
      getCandidatePagination,
      emptyCandidate,
      getCandidateWhitePagination,
      getCandidateBluePagination,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
