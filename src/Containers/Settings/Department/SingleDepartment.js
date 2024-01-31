import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip } from "antd";
import {addingDeptModules} from "../Department/DepartmentAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { DeleteOutlined } from "@ant-design/icons";
import { TextInput } from "../../../Components/UI/Elements";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { Select } from "../../../Components/UI/Elements";
const { Option } = Select;

const SingleDepartment = (props) => {

  const [viewType, setViewType] = useState("view");

  const toggleViewType = () => {
    setViewType((prevViewType) => (prevViewType === "view" ? "edit" : "view"));
  };
  const {
    department: { departmentName,moduleMapper,crmInd,procurementInd,imInd,recruitOppsInd,hrInd,orderManagementInd,logisticsInd, departmentId,repairInd,inventoryInd,recruitProInd,sectorId,productionInd,elearningInd,mandetoryInd,sectorName,erpInd ,accountInd},
   handleChange,
   name,
   value,
   linkedDepartments,
   updatingDepartments,
   handleUpdateDepartment,
   handleDeleteDepartment,

 } = props;

  // const { crmInd } = department;
  console.log("moduleMapper",moduleMapper);
  const [crmStatus, setCrmStatus] = useState(crmInd);
  useEffect(() => {
    setCrmStatus(crmInd);
  }, [crmInd]);
  
  const handleCrmClick = (checked) => {
    setCrmStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "crm",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [mandatoryStatus, setMandatoryStatus] = useState(mandetoryInd);
  useEffect(() => {
    setMandatoryStatus(mandetoryInd);
  }, [mandetoryInd]);
  
  const handleMandatoryClick = (checked) => {
    setMandatoryStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "mandatory",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [erpStatus, setErpStatus] = useState(erpInd);

  useEffect(() => {
    setErpStatus(erpInd);
  }, [erpInd]);
  
  const handleErpClick = (checked) => {
    setErpStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "erp",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [imStatus, setImStatus] = useState(moduleMapper.imInd);
  useEffect(() => {
    setImStatus(moduleMapper.imInd);
  }, [moduleMapper.imInd]);
  
  const handleImClick = (checked) => {
    setImStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "im",
    };
    props.addingDeptModules(data, departmentId);
  };


  console.log(accountInd);
  const [accountStatus, setAccountStatus] = useState(accountInd);
  useEffect(() => {
    setAccountStatus(accountInd);
  }, [accountInd]);
  
  const handleAccountClick = (checked) => {
    setAccountStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "account",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [recruitStatus, setRecruitStatus] = useState(recruitOppsInd);

  useEffect(() => {
    setRecruitStatus(recruitOppsInd);
  }, [recruitOppsInd]);
  
  const handleRecruitClick = (checked) => {
    setRecruitStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "recruitopps",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [hrStatus, setHrStatus] = useState(hrInd);
  useEffect(() => {
    setHrStatus(hrInd);
  }, [hrInd]);
  
  const handleHrClick = (checked) => {
    setHrStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "hr",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [productionStatus, setProductionStatus] = useState(productionInd);
  useEffect(() => {
    setProductionStatus(productionInd);
  }, [productionInd]);
  
  const handleProductionClick = (checked) => {
    setProductionStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "production",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [recruitProStatus, setRecruitProStatus] = useState(recruitProInd);

  useEffect(() => {
    setRecruitProStatus(recruitProInd);
  }, [recruitProInd]);
  
  const handleRecruitProClick = (checked) => {
    setRecruitProStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "recruitPro",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [repairStatus, setRepairStatus] = useState(repairInd);

  useEffect(() => {
    setRepairStatus(repairInd);
  }, [repairInd]);
  
  const handleRepairClick = (checked) => {
    setRepairStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "repair",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [inventoryStatus, setInventoryStatus] = useState(inventoryInd);

  useEffect(() => {
    setInventoryStatus(inventoryInd);
  }, [inventoryInd]);
  
  const handleInventoryClick = (checked) => {
    setInventoryStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "inventory",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [orderManagStatus, setOrderManagStatus] = useState(orderManagementInd);

  useEffect(() => {
    setOrderManagStatus(orderManagementInd);
  }, [orderManagementInd]);
  
  const handleOrderManagementClick = (checked) => {
    setOrderManagStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "orderManagement",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [logisticsStatus, setLogisticsStatus] = useState(logisticsInd);

  useEffect(() => {
    setLogisticsStatus(logisticsInd);
  }, [logisticsInd]);
  
  const handleLogisticClick = (checked) => {
    setLogisticsStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "logistics",
    };
    props.addingDeptModules(data, departmentId);
  };

  const [procurmentStatus, setProcurmentStatus] = useState(procurementInd);

  useEffect(() => {
    setProcurmentStatus(procurementInd);
  }, [procurementInd]);
  
  const handleProcurmentClick = (checked) => {
    setProcurmentStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "procurement",
    };
    props.addingDeptModules(data, departmentId);
  };
  const [elearningStatus, setElearningStatus] = useState(elearningInd);

  useEffect(() => {
    setElearningStatus(elearningInd);
  }, [elearningInd]);
  
  const handleElearningClick = (checked) => {
    setElearningStatus(checked);
    let data = {
      value: checked,
      departmentId:departmentId,
      orgId: props.orgId,
      type: "elearning",
    };
    props.addingDeptModules(data, departmentId);
  };



  return (
    <div class=" w-full cursor-pointer">
      <ViewEditCard>
        {({ viewType: cardViewType }, toggleCardViewType) =>
          cardViewType === "view" ? (
            <div className="flex">
              <div className="w-full flex-row">
                <div className="flex justify-between">
                  <div className="w-[9rem]">
                  <div class=" font-semibold" >{departmentName}</div>
                  </div>
                  {mandetoryInd === true && (
  <>
                    <div class=" text-sm  ml-2">Mandatory</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleMandatoryClick}
                        onCancel={handleMandatoryCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleMandatoryClick}
                          checked={mandatoryStatus || mandetoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
<div class=" flex flex-col w-[80%] ">
<div class=" flex flex-row ">
{moduleMapper.erpInd === true && (
  <>
                    <div class=" text-sm w-[2rem] ml-4">ERP</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleErpClick}
                        onCancel={handleErpCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleErpClick}
                          checked={erpStatus || erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.crmInd === true && (
  <>
                  <div class=" text-sm w-[2rem] ml-4 ">CRM</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleCrmClick}
                          checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.imInd === true && (
  <>
                    <div class=" text-sm w-[2rem] ml-4">IM</div>
                    <div   class=" w-[7%] ml-2">
                 
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleImClick}
                          checked={imStatus || imInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                 
                    </div>
                    </>
)}
{moduleMapper.recruitProInd === true && (
  <>
                    <div class=" text-sm w-[5rem] ml-4">Rcruitpro</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        onCancel={handleRecruitProCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleRecruitProClick}
                          checked={recruitProStatus || recruitProInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.hrInd === true && (
  <>

                    <div class=" text-sm w-[2rem] ml-4">HR</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleHrClick}
                        onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleHrClick}
                          checked={hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.elearningInd === true && (
  <>

                    <div class=" text-sm w-[5rem]  ml-4">Elearning</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleElearningClick}
                        onCancel={handleElearningCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleElearningClick}
                          checked={elearningStatus || elearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
</div>

<div class=" flex flex-row mt-2 ">

{/* {accountInd === true && (
  <>
                    <div class=" text-sm  ml-2">Account</div>
                    <div   class=" w-[7%] ml-2">
                 
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleAccountClick}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
               
                    </div>
                    </>
)} */}
{/* {recruitOppsInd === true && (
  <>

                    <div class=" text-sm  ml-2">RecruitOpps</div>
                    <div   class=" w-[7%] ml-2">
                  
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleRecruitClick}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                    
                    </div>
                    </>
)} */}

{moduleMapper.productionInd === true && (
  <>

                    <div class=" text-sm w-[5rem] ml-4">Production</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProductionClick}
                        onCancel={handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleProductionClick}
                          checked={productionStatus || productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}

{moduleMapper.repairInd === true && (
  <>
                    <div class=" text-sm w-[5rem]  ml-4">Repair</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRepairClick}
                        onCancel={handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleRepairClick}
                          checked={repairStatus || repairInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{/* {inventoryInd === true && (
  <>
                    <div class=" text-sm  ml-2">Inventory</div>
                    <div   class=" w-[7%] ml-2">
                
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleInventoryClick}
                          checked={inventoryStatus || inventoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                    
                    </div>
                    </>
)} */}
{moduleMapper.orderManagementInd === true && (
  <>
                    <div class=" text-sm w-[9rem] ml-4">Order Management</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleOrderManagementClick}
                        onCancel={handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleOrderManagementClick}
                          checked={orderManagStatus || orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.logisticsInd === true && (
  <>
                    <div class=" text-sm w-[5rem]  ml-4">Logistics</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleLogisticClick}
                        onCancel={handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleLogisticClick}
                          checked={logisticsStatus || logisticsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{moduleMapper.procurementInd === true && (
  <>
                    <div class=" text-sm w-[5rem] ml-4">Procurement</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProcurmentClick}
                        onCancel={handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "4em" }}
                          onChange={handleProcurmentClick}
                          checked={procurmentStatus || procurementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}

</div>
</div>

                  <div class="ml-2">
                    {mandetoryInd !== true && (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{ fontSize: "1rem" }}
                      />
                    )}
  <Tooltip title="Delete">
                    {mandetoryInd !== true && (
                      <DeleteOutlined
                        onClick={() => handleDeleteDepartment(departmentId)}
                     
                        style={{
                          verticalAlign: "center",
                          marginLeft: "5px",
                          fontSize: "1rem",
                          color: "red",
                        }}
                      />
                    )}
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class=" flex">
              <TextInput
                name={props.name}
                defaultValue={departmentName}
                onChange={props.handleChange}
                style={{ width: "60%" }}
              />
            <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={updatingDepartments}
                    disabled={!value}
                    onClick={() => {
                      console.log(value); // Log the 'value' before calling handleUpdateSector
                      handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType());
                    }}
                  // onClick={() => handleUpdateDepartment(departmentId,value,sectorId,sectorName,value, toggleViewType())}
                  >
                    {/* Save */}
                    <FormattedMessage
              id="app.update"
              defaultMessage="Update"
            />
                </Button>
            
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage
              id="app.cancel"
              defaultMessage="Cancel"
            />
                </Button>
                </div>
            </div>
          )
        }
      </ViewEditCard>
    </div>
  );
};

const mapStateToProps = ({ departments, sector }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingDeptModules,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SingleDepartment);

