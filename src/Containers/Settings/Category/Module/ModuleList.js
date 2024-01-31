import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import styled from "styled-components";
import {addingModules,getModules} from "../Module/ModuleAction"
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Select } from "../../../../Components/UI/Elements";
import {  Switch } from "antd";
import moment from "moment";
const SingleModuleList = lazy(() =>
  import("./SingleModuleList")
);


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

useEffect(() => {
  setCrmStatus(crmInd);
}, [crmInd]);

const handleCrmClick = (checked) => {
  setCrmStatus(checked);
  let data = {
    value: checked,
    orgId: props.orgId,
    type: "crm",
  };
  props.addingModules(data, props.orgId);
};

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
  useEffect(() => {
    setErpStatus(erpInd);
  }, [erpInd]);
  
  const handleErpClick = (checked) => {
    setErpStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingModules(data, props.orgId);
  };

  const { imInd } = props.moduleList;
  console.log(imInd);
  const [imStatus, setImStatus] = useState(imInd);
  
  useEffect(() => {
    setImStatus(imInd);
  }, [imInd]);
  
  const handleImClick = (checked) => {
    setImStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "im",
    };
    props.addingModules(data, props.orgId);
  };

  const { hrInd } = props.moduleList;
  console.log(hrInd);
  const [hrStatus, setHrStatus] = useState(hrInd);
  
  useEffect(() => {
    setHrStatus(hrInd);
  }, [hrInd]);
  
  const handleHrClick = (checked) => {
    setHrStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "hr",
    };
    props.addingModules(data, props.orgId);
  };
 




  

  const { productionInd } = props.moduleList;
  console.log(productionInd);
  const [productionStatus, setProductionStatus] = useState(productionInd);
  useEffect(() => {
    setProductionStatus(productionInd);
  }, [productionInd]);
  
  const handleProductionClick = (checked) => {
    setProductionStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "production",
    };
    props.addingModules(data, props.orgId);
  };

  const { recruitProInd } = props.moduleList;
  console.log(recruitProInd);
  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);

  useEffect(() => {
    setRecruitProStatus(recruitProInd);
  }, [recruitProInd]);
  
  const handleRecruitProClick = (checked) => {
    setRecruitProStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "recruitPro",
    };
    props.addingModules(data, props.orgId);
  };

  const { repairInd } = props.moduleList;
  console.log(repairInd);
  const [repairStatus, setRepairStatus] = useState(repairInd);
  useEffect(() => {
    setRepairStatus(repairInd);
  }, [repairInd]);
  
  const handleRepairClick = (checked) => {
    setRepairStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "repair",
    };
    props.addingModules(data, props.orgId);
  };

  const { inventoryInd } = props.moduleList;
  console.log(inventoryInd);
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);
  useEffect(() => {
    setInventoryStatus(inventoryInd);
  }, [inventoryInd]);
  
  const handleInventoryClick = (checked) => {
    setInventoryStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "inventory",
    };
    props.addingModules(data, props.orgId);
  };

  const { orderManagementInd } = props.moduleList;
  console.log(orderManagementInd);
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);
  useEffect(() => {
    setOrderManagStatus(orderManagementInd);
  }, [orderManagementInd]);
  
  const handleOrderManagementClick = (checked) => {
    setOrderManagStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "orderManagement",
    };
    props.addingModules(data, props.orgId);
  };

  const { logisticsInd } = props.moduleList;
  console.log(logisticsInd);
  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);

  useEffect(() => {
    setLogisticsStatus(logisticsInd);
  }, [logisticsInd]);
  
  const handleLogisticClick = (checked) => {
    setLogisticsStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "logistics",
    };
    props.addingModules(data, props.orgId);
  };


  const { procurementInd } = props.moduleList;
  console.log(procurementInd);
  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);
  useEffect(() => {
    setProcurmentStatus(procurementInd);
  }, [procurementInd]);
  
  const handleProcurmentClick = (checked) => {
    setProcurmentStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "procurement",
    };
    props.addingModules(data, props.orgId);
  };

  const { elearningInd } = props.moduleList;
  console.log(elearningInd);
  const [elearningStatus, setElearningStatus] = useState(elearningInd);
  useEffect(() => {
    setElearningStatus(elearningInd);
  }, [elearningInd]);
  
  const handleElearningClick = (checked) => {
    setElearningStatus(checked);
    let data = {
      value: checked,
      orgId: props.orgId,
      type: "elearning",
    };
    props.addingModules(data, props.orgId);
  };

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
              <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class="flex" >
                <div class="w-full flex-row">
              <div class=" flex " >
             
                    <div class=" text-sm ">CRM</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        // onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleCrmClick}
                          checked={crmStatus || crmInd}
                          // checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                
                  

                    <div class=" text-sm  ml-2">IM</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleImClick}
                        onCancel={handleImCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleImClick}
                         
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>

                    {/* <div>Account</div>
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
                    {/* <div>RecruitOpps</div>
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
                      <div class=" text-sm  ml-2">HR</div>
                    <div   class=" w-[7%] ml-2">
                   
                        <Switch
                         style={{ width: "5em" }}
                         onChange={handleHrClick}
                        
                         checked={hrStatus || hrInd}
                         checkedChildren="Yes"
                         unCheckedChildren="No"
                         
                        />
                    
                    </div> 


                   

                  
           
                    <div class=" text-sm  ml-2">Rcruitpro</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        // onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleRecruitProClick}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    <div class=" text-sm  ml-2">Elearning</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleElearningClick}
                        onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleElearningClick}
                          checked={elearningStatus || elearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>

                   

                   
                   
                
              </div>
              </div>
              <div>
                
              
                 
                </div> 
              </div>
              
            ) : (
              <div class=" flex">
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
              
                </div>
              )
          }
        </ViewEditCard>
      </div>
                {/* {departments.length ? (
                  departments.map((department, i) => ( */}
                    <SingleModuleList
                    handleProcurmentClick={handleProcurmentClick}
                    // handleProcurmentCancel={handleProcurmentCancel}
                    procurmentStatus={procurmentStatus}

handleLogisticClick={handleLogisticClick}
// handleLogisticCancel={handleLogisticCancel}
logisticsStatus={logisticsStatus}
                      handleOrderManagementClick={handleOrderManagementClick}
                      // handleOrderManagementCancel={handleOrderManagementCancel}
                      orderManagStatus={orderManagStatus}
                   handleInventoryClick={handleInventoryClick}
                  //  handleInventoryCancel={handleInventoryCancel}
                   inventoryStatus={inventoryStatus}
                   moduleList={props.moduleList}
                      handleErpClick={handleErpClick}
                      // handleErpCancel={handleErpCancel}
                      erpStatus={erpStatus}
                      handleRepairClick={handleRepairClick}
                      // handleRepairCancel={handleRepairCancel}
                      repairStatus={repairStatus}
                      handleRowData={handleRowData}
                      rowdata={rowdata}
                      // handleSectorId={this.handleSectorId}
                      handleProductionClick={handleProductionClick}
                      productionStatus={productionStatus}
                      //  handleProductionCancel={handleProductionCancel}
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
          <h4>Updated on {moment(props.moduleList.updationDate).format("ll")} by {props.moduleList.updatedBy}</h4>
        </div>
     
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
