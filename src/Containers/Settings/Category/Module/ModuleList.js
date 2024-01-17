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
import SingleModuleList from "./SingleModuleList";

const { Option } = Select;

const ModuleList = (props) => {

  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
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

  // const { mandetoryInd } = props.moduleList;
  // console.log(mandetoryInd);
  // const [mandatoryStatus, setMandatoryStatus] = useState(mandetoryInd);
  // function handleMandatoryClick(checked) {
  //   console.log(mandetoryInd);
  //   if (mandetoryInd) {
  //     //disable url
  //     props.addingModules({
  //       ...props.moduleList,
  //       orgId: props.orgId,
  //       type:"mandatory",
  //       mandetoryInd: mandetoryInd ? false : true,
  //     });
  //     setMandatoryStatus(mandetoryInd ? false : true);
  //   } else {
  //     props.addingModules(
  //       {
  //         ...props.moduleList,
  //         orgId: props.orgId,
  //         type:"mandatory",
  //         mandetoryInd: mandetoryInd ? false : true,
  //       },
  //       props.orgId
  //     );
  //     setMandatoryStatus(mandetoryInd ? false : true);
  //   }
  // }
  // function handleMandatoryCancel() {
  //   if (mandetoryInd) {
  //     setMandatoryStatus(true);
  //   } else {
  //     setMandatoryStatus(false);
  //   }
  // }


  const { erpInd } = props.moduleList;
  console.log(erpInd);
  const [erpStatus, setErpStatus] = useState(erpInd);
  function handleErpClick(checked) {
    console.log(erpInd);
    if (erpInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"erp",
        erpInd: erpInd ? false : true,
      });
      setErpStatus(erpInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"erp",
          erpInd: erpInd ? false : true,
        },
        props.orgId
      );
      setErpStatus(erpInd ? false : true);
    }
  }
  function handleErpCancel() {
    if (erpInd) {
      setErpStatus(true);
    } else {
      setErpStatus(false);
    }
  }

  const { imInd } = props.moduleList;
  console.log(imInd);
  const [imStatus, setImStatus] = useState(imInd);
  function handleImClick(checked) {
    console.log(imInd);
    if (imInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"im",
        imInd: imInd ? false : true,
      });
      setImStatus(imInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"im",
          imInd: imInd ? false : true,
        },
        props.orgId
      );
      setImStatus(imInd ? false : true);
    }
  }
  function handleImCancel() {
    if (imInd) {
      setImStatus(true);
    } else {
      setImStatus(false);
    }
  }

 




  

  const { productionInd } = props.moduleList;
  console.log(productionInd);
  const [productionStatus, setProductionStatus] = useState(productionInd);
  function handleProductionClick(checked) {
    console.log(productionInd);
    if (productionInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"production",
        productionInd: productionInd ? false : true,
      });
      setProductionStatus(productionInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"production",
          productionInd: productionInd ? false : true,
        },
        props.orgId
      );
      setProductionStatus(productionInd ? false : true);
    }
  }
  function handleProductionCancel() {
    if (productionInd) {
      setProductionStatus(true);
    } else {
      setProductionStatus(false);
    }
  }

  const { recruitProInd } = props.moduleList;
  console.log(recruitProInd);
  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);
  function handleRecruitProClick(checked) {
    console.log(recruitProInd);
    if (recruitProInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"recruitPro",
        recruitProInd: recruitProInd ? false : true,
      });
      setRecruitProStatus(recruitProInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"recruitPro",
          recruitProInd: recruitProInd ? false : true,
        },
        props.orgId
      );
      setRecruitProStatus(recruitProInd ? false : true);
    }
  }
  function handleRecruitProCancel() {
    if (recruitProInd) {
      setRecruitProStatus(true);
    } else {
      setRecruitProStatus(false);
    }
  }

  const { repairInd } = props.moduleList;
  console.log(repairInd);
  const [repairStatus, setRepairStatus] = useState(repairInd);
  function handleRepairClick(checked) {
    console.log(repairInd);
    if (repairInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"repair",
        repairInd: repairInd ? false : true,
      });
      setRepairStatus(repairInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"repair",
          repairInd: repairInd ? false : true,
        },
        props.orgId
      );
      setRepairStatus(repairInd ? false : true);
    }
  }
  function handleRepairCancel() {
    if (repairInd) {
      setRepairStatus(true);
    } else {
      setRepairStatus(false);
    }
  }

  const { inventoryInd } = props.moduleList;
  console.log(inventoryInd);
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);
  function handleInventoryClick(checked) {
    console.log(inventoryInd);
    if (inventoryInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"inventory",
        inventoryInd: inventoryInd ? false : true,
      });
      setInventoryStatus(inventoryInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"inventory",
          inventoryInd: inventoryInd ? false : true,
        },
        props.orgId
      );
      setInventoryStatus(inventoryInd ? false : true);
    }
  }
  function handleInventoryCancel() {
    if (inventoryInd) {
      setInventoryStatus(true);
    } else {
      setInventoryStatus(false);
    }
  }

  const { orderManagementInd } = props.moduleList;
  console.log(orderManagementInd);
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);
  function handleOrderManagementClick(checked) {
    console.log(orderManagementInd);
    if (orderManagementInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"orderManagement",
        orderManagementInd: orderManagementInd ? false : true,
      });
      setOrderManagStatus(orderManagementInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"orderManagement",
          orderManagementInd: orderManagementInd ? false : true,
        },
        props.orgId
      );
      setOrderManagStatus(orderManagementInd ? false : true);
    }
  }
  function handleOrderManagementCancel() {
    if (orderManagementInd) {
      setOrderManagStatus(true);
    } else {
      setOrderManagStatus(false);
    }
  }

  const { logisticsInd } = props.moduleList;
  console.log(logisticsInd);
  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);
  function handleLogisticClick(checked) {
    console.log(logisticsInd);
    if (logisticsInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"logistics",
        logisticsInd: logisticsInd ? false : true,
      });
      setLogisticsStatus(logisticsInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"logistics",
          logisticsInd: logisticsInd ? false : true,
        },
        props.orgId
      );
      setLogisticsStatus(logisticsInd ? false : true);
    }
  }
  function handleLogisticCancel() {
    if (logisticsInd) {
      setLogisticsStatus(true);
    } else {
      setLogisticsStatus(false);
    }
  }

  const { procurementInd } = props.moduleList;
  console.log(procurementInd);
  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);
  function handleProcurmentClick(checked) {
    console.log(procurementInd);
    if (procurementInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"procurement",
        procurementInd: procurementInd ? false : true,
      });
      setProcurmentStatus(procurementInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"procurement",
          procurementInd: procurementInd ? false : true,
        },
        props.orgId
      );
      setProcurmentStatus(procurementInd ? false : true);
    }
  }
  function handleProcurmentCancel() {
    if (procurementInd) {
      setProcurmentStatus(true);
    } else {
      setProcurmentStatus(false);
    }
  }

  const { eLearningInd } = props.moduleList;
  console.log(eLearningInd);
  const [elearningStatus, setElearningStatus] = useState(eLearningInd);
  function handleElearningClick(checked) {
    console.log(eLearningInd);
    if (eLearningInd) {
      //disable url
      props.addingModules({
        ...props.moduleList,
        orgId: props.orgId,
        type:"elearning",
        eLearningInd: eLearningInd ? false : true,
      });
      setElearningStatus(eLearningInd ? false : true);
    } else {
      props.addingModules(
        {
          ...props.moduleList,
          orgId: props.orgId,
          type:"elearning",
          eLearningInd: eLearningInd ? false : true,
        },
        props.orgId
      );
      setElearningStatus(eLearningInd ? false : true);
    }
  }
  function handleElearningCancel() {
    if (eLearningInd) {
      setElearningStatus(true);
    } else {
      setElearningStatus(false);
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
                
                  

                    <h1>IM</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleImClick}
                        onCancel={handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>

                    {/* <h1>Account</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAccountClick}
                        onCancel={handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div> */}
                    {/* <h1>RecruitOpps</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitClick}
                        onCancel={handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
*/}
                    {/* <h1>HR</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleHrClick}
                        onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>  */}


                   

                  
           
                    <h1>Rcruitpro</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                    <h1>Elearning</h1>
                    <div   class=" w-[7%] ml-2">
                    <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleElearningClick}
                        onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={elearningStatus || eLearningInd}
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
                    <SingleModuleList
                    handleProcurmentClick={handleProcurmentClick}
                    handleProcurmentCancel={handleProcurmentCancel}
                    procurmentStatus={procurmentStatus}

handleLogisticClick={handleLogisticClick}
handleLogisticCancel={handleLogisticCancel}
logisticsStatus={logisticsStatus}
                      handleOrderManagementClick={handleOrderManagementClick}
                      handleOrderManagementCancel={handleOrderManagementCancel}
                      orderManagStatus={orderManagStatus}
                   handleInventoryClick={handleInventoryClick}
                   handleInventoryCancel={handleInventoryCancel}
                   inventoryStatus={inventoryStatus}
                      handleErpClick={handleErpClick}
                      handleErpCancel={handleErpCancel}
                      erpStatus={erpStatus}
                      handleRepairClick={handleRepairClick}
                      handleRepairCancel={handleRepairCancel}
                      repairStatus={repairStatus}
                      handleRowData={handleRowData}
                      rowdata={rowdata}
                      // handleSectorId={this.handleSectorId}
                      handleProductionClick={handleProductionClick}
                      productionStatus={productionStatus}
                       handleProductionCancel={handleProductionCancel}
                    //   handleSearchChange={this.handleSearchChange}
                    //   currentData={this.state.currentData}
                    //   setCurrentData={this.setCurrentData}
                    //  handleDeleteDepartment={this.handleDeleteDepartment}
                    />
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