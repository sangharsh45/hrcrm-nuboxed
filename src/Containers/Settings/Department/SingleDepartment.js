import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import {addingDeptModules} from "../Department/DepartmentAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
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
    department: { departmentName,crmInd,procurementInd,recruitOppsInd,hrInd,orderManagementInd,logisticsInd, departmentId,repairInd,inventoryInd,recruitProInd,sectorId,productionInd,eLearningInd,mandetoryInd,sectorName,erpInd,imInd ,accountInd},
   handleChange,
   name,
   value,
   linkedDepartments,
   updatingDepartments,
   handleUpdateDepartment,
   handleDeleteDepartment,

 } = props;

  // const { crmInd } = department;
  console.log(crmInd);
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
  const [imStatus, setImStatus] = useState(imInd);
  useEffect(() => {
    setImStatus(imInd);
  }, [imInd]);
  
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
  const [elearningStatus, setElearningStatus] = useState(eLearningInd);

  useEffect(() => {
    setElearningStatus(eLearningInd);
  }, [eLearningInd]);
  
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
    <DepartmentWrapper>
      <ViewEditCard>
        {({ viewType: cardViewType }, toggleCardViewType) =>
          cardViewType === "view" ? (
            <div className="flex">
              <div className="w-full flex-row">
                <div className="flex justify-between">
                  <div className="w-[9rem]">
                    <DepartmentName>{departmentName}</DepartmentName>
                  </div>
{crmInd === true && (
  <>
                  <div class=" text-base text-[#1677ff]">CRM</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleCrmClick}
                        onCancel={handleCrmCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleCrmClick}
                          checked={crmStatus || crmInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{mandetoryInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Mandatory</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleMandatoryClick}
                        onCancel={handleMandatoryCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleMandatoryClick}
                          checked={mandatoryStatus || mandetoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{erpInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">ERP</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleErpClick}
                        onCancel={handleErpCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleErpClick}
                          checked={erpStatus || erpInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{imInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">IM</div>
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
                    </>
)}
{accountInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Account</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAccountClick}
                        onCancel={handleAccountCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleAccountClick}
                          checked={accountStatus || accountInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{recruitOppsInd === true && (
  <>

                    <div class=" text-base text-[#1677ff]">RecruitOpps</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitClick}
                        onCancel={handleRecruitCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleRecruitClick}
                          checked={recruitStatus || recruitOppsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{hrInd === true && (
  <>

                    <div class=" text-base text-[#1677ff]">HR</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleHrClick}
                        onCancel={handleHrCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleHrClick}
                          checked={hrStatus || hrInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{productionInd === true && (
  <>

                    <div class=" text-base text-[#1677ff]">PRODUCTION</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProductionClick}
                        onCancel={handleProductionCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleProductionClick}
                          checked={productionStatus || productionInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{recruitProInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Rcruitpro</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRecruitProClick}
                        onCancel={handleRecruitProCancel}
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
                    </>
)}
{repairInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Repair</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleRepairClick}
                        onCancel={handleRepairCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleRepairClick}
                          checked={repairStatus || repairInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{inventoryInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Inventory</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleInventoryClick}
                        onCancel={handleInventoryCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleInventoryClick}
                          checked={inventoryStatus || inventoryInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{orderManagementInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">OrderManagement</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleOrderManagementClick}
                        onCancel={handleOrderManagementCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleOrderManagementClick}
                          checked={orderManagStatus || orderManagementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{logisticsInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Logistics</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleLogisticClick}
                        onCancel={handleLogisticCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleLogisticClick}
                          checked={logisticsStatus || logisticsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{procurementInd === true && (
  <>
                    <div class=" text-base text-[#1677ff]">Procurement</div>
                    <div   class=" w-[7%] ml-2">
                    {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleProcurmentClick}
                        onCancel={handleProcurmentCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleProcurmentClick}
                          checked={procurmentStatus || procurementInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
{eLearningInd === true && (
  <>

                    <div class=" text-base text-[#1677ff]">Elearning</div>
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
                          checked={elearningStatus || eLearningInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      {/* </Popconfirm> */}
                    </div>
                    </>
)}
                  <div class="ml-2">
                    {mandetoryInd !== true && (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{ fontSize: "1rem" }}
                      />
                    )}

                    {mandetoryInd !== true && (
                      <DeleteIcon
                        onClick={() => handleDeleteDepartment(departmentId)}
                        size="14px"
                        style={{
                          verticalAlign: "center",
                          marginLeft: "5px",
                          color: "red",
                        }}
                      />
                    )}
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
                &nbsp;
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
    </DepartmentWrapper>
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
