import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { MainWrapper, } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getIdProofs,
  addIdProofs,
  removeIdProof,
  updateIdProofs,
  searchIdProofName,
  ClearReducerDataOfIdproof
} from "./IdProofAction";
const SingleIdProof = lazy(() =>
  import("./SingleIdProof")
);


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
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getIdProofs();
      this.props.ClearReducerDataOfIdproof();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchIdProofName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
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
           <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
         <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            <div class=" flex flex-col" >           
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
              {idProofs.length ? (
  idProofs
    .slice() 
    .sort((a, b) => a.IdProofType.localeCompare(b.IdProofType)) 
    .map((idProof, i) => (
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
            </div>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
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
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingIdProofs}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
              </>
            )}
          </MainWrapper>         
        </div>
        <div>Updated on {moment(this.props.idProofs && this.props.idProofs.length && this.props.idProofs[0].updationDate).format("ll")} by {this.props.idProofs && this.props.idProofs.length && this.props.idProofs[0].name}</div>
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
      removeIdProof,
      ClearReducerDataOfIdproof
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(IdProofs);
