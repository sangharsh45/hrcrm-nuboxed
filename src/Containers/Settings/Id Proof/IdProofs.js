import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import SingleIdProof from "./SingleIdProof";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getIdProofs,
  addIdProofs,
  removeIdProof,
  updateIdProofs,
  searchIdProofName
} from "./IdProofAction";

class IdProofs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedIdProofs: [],
      isTextInputOpen: false,
      addingIdProof: false,
      IdProofType: "",
      // type:"",
      singleIdProof: "",
      editInd:true,
      currentData: ""
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getIdProofs();
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
  handleAddIdProofs = () => {
    const { addIdProofs, idProofs } = this.props;
    const { IdProofType, addingIdProofs, isTextInputOpen,editInd } = this.state;
    let idProof = { IdProofType,editInd };

    let exist =
    idProofs &&
    idProofs.some((element) => element.IdProofType == IdProofType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another idProof type exists with same name!"
    //   );
    // } else {
      addIdProofs(idProof, () => console.log("add idProof callback"));
    // }

    this.setState({
      IdProofType: "",
      singleIdProof: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  handleDeleteIdProof = (idProofTypeId={idProofTypeId}) => {
    this.props.removeIdProof(idProofTypeId);
    this.setState({ IdProofType: "", singleIdProof: "" });
  };
  handleUpdateIdProof = (IdProofType,IdProofTypeId,editInd, cb) => {
    this.props.updateIdProofs(IdProofType,IdProofTypeId,editInd,  cb);
    this.setState({ IdProofType: "", singleIdProof: "",editInd:true });
  }; 
  componentDidMount() {
    const { getIdProofs } = this.props;
    console.log();
    getIdProofs(getIdProofs);
  }
  render() {
    const {
      fetchingIdProofs,
      fetchingIdProofsError,
      idProofs,
      addingIdProofs,
      updatingIdProofs,
    } = this.props;
    const {
      IdProofType,
      isTextInputOpen,      
      idProofTypeName,
      singleIdProof,
      linkedIdProofs,
    } = this.state;
     if (fetchingIdProofs) return <BundleLoader/>;
    // if (fetchingIdProofsError) return <p>We are unable to load data</p>;
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
          onClick={() => {
            this.props.searchIdProofName(this.state.currentData);

          }}
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
          Clear
        </Button>
        </div>
            <FlexContainer flexDirection="column">             
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {idProofs.length ? (
                  idProofs.map((idProof, i) => (
                    <SingleIdProof
                      key={i}
                      value={singleIdProof}
                      name="singleIdProof"
                      idProof={idProof}
                      linkedIdProofs={linkedIdProofs}
                      updatingIdProofs={updatingIdProofs}
                      handleChange={this.handleChange}
                      handleUpdateIdProof={this.handleUpdateIdProof}
                     handleDeleteIdProof={this.handleDeleteIdProof}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
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
                  placeholder="Add Idproof"
                 name="IdProofType"
                  value={IdProofType}
                  onChange={this.handleChange}
                  width="61%"                  
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!IdProofType}
                  Loading={addingIdProofs}
                  onClick={this.handleAddIdProofs}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
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
                    Loading={addingIdProofs}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </FlexContainer>
              </>
            )}
          </MainWrapper>         
        </FlexContainer>
        <h4>Updated on {moment(this.props.idProofs && this.props.idProofs.length && this.props.idProofs[0].updationDate).format("ll")} by {this.props.idProofs && this.props.idProofs.length && this.props.idProofs[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ idProof }) => ({
  addingIdProofs: idProof.addingIdProofs,
  addingIdProofsError: idProof.addingIdProofsError,
  idProofs: idProof.idProofs,    
  fetchingIdProofs: idProof.fetchingIdProofs,
  fetchingIdProofsError: idProof.fetchingIdProofsError,
  updatingIdProofs: idProof.updatingIdProofs,
  updatingIdProofsError: idProof.updatingIdProofsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIdProofs,
      addIdProofs ,
      updateIdProofs,
      searchIdProofName,
      removeIdProof
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(IdProofs);
