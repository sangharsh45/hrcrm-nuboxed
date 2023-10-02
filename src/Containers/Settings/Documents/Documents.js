import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Button, Divider, message,Input } from "antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { TextInput, Title } from "../../../Components/UI/Elements";
import SingleDocuments from "./Child/SingleDocuments";
import {
  getDocuments,
  addDocuments,
  removeDocuments,
  updateDocuments,
  searchDocumentsName,
} from "./DocumentsAction";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import dayjs from "dayjs";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDocuments: [],
      isTextInputOpen: false,
      addingDocument: false,
      documentTypeName: "",
      singleDocument: "",
      editInd:true,
      currentData: ""
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDocuments();
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
  handleAddDocument = () => {
    const { addDocuments, documents } = this.props;
    const { documentTypeName, addingDocuments, isTextInputOpen,editInd} = this.state;
    let document = { documentTypeName,editInd };

    let exist =
      documents &&
      documents.some((element) => element.documentTypeName == documentTypeName);

    if (exist) {
      message.error(
        "Can't create as another documentTypeName exists with same name!"
      );
    } else {
      addDocuments(document, () => console.log("add document callback"));
    }

    this.setState({
      documentTypeName: "",
      singleDocument: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleUpdateDocument = (documentTypeName,documentTypeId,editInd, cb) => {
    this.props.updateDocuments(documentTypeName, documentTypeId,editInd,cb);
    this.setState({ documentTypeName: "", singleDocument: "",editInd:true,});
  };
  handleDeleteDocument = (documentTypeId={documentTypeId}) => {
    this.props.removeDocuments(documentTypeId);
    this.setState({ documentTypeName: "", singleDocument: "" });
  };
  componentDidMount() {
    const { getDocuments } = this.props;
    console.log();
    getDocuments(getDocuments);
  }
  render() {
    const {
      fetchingDocuments,
      fetchingDocumentsError,
      documents,
      addingDocuments,
      updatingDocuments,
    } = this.props;
    const {
      isTextInputOpen,
      documentTypeName,
      singleDocument,
      linkedDocuments,
    } = this.state;
    if (fetchingDocuments) return <p>Loading ...</p>;
    if (fetchingDocumentsError) return <p>Error ...</p>;
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
                {documents.length &&
                  documents.map((document, i) => (
                    <SingleDocuments
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
            {isTextInputOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Document"
                  name="documentTypeName"
                  value={documentTypeName}
                  onChange={this.handleChange}
                  width="55%"
                />
                &nbsp;
                <Button
                  type="primary"
                  disabled={!documentTypeName}
                  htmlType="submit"
                  Loading={addingDocuments}
                  onClick={this.handleAddDocument}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage
                    id="app.save"
                    defaultMessage="Save"
                  />
                  
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage
                    id="app.cancel"
                    defaultMessage="Cancel"
                  />
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
                    Loading={addingDocuments}
                    onClick={this.toggleInput}
                  >
                   Add More 
                  </Button>
                </FlexContainer>
               
              </>
            )}
          </MainWrapper>
        </FlexContainer>
        <h4>Updated on {moment(this.props.documents && this.props.documents.length && this.props.documents[0].updationDate).format("ll")} by {this.props.documents && this.props.documents.length && this.props.documents[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ document }) => ({
  addingDocuments: document.addingDocuments,
  addingDocumentsError: document.addingDocumentsError,
  documents: document.documents,
  removingDocuments: document.removingDocuments,
  removingDocumentsError: document.removingDocumentsError,
    updatingDocuments: document.updatingDocuments,
    updatingDocumentsError: document.updatingDocumentsError,
  fetchingDocuments: document.fetchingDocuments,
  fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocuments,
      addDocuments,
      removeDocuments,
      updateDocuments,
      searchDocumentsName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
