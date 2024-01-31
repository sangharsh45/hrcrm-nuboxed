import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import moment from "moment";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getSectors,
  addSectors,
  removeSectors,
  updateSectors,
  searchSectorName,
  ClearReducerDataOfSector
} from "./SectorsAction";
const SingleSectors = lazy(() =>
  import("./SingleSector")
);

class Sectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingSector: false,
      sectorName: "",
      type: "",
      singleSector: "",
      editInd: true,
      currentData: "",
    };
  }
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getSectors();
      this.props.ClearReducerDataOfSector();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchSectorName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getSectors();
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
    handleAddSector = () => {
      const { addSectors, sectors } = this.props;
      const { sectorName, editInd, addingSectors, isTextInputOpen } = this.state;
      let sector = { sectorName, editInd };
    
      let exist =
        sectors && sectors.some((element) => element.sectorName === sectorName);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another sector type exists with the same name!"
      //   );
      // } else {
        addSectors(sector, () => console.log("add sector callback"));
        this.setState({
          sectorName: "",
          singleSector: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteSector = (sectorId = { sectorId }) => {
    this.props.removeSectors(sectorId);
    this.setState({ sectorName: "", singleSector: "" });
  };
  handleUpdateSector = (sectorName, sectorId, editInd, cb) => {
    this.props.updateSectors(sectorName, sectorId, editInd, cb);
    this.setState({ sectorName: "", singleSector: "", editInd: true });
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
    const { getSectors } = this.props;
    console.log();
    getSectors();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingSectors,
      fetchingSectorsError,
      sectors,
      addingSectors,
      updatingSectors,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      sectorName,
      singleSector,
      linkedSectors,
    } = this.state;
    if (fetchingSectors) return <BundleLoader/>;
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
              {sectors.length ? (
  sectors
    .slice() 
    .sort((a, b) => a.sectorName.localeCompare(b.sectorName)) 
    .map((sector, i) => (
                    <SingleSectors
                      key={i}
                      value={singleSector}
                      name="singleSector"
                      sector={sector}
                      linkedSectors={linkedSectors}
                      updatingSectors={updatingSectors}
                      handleChange={this.handleChange}
                      handleUpdateSector={this.handleUpdateSector}
                      handleDeleteSector={this.handleDeleteSector}
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
                  placeholder="Add Sector"
                  name="sectorName"
                  value={sectorName}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!sectorName}
                  Loading={addingSectors}
                  onClick={this.handleAddSector}
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
                    Loading={addingSectors}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
                {/* <div>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</div> */}
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
        <div>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ sector }) => ({
  addingSectors: sector.addingSectors,
  addingSectorsError: sector.addingSectorsError,
  sectors: sector.sectors,

  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingSectors: sector.fetchingSectors,
  fetchingSectorsError: sector.fetchingSectorsError,

  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSectors,
      addSectors,
      removeSectors,
      updateSectors,
      searchSectorName,
      ClearReducerDataOfSector
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
