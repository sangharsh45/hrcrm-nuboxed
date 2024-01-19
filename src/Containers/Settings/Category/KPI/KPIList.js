import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import moment from "moment";
import { Select } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import {
    getKpis,
    addKpi,
    searchKpiName,
    ClearReducerDataOfKpi,
    removeKpi,
    updateKpi
} from "../KPI/KPIAction";
const SingleKpi = lazy(() =>
  import("./SingleKpi")
);

class KPIList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingKpi: false,
      kpi: "",
      frequency:null,
      type: "",
      singleKpi: "",
      editInd: true,
      currentData: "",
    };
  }
  handleFrequency=(value)=>
  this.setState({frequency:value});

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getKpis(this.props.orgId);
      this.props.ClearReducerDataOfKpi();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchKpiName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getKpis(this.props.orgId);
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
    handleAddPayment = () => {
      const {   addKpi, kpis } = this.props;
      const { kpi, editInd,frequency, addingKpi, isTextInputOpen } = this.state;
      let customer = { kpi,
        frequency,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      kpis && kpis.some((element) => element.kpi === kpi);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
        addKpi(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          kpi: "",
          frequency,
          singleKpi: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
    handleDeleteKpi = (performanceManagementId = { performanceManagementId }) => {
     this.props.removeKpi(performanceManagementId);
    // this.setState({ name: "", singleKpi: "" });
  };
  handleupdateKpi = (kpi, performanceManagementId,frequency, editInd, cb) => {
     this.props.updateKpi(kpi, performanceManagementId,frequency, editInd, cb);
    this.setState({ kpi: "", singleKpi: "",performanceManagementId:"", editInd: true });
  };

  componentDidMount() {
    const {   getKpis,orgId } = this.props;
    console.log();
    getKpis(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingKpi,
        fetchingKpiError,
        kpiListData,
        addingKpi,
        updatingKpi,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      kpi,
      singleKpi,
      linkedSectors,
    } = this.state;
    if (fetchingKpi) return <BundleLoader/>;
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
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
             <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {kpiListData.length ? (
                  kpiListData.map((kpi, i) => (
                    <SingleKpi
                      key={i}
                      value={singleKpi}
                      name1="singleKpi"
                      kpi={kpi}
                      updatingKpi={updatingKpi}
                      handleChange={this.handleChange}
                      handleupdateKpi={this.handleupdateKpi}
                      handleDeleteKpi={this.handleDeleteKpi}
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
                  placeholder="Add Kpi"
                  name="kpi"
                  value={kpi}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                   <Select style={{ width: "25%"}}
                onChange={this.handleFrequency}
                placeholder="Select Frequency"
                >
                      <option value="Monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="halfYearly">Half yearly</option>
                  <option value="Annual">Annual</option>
    
      
      
                </Select>
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!kpi}
                  Loading={addingKpi}
                  onClick={this.handleAddPayment}
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
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    loading={addingKpi}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
                {/* <h4>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].kpi}</h4> */}
              </>
            )}
          </MainWrapper>
      
       
        </div>
        <h4>Updated on {moment(this.props.kpiListData && this.props.kpiListData.length && this.props.kpiListData[0].updationDate).format("ll")} by {this.props.kpiListData && this.props.kpiListData.length && this.props.kpiListData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ kpi,auth }) => ({
    addingKpi: kpi.addingKpi,
    addingKpiError: kpi.addingKpiError,
    kpiListData: kpi.kpiListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingKpi: kpi.removingKpi,
removingKpiError: kpi.removingKpiError,
fetchingKpi: kpi.fetchingKpi,
fetchingKpiError: kpi.fetchingKpiError,

updatingKpi: kpi.updatingKpi,
updatingKpiError: kpi.updatingKpiError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getKpis,
        ClearReducerDataOfKpi,
        searchKpiName,
        addKpi,
        removeKpi,
        updateKpi,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(KPIList);
