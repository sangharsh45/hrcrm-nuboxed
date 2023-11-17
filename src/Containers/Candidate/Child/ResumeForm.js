import React, { Component, PureComponent, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import {
  handleCandidateModal,
  handleCandidateResumeModal,
} from "../CandidateAction";
import { getLibrarys } from "../../../Containers/Settings/Library/LibraryAction";
import { Button } from "antd";
import { Spacer } from "../../../Components/UI/Elements";
import { addResumeForm,addParsingForm } from "../CandidateAction";
import { FlexContainer } from "../../../Components/UI/Layout";
class ResumeForm extends PureComponent {
  state = {
    fileData: null,
    selectedFile: null,
     responseData: null,
  };
  handleSetFileData = (file) => {
    this.setState({ fileData: file });
  };
  handleReset = (resetForm) => {
    resetForm();
  };

  handleResumeUpload = () => {
    let formData = new FormData();
    formData.append("file", this.state.selectedFile);
    console.log(this.props.resumeForm.length && this.props.resumeForm);
    this.props.addResumeForm(formData);
  };

  changeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  handleSubmission = () => {
    console.log(this.state.selectedFile);
    console.log(this.props.librarys);
    const convertedArray = this.props.librarys.map((item) => item.name);
    const convertedString = convertedArray.toString();
    console.log(convertedString);
    let formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("skills", convertedString);
    console.log(formData);
    axios
      .post(`https://develop.tekorero.com/HrAnalytics/pdf/read`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        ////debugger;
         console.log("data45",res.data);
         this.props.handleResponseData(res.data);
        this.props.handleCandidateModal(true);
        this.props.handleCandidateResumeModal(false);
 
     
      })
      .catch((err) => {
        console.log(err);
      });
    // this.props.addParsingForm(formData);
  };
  componentDidMount() {
    const { getLibrarys, organizationId } = this.props;
    console.log();
    getLibrarys(organizationId);
  }
  render() {
    console.log("formch",this.props)
    console.log("FormRender", this.state.fileData);
    console.log("parsing",this.props.parsingForm)
    const {
      // user:{userId},
      addingResumeForm,
      handleCandidateModal,
      addCandidateModal,
    } = this.props;
    return (
      <>
        <input type="file" name="file" onChange={this.changeHandler} />
        <Spacer />
        <div class=" flex justify-end">
          <div>
            <button
              style={{
                backgroundColor: "#24d8a7",
                height: "1.6rem",
                color: "white",
                borderColor: "#24d8a7",
              }}
              onClick={() => {
                this.handleSubmission();
                this.handleResumeUpload();
              }}
            >
              Upload Selected File
            </button>
          </div>

          <div style={{ marginLeft: "5px" }}>
            <Button
              type="danger"
              ghost
              onClick={() => {
                handleCandidateModal(true);
                this.props.handleResponseData(null);
              }}
            >
              Don't have resume handy
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  librarys,
  candidate,
  opportunity,
  contact,
  customer,
}) => ({
  //   user: auth.userDetails,
  addingResumeForm: candidate.addingResumeForm,
  addCandidateModal: candidate.addCandidateModal,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  resumeForm: candidate.resumeForm,
  parsingForm:candidate.parsingForm
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addResumeForm,
      handleCandidateResumeModal,
      handleCandidateModal,
      getLibrarys,
      addParsingForm
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);
