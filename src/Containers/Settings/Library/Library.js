import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider, message,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleLibrary from "./SingleLibrary";
import moment from "moment";
import {
  getLibrarys,
  addLibrarys,
  removeSkills,
  updateLibrarys,
  searchLibraryName,
} from "./LibraryAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedLibrarys: [],
      isTextInputOpen: false,
      addingLibrary: false,
      name: "",
      singleLibrary: "",
      userId:"",
      orgId:"",
      editInd:true,
      currentData:"",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getLibrarys(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
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
  handleAddLibrary = () => {
    const { addLibrarys, librarys } = this.props;
    const { name,editInd, addingLibrarys, isTextInputOpen } = this.state;
    let library = { name,editInd,userId: this.props.userId, orgId: this.props.organizationId};

    let exist =
    librarys &&
    librarys.some((element) => element.name == name);

    // if (exist) {
    //   message.error(
    //     "Can't create as another library type exists with same name!"
    //   );
    // } else {
    //   addLibrarys(library, () => console.log("add library callback"));
    // }
    addLibrarys(library, () => console.log("add library callback"));

    this.setState({
      name: "",
      singleLibrary: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  // handleDeleteLibrary = (id) => {
  //   this.props.removeDocuments(id);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  handleUpdateLibrary = (name,definationId, cb) => {
    this.props.updateLibrarys(name,definationId,  cb);
    this.setState({ name: "", singleLibrary: "" });
   // let library = { name,userId: this.props.userId, orgId: this.props.organizationId};
  };
  handleDeleteSkill = (definationId = { definationId }) => {
    this.props.removeSkills(definationId);
    this.setState({ name: "", singleLibrary: "" });
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
    const { getLibrarys,organizationId } = this.props;
    console.log();
    getLibrarys(organizationId);
  }
  render() {
    const {
      fetchingLibrarys,
      fetchingLibrarysError,
      librarys,
      addingLibrarys,
      updatingLibrarys,
    } = this.props;
    const {
      isTextInputOpen,
      name,
      singleLibrary,
      linkedLibrarys,
    } = this.state;
    if (fetchingLibrarys) return <p>Loading ...</p>;
    if (fetchingLibrarysError) return <p>Error ...</p>;
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
            this.props.searchLibraryName(this.state.currentData);

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
             
              <MainWrapper style={{ height: "30em" }}>
                {librarys.length &&
                  librarys.map((library, i) => (
                    <SingleLibrary
                      key={i}
                      value={singleLibrary}
                      data="singleLibrary"
                      library={library}
                      linkedLibrarys={linkedLibrarys}
                      updatingLibrarys={updatingLibrarys}
                      handleChange={this.handleChange}
                      handleDeleteSkill={this.handleDeleteSkill}
                      handleUpdateLibrary={this.handleUpdateLibrary}
                      // handleDeleteDocument={this.handleDeleteDocument}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                   ))} 
                   
              </MainWrapper>
              {/* <h4>Updated on {dayjs(props.librarys && props.librarys.length && props.librarys[0].updationDate).format("ll")} by {props.librarys && props.librarys.length && props.librarys[0].name}</h4>              */}
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
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingLibrarys}
                  onClick={this.handleAddLibrary}
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
                    Loading={addingLibrarys}
                    onClick={this.toggleInput}
                  >
                    Add Skill
                  </Button>
                </FlexContainer>
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
               <p class="mt-2 text-red-600">
      Getting a new business off the ground is a lot of hard work.
      Here are five ideas you can use to find your first customers.
    </p>
             
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
              Korero allows you to edit and update the skills as per your requirements.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </FlexContainer>
        <h4>Updated on {moment(this.props.librarys && this.props.librarys.length && this.props.librarys[0].updationDate).format("ll")} by {this.props.librarys && this.props.librarys.length && this.props.librarys[0].updatedName}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ librarys,auth }) => ({
  addingLibrarys: librarys.addingLibrarys,
  addingLibrarysError: librarys.addingLibrarysError,
  librarys: librarys.librarys,
  // removingLibrarys: librarys.removingLibrarys,
  // removingLibrarysError: librarys.removingLibrarysError,
     updatingLibrarys: librarys.updatingLibrarys,
     updatingLibrarysError: librarys.updatingLibrarysError,
  fetchingLibrarys: librarys.fetchingLibrarys,
  fetchingLibrarysError: librarys.fetchingLibrarysError,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys, 
      addLibrarys,
      removeSkills,
       updateLibrarys,
       searchLibraryName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Library);
