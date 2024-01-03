import React, { Component } from "react";
import { connect } from "react-redux";
import CRMStatusToggle from "../../Department/CRMStatusToggle";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import styled from "styled-components";
import { FlexContainer } from "../../../../Components/UI/Layout";
import IMStatusToggle from "../../Department/IMStatusToggle";
import AccountingStatusToggle from "../../Department/AccountingStatusToggle";
import RecruitProStatusToggle from "../../Department/RecruitProStatusToggle";
import HrStatusToggle from "../../Department/HrStatusToggle";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput,  } from "../../../../Components/UI/Elements";
import { Select } from "../../../../Components/UI/Elements";
import moment from "moment";
import SingleModuleList from "./SingleModuleList";

const { Option } = Select;

class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedDepartments: [],
      isTextInputOpen: false,
      addingDepartment: false,
      departmentName: "",
      singleDepartment: "",
      sectorId: "",
      editInd: true,
      currentData: "",

    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
    //   this.props.getDepartments();
      this.props.ClearReducerDataOfDepartment();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchDepartmentName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    const {
      fetchingDepartments,
      fetchingDepartmentsError,
      updatingDepartments,
      values,

    } = this.props;
    const {
      isTextInputOpen,
      departmentName,
      singleDepartment,
      linkedDepartments,
      sectorId
    } = this.state;
  

    return (
      <>
        <div flexWrap="nowrap">
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
              <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex justify-between" >
             
                    <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    <CRMStatusToggle
                    //   crmInd={crmInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>IM</h1>
                    <div class=" w-[7%] ml-2">
                    <IMStatusToggle
                    //   imInd={imInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>HR</h1>
                    <div 
                   class=" w-[8%] ml-2"
                    >
                    <HrStatusToggle
                    //   hrInd={hrInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                    <h1>Accounting</h1>
                    <div 
                   class=" w-[8%] ml-2"
                    >
                    <AccountingStatusToggle
                    //   accountInd={accountInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>

                    <h1>RecruitPro</h1>
                    <div 
                  class=" w-[8%] ml-2"
                    >
                    <RecruitProStatusToggle
                    //   recruitOppsInd={recruitOppsInd}
                    //   departmentName={departmentName}
                    //   departmentId={departmentId}
                    />  
                    </div>
                   
                
              </div>
              </div>
              <div>
                
              
                 
                </div> 
              </div>
              
            ) : (
                <FlexContainer>
                  {/* <TextInput
                    name={name}
                    // value={value || departmentName}
                    defaultValue={departmentName}
                    onChange={handleChange}
                    style={{ width: "60%" }}
                  />
                  <Select 
              defaultValue={sectorName}
               style={{width:"40%"}}
               placeholder="Select Sectors"
               onChange={this.handleSectorId}
               >
                            {this.props.sectors.map((item) => {
                                return <Option value={item.sectorId}>{item.sectorName} </Option>;
                            })}
               </Select> */}
                  <br />
                  <br />
              
                </FlexContainer>
              )
          }
        </ViewEditCard>
      </DepartmentWrapper>
                {/* {departments.length ? (
                  departments.map((department, i) => ( */}
                    <SingleModuleList
                    //   key={i}
                      value={singleDepartment}
                      name="singleDepartment"
                    //   department={department}
                      linkedDepartments={linkedDepartments}
                      updatinDepartments={updatingDepartments}
                      handleChange={this.handleChange}
                      handleSectorId={this.handleSectorId}
                      handleUpdateDepartment={this.handleUpdateDepartment}
                      sectors={this.props.sectors}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                     handleDeleteDepartment={this.handleDeleteDepartment}
                    />
                  {/* )) */}
                  {/* ) : (
                    <p>No Data Available</p>
                  )} */}

              </MainWrapper>
            </div>
           
          </MainWrapper>
         
        </div>
        <h4>Updated on {moment(this.props.departments && this.props.departments.length && this.props.departments[0].updationDate).format("ll")} by {this.props.departments && this.props.departments.length && this.props.departments[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
const DepartmentWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const DepartmentName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const DepartmentValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;