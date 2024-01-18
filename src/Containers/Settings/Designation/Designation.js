import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import moment from "moment";
import {
  getDesignations,
  addDesignations,
   removeDesignations,
  updateDesignations,
  searchDesignationName,
  ClearReducerDataOfDesignation
} from "./DesignationAction";
const SingleDesignation = lazy(() =>
  import("./Child/SingleDesignation")
);

class Designation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDesignations: [],
      isTextInputOpen: false,
      addingDesignation: false,
      designationType: "",
      type:"",
      singleDesignation: "",
      editInd:true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDesignations();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getDesignations();
      this.props.ClearReducerDataOfDesignation();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDesignationName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddDesignation = () => {
    const { addDesignations, designations } = this.props;
    const { designationType, addingDesignations, isTextInputOpen,editInd } = this.state;
    let designation = { designationType,editInd };

    let exist =
    designations &&
    designations.some((element) => element.designationType == designationType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another designation type exists with same name!"
    //   );
    // } else {
      addDesignations(designation, () => console.log("add designation callback"));
    // }

    this.setState({
      designationType: "",
      singleDesignation: "",
      isTextInputOpen: false,
      editInd:true
    });
  };
  handleDeleteDesignation = (id) => {
    this.props.removeDesignations(id);
    this.setState({ documentTypeName: "", singleDocument: "" });
  };
  handleUpdateDesignation = (designationType,designationTypeId,editInd, cb) => {
    this.props.updateDesignations(designationType,designationTypeId,editInd,  cb);
    this.setState({ designationType: "", singleDesignation: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getDesignations } = this.props;
    console.log();
    getDesignations();
  }
  render() {
    const {
      fetchingDesignations,
      fetchingDesignationsError,
      designations,
      addingDesignations,
      updatingDesignations,
    } = this.props;
    const {
      isTextInputOpen,
      designationType,
      singleDesignation,
      linkedDesignations,
    } = this.state;
    if (fetchingDesignations) return <BundleLoader/>;
    if (fetchingDesignationsError) return <p>We are unable to load data</p>;
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
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {designations.length &&
                  designations.map((designation, i) => (
                    <SingleDesignation
                      key={i}
                      value={singleDesignation}
                      name="singleDesignation"
                      designation={designation}
                      linkedDesignations={linkedDesignations}
                      updatingDesignations={updatingDesignations}
                      handleChange={this.handleChange}
                      handleUpdateDesignation={this.handleUpdateDesignation}
                       handleDeleteDesignation={this.handleDeleteDesignation}
                    />
                  ))}
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
             <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
             >
                <br />
                <br />
                <TextInput
                  placeholder="Add Designation"
                  name="designationType"
                  value={designationType}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!designationType}
                  Loading={addingDesignations}
                  onClick={this.handleAddDesignation}
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
                    Loading={addingDesignations}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
               
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </div>
        <h4>Updated on {moment(this.props.designations && this.props.designations.length && this.props.designations[0].updationDate).format("ll")} by {this.props.designations && this.props.designations.length && this.props.designations[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ designations }) => ({
  addingDesignations: designations.addingDesignations,
  addingDesignationsError: designations.addingDesignationsError,
  designations: designations.designations,

  // removingDesignations: designations.removingDesignations,
  // removingDesignationsError: designations.removingDesignationsError,
     updatingDesignations: designations.updatingDesignations,
     updatingDesignationsError: designations.updatingDesignationsError,
  fetchingDesignations: designations.fetchingDesignations,
  fetchingDesignationsError: designations.fetchingDesignationsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDesignations,
      addDesignations,
       updateDesignations,
       searchDesignationName,
       removeDesignations,
       ClearReducerDataOfDesignation
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Designation);
