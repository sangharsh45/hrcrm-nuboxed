import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import {
  getShipByData,
  addShipBy,
  ClearReducerDataOfShipBy,
  searchShipByName,
  removeShipBy,
  updateShipBy
} from "../ShipBy/ShipByAction";
const SingleShipBy = lazy(() =>
  import("./SingleShipBy")
);

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
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getShipByData(this.props.orgId);
      this.props.ClearReducerDataOfShipBy();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchShipByName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
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
  <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
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
            {isTextInputOpen ? (
               <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
               >
           
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
                <Button type="cancel"  onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
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
                </div>
                {/* <div>Updated on {dayjs(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</div> */}
              </>
            )}
               </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
             {ShipByData.length ? (
  ShipByData
    .slice() 
    .sort((a, b) => a.name.localeCompare(b.name)) 
    .map((ship, i) => (
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
            </div>
         
          </MainWrapper>
      
       
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.ShipByData && this.props.ShipByData.length && this.props.ShipByData[0].updationDate).format('YYYY-MM-DD')} by {this.props.ShipByData && this.props.ShipByData.length && this.props.ShipByData[0].updatedBy}</div>
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
      ClearReducerDataOfShipBy,
      searchShipByName,
      addShipBy,
      removeShipBy,
      updateShipBy,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipBy);
