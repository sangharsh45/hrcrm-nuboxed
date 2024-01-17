import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import styled from "styled-components";
import {addingModules,getModules} from "../Module/ModuleAction"
import { FlexContainer } from "../../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Select } from "../../../../Components/UI/Elements";
import { Popconfirm, Switch } from "antd";

const { Option } = Select;

const ModuleList = (props) => {
  useEffect(() => {
    props.getModules(props.orgId);
    // props.getRequirementsDuration(props.orgId);
  }, []);

  const { crmInd } = props.moduleList;
  console.log(crmInd);
  const [crmStatus, setCrmStatus] = useState(crmInd);
  function handleCrmClick(checked) {
    console.log(crmInd);
    if (crmInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"crm",
        crmInd: crmInd ? false : true,
      });
      setCrmStatus(crmInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"crm",
          crmInd: crmInd ? false : true,
        },
        props.orgId
      );
      setCrmStatus(crmInd ? false : true);
    }
  }
  function handleCrmCancel() {
    if (crmInd) {
      setCrmStatus(true);
    } else {
      setCrmStatus(false);
    }
  }

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
            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Designation</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
              <DepartmentWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             
                    <h1>CRM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
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
                    {/* <SingleModuleList
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
                    /> */}
                  {/* )) */}
                  {/* ) : (
                    <p>No Data Available</p>
                  )} */}

              </MainWrapper>
            </div>
           
          </MainWrapper>
         
        </div>
        {/* <h4>Updated on {moment(this.props.departments && this.props.departments.length && this.props.departments[0].updationDate).format("ll")} by {this.props.departments && this.props.departments.length && this.props.departments[0].name}</h4> */}
      </>
    );
  }


const mapStateToProps = ({ module, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  moduleList: module.moduleList,
  fetchingModules: module.fetchingModules,
  fetchingModulesError: module.fetchingModulesError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getModules,
      addingModules
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