import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../../../Components/UI/Layout";
import { TextInput, Title } from "../../../../../Components/UI/Elements";
import WorkflowSingleDocument from "./WorkflowSingleDocument";
import {
  removeDocuments,
  updateDocuments,
  searchDocumentsName,
} from "../../../../Settings/Documents/DocumentsAction";
import axios from "axios";
import { base_url } from "../../../../../Config/Auth";

class WorkflowDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDocuments: [],
      isTextInputOpen: false,
      addingDocument: false,
      documentTypeName: "",
      singleDocument: "",
      editInd:true,
      currentData: "",
      processId: this.props.processId,
    };
  }
  handleClear = () => {
    // this.setState({ currentData: "" });
    // this.props.getAllDocumentsType(this.props.processId);
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
  // handleAddDocument = () => {
  //   const { addDocuments, allDocuments } = this.props;
  //   const { documentTypeName, addingDocuments, isTextInputOpen,editInd} = this.state;
  //   let document = { documentTypeName,editInd };

  //   let exist =
  //   allDocuments &&
  //   allDocuments.some((element) => element.documentTypeName == documentTypeName);

  //   if (exist) {
  //     message.error(
  //       "Can't create as another documentTypeName exists with same name!"
  //     );
  //   } else {
  //     addDocuments(document, () => console.log("add document callback"));
  //   }

  //   this.setState({
  //     documentTypeName: "",
  //     singleDocument: "",
  //     isTextInputOpen: false,
  //     editInd:true,
  //   });
  // };
  handleUpdateDocument = (documentTypeName,documentTypeId,editInd, cb) => {
    this.props.updateDocuments(documentTypeName, documentTypeId,editInd,cb);
    this.setState({ documentTypeName: "", singleDocument: "",editInd:true,});
  };
  // handleDeleteDocument = (documentTypeId={documentTypeId}) => {
  //   this.props.removeDocuments(documentTypeId);
  //   this.setState({ documentTypeName: "", singleDocument: "" });
  // };
  componentDidMount() {

  }
  render() {
    const {
      fetchingAllDocuments,
      fetchingAllDocumentsError,
      allDocuments,
      addingDocuments,
      updatingDocuments,
    } = this.props;
    const {
      isTextInputOpen,
      documentTypeName,
      singleDocument,
      linkedDocuments,
    } = this.state;
    if (fetchingAllDocuments) return <p>Loading ...</p>;
    if (fetchingAllDocumentsError) return <p>Error ...</p>;
    return (
      <>
        <FlexContainer flexWrap="nowrap">
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder="Search by Name"
            width={"100%"}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchDocumentsName(this.state.currentData);

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
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
      
        </Button>
        </div>
            <FlexContainer flexDirection="column">
              <MainWrapper style={{ height: "30em", marginTop: "0.62em" }}>
                {allDocuments.length &&
                  allDocuments.map((document, i) => (
                    <WorkflowSingleDocument
                      key={i}
                      value={singleDocument}
                      name="singleDocument"
                      document={document}
                      linkedDocuments={linkedDocuments}
                      updatingDocuments={updatingDocuments}
                      handleChange={this.handleChange}
                      handleUpdateDocument={this.handleUpdateDocument}
                      handleDeleteDocument={this.handleDeleteDocument}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))}
              </MainWrapper>
            </FlexContainer>
            {/* {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="documentTypeName"
                  value={documentTypeName}
                  onChange={this.handleChange}
                  width="55%"
                />
             
                <Button
                  type="primary"
                  disabled={!documentTypeName}
                  htmlType="submit"
                  Loading={addingDocuments}
                  onClick={this.handleAddDocument}
                  style={{ marginRight: "0.125em" }}
                >
                  
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                  
                </Button>
               
                <Button type="primary" ghost onClick={this.toggleInput}>
                 
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
                </Button>
              </FlexContainer>
            ) : 
            (
              <>
                <br />
              </>
            )} */}
          </MainWrapper>
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = ({ document }) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  allDocuments: document.allDocuments,
  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
    fetchingAllDocuments: document.fetchingAllDocuments,
    fetchingAllDocumentsError: document.fetchingAllDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeDocuments,
      updateDocuments,
      searchDocumentsName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDocument);
