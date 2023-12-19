import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, FlexContainer } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import {
  getShipByData,
  addShipBy,
  removeShipBy,
  updateShipBy
} from "../ShipBy/ShipByAction";
import SingleShipBy from "./SingleShipBy";

class ShipBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingShipByError: false,
      name: "",
      type: "",
      singleShipBy: "",
      editInd: true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getShipByData(this.props.orgId);
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
      const { addShipBy, shipBy } = this.props;
      const { name, editInd, addingShipByError, isTextInputOpen } = this.state;
      let ship = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      shipBy && shipBy.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
         addShipBy(ship,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleShipBy: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteShip = (shipById = { shipById }) => {
     this.props.removeShipBy(shipById);
    // this.setState({ name: "", singleShipBy: "" });
  };
  handleupdateShipBy = (name, shipById, editInd, cb) => {
     this.props.updateShipBy(name, shipById, editInd, cb);
    this.setState({ name: "", singleShipBy: "",shipById:"", editInd: true });
  };

  componentDidMount() {
    const { getShipByData,orgId } = this.props;
    console.log();
    getShipByData(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingShipBy,
      fetchingShipByError,
      ShipByData,
      addingShipByError,
      updatingShipBy,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleShipBy,
      linkedSectors,
    } = this.state;
    if (fetchingShipBy) return <BundleLoader/>;
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
                {ShipByData.length ? (
                  ShipByData.map((ship, i) => (
                    <SingleShipBy
                      key={i}
                      value={singleShipBy}
                      name1="singleShipBy"
                      ship={ship}
                      linkedSectors={linkedSectors}
                      updatingShipBy={updatingShipBy}
                      handleChange={this.handleChange}
                      handleupdateShipBy={this.handleupdateShipBy}
                      handleDeleteShip={this.handleDeleteShip}
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
                  placeholder="Add Ship"
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
                  Loading={addingShipByError}
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
                    loading={addingShipByError}
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
        <h4>Updated on {moment(this.props.ShipByData && this.props.ShipByData.length && this.props.ShipByData[0].updationDate).format("ll")} by {this.props.ShipByData && this.props.ShipByData.length && this.props.ShipByData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ shipBy,auth }) => ({
  addingShipBy: shipBy.addingShipBy,
  addingShipByError: shipBy.addingShipByError,
  ShipByData: shipBy.ShipByData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingShipBy: shipBy.removingShipBy,
removingShipByError: shipBy.removingShipByError,
fetchingShipBy: shipBy.fetchingShipBy,
fetchingShipByError: shipBy.fetchingShipByError,

updatingShipBy: shipBy.updatingShipBy,
updatingShipByError: shipBy.updatingShipByError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipByData,
      addShipBy,
      removeShipBy,
      updateShipBy,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipBy);
