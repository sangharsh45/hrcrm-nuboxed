import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import {
    getItemTask,
    addItemTask,
    searchItemTaskName,
    ClearReducerDataOfItemTask,
    removeItemTask,
    updateItemTask
} from "../ItemTask/ItemTaskAction";
const SingleItemTask = lazy(() =>
  import("./SingleItemTask")
);

class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingItemTask: false,
      name: "",
      type: "",
      singleItemTask: "",
      editInd: true,
      currentData: "",
    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getItemTask(this.props.orgId);
      this.props.ClearReducerDataOfItemTask();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchItemTaskName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getItemTask(this.props.orgId);
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
    handleAddItemTask = () => {
      const {   addItemTask, itemTasks } = this.props;
      const { name, editInd, addingItemTask, isTextInputOpen } = this.state;
      let customer = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      itemTasks && itemTasks.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
        addItemTask(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleItemTask: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteItemTask = (itemTaskId = { itemTaskId }) => {
     this.props.removeItemTask(itemTaskId);
    // this.setState({ name: "", singleItemTask: "" });
  };
  handleupdateItemTask = (name, itemTaskId, editInd, cb) => {
     this.props.updateItemTask(name, itemTaskId, editInd, cb);
    this.setState({ name: "", singleItemTask: "",itemTaskId:"", editInd: true });
  };

  componentDidMount() {
    const {   getItemTask,orgId } = this.props;
    console.log();
    getItemTask(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingItemTask,
        fetchingItemTaskError,
        itemTaskListData,
      addingItemTask,
      updatingItemTask,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleItemTask,
      linkedSectors,
    } = this.state;
    if (fetchingItemTask) return <BundleLoader/>;
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
                  placeholder="Add ItemTask"
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
                  Loading={addingItemTask}
                  onClick={this.handleAddItemTask}
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
                    loading={addingItemTask}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
             
              </>
            )}
            </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
             {itemTaskListData.length ? (
  itemTaskListData
    .slice() 
    .sort((a, b) => a.name.localeCompare(b.name)) 
    .map((listTask, i) => (
                    <SingleItemTask
                      key={i}
                      value={singleItemTask}
                      name1="singleItemTask"
                      listTask={listTask}
                      updatingItemTask={updatingItemTask}
                      handleChange={this.handleChange}
                      handleupdateItemTask={this.handleupdateItemTask}
                      handleDeleteItemTask={this.handleDeleteItemTask}
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
        <div class=" font-bold">Updated on {dayjs(this.props.itemTaskListData && this.props.itemTaskListData.length && this.props.itemTaskListData[0].updationDate).format('YYYY-MM-DD')} by {this.props.itemTaskListData && this.props.itemTaskListData.length && this.props.itemTaskListData[0].updatedBy}</div>
      </>
    );
  }
}

const mapStateToProps = ({ itemTask,auth }) => ({
    addingItemTask: itemTask.addingItemTask,
    addingItemTaskError: itemTask.addingItemTaskError,
    itemTaskListData: itemTask.itemTaskListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingItemTask: itemTask.removingItemTask,
removingItemTaskError: itemTask.removingItemTaskError,
fetchingItemTask: itemTask.fetchingItemTask,
fetchingItemTaskError: itemTask.fetchingItemTaskError,

updatingItemTask: itemTask.updatingItemTask,
updatingItemTaskError: itemTask.updatingItemTaskError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getItemTask,
        ClearReducerDataOfItemTask,
        searchItemTaskName,
        addItemTask,
        removeItemTask,
        updateItemTask,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ItemTask);
