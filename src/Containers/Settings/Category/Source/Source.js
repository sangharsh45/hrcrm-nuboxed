import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import {
  getSources,
  addSources,
  removeSource,
  updateSource
} from "./SourceAction";
import SingleSource from "./SingleSource";

class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingSources: false,
      name: "",
      type: "",
      singleSource: "",
      editInd: true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getSources(this.props.orgId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
    handleAddSource = () => {
      const { addSources, sources } = this.props;
      const { name, editInd, addingSources, isTextInputOpen } = this.state;
      let source = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      sources && sources.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
        addSources(source,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleSource: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteSource = (sourceId = { sourceId }) => {
    this.props.removeSource(sourceId);
    this.setState({ name: "", singleSource: "" });
  };
  handleUpdateSource = (name, sourceId, editInd, cb) => {
    this.props.updateSource(name, sourceId, editInd, cb);
    this.setState({ name: "", singleSource: "",sourceId:"", editInd: true });
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
    const { getSources,orgId } = this.props;
    console.log();
    getSources(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingSources,
      fetchingSourcesError,
      sources,
      addingSources,
      updatingSources,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleSource,
      linkedSectors,
    } = this.state;
    if (fetchingSources) return <BundleLoader/>;
    //if (fetchingSectorsError) return <p>We are unable to load data</p>;
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
            <div style={{ width: "18vw", display: "flex" }}>
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
                // onClick={() => {
                //   this.props.searchSectorName(this.state.currentData);
                // }}
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
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
             <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {sources.length ? (
                  sources.map((source, i) => (
                    <SingleSource
                      key={i}
                      value={singleSource}
                      name1="singleSource"
                      source={source}
                      linkedSectors={linkedSectors}
                      updatingSources={updatingSources}
                      handleChange={this.handleChange}
                      handleUpdateSource={this.handleUpdateSource}
                      handleDeleteSource={this.handleDeleteSource}
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
                  placeholder="Add Source"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingSources}
                  onClick={this.handleAddSource}
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
                    loading={addingSources}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </FlexContainer>
                {/* <h4>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</h4> */}
              </>
            )}
          </MainWrapper>
      
       
        </FlexContainer>
        <h4>Updated on {moment(this.props.sources && this.props.sources.length && this.props.sources[0].updationDate).format("ll")} by {this.props.sources && this.props.sources.length && this.props.sources[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ source,auth }) => ({
  addingSources: source.addingSources,
  addingSourcesError: source.addingSourcesError,
sources: source.sources,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingSources: source.removingSources,
removingSourcesError: source.removingSourcesError,
fetchingSources: source.fetchingSources,
fetchingSourcesError: source.fetchingSourcesError,

updatingSources: source.updatingSources,
updatingSourcesError: source.updatingSourcesError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSources,
      addSources,
      removeSource,
      updateSource,
    //   searchSectorName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Source);
