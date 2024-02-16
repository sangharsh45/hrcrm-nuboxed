
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input} from "antd";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../Components/UI/Elements";
// import * as Yup from "yup";
import {addProjectsData,
  getProjectsData,
  updateProjectsData,
  removeProjectData} from "../Project/ProjectAction"
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import SingleUnit from "../../Unit/SingleUnit";
import SingleProject from "./SingleProject";



class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      projectName: "",
      type: "",
      singleProject: "",
      editInd:true,
      currentData: ""
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
     this.props.getProjectsData(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
    handleAddProject = () => {
    const { addProjectsData, projectsData } = this.props;
    const { projectName, addingProjectsData, isTextInputOpen,editInd
    } = this.state;
    let project = { projectName,editInd
    };

    let exist =
    projectsData &&
    projectsData.some((element) => element.projectName == projectName);

    if (exist) {
      message.error(
        "Can't create as another unit type exists with same name!"
      );
    } else {
      addProjectsData(project, () => console.log("add unit callback"));
    }

    this.setState({
      projectName: "",
      singleProject: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteProject = (projectId={projectId}) => {
    this.props.removeProjectData(projectId);
    this.setState({ projectName: "", projectId: "" });
  };
  handleUpdateProject = (projectName,projectId ,editInd, cb) => {
    this.props.updateProjectsData(projectName, projectId,editInd, cb);
    this.setState({ projectName: "", singleProject: "",editInd: true });
  };

  componentDidMount() {
    const { getProjectsData ,organizationId} = this.props;
    console.log();
    getProjectsData(organizationId);
  }
  render() {
    const {
      fetchingProjectsData,
      fetchingProjectsDataError,
      projectsData,
      addingProjectsData,
      updatingProjectsData,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      projectName,
      singleProject,
      linkedTasks,
    } = this.state;
    if (fetchingProjectsData) return <p>Loading ...</p>;
    // if (fetchingUnitsError) return <p>We are unable to load data</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
                     <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder="Search by Name"
            width={"100%"}
            // onSearch={(value) => {
            //   props.inputCandidateDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
        //   onClick={() => {
        //     this.props.searchTaskName(this.state.currentData);

        //   }}
        >
          Submit
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
      
        </Button>
        </div>
            <FlexContainer flexDirection="column">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {projectsData.length &&
                  projectsData.map((project, i) => (
                    <SingleProject
                      //  key={i}
                      value={singleProject}
                      name="singleProject"
                        project={project}
                      linkedTasks={linkedTasks}
                      updatingProjectsData={updatingProjectsData}
                      handleUpdateProject={this.handleUpdateProject}
                      handleChange={this.handleChange}
  
                      handleDeleteProject={this.handleDeleteProject}
                    />
                   ))} 
              </MainWrapper>
            </FlexContainer>
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="projectName"
                  value={projectName}
                   onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!projectName}
                  Loading={addingProjectsData}
                  onClick={this.handleAddProject}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                     Loading={addingProjectsData}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </FlexContainer>
                <div>Updated on {dayjs(this.props.projectsData && this.props.projectsData.length && this.props.projectsData[0].updationDate).format("ll")} by {this.props.projectsData && this.props.projectsData.length && this.props.projectsData[0].name}</div>
              </>
            )}
          </MainWrapper>
         
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ projects,auth }) => ({
  addingProjectsData: projects.addingProjectsData,
  addingProjectsDataError: projects.addingProjectsDataError,
  projectsData: projects.projectsData,

  removingProjectsData: projects.removingProjectsData,
  removingProjectsDataError: projects.removingProjectsDataError,

  organizationId: auth.userDetails.organizationId,
  fetchingProjectsData:projects.fetchingProjectsData,
  fetchingProjectsDataError: projects.fetchingProjectsDataError,

  updatingProjectsData: projects.updatingProjectsData,
  updatingProjectsDataError: projects.updatingProjectsDataError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getProjectsData,
    addProjectsData,
     removeProjectData,
     updateProjectsData,
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Project);
